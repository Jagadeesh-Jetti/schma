import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://school-management-backend-eosin.vercel.app/teachers";

export const fetchTeachers = createAsyncThunk(
  "teacher/fetchTeachers",
  async () => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addTeacher = createAsyncThunk(
  "teacher/add",
  async (newTeacher) => {
    try {
      const response = await axios.post(url, newTeacher);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateTeacher = createAsyncThunk(
  "teacher/update",
  async ({ id, newData }) => {
    try {
      const response = await axios.put(`${url}/${id}`, newData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteTeacher = createAsyncThunk("teacher/delete", async (id) => {
  try {
    const response = await axios.delete(`${url}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  teachers: [],
  status: "idle",
  error: null,
};

export const teacherSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTeachers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchTeachers.fulfilled]: (state, action) => {
      state.status = "success";
      state.teachers = action.payload;
    },
    [fetchTeachers.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addTeacher.pending]: (state) => {
      state.status = "loading";
    },
    [addTeacher.fulfilled]: (state, action) => {
      state.status = "success";
      state.teachers.push(action.payload);
    },
    [addTeacher.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updateTeacher.pending]: (state) => {
      state.status = "loading";
    },
    [updateTeacher.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedTeacher = action.payload;
      const index = state.teachers.findIndex(
        (teacher) => teacher.id === updatedTeacher.id
      );
      if (index !== -1) {
        state.teachers[index] = updatedTeacher;
      }
    },
    [updateTeacher.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteTeacher.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteTeacher.fulfilled]: (state, action) => {
      state.status = "success";
      const deletedTeacherId = action.payload.id;
      state.teachers = state.teachers.filter(
        (teacher) => teacher.id !== deletedTeacherId
      );
    },
    [deleteTeacher.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default teacherSlice.reducer;
