import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDoc, arrayUnion, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { UserContext } from '../../Context/UserContext';
import { toggleComplete, addNewTask, deleteTask } from '../../redux/taskSlice';

import { v4 as uuidv4 } from 'uuid';
import TaskList from './TaskList';

const Tasks = () => {
    const [nameTask, setNameTask] = useState('');
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const { tasks } = useSelector((state) => state.tasks);
    const { session } = useSelector((state) => state.timer);
    const { user } = useContext(UserContext);

    const currentTask = tasks.filter((status) => !status.isComplete);
    const completedTasks = tasks.filter((status) => status.isComplete);

    // Handle change form input
    const handleChangeInput = (e) => {
        setNameTask(e.target.value);
    };

    // Handle add new task
    const handleAddNewTask = async (e) => {
        e.preventDefault();
        if (user) {
            const userRef = doc(db, 'users', user.uid);
            const newTask = {
                id: uuidv4(),
                label: nameTask,
                isComplete: false,
            };
            try {
                await updateDoc(userRef, { tasks: arrayUnion(newTask) });
            } catch (error) {
                console.log(error.message);
            }
        } else {
            // Handle for annonymous user
            dispatch(
                addNewTask({
                    id: uuidv4(),
                    label: nameTask,
                    isComplete: false,
                }),
            );
        }

        setNameTask('');
    };

    // Handle event tasks
    const handleComplete = async (id) => {
        if (user) {
            const userRef = doc(db, 'users', user.uid);
            const updatedTask = tasks.map((task) => {
                return {
                    ...task,
                    isComplete:
                        task.id === id ? !task.isComplete : task.isComplete,
                };
            });

            try {
                await updateDoc(userRef, { tasks: updatedTask });
            } catch (error) {
                console.log(error.message);
            }
        } else {
            // Handle for annonymous user
            dispatch(toggleComplete(id));
        }
    };

    const handleDelete = async (id) => {
        if (user) {
            const userRef = doc(db, 'users', user.uid);
            const updatedTask = tasks.filter((task) => task.id !== id);

            try {
                await updateDoc(userRef, { tasks: updatedTask });
            } catch (error) {
                console.log(error.message);
            }
        } else {
            // Handle for annonymous user
            dispatch(deleteTask(id));
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-2">
            <div className="text-center">
                <div className="text-light fw-bold fs-4">#{session}</div>
                <span className="text-light fw-bold fs-4">
                    {currentTask.length > 0 && currentTask[0].label}
                </span>
            </div>

            <div
                style={{
                    maxWidth: '460px',
                }}
                className="w-100 position-relative "
            >
                <div>
                    <form
                        className="d-flex align-items-center mt-4 position-relative "
                        style={{ height: '54px' }}
                    >
                        <input
                            type="text"
                            id="newTask"
                            className="bg-white text-dark h-100 w-100 rounded-1 p-2 ps-4 form-control fs-4 border-0 "
                            placeholder="Add a task"
                            onChange={handleChangeInput}
                            value={nameTask}
                        />
                        <button
                            style={{
                                position: 'absolute',
                                flex: '1',
                                background: '#fff',
                                color: '#f4664c',
                                borderRadius: '6px',
                                right: '0',
                                height: '100%',
                            }}
                            className="btn btn-text-primary px-3 py-2 ms-3 rounded-4 fs-4 fw-bold"
                            onClick={handleAddNewTask}
                            onKeyUp={(event) => {
                                if (event.key === 'Enter') {
                                    handleAddNewTask();
                                }
                            }}
                        >
                            Add
                        </button>
                    </form>

                    <div className="my-4">
                        <span className="text-light form-label fw-bold fs-5">
                            Your Tasks ({currentTask.length})
                        </span>
                        <TaskList
                            taskLists={currentTask}
                            handleComplete={handleComplete}
                            handleDelete={handleDelete}
                        />
                    </div>
                </div>

                {/* Completed tasks */}
                <div>
                    <div
                        onClick={() => setOpen(!open)}
                        style={{ cursor: 'pointer' }}
                    >
                        {open && completedTasks.length > 0 ? (
                            <i className="bi bi-caret-down-fill text-light"></i>
                        ) : (
                            <i className="bi bi-caret-right-fill text-light"></i>
                        )}
                        <span className="text-light fw-bold fs-5">
                            Completed ({completedTasks.length})
                        </span>
                    </div>
                    {open && (
                        <TaskList
                            taskLists={completedTasks}
                            handleComplete={handleComplete}
                            handleDelete={handleDelete}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Tasks;
