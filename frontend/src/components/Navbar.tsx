import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <div
        onClick={() => navigate("/")}
        className="font-bold text-lg cursor-pointer hover:text-gray-200"
      >
        Resource Manager
      </div>
      <div className="space-x-3">
        {user?.role === "manager" && (
          <>
            <button
              onClick={() => navigate("/team-overview")}
              className="nav-btn"
            >
              Team Overview
            </button>
            <button
              onClick={() => navigate("/create-assignment")}
              className="nav-btn"
            >
              Create Assignment
            </button>
            <button
              onClick={() => navigate("/projects")}
              className="nav-btn"
            >
              Projects
            </button>
          </>
        )}
        {user?.role === "engineer" && (
          <>
            <button
              onClick={() => navigate("/my-assignments")}
              className="nav-btn"
            >
              My Assignments
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="nav-btn"
            >
              Profile
            </button>
          </>
        )}
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
