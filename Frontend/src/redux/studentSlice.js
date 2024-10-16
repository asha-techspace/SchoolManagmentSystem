// src/redux/studentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fetchStudentsRequest(state) {
      state.loading = true;
    },
    fetchStudentsSuccess(state, action) {
      state.students = action.payload;
      state.loading = false;
    },
    fetchStudentsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addStudent(state, action) {
      state.students.push(action.payload);
    },
    updateStudent(state, action) {
      const index = state.students.findIndex(student => student.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    deleteStudent(state, action) {
      state.students = state.students.filter(student => student.id !== action.payload);
    },
  },
});

export const {
  fetchStudentsRequest,
  fetchStudentsSuccess,
  fetchStudentsFailure,
  addStudent,
  updateStudent,
  deleteStudent,
} = studentSlice.actions;

export default studentSlice.reducer;
