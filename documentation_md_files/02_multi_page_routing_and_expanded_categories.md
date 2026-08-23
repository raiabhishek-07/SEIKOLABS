# Update 02 — Multi-Page App Router Architecture & Expanded STEM Kit Categories

**Version**: 2.0.0  
**Date**: August 15, 2026  
**Type**: Major Architecture & Feature Refactoring  

---

## 📌 Summary of Changes

Converted the application from a single-page landing site into a structured **multi-page Next.js App Router architecture** with 10 dedicated route paths, 9 expanded specialized STEM kit categories (Robotics, Medical STEM, AI Robots, RF Robots, Drones, Water Boats, Basic Electronics, Smart Applications, Craft & DIY), and a floating **AI Learning & Debugging Assistant** widget.

---

## ➕ What Was Added

1. **Multi-Page App Router Routes (`src/app/`)**:
   - `/` — Refactored Home Page (Hero, Featured Kit Categories bar, Value Prop, Node Visualizer, CTAs).
   - `/kits` — Complete STEM Kit Catalog Page with category search and filtering across all 9 kit types.
   - `/kits/[id]` — Dynamic Kit Product Detail Page with hardware specs, included parts checklist, downloadable PDF manuals, and Add to Cart.
   - `/projects` — 10+ Projects Explorer Gallery Page.
   - `/projects/[id]` — Dedicated Project Workspace Page with tabbed wiring schematics, copyable C/C++ code editor, assembly steps, common mistakes, and maker challenge prompts.
   - `/learn` — Learning Platform & DIY Tutorial Hub Page.
   - `/schools` — Institutional B2B STEM Hub for schools, colleges, and robotics labs.
   - `/about` — About Us & Educational Pedagogy Page.
   - `/contact` — Contact Us & Searchable FAQ Page.
   - `/student-showcase` — Student Innovation Showcase Gallery & Submission Page.

2. **Expanded STEM Kit Categories (`src/data/products.ts` & `projects.ts`)**:
   - **Robotics Kits**: *Smart Robotics & STEM Learning Kit*
   - **AI Robots**: *AI Vision & Voice Autonomous Robot Kit (ESP32-CAM & Speech AI)*
   - **Medical STEM & Bio-Electronics Kits**: *Medical STEM & Bio-Electronics Kit (Heart Rate, ECG Pulse, EMG Muscle, SpO2 Oximeter)*
   - **RF Robots**: *433MHz Telemetry Long-Range Offroad Rover Kit*
   - **DIY Drones**: *DIY STEM Quadcopter Flight Drone Kit*
   - **Water Boats & Marine Robotics**: *Autonomous Solar River Water Boat Kit*
   - **Basic Electronics & Circuit Starters**: *Basic Electronics & Logic Gate Starter Kit*
   - **Smart Applications & IoT**: *Smart Home & Cloud IoT Automation Kit*
   - **Craft & DIY Projects**: *Craft & Creative DIY Electronic Art Kit*

3. **Interactive AI Learning & Debugging Assistant (`AiAssistantWidget.tsx`)**:
   - Floating widget rendered across all pages.
   - Allows students to ask hardware wiring questions, understand Arduino C++ code syntax, troubleshoot motor drivers/sensors, and receive instant code snippets.

---

## ➖ What Was Removed / Refactored

- **Removed Single-Page Monolithic Layout**: Removed long single-page layout where all content sections were rendered on one page (`/`).
- **Refactored Navbar Navigation**: Updated `Navbar.tsx` from anchor scroll links (`#hero`, `#projects`) to real Next.js route links (`/kits`, `/projects`, `/learn`, `/schools`, `/about`, `/contact`, `/student-showcase`) with active link highlighting using `usePathname()`.
- **Refactored Root Layout (`layout.tsx`)**: Wrapped all route pages with global `Navbar`, `Footer`, `AiAssistantWidget`, and modal overlays.

---

## ⚡ What Happens as a Result

- **Improved UX & Navigation**: Users can bookmark and share direct links to specific pages (e.g. `/kits/medical-stem-bio-electronics-kit`, `/projects`, `/learn`).
- **Enhanced Educational Value**: Students get specialized hardware kits matching their specific interest area (AI, Medical, Drones, Solar Water Boats, etc.) along with 24/7 AI tutor guidance.
- **Optimized SEO**: Next.js App Router now generates 10 distinct static/dynamic prerendered HTML pages for search engine indexing.

---

## 🧠 Technical Logic & Rationale

- **Dynamic Route Segments (`/kits/[id]`)**: Uses Next.js dynamic routing to dynamically render kit specs by looking up product IDs in `STEM_KITS_CATALOG`.
- **Turbopack SSG Compilation**: Prerenders all static pages at build time (`npm run build`), resulting in ultra-fast page load times (< 1.5s).
- **Persistent Global Overlay Context**: Modal drawers (`CartDrawer`, `SchoolInquiryModal`, `SubmitProjectModal`, `AdminDrawer`, `ProjectDetailModal`) remain accessible from any route page without disrupting navigation.
