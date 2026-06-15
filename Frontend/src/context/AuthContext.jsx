import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        EmailAddress: email,
        Password: password
      });
      const userData = response.data;

      const mappedUser = {
        ...userData,
        name: userData.UserName,
        email: userData.EmailAddress,
        id: userData._id
      };
      setUser(mappedUser);
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, message: error.response?.data || "Login failed" };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', {
        UserName: name,
        EmailAddress: email,
        Password: password,
        MobileNo: "0000000000" // Default for now
      });
      const userData = response.data;
      const mappedUser = {
        ...userData,
        name: userData.UserName,
        email: userData.EmailAddress,
        id: userData._id
      };
      setUser(mappedUser);
      return { success: true };
    } catch (error) {
      console.error("Signup failed:", error);
      return { success: false, message: error.response?.data || "Signup failed" };
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
