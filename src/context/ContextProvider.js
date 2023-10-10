import React, { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentMode, setCurrentMode] = useState("light");
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState();

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

  useEffect(() => {
    if (sessionStorage.getItem("themeMode") !== undefined) {
      sessionStorage.getItem("themeMode") === "dark"
        ? setTheme("dark")
        : setTheme("light");
    }
  }, [currentMode]);

  return (

    <StateContext.Provider
      value={{ currentMode, setCurrentMode, setMode, activeMenu, setActiveMenu, screenSize, setScreenSize }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
