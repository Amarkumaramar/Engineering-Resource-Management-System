import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SearchFilter from "../pages/manager/SearchFilter";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 p-4 text-white flex flex-wrap items-center justify-between">
      {/* 🔹 Left: Logo */}
      <div
        onClick={() => navigate("/")}
        className="font-bold text-lg cursor-pointer hover:text-gray-200"
      >
        Resource Manager
      </div>

      {/* 🔹 Middle: Search Filter */}
      {user?.role === "manager" && (
        <div className="w-full md:w-auto flex justify-center mt-2 md:mt-0">
          <SearchFilter />
        </div>
      )}

      {/* 🔹 Right: Navigation Buttons */}
      <div className="flex flex-wrap items-center space-x-2 mt-2 md:mt-0">
        {user?.role === "manager" && (
          <>
            <button
              onClick={() => navigate("/team-overview")}
              className="nav-btn w-full md:w-auto"
            >
              Team Overview
            </button>
            <button
              onClick={() => navigate("/create-assignment")}
              className="nav-btn w-full md:w-auto"
            >
              Create Assignment
            </button>
            <button
              onClick={() => navigate("/projects")}
              className="nav-btn w-full md:w-auto"
            >
              Projects
            </button>
          </>
        )}

        {user?.role === "engineer" && (
          <>
            <button
              onClick={() => navigate("/my-assignments")}
              className="nav-btn w-full md:w-auto"
            >
              My Assignments
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="nav-btn w-full md:w-auto"
            >
              Profile
            </button>
          </>
        )}

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md font-medium w-full md:w-auto"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
