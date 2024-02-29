import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../utils/studentSlice";
import "../Students/students.css";

export const Students = () => {
  const dispatch = useDispatch();
  const { students, status, error } = useSelector((state) => state.students);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);

  const renderStudentsTable = () => {
    if (status === "loading") {
      return <p>Data Loading....</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    if (students.length === 0) {
      return <p>No students available.</p>;
    }

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Class</th>
            <th>Marks</th>
            <th>Attendance</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>
                <Link className="student-link" to={`/student/${student._id}`}>
                  {student.name}
                </Link>
              </td>
              <td>{student.age}</td>
              <td>{student.gender}</td>
              <td>{student.className}</td>
              <td>{student.marks}</td>
              <td>{student.attendance}</td>
              <td>{student.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="students-container">
      <div className="header">
        <div className="title">Students</div>
        <div className="add-student">
          <Link to="/add-student">Add Student</Link>
        </div>
      </div>
      {renderStudentsTable()}
    </div>
  );
};
