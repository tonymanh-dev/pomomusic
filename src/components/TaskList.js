import React from 'react';

const TaskList = ({ taskLists, hanldeChangeStatus, handleDeleteTask }) => {
    return (
        <div>
            {taskLists.map((task) => {
                const completedTask = task.completed ? '#f4664c' : '';

                return (
                    <div
                        className="mb-4 mt-2 py-2 px-3 d-flex justify-content-between"
                        style={{
                            background: '#fff',
                            borderRadius: '6px',
                        }}
                        key={task.id}
                    >
                        <div className="d-flex align-items-center ">
                            <span
                                style={{ cursor: 'pointer' }}
                                onClick={() => hanldeChangeStatus(task.id)}
                            >
                                {completedTask ? (
                                    <i
                                        className="bi bi-check-circle-fill me-3 fs-2 "
                                        style={{
                                            color: completedTask,
                                        }}
                                    ></i>
                                ) : (
                                    <i className="bi bi-circle me-3  fs-2 text-secondary"></i>
                                )}
                            </span>

                            <span
                                className="text fw-bold text-secondary lh-sm"
                                style={{
                                    textDecoration: completedTask
                                        ? 'line-through'
                                        : 'none',
                                    opacity: completedTask ? '30%' : '1',
                                }}
                            >
                                {task.name}
                            </span>
                        </div>
                        <div className="d-flex justify-content-center align-items-center ">
                            <span
                                className="fs-4"
                                style={{
                                    borderRadius: '30px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleDeleteTask(task.id)}
                            >
                                <i className="bi bi-x-lg text-secondary small"></i>
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TaskList;
