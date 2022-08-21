import { createSlice } from '@reduxjs/toolkit';
import { dummyTasks } from '../Utils/constant';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: dummyTasks,

    // Action of updating new value into current state
    reducers: {
        addNewTask: (state, action) => {
            state.push(action.payload);
        },
        toggleTaskStatus: (state, action) => {
            const currentTask = state.find(
                (task) => task.id === action.payload,
            );
            if (currentTask) currentTask.completed = !currentTask.completed;
        },
        deleteTask: (state, action) => {
            state.splice(
                state.findIndex((index) => index.id === action.payload),
                1,
            );
        },
    },
});
export const { addNewTask, toggleTaskStatus, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
