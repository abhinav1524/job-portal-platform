import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Jobs from "./pages/seeker/Jobs";
import JobDetails from "./pages/seeker/JobDetails";
import MyApplications from "./pages/seeker/MyApplications";

import PostJob from "./pages/recruiter/PostJob";
import MyJobs from "./pages/recruiter/MyJobs";
import Applicants from "./pages/recruiter/Applicants";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
};

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Job Seeker Routes */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute role="seeker">
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute role="seeker">
              <JobDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute role="seeker">
              <MyApplications />
            </ProtectedRoute>
          }
        />

        {/* Recruiter Routes */}
        <Route
          path="/recruiter/post-job"
          element={
            <ProtectedRoute role="recruiter">
              <PostJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/my-jobs"
          element={
            <ProtectedRoute role="recruiter">
              <MyJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/applicants/:id"
          element={
            <ProtectedRoute role="recruiter">
              <Applicants />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
