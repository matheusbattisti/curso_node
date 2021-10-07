import React, { createContext } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext();

function UserProvider({ children }) {
  const { authenticated, loading, register, handleLogin, logout } = useAuth();

  return (
    <Context.Provider
      value={{ loading, authenticated, register, handleLogin, logout }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };
