import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username, password) => {
    return new Promise((resolve, reject) => {
      if (username === 'admin' && password === 'password') {
        setIsAuthenticated(true);
        resolve();
      } else {
        reject();
      }
    });
  };

  const register = (username, password) => {
    return new Promise((resolve, reject) => {
      if (username && password) {
        setIsAuthenticated(true);
        resolve();
      } else {
        reject();
      }
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
