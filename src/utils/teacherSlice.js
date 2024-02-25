import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalStudents: 0,
  averageAttendance: 0,
  averageMarks: 0,
  topStudent: null,
};

export const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    updateState: (state, action) => {
      const { totalStudents, averageAttendance, averageMarks, topStudent } =
        action.payload;

      state.topStudent = topStudent;
      state.averageMarks = averageMarks;
      state.totalStudents = totalStudents;
      state.averageAttendance = averageAttendance;
    },

    setTopStudent: (state, action) => {
      state.topStudent = action.payload;
    },
  },
});

export const { updateState, setTopStudent } = schoolSlice.actions;
export default schoolSlice.reducer;
