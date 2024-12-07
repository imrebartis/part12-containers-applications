import { createSlice } from "@reduxjs/toolkit";

export const filterReducer = createSlice({
  name: "filter",
  initialState: "ALL",
  reducers: {
    setFilter: (state, action) => action.payload,
  },
});

export const { setFilter } = filterReducer.actions;
export default filterReducer.reducer;
