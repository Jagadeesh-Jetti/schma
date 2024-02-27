import { configureStore } from "@reduxjs/toolkit";
import { schoolSlice } from "./schoolSlice";
import { teacherSlice } from "./teacherSlice";
import { studentSlice } from "./studentSlice";

export default configureStore({
  reducer: {
    school: schoolSlice.reducer,
    teachers: teacherSlice.reducer,
    students: studentSlice.reducer,
  },
});
