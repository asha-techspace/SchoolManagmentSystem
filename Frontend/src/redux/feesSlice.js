// src/redux/feesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  feesHistory: [],
  loading: false,
  error: null,
};

const feesSlice = createSlice({
  name: 'fees',
  initialState,
  reducers: {
    fetchFeesRequest(state) {
      state.loading = true;
    },
    fetchFeesSuccess(state, action) {
      state.feesHistory = action.payload;
      state.loading = false;
    },
    fetchFeesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addFeesRecord(state, action) {
      state.feesHistory.push(action.payload);
    },
    updateFeesRecord(state, action) {
      const index = state.feesHistory.findIndex(record => record.id === action.payload.id);
      if (index !== -1) {
        state.feesHistory[index] = action.payload;
      }
    },
    deleteFeesRecord(state, action) {
      state.feesHistory = state.feesHistory.filter(record => record.id !== action.payload);
    },
  },
});

export const {
  fetchFeesRequest,
  fetchFeesSuccess,
  fetchFeesFailure,
  addFeesRecord,
  updateFeesRecord,
  deleteFeesRecord,
} = feesSlice.actions;

export default feesSlice.reducer;
