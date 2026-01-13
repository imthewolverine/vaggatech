"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type ThemeId = "light" | "dark" | "ocean" | "emerald" | "plum" | "sunset";

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("light");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("app-theme") as ThemeId | null) : null;
    if (stored) setThemeState(stored);
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("app-theme", theme);
      }
    } catch {}
  }, [theme]);

  const setTheme = (t: ThemeId) => setThemeState(t);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
