import React, { useState, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem("token"));

  useEffect(() => {
    if(accessToken != null){
      const interval = setInterval(refreshAccessToken, 14 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [accessToken]);

  const login = (token: string) => {
    setAccessToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem("token");
  };

  const refreshAccessToken = async () => {
    try {
      const res = await fetch("http://localhost:3002/auth/refresh-token", {
        method: 'POST',
        credentials: 'include',
        headers: {'authorization' : `Bearer ${accessToken}`}      
      });
      const data = await res.json();

      if (!res.ok) {
        logout();
      } 
      else {
        setAccessToken(data.token);
        localStorage.setItem("token", data.token);
      }
    } catch (err) {
      console.error("Token refresh failed:", err);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
