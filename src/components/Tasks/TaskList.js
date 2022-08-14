import React from 'react';

const TaskList = ({ taskLists, hanldeChangeStatus, handleDeleteTask }) => {
    return (
        <div>
            {taskLists.map((task) => {
                const completedCl = task.completed ? '#f4664c' : '';

                return (
                    <div
                        className="mb-4 bg-light rounded-1 mt-2 py-2 px-3 d-flex justify-content-between"
                        key={task.id}
                    >
                        <div className="d-flex align-items-center py-1">
                            <span
                                role="button"
                                className="me-2 fs-5 text-secondary "
                                onClick={() => hanldeChangeStatus(task.id)}
                            >
                                {task.completed ? (
                                    <i
                                        className="bi bi-check-circle-fill me-3 fs-4 "
                                        style={{
                                            color: completedCl,
                                        }}
                                    ></i>
                                ) : (
                                    <i className="bi bi-circle"></i>
                                )}
                            </span>

                            <span
                                className="text fw-bold text-secondary lh-sm fs-5"
                                style={{
                                    textDecoration: task.completed
                                        ? 'line-through'
                                        : 'none',
                                    opacity: task.completed ? '30%' : '1',
                                }}
                            >
                                {task.name}
                            </span>
                        </div>
                        <div className="d-flex justify-content-center align-items-center ">
                            <span
                                role="button"
                                className="fs-4"
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
