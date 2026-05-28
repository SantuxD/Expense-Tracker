import React, { createContext, useState } from "react";

export const Usercontext = createContext();

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
    <Usercontext.Provider value={{ user, updateUser, clearUser, logout }}>
      {children}
    </Usercontext.Provider>
  );
};

export default UserProvider;