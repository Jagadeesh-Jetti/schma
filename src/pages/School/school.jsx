import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTopStudent, updateState } from "../../utils/schoolSlice";
import "../School/school.css";

export const School = () => {
  const school = useSelector((state) => state.school);
  const students = useSelector((state) => state.students.students);
  const dispatch = useDispatch();

  useEffect(() => {
    if (students && students.length > 0) {
      const totalStudents = students.length;

      const totalAttendance = students.reduce(
        (acc, cur) => parseFloat(cur.attendance || 0) + acc,
        0
      );

      const totalMarks = students.reduce(
        (acc, cur) => parseFloat(cur.marks || 0) + acc,
        0
      );

      const averageMarks = totalStudents > 0 ? totalMarks / totalStudents : 0;

      const averageAttendance =
        totalStudents > 0 ? totalAttendance / totalStudents : 0;

      const topStudent = students.reduce((acc, cur) => {
        return parseFloat(cur.marks || 0) > parseFloat(acc.marks || 0)
          ? cur
          : acc;
      }, {});

      dispatch(
        updateState({
          topStudent,
          totalStudents,
          averageMarks,
          totalAttendance,
          averageAttendance,
        })
      );

      dispatch(setTopStudent(topStudent));
    }
  }, [students, dispatch]);

  return (
    <div className="school">
      <div className="header">
        <div className="title">School</div>
      </div>
      <div className="school-display">
        <p>
          <strong>Total Students:</strong> {school.totalStudents || 0}
        </p>
        <p>
          <strong>Average Attendance:</strong> {school.averageAttendance || 0}
        </p>

        <p>
          <strong>Average Marks:</strong> {school.averageMarks || 0}
        </p>
        <p>
          <strong>Top Student:</strong>{" "}
          {school.topStudent ? school.topStudent.name : "-"}
        </p>
      </div>
    </div>
  );
};
