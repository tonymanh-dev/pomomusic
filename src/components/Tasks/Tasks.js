import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addNewTask,
    toggleTaskStatus,
    deleteTask,
} from '../../redux/taskSlice';
import { v4 as uuidv4 } from 'uuid';
import TaskList from './TaskList';

const Tasks = () => {
    const [nameTask, setNameTask] = useState('');
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const taskLists = useSelector((state) => state.tasks);
    const { session } = useSelector((state) => state.timer);

    const currentTask = taskLists.filter((status) => !status.completed);
    const completedTasks = taskLists.filter((status) => status.completed);

    const handleAddNewTask = (e) => {
        e.preventDefault();
        dispatch(
            addNewTask({
                id: uuidv4(),
                name: nameTask,
                completed: false,
            }),
        );
        setNameTask('');
    };

    const handleChangeInput = (e) => {
        setNameTask(e.target.value);
    };

    const hanldeChangeStatus = (id) => {
        dispatch(toggleTaskStatus(id));
    };

    const handleDeleteTask = (id) => {
        dispatch(deleteTask(id));
    };

    const toggleCompletedTask = () => {
        setOpen(!open);
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-3">
            <div className="text-center">
                <div className="text-light fw-bold fs-4">#{session}</div>
                <span className="text-light fw-bold fs-4">
                    {currentTask.length > 0 && currentTask[0].name}
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
                            Your Tasks (
                            {taskLists.filter((task) => !task.completed).length}
                            )
                        </span>
                        <TaskList
                            taskLists={currentTask}
                            hanldeChangeStatus={hanldeChangeStatus}
                            handleDeleteTask={handleDeleteTask}
                        />
                    </div>
                </div>

                {/* Completed tasks */}
                <div>
                    <div
                        onClick={toggleCompletedTask}
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
                            hanldeChangeStatus={hanldeChangeStatus}
                            handleDeleteTask={handleDeleteTask}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Tasks;
