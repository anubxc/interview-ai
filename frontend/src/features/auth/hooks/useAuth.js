import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext)

    const { user, setUser, loading, setLoading } = context;


    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password })
            if (data && data.user) {
                setUser(data.user);
                return true;
            }
            return false;
        } catch (err) {
            console.error("Login failed:", err);
            return false;
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password })
            if (data && data.user) {
                setUser(data.user);
                return true;
            }
            return false;
        } catch (err) {
            console.error("Registration failed:", err);
            return false;
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {

            const data = await logout();
            setUser(null);
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            setLoading(false);
        }
    }





    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout
    }

}