import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSortBy } from "../../utils/studentSlice";
import "../Class/class.css";

export const Class = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const sortBy = useSelector((state) => state.students.sortBy);
  const filter = useSelector((state) => state.students.filter);

  const studentsFiltered = students
    .filter(
      (student) =>
        filter.toLowerCase() === "all" ||
        (student.gender &&
          student.gender.toLowerCase() === filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "marks") {
        return b.marks - a.marks;
      } else if (sortBy === "attendance") {
        return b.attendance - a.attendance;
      } else {
        return 0;
      }
    });

  const handleFilter = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleSort = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  return (
    <div className="class-container">
      <div className="header">
        <div className="title">Class</div>
        <div className="filters">
          <select
            name="gender"
            id="filter"
            onChange={handleFilter}
            value={filter}
          >
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <select name="sort" id="sort" value={sortBy} onChange={handleSort}>
            <option value="name">Name</option>
            <option value="marks">Marks</option>
            <option value="attendance">Attendance</option>
          </select>
        </div>
      </div>
      <div className="class-display">
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
            {studentsFiltered.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
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
      </div>
    </div>
  );
};
