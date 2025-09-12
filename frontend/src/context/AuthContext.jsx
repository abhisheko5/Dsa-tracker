import { createContext, useContext, useState } from "react";

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // tracks login state

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context easily
export const useAuth = () => useContext(AuthContext);
