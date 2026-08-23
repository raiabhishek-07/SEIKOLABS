"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { toggleTheme, resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Resolves automatically to the user's system OS theme by default (light or dark)
  const activeTheme = mounted ? (resolvedTheme || theme) : "light";
  const isDark = activeTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
      title={isDark ? "Current: Dark Mode (Click to switch to Light)" : "Current: Light Mode (Click to switch to Dark)"}
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-1)] text-[var(--text-primary)] transition-all duration-300 cursor-pointer shadow-md hover:scale-105 active:scale-95 select-none shrink-0 group"
    >
      {isDark ? (
        <>
          {/* Dark Mode Active State */}
          <span className="w-5 h-5 rounded-full flex items-center justify-center bg-indigo-500/20 text-indigo-400 transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </span>
          <span className="text-xs font-bold font-['DM_Sans'] tracking-tight text-[var(--text-primary)] transition-colors duration-400">
            Dark Mode
          </span>
        </>
      ) : (
        <>
          {/* Light Mode Active State */}
          <span className="w-5 h-5 rounded-full flex items-center justify-center bg-amber-500/20 text-amber-600 transition-transform duration-500 group-hover:-rotate-45 group-hover:scale-110">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M22 12h-2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="text-xs font-bold font-['DM_Sans'] tracking-tight text-[var(--text-primary)] transition-colors duration-400">
            Light Mode
          </span>
        </>
      )}
    </button>
  );
}
