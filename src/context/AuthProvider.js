import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(() => {
    const storedUser = localStorage.getItem("Users");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("Users");
      setAuthUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateAuthUser = (userData) => {
    if (userData) {
      localStorage.setItem("Users", JSON.stringify(userData));
    } else {
      localStorage.removeItem("Users");
    }
    setAuthUser(userData);
  };

  return (
    <AuthContext.Provider value={[authUser, updateAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
