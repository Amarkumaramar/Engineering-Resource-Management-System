import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import TeamOverview from "./pages/manager/TeamOverview";
import CreateAssignment from "./pages/manager/CreateAssignment";
import ProjectManagement from "./pages/manager/ProjectManagement";
import MyAssignments from "./pages/engineer/MyAssignments";
import Profile from "./pages/engineer/Profile";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import SearchFilter from "./pages/manager/SearchFilter";
import SearchResults from "./pages/SearchResults";


export default function App() {
  const { user, token, loading } = useAuth();
  const isLoggedIn = !!token && !!user;

  if (loading) {
    return <div>Loading...</div>; // Prevent flicker before auth is restored
  }

  return (
    <div>
      {isLoggedIn && <Navbar />}

      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
        />

        {/* Manager Routes */}
        {isLoggedIn && user?.role === "manager" && (
          <>
            <Route path="/team-overview" element={<TeamOverview />} />
            <Route path="/create-assignment" element={<CreateAssignment />} />
            <Route path="/projects" element={<ProjectManagement />} />
            <Route path="/search" element={<SearchFilter />} />
            <Route path="/search-results" element={<SearchResults />} />
          </>
        )}

        {/* Engineer Routes */}
        {isLoggedIn && user?.role === "engineer" && (
          <>
            <Route path="/my-assignments" element={<MyAssignments />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}

        {/* Default redirect based on role */}
        <Route
          path="*"
          element={
            isLoggedIn
              ? user.role === "manager"
                ? <Navigate to="/team-overview" replace />
                : <Navigate to="/my-assignments" replace />
              : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </div>
  );
}