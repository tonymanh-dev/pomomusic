/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
// import { taskListSelector } from '../redux/selector';
import taskSlice from '../redux/taskSlice';
import TaskList from './TaskList';

const Tasks = () => {
    const [nameTask, setNameTask] = useState('');
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const taskLists = useSelector((state) => state.taskList);

    const currentTask = taskLists.filter((task) => !task.completed);
    const completedTasks = taskLists.filter((status) => status.completed);
    const tasks = taskLists.filter((status) => !status.completed);

    // Handle dispath action add new task
    const handleAddNewTask = (e) => {
        e.preventDefault();
        dispatch(
            taskSlice.actions.addNewTask({
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
        dispatch(taskSlice.actions.toggleTaskStatus(id));
    };

    const handleDeleteTask = (id) => {
        dispatch(taskSlice.actions.deleteTask(id));
    };

    const toggleCompletedTask = () => {
        setOpen(!open);
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center my-5">
            <div>
                <span className="text-light fw-bold fs-4">
                    #{currentTask.length > 0 && currentTask[0].name}
                </span>
            </div>

            <div
                style={{
                    width: '100%',
                    maxWidth: '460px',
                    position: 'relative',
                }}
            >
                <div>
                    <form
                        className="d-flex align-items-center mt-4"
                        style={{ height: '54px', position: 'relative' }}
                    >
                        <input
                            type="text"
                            id="newTask"
                            className="p-2 ps-4 form-control fs-4 fw-bold border-0 "
                            style={{
                                height: '100%',
                                width: '100%',
                                borderRadius: '6px',
                            }}
                            placeholder="Add a task"
                            onChange={handleChangeInput}
                            value={nameTask}
                        />
                        <button
                            type="button"
                            style={{
                                position: 'absolute',
                                flex: '1',
                                background: '#fff',
                                color: '#f4664c',
                                borderRadius: '6px',
                                right: '0',
                                height: '100%',
                            }}
                            className="btn px-5 py-2 ms-3 rounded-4 fs-4 fw-bold"
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
                        <span className="text-light form-label fw-bold ">
                            Your Tasks (
                            {taskLists.filter((task) => !task.completed).length}
                            )
                        </span>
                        <TaskList
                            taskLists={tasks}
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
                        <span className="text-light fw-bold ">
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
