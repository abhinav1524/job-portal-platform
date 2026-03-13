import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import { Toaster } from "react-hot-toast";
import EditJob from "./pages/recruiter/EditJob";
import Profile from "./pages/seeker/profile/Profile";
import EditProfile from "./pages/seeker/profile/EditProfile";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
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
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f2937",
            color: "#fff",
          },
        }}
      />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

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
        <Route
          path="/profile"
          element={
            <ProtectedRoute role="seeker">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute role="seeker">
              <EditProfile />
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
          path="/recruiter/edit-job/:jobId"
          element={
            <ProtectedRoute role="recruiter">
              <EditJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/applicants/:jobId"
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
