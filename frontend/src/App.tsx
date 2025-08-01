import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import TeamOverview from "./pages/manager/TeamOverview";
import CreateAssignment from "./pages/manager/CreateAssignment";
import ProjectManagement from "./pages/manager/ProjectManagement";
import MyAssignments from "./pages/engineer/MyAssignments";
import Profile from "./pages/engineer/Profile";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";

export default function App() {
  const { user } = useAuth();

  return (
    <div>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        {user?.role === "manager" && (
          <>
            <Route path="/team-overview" element={<TeamOverview />} />
            <Route path="/create-assignment" element={<CreateAssignment />} />
            <Route path="/projects" element={<ProjectManagement />} />
          </>
        )}
        {user?.role === "engineer" && (
          <>
            <Route path="/my-assignments" element={<MyAssignments />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}
