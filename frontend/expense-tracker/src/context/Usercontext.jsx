import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const clearUser = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  const logout = () =>{
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;