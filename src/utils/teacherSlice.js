import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://school-management-backend-eosin.vercel.app/teachers";

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
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
  "teachers/add",
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
  "teachers/update",
  async ({ id, newData }) => {
    try {
      const response = await axios.put(`${url}/${id}`, newData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteTeacher = createAsyncThunk("teachers/delete", async (id) => {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.status = "success";
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(addTeacher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.status = "success";
        state.teachers.push(action.payload);
      })
      .addCase(addTeacher.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(updateTeacher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.status = "success";
        const updatedTeacher = action.payload;
        const index = state.teachers.findIndex(
          (teacher) => teacher._id === updatedTeacher._id
        );
        if (index !== -1) {
          state.teachers[index] = updatedTeacher;
        }
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(deleteTeacher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.status = "success";
        const deletedTeacherId = action.payload._id;
        state.teachers = state.teachers.filter(
          (teacher) => teacher._id !== deletedTeacherId
        );
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default teacherSlice.reducer;
