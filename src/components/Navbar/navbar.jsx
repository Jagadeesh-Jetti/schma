import "../Navbar/navbar.css";
import { useNavigate } from "react-router";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar_page">
      <h2 className="title">School Management</h2>

      <div className="options_container">
        <h3 onClick={() => navigate("/")}> Student </h3>
        <h3 onClick={() => navigate("/teachers")}> Teacher </h3>
        <h3 onClick={() => navigate("/class")}> Class </h3>
        <h3 onClick={() => navigate("/school")}> School </h3>
      </div>
    </div>
  );
};
