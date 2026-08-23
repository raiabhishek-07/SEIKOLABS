"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute={["class", "data-theme"]}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}

export function useTheme() {
  const { theme, setTheme, systemTheme, resolvedTheme } = useNextTheme();

  const toggleTheme = () => {
    const active = resolvedTheme || theme;
    setTheme(active === "dark" ? "light" : "dark");
  };

  return {
    theme,
    setTheme,
    systemTheme,
    resolvedTheme,
    toggleTheme,
    isDark: (resolvedTheme || theme) === "dark"
  };
}
