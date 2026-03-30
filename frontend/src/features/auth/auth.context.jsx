import { createContext, useState } from 'react';
import { useEffect } from "react";
import { getMe }  from "./services/auth.api";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);  

        useEffect(() => {
        const getAndsetUser = async () => {
            try {
                const data = await getMe();

                if (data && data.user) {
                    setUser(data.user);
                } else {
                    console.log("No user data received");
                }

            } catch (error) {
                console.error("Error fetching user:", error.message);
            } finally {
                setLoading(false);
            }
        };

        getAndsetUser();
    }, []);


    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}