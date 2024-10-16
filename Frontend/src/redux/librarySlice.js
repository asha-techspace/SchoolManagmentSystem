// src/redux/librarySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  libraryRecords: [],
  loading: false,
  error: null,
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    fetchLibraryRequest(state) {
      state.loading = true;
    },
    fetchLibrarySuccess(state, action) {
      state.libraryRecords = action.payload;
      state.loading = false;
    },
    fetchLibraryFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addLibraryRecord(state, action) {
      state.libraryRecords.push(action.payload);
    },
    updateLibraryRecord(state, action) {
      const index = state.libraryRecords.findIndex(record => record.id === action.payload.id);
      if (index !== -1) {
        state.libraryRecords[index] = action.payload;
      }
    },
    deleteLibraryRecord(state, action) {
      state.libraryRecords = state.libraryRecords.filter(record => record.id !== action.payload);
    },
  },
});

export const {
  fetchLibraryRequest,
  fetchLibrarySuccess,
  fetchLibraryFailure,
  addLibraryRecord,
  updateLibraryRecord,
  deleteLibraryRecord,
} = librarySlice.actions;

export default librarySlice.reducer;
