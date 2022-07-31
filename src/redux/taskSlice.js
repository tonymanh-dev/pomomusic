import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'tasks',

    // Ininitial value
    initialState: [
        { id: 1, name: 'Do something', completed: true },
        { id: 2, name: 'Keep your mind', completed: false },
        { id: 3, name: 'Finish your homework', completed: false },
    ],

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
                state.findIndex((item) => item.id === action.payload),
                1,
            );
        },
    },
});

export default taskSlice;
