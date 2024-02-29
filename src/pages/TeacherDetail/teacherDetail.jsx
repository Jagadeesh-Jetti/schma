import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteTeacher } from "../../utils/teacherSlice";
import "../TeacherDetail/teacherDetail.css";

export const TeacherDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teacher = useSelector((state) =>
    state.teachers.teachers.find((t) => t._id === id)
  );

  const deleteTeacherHandler = (id) => {
    dispatch(deleteTeacher(id));
    navigate("/teacher");
  };

  return (
    <div className="teacher-detail">
      <div>
        <h2>Teacher's Card</h2>
        <p>Name: {teacher?.name}</p>
        <p>Age: {teacher?.age}</p>
        <p>Gender: {teacher?.gender}</p>
        <p>Subject: {teacher?.subject}</p>
        <p>Contact: {teacher?.contact}</p>
      </div>
      <div className="actions">
        <button>
          <Link to={`/teacher/edit/${teacher?._id}`} state={teacher}>
            Edit
          </Link>
        </button>
        <button onClick={() => deleteTeacherHandler(teacher?._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};
