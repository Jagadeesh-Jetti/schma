import "./App.css";
import { Routes, Route } from "react-router";
import { Navbar } from "./components/Navbar/navbar";
import { Students } from "./pages/Students/students";
import { Teachers } from "./pages/Teachers/teachers";
import { Class } from "./pages/Class/class";
import { School } from "./pages/School/school";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/class" element={<Class />} />
        <Route path="/school" element={<School />} />
      </Routes>
    </div>
  );
}

export default App;
