/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  glow: string;
  gradient: string;
}

const themes: Record<string, Theme> = {
  quantum: {
    name: "Quantum Cyber",
    primary: "#00ffff",
    secondary: "#ff00ff",
    accent: "#ffff00",
    background: "#000000",
    surface: "rgba(255, 255, 255, 0.05)",
    glow: "rgba(0, 255, 255, 0.5)",
    gradient: "linear-gradient(135deg, #00ffff 0%, #ff00ff 50%, #ffff00 100%)",
  },
  nebula: {
    name: "Cosmic Nebula",
    primary: "#ff6b9d",
    secondary: "#c06c84",
    accent: "#f67280",
    background: "#0a0e27",
    surface: "rgba(255, 107, 157, 0.1)",
    glow: "rgba(255, 107, 157, 0.6)",
    gradient: "linear-gradient(135deg, #ff6b9d 0%, #c06c84 50%, #f67280 100%)",
  },
  aurora: {
    name: "Arctic Aurora",
    primary: "#00f5ff",
    secondary: "#7b2cbf",
    accent: "#5a189a",
    background: "#0d1b2a",
    surface: "rgba(0, 245, 255, 0.08)",
    glow: "rgba(0, 245, 255, 0.5)",
    gradient: "linear-gradient(135deg, #00f5ff 0%, #7b2cbf 50%, #5a189a 100%)",
  },
  matrix: {
    name: "Matrix Code",
    primary: "#00ff41",
    secondary: "#008f11",
    accent: "#00d9ff",
    background: "#000000",
    surface: "rgba(0, 255, 65, 0.05)",
    glow: "rgba(0, 255, 65, 0.6)",
    gradient: "linear-gradient(135deg, #00ff41 0%, #008f11 50%, #00d9ff 100%)",
  },
  sunset: {
    name: "Digital Sunset",
    primary: "#ff6b35",
    secondary: "#f7931e",
    accent: "#fdc500",
    background: "#1a1423",
    surface: "rgba(255, 107, 53, 0.1)",
    glow: "rgba(255, 107, 53, 0.5)",
    gradient: "linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #fdc500 100%)",
  },
  ocean: {
    name: "Deep Ocean",
    primary: "#00b4d8",
    secondary: "#0077b6",
    accent: "#90e0ef",
    background: "#03045e",
    surface: "rgba(0, 180, 216, 0.1)",
    glow: "rgba(0, 180, 216, 0.5)",
    gradient: "linear-gradient(135deg, #00b4d8 0%, #0077b6 50%, #90e0ef 100%)",
  },
  fire: {
    name: "Plasma Fire",
    primary: "#ff006e",
    secondary: "#fb5607",
    accent: "#ffbe0b",
    background: "#1a0000",
    surface: "rgba(255, 0, 110, 0.1)",
    glow: "rgba(255, 0, 110, 0.6)",
    gradient: "linear-gradient(135deg, #ff006e 0%, #fb5607 50%, #ffbe0b 100%)",
  },
  galaxy: {
    name: "Galaxy Portal",
    primary: "#b388ff",
    secondary: "#8e24aa",
    accent: "#ea80fc",
    background: "#0a0014",
    surface: "rgba(179, 136, 255, 0.1)",
    glow: "rgba(179, 136, 255, 0.5)",
    gradient: "linear-gradient(135deg, #b388ff 0%, #8e24aa 50%, #ea80fc 100%)",
  },
};

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeName: string) => void;
  randomizeTheme: () => void;
  themeNames: string[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentThemeName, setCurrentThemeName] = useState("quantum");

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    root.style.setProperty("--quantum-primary", theme.primary);
    root.style.setProperty("--quantum-secondary", theme.secondary);
    root.style.setProperty("--quantum-accent", theme.accent);
    root.style.setProperty("--quantum-bg", theme.background);
    root.style.setProperty("--quantum-surface", theme.surface);
    root.style.setProperty("--quantum-glow", theme.glow);
    root.style.setProperty("--quantum-gradient", theme.gradient);
  };

  useEffect(() => {
    applyTheme(themes[currentThemeName]);
  }, [currentThemeName]);

  // Auto-randomize theme every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      randomizeTheme();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const setTheme = (themeName: string) => {
    if (themes[themeName]) {
      setCurrentThemeName(themeName);
    }
  };

  const randomizeTheme = () => {
    const themeKeys = Object.keys(themes);
    const randomTheme = themeKeys[Math.floor(Math.random() * themeKeys.length)];
    setCurrentThemeName(randomTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: themes[currentThemeName],
        setTheme,
        randomizeTheme,
        themeNames: Object.keys(themes),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
