import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addTeacher,
  updateTeacher,
  fetchTeachers,
} from "../../utils/teacherSlice";
import "../AddTeacherForm/addTeacherForm.css";

export const AddTeacher = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teacher = state ? state : null;

  const [data, setData] = useState({
    name: teacher ? teacher.name : "",
    age: teacher ? teacher.age : "",
    gender: teacher ? teacher.gender : "",
    subject: teacher ? teacher.subject : "",
    phoneNumber: teacher ? teacher.phoneNumber : "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const isFormValid = () => {
    return (
      data.name !== "" &&
      data.age !== "" &&
      data.gender !== "" &&
      data.subject !== "" &&
      data.phoneNumber !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      const newTeacher = {
        name: data.name,
        age: data.age,
        gender: data.gender,
        subject: data.subject,
        phoneNumber: data.phoneNumber,
      };

      if (teacher) {
        await dispatch(updateTeacher({ id: teacher._id, newData: newTeacher }));
      } else {
        await dispatch(addTeacher(newTeacher));
      }

      setData({
        name: "",
        age: "",
        gender: "",
        subject: "",
        phoneNumber: "",
      });

      dispatch(fetchTeachers());

      navigate("/teachers");
    } else {
      alert("Please fill in all fields correctly");
    }
  };

  return (
    <div className="teacher-form-container">
      <h2>{teacher ? "Edit Teacher" : "Add Teacher"}</h2>
      <div className="inputs">
        <input
          name="name"
          value={data?.name}
          onChange={handleInput}
          placeholder="Name"
          type="text"
        />
        <input
          name="age"
          value={data?.age}
          onChange={handleInput}
          placeholder="Age"
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
          name="subject"
          value={data?.subject}
          onChange={handleInput}
          placeholder="Subject"
          type="text"
        />
        <input
          name="phoneNumber"
          value={data?.phoneNumber}
          onChange={handleInput}
          placeholder="Phone Number"
          type="number"
        />
      </div>
      <button onClick={handleSubmit}>{teacher ? "Update" : "Add"}</button>
    </div>
  );
};
