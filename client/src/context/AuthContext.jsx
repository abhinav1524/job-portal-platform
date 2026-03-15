import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
      const token = localStorage.getItem("token");
  if (!token) {
    setLoading(false);
    return; // ← skip /me call if no token
  }
    try {
      const res = await api.get("/api/auth/me");
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (data) => {
    const res = await api.post("/api/auth/login", data);
      if (res.data.token) {
    localStorage.setItem("token", res.data.token); // ← save token
  }
    setUser(res.data.user);
    return res.data;
  };

  const register = async (data) => {
    const res = await api.post("/api/auth/register", data);
    setUser(res.data.user);
    return res.data;
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (err) {}
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
