import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  // Check user when refresh page
  useEffect(() => {
    const existingUser = authService.getCurrentUser();

    if (existingUser) {
      setUser(existingUser);
    }

    setLoading(false);
  }, []);

  // Login function
  async function login(email, password) {
    const userData = await authService.login(email, password);
    setUser(userData);
    return userData;
  }

  const register = async (name, email, password, role) => {
    const user = await authService.register(name, email, password, role);

    setUser(user);

    return user;
  };

  // Logout function
  function logout() {
    authService.logout();
    setUser(null);
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
