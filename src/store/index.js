import { configureStore } from '@reduxjs/toolkit';


import inputSlice from './inputSlice';

const store = configureStore({
  reducer: { input: inputSlice.reducer},
});

export default store;
