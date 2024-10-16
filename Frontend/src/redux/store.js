// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './studentSlice';
import libraryReducer from './librarySlice';
import feesReducer from './feesSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    student: studentReducer,
    library: libraryReducer,
    fees: feesReducer,
    auth: authReducer,
  },
});

export default store;
