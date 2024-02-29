import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../Teachers/teachers.css";
import { fetchTeachers } from "../../utils/teacherSlice";

export const Teachers = () => {
  const dispatch = useDispatch();
  const { teachers, error, status } = useSelector((state) => state.teachers);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTeachers());
    }
  }, [status, dispatch]);

  const renderTableContent = () => {
    if (status === "loading") {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p className="error-message">Error: {error}</p>;
    }

    if (teachers.length === 0) {
      return <p>No teachers available.</p>;
    }

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Subject</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher._id}>
              <td>
                <Link className="teacher-link" to={`/teacher/${teacher._id}`}>
                  {teacher.name}
                </Link>
              </td>
              <td>{teacher.age}</td>
              <td>{teacher.gender}</td>
              <td>{teacher.subject}</td>
              <td>{teacher.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="teachers-container">
      <div className="header">
        <div className="title">Teachers</div>
        <div className="add-teacher">
          <Link to="/add-teacher">Add Teacher</Link>
        </div>
      </div>
      {renderTableContent()}
    </div>
  );
};
