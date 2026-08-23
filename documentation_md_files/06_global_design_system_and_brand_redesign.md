# 06. SEIKO LABS Global Design System, `next-themes` Integration & Layered Elevation System

## Overview
The SEIKO LABS theme system has been upgraded to use **`next-themes`** with a clean `<html class="dark">` / `data-theme` architecture and a **Layered Surface Elevation System** for dark and light modes.

Adheres strictly to the principles:
- **Clean Theme Architecture**: The Theme Toggle calls `setTheme("light")`, `setTheme("dark")`, or `setTheme("system")`. The `<html class="dark">` class and `data-theme` attributes change automatically, and CSS variables propagate throughout every component without manual component-level state handling.
- **System Theme Default**: Defaults to `system` OS preference with seamless switching between Light, Dark, and System modes.
- **Layered Elevation (No Naive Inversion)**: Dark mode is constructed using dark laboratory workbench surface layers (Level 0 canvas → Level 0.5 sub-section → Level 1 card surface → Level 2 component surface → Level 3 active element) rather than raw color inversions.

---

## Architecture & Integration

### `src/context/ThemeContext.tsx`
```tsx
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
```

---

## 1. Layered Elevation Surface System (`src/styles/theme.css`)

### ☀️ Light Theme (Warm Tactile Hardware Canvas)
- **Base Canvas (`--bg-page`)**: `#FFEED6` (Warm Cream)
- **Sub-Section Surface (`--bg-page-alt`)**: `#FFF6EA` (Soft Natural Canvas)
- **Level 1 Surface (`--bg-surface-1`)**: `#FFFFFF` (Pure White Card Container)
- **Level 2 Surface (`--bg-surface-2`)**: `#FFF8EE` (Nested Badge & Icon Surface)
- **Level 3 Surface (`--bg-surface-3`)**: `#F5E0C0` (Active Element Highlight)
- **Primary Text (`--text-primary`)**: `#2C241B` (High-Contrast Espresso)
- **Secondary Text (`--text-secondary`)**: `#73623D` (Earthy Bronze)
- **Primary Accent (`--accent-primary`)**: `#8A965E` (Sage Green)
- **Secondary Accent (`--accent-secondary`)**: `#E8A07C` (Warm Coral)

### 🌙 Dark Theme (Layered Laboratory Workbench)
- **Base Canvas (`--bg-page`)**: `#1C1B20` (Deep Laboratory Canvas)
- **Sub-Section Surface (`--bg-page-alt`)**: `#24232B` (Level 0.5 Sub-Section Surface)
- **Level 1 Surface (`--bg-surface-1`)**: `#2D2C36` (Elevated Card Surface)
- **Level 2 Surface (`--bg-surface-2`)**: `#363541` (Nested Component & Badge Surface)
- **Level 3 Surface (`--bg-surface-3`)**: `#42414E` (Active Element Highlight)
- **Primary Text (`--text-primary`)**: `#F0F4F3` (High-Contrast Soft Silver White)
- **Secondary Text (`--text-secondary`)**: `#A6B0AF` (Muted Silver)
- **Primary Accent (`--accent-primary`)**: `#C2CA9F` (Glowing Soft Sage)
- **Secondary Accent (`--accent-secondary`)**: `#F0A886` (Glowing Warm Coral)

---

## 2. Theme Toggle Modes

Defined in `src/components/ThemeToggle.tsx`:
- **☀️ Light**: Force Light Mode (`setTheme("light")`)
- **🌙 Dark**: Force Dark Mode (`setTheme("dark")`)
- **💻 System**: Follow System OS Preference (`setTheme("system")`)
- **Cycling Action**: Clicking the toggle pill seamlessly cycles through `Light` → `Dark` → `System`.

---

## 3. Verification

- Executed `npm run build`: Compiled static & dynamic routes successfully in Next.js 16 (Turbopack) with zero TypeScript or build errors.
