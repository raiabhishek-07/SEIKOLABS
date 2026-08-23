# Update 04 — Global Design System, Dual Theme Support & Typography System

**Version**: 4.0.0  
**Date**: August 15, 2026  
**Type**: Major Design System Architecture & Theme Infrastructure  

---

## 📌 Summary of Changes

Established a comprehensive **global design system** based on the **Claude Design Skills** (modern-web-design SKILL.md) and **Frontend Design SKILL.md** principles. Introduced a centralized token-based CSS architecture, **dark + light theme switching** with localStorage persistence, a professional **3-face typography system** (Space Grotesk, Inter, JetBrains Mono), motion tokens, 4-level glassmorphism depth scale, reusable component classes, and accessibility-first patterns across the entire website.

---

## ➕ What Was Added

### 1. Design System Foundation Files (`src/styles/`)

- **`design-tokens.css`**: Single source of truth for all CSS custom properties:
  - **Color Primitives**: 18 named color values (Midnight, Slate Lab, Copper Trace, Circuit Cyan, Signal Green, Datasheet White, Indigo, Rose, Purple) with glow variants.
  - **Semantic Color Tokens**: `--bg-page`, `--bg-surface-*`, `--text-primary/secondary/tertiary`, `--accent-primary/secondary`, `--border-*` — all overridden per theme.
  - **Fluid Typography Scale**: 8-level scale using `clamp()` (from `--text-xs` at 12px to `--text-hero` at 48–80px).
  - **Font Family Tokens**: `--font-display` (Space Grotesk), `--font-body` (Inter), `--font-mono` (JetBrains Mono).
  - **Spacing Scale**: 8-level fluid spacing (`--space-2xs` to `--space-3xl`) plus `--section-gap`.
  - **Border Radius Scale**: 6 levels (`--radius-sm` to `--radius-full`).
  - **Shadow/Elevation Scale**: 4 levels + colored glow variants.
  - **Motion Tokens**: 5 duration levels (`--duration-instant` to `--duration-dramatic`) + 4 easing curves.
  - **Z-Index Scale**: 8 named layers (`--z-base` to `--z-tooltip`).

- **`theme.css`**: Dark and light theme definitions:
  - Dark theme (default): Deep midnight backgrounds, frosted glass surfaces, cyan/copper accents.
  - Light theme: Lab-white backgrounds, frosted-white glass surfaces, deeper accent colors for WCAG AAA contrast.
  - `prefers-color-scheme` auto-detection for first visit before JavaScript loads.

- **`typography.css`**: Professional type system:
  - Google Fonts loaded via `<link>` in layout.tsx head.
  - Heading hierarchy (h1–h6) mapped to Display face (Space Grotesk).
  - Body text uses Inter for maximum legibility.
  - Utility classes: `.text-display`, `.text-body`, `.text-label`, `.text-caption`, `.text-overline`.
  - Gradient text utilities: `.text-gradient-copper`, `.text-gradient-cyan`, `.text-gradient-emerald`, `.text-gradient-purple`, `.text-gradient-hero`.
  - Light theme gradient adjustments for visibility.

- **`animations.css`**: Complete motion system:
  - 14 keyframe definitions (float, pulse, shimmer, fade-in variants, scale-in, slide-in, spin, trace-path, oscilloscope).
  - Animation utility classes mapped to design tokens.
  - Scroll reveal base states (`.reveal-hidden`, `.reveal-visible`).
  - 6 stagger delay helpers.
  - Interactive state transitions (`.hover-lift`, `.press-scale`).
  - `prefers-reduced-motion: reduce` override disabling all animations.

- **`components.css`**: Reusable component patterns:
  - **Glass Cards**: 4-level elevation system (`glass-surface-1` through `glass-surface-4`).
  - **Buttons**: `.btn-primary`, `.btn-copper`, `.btn-secondary`, `.btn-ghost` with size variants.
  - **Badges & Chips**: 5 color variants (cyan, copper, green, rose, purple).
  - **Status LED Indicators**: Animated dot indicators.
  - **Section Dividers**: PCB-trace styled decorative dividers.
  - **Skeleton Loaders**: Shimmer animation placeholders.
  - **Scrollbar Styling**: Theme-aware custom scrollbars (WebKit + Firefox).
  - **Focus States**: `:focus-visible` accessibility ring.

### 2. Theme Switching Infrastructure

- **`ThemeContext.tsx`**: React context provider with:
  - `localStorage` persistence (`robonex-theme` key).
  - System `prefers-color-scheme` detection on first visit.
  - `data-theme` attribute management on `<html>` element.
  - `toggleTheme()` and `setTheme()` API.

- **`ThemeToggle.tsx`**: Animated Sun/Moon toggle button:
  - Framer Motion rotation + scale spring animations.
  - Copper-colored Sun icon and Indigo-colored Moon icon.
  - 40px minimum touch target for mobile accessibility.

### 3. Layout & Navbar Updates

- **`layout.tsx`**: Added Google Fonts preconnect links, `ThemeProvider` wrapper, `data-theme="dark"` default, `suppressHydrationWarning` for theme flash prevention, semantic CSS variable tokens for body styling.
- **`Navbar.tsx`**: Added `ThemeToggle` button in action controls, migrated header from hardcoded `bg-[#060911]` to `glass-surface-2` design system class.

---

## ➖ What Was Removed / Refactored

- **Removed inline CSS tokens from globals.css**: All hardcoded hex values (`#060911`, `#f1f5f9`, `#06b6d4`, etc.) moved to `design-tokens.css`.
- **Removed duplicate utility classes**: `.glass-panel`, `.glow-*`, `.bg-tech-grid`, `.bg-tech-dots`, `.text-gradient-*`, keyframe definitions, and scrollbar styles all centralized in the design system files.
- **Removed `@import url()` from CSS**: Google Fonts moved to `<link>` tags in layout.tsx `<head>` to comply with CSS `@import` ordering rules.
- **Removed `color-scheme: dark` from base layer**: Now managed dynamically per theme via `theme.css`.

---

## ⚡ What Happens as a Result

- **Theme Switching**: Users can toggle between dark and light themes via the Sun/Moon button in the navbar. Preference persists across sessions.
- **Design Consistency**: All components consume tokens from a single source (`design-tokens.css`), ensuring visual consistency across all 10 route pages.
- **Professional Typography**: Space Grotesk display headlines give the site a distinctive "technical diagram" personality. Inter body text ensures maximum readability. JetBrains Mono code blocks reference the engineering world.
- **Accessibility**: Focus rings, touch targets, contrast ratios, and reduced-motion overrides built into the foundation.
- **Maintainability**: Changing any color, spacing, or motion value in `design-tokens.css` propagates automatically across the entire application.

---

## 🧠 Technical Logic & Rationale

- **CSS Custom Properties over Tailwind Theme Config**: Using native CSS variables allows runtime theme switching (`data-theme` attribute swap) without rebuilding CSS. Tailwind v4 compiles at build time and cannot swap values dynamically.
- **Semantic Token Layer**: Primitives (`--color-copper`) are mapped to semantics (`--accent-primary`) which are overridden per theme in `theme.css`. Components reference only semantics, never primitives — enabling theme portability.
- **`suppressHydrationWarning`**: Prevents React hydration mismatch when the server renders `data-theme="dark"` but the client detects a stored `"light"` preference and swaps immediately.
- **Font Loading via `<link>` vs `@import url()`**: CSS `@import url()` inside a stylesheet after other rules violates CSS spec ordering. Moving to `<link>` in `<head>` ensures fonts load in parallel with CSS parsing.
- **4-Level Elevation System**: Following Material Design's elevation philosophy but adapted for glassmorphism: each level increases blur, border opacity, and shadow depth, creating consistent visual hierarchy.
