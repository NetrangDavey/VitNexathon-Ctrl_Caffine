import React, { createContext, useContext } from 'react';

const ThemeContext = createContext({
  colors: {
    primary: '#4C49ED',
    secondary: '#5D5FEF',
    background: '#f5f5f5',
    text: '#333333',
    white: '#FFFFFF'
  }
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider
      value={{
        colors: {
          primary: '#4C49ED',
          secondary: '#5D5FEF',
          background: '#f5f5f5',
          text: '#333333',
          white: '#FFFFFF'
        }
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};