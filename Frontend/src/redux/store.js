// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './studentSlice';
import libraryReducer from './librarySlice';
import feesReducer from './feesSlice';
import authReducer from './authSlice';
import staffReducer from './staffSlice';

const store = configureStore({
  reducer: {
    student: studentReducer,
    library: libraryReducer,
    fees: feesReducer,
    auth: authReducer,
    staff: staffReducer,
  },
});

export default store;
