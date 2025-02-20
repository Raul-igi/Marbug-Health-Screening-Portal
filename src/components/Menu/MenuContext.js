import React, { createContext, useState, useContext } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [focusedField, setFocusedField] = useState("Dashboard");

  return (
    <MenuContext.Provider value={{ focusedField, setFocusedField }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
