import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 px-6 py-4">

      <div className="flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-gray-800 dark:text-white"
        >
          JobPortal
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-5 items-center text-gray-700 dark:text-gray-200">

          <button
            onClick={toggleTheme}
            className="px-3 py-1 border rounded dark:border-gray-600"
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
              <Link to="/profile">Profile</Link>
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
              className="px-3 py-1 border rounded dark:border-gray-600"
            >
              Logout
            </button>
          )}

        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-xl dark:text-white"
        >
          ☰
        </button>

      </div>


      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col gap-4 mt-4 md:hidden text-gray-700 dark:text-gray-200">

          <button
            onClick={toggleTheme}
            className="px-3 py-1 border rounded w-fit dark:border-gray-600"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {!user && (
            <>
              <Link to="/login" onClick={()=>setMenuOpen(false)}>Login</Link>
              <Link to="/register" onClick={()=>setMenuOpen(false)}>Register</Link>
            </>
          )}

          {user?.role === "seeker" && (
            <>
              <Link to="/jobs" onClick={()=>setMenuOpen(false)}>Jobs</Link>
              <Link to="/applications" onClick={()=>setMenuOpen(false)}>My Applications</Link>
              <Link to="/profile" onClick={()=>setMenuOpen(false)}>Profile</Link>
            </>
          )}

          {user?.role === "recruiter" && (
            <>
              <Link to="/recruiter/post-job" onClick={()=>setMenuOpen(false)}>Post Job</Link>
              <Link to="/recruiter/my-jobs" onClick={()=>setMenuOpen(false)}>My Jobs</Link>
            </>
          )}

          {user && (
            <button
              onClick={()=>{
                logout();
                setMenuOpen(false);
              }}
              className="px-3 py-1 border rounded w-fit dark:border-gray-600"
            >
              Logout
            </button>
          )}

        </div>
      )}

    </nav>
  );
};

export default Navbar;