import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent } from "../../utils/studentSlice";
import "../StudentDetail/studentDetail.css";

export const StudentDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const student = useSelector((state) =>
    state.students.students.find((s) => s._id === id)
  );

  const deleteStudentHandler = (id) => {
    dispatch(deleteStudent(id));
    navigate("/");
  };

  return (
    <div className="student-detail">
      <h2>Student card</h2>
      <p>Name: {student?.name}</p>
      <p>Age: {student?.age}</p>
      <p>Class: {student?.className}</p>
      <p>Gender: {student?.gender}</p>
      <p>Marks: {student?.marks}</p>
      <p>Attendance: {student?.attendance}</p>
      <p>Grade: {student?.grade}</p>
      <div className="actions">
        <Link to={`/student/edit/${student?._id}`} state={student}>
          <button>Edit</button>
        </Link>
        <button onClick={() => deleteStudentHandler(student?._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};
