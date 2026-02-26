import {Children, createContext,useContext,useEffect,useState} from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider =({children})=>{
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(null);

    const fetchUser = async(req,res)=>{
        try {
            const res = await api.get("/api/auth/me");
            setUser(res.data.user);
        } catch (error) {
            setUser(null);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchUser();
    },[])
    const login = async(req,res)=>{
        const res = await api.post("api/auth/login",data);
        setUser(res.data.user);
        return res.data;
    }
    const register = async(req,res)=>{
        const res = await api.post("api/auth/register",data);
        setUser(res.data.user);
        return res.data;
    }
    const logout = async(req,res)=>{
        try {
            await api.post("api/auth/logout");
        } catch (error) {
            setUser(null);
        }
    }
    return (
        <AuthContext.Provider value={{user,loading,login,register,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth =()=> useContext(AuthContext);