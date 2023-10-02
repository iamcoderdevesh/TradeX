import React, { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentMode, setCurrentMode] = useState("light");

  const setMode = () => {
    if (currentMode === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const setTheme = (mode) => {
    const root = window.document.documentElement;
    root.classList.remove(mode === "light" ? "dark" : "light");
    root.classList.add(mode);
    setCurrentMode(mode);
    sessionStorage.setItem("themeMode", mode);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{ currentMode, setCurrentMode, setMode, setTheme }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);