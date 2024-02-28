import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://school-management-backend-eosin.vercel.app/students";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addNewStudent = createAsyncThunk(
  "students/add",
  async (newStudent) => {
    try {
      const response = await axios.post(url, newStudent);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateStudent = createAsyncThunk(
  "students/update",
  async ({ id, newData }) => {
    try {
      const response = await axios.put(`${url}/${id}`, newData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const deleteStudent = createAsyncThunk("delete/student", async (id) => {
  try {
    const response = await axios.delete(`${url}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  students: [],
  status: "idle",
  error: null,
  sortBy: "name",
  filter: "All",
};

export const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchStudents.pending]: (state) => {
      state.status = "Loading";
    },
    [fetchStudents.fulfilled]: (state, action) => {
      state.status = "Success";
      state.students = action.payload;
    },
    [fetchStudents.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addNewStudent.pending]: (state) => {
      state.status = "Loading";
    },
    [addNewStudent.fulfilled]: (state, action) => {
      state.status = "success";
      state.students.push(action.payload);
    },
    [addNewStudent.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updateStudent.pending]: (state) => {
      state.status = "loading";
    },
    [updateStudent.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedStudent = action.payload;
      const index = state.students.findIndex(
        (student) => student._id === updatedStudent._id
      );
      if (index !== -1) {
        state.students[index] = updatedStudent;
      }
    },
    [updateStudent.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteStudent.pending]: (state) => {
      state.status = "loading";
    },
    [deleteStudent.fulfilled]: (state, action) => {
      state.status = "success";
      const deletedStudentId = action.payload._id;
      state.students = state.students.filter(
        (student) => student._id !== deletedStudentId
      );
    },
    [deleteStudent.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default studentSlice.reducer;
