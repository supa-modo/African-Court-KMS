import React, { createContext, useState, useContext, useEffect } from "react";
import { login as apiLogin } from "../services/auth";
import { setToken, removeToken, getToken } from "../utils/storage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const token = getToken();
    if (token) {
      // Verify token with backend
      // This would typically involve a token validation endpoint
      // For now, we'll just set a placeholder
      setUser({ token });
    }
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await apiLogin(username, password);

      if (response.success) {
        setToken(response.token);
        setUser({
          username: response.username,
          department: response.department,
          token: response.token,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
