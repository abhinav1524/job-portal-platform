import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
const Navbar = () => {
  const { user, logout } = useAuth();
  const {theme,toggleTheme}=useTheme();

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b ark:from-gray-900 dark:to-gray-800">
      <Link to="/" className="font-bold text-xl">
        JobPortal
      </Link>

      <div className="flex gap-4 items-center">
        <button
            onClick={toggleTheme}
            className="px-3 py-1 border rounded dark:border-gray-600 cursor-pointer"
            >
            {theme === "light" ? "🌙" : "☀️"}
            </button>

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user?.role === "seeker" && (
          <>
            <Link to="/jobs">Jobs</Link>
            <Link to="/applications">My Applications</Link>
          </>
        )}

        {user?.role === "recruiter" && (
          <>
            <Link to="/recruiter/post-job">Post Job</Link>
            <Link to="/recruiter/my-jobs">My Jobs</Link>
          </>
        )}

        {user && (
          <button
            onClick={logout}
            className="px-3 py-1 border rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
