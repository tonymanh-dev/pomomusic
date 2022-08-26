import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: { tasks: [] },

    reducers: {
        updateTasks: (state, { payload }) => {
            state.tasks = payload;
        },

        // For anonymous user
        addNewTask: ({ tasks }, { payload }) => {
            tasks.push(payload);
        },
        toggleComplete: ({ tasks }, { payload }) => {
            const curTask = tasks.find((task) => task.id === payload);
            if (curTask) curTask.isComplete = !curTask.isComplete;
        },
        deleteTask: ({ tasks }, { payload }) => {
            tasks.splice(
                tasks.findIndex((index) => index.id === payload),
                1,
            );
        },
    },
});
export const { updateTasks, toggleComplete, deleteTask, addNewTask } =
    taskSlice.actions;

export default taskSlice.reducer;
