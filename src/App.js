import "./App.css";
import { Routes, Route } from "react-router";
import { Navbar } from "./components/Navbar/navbar";
import { Students } from "./pages/Students/students";
import { Teachers } from "./pages/Teachers/teachers";
import { Class } from "./pages/Class/class";
import { School } from "./pages/School/school";
import { StudentDetail } from "./pages/StudentDetail/studentDetail";
import { TeacherDetail } from "./pages/TeacherDetail/teacherDetail";
import { AddStudent } from "./components/AddStudentForm/addStudentForm";
import { AddTeacher } from "./components/AddTeacherForm/addTeacherForm";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/class" element={<Class />} />
        <Route path="/school" element={<School />} />

        <Route path="student/:id" element={<StudentDetail />} />
        <Route path="teacher/:id" element={<TeacherDetail />} />

        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/add-teacher" element={<AddTeacher />} />

        <Route path="student/edit/:id" element={<AddStudent />} />
        <Route path="teacher/edit/:id" element={<AddTeacher />} />
      </Routes>
    </div>
  );
}

export default App;
