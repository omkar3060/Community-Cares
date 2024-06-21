import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Check if authentication state exists in localStorage
  const initialIsAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const initialEmail = localStorage.getItem("email") || '';

  const [isAuthenticated, setIsAuthenticated] = useState(initialIsAuthenticated);
  const [email, setEmail] = useState(initialEmail);

  // Update localStorage when authentication state changes
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
    localStorage.setItem("email", email);
  }, [isAuthenticated, email]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, email, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
