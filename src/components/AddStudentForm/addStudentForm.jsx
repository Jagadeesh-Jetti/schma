import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addNewStudent,
  updateStudent,
  fetchStudents,
} from "../../utils/studentSlice";
import "../AddStudentForm/addStudentForm.css";

export const AddStudent = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const student = state ? state : null;

  const [data, setData] = useState({
    name: student ? student.name : "",
    className: student ? student.className : "",
    age: student ? student.age : "",
    gender: student ? student.gender : "",
    marks: student ? student.marks : "",
    attendance: student ? student.attendance : "",
    grade: student ? student.grade : "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const isFormValid = () => {
    return (
      data.name !== "" &&
      data.className !== "" &&
      data.gender !== "" &&
      data.age !== "" &&
      data.marks !== "" &&
      data.attendance !== "" &&
      data.grade !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      const newStudent = {
        name: data.name,
        className: data.className,
        age: data.age,
        gender: data.gender,
        marks: data.marks,
        attendance: data.attendance,
        grade: data.grade,
      };

      if (student) {
        await dispatch(updateStudent({ id: student._id, newData: newStudent }));
      } else {
        await dispatch(addNewStudent(newStudent));
      }

      setData({
        name: "",
        className: "",
        age: "",
        gender: "",
        marks: "",
        attendance: "",
        grade: "",
      });

      dispatch(fetchStudents());

      navigate("/");
    } else {
      alert("Please fill in all fields correctly");
    }
  };

  return (
    <div className="student-form-container">
      <h2>{student ? "Edit Student" : "Add Student"}</h2>

      <div className="inputs">
        <input
          name="name"
          value={data?.name}
          onChange={handleInput}
          placeholder="Name"
          type="text"
        />
        <input
          name="className"
          value={data?.className}
          onChange={handleInput}
          placeholder="Class Name"
          type="text"
        />
        <input
          name="gender"
          value={data?.gender}
          onChange={handleInput}
          placeholder="Gender"
          type="text"
        />
        <input
          name="age"
          value={data?.age}
          onChange={handleInput}
          placeholder="Age"
          type="number"
        />
        <input
          name="marks"
          value={data?.marks}
          onChange={handleInput}
          placeholder="Marks"
          type="number"
        />
        <input
          name="attendance"
          value={data?.attendance}
          onChange={handleInput}
          placeholder="Attendance"
          type="number"
        />
        <input
          name="grade"
          value={data?.grade}
          onChange={handleInput}
          placeholder="Grade"
          type="text"
        />
      </div>
      <button onClick={handleSubmit}>{student ? "Update" : "Add"}</button>
    </div>
  );
};
