import React from "react";
export const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

export const ColorContext = React.createContext({
  color: themes.light,
  changeBgColor: () => {},
});

export const ColorProvider = ColorContext.Provider;
export const ColorConsumer = ColorContext.Consumer;
