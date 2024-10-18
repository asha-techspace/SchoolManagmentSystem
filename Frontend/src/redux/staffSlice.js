// src/redux/staffSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  staffs: [],
  loading: false,
  error: null,
};

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    fetchStaffsRequest(state) {
      state.loading = true;
    },
    fetchStaffsSuccess(state, action) {
      console.log(`Responseee$:: ${action.payload}`)
      state.staffs = action.payload;
      state.loading = false;
    },
    fetchStaffsFailure(state, action) {
      state.staffs = []
      state.loading = false;
      state.error = action.payload;
    },
    addStaff(state, action) {
      state.staffs.push(action.payload);
    },
    addStaffAtStart(state, action) {
      state.staffs.unshift(action.payload);
    },
    addStaffs(state, action) {
      state.staffs = action.payload;
    },
    updateStaff(state, action) {
      const index = state.staffs.findIndex(staff => staff.id === action.payload.id);
      if (index !== -1) {
        state.staffs[index] = action.payload;
      }
    },
    deleteStaff(state, action) {
      state.staffs = state.staffs.filter(staff => staff.id !== action.payload);
    },
  },
});

export const {
  fetchStaffsRequest,
  fetchStaffsSuccess,
  fetchStaffsFailure,
  addStaff,
  addStaffs,
  updateStaff,
  deleteStaff,
  addStaffAtStart,
 } = staffSlice.actions;

export default staffSlice.reducer;
