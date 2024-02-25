import { configureStore } from "@reduxjs/toolkit";
import schoolSlice from "./schoolSlice";

export default configureStore({
  reducer: {
    school: schoolSlice.reducer,
  },
});
