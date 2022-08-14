import { configureStore } from '@reduxjs/toolkit';
import taskSlice from './taskSlice';
import timerSlice from './timerSlice';
import musicSlice from './musicSlice';

const store = configureStore({
    reducer: { tasks: taskSlice, timer: timerSlice, music: musicSlice },
});

export default store;
