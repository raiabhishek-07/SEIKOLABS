# Complete Multi-Page Architecture Guide — SEIKO LABS STEM Website

A comprehensive technical documentation guide explaining how the **SEIKO LABS STEM Hardware Website** was built and redesigned following a premium modern STEM hardware brand identity ("LESS INFORMATION. MORE IMPACT.").

---

## 📌 Executive Summary & Brand Purpose

SEIKO LABS creates hands-on STEM and electronics learning kits that allow students to learn by building real projects.

### Core Message:
> **"Build. Code. Create."**
> 
> *Hands-on STEM kits designed to turn curiosity into real projects.*

---

## 📜 Complete Documentation Index

All sequential architectural and design system updates are tracked in the [`documentation_md_files/`](file:///c:/Users/hp/Downloads/website/documentation_md_files) directory:

1. [`01_initial_single_page_website.md`](./documentation_md_files/01_initial_single_page_website.md) — Initial Next.js single-page launch
2. [`02_multi_page_routing_and_expanded_categories.md`](./documentation_md_files/02_multi_page_routing_and_expanded_categories.md) — Multi-page route structure & 9 STEM categories
3. [`03_mobile_responsiveness_and_touch_optimizations.md`](./documentation_md_files/03_mobile_responsiveness_and_touch_optimizations.md) — Mobile responsiveness & touch target optimization
4. [`04_global_design_system_and_dual_theme.md`](./documentation_md_files/04_global_design_system_and_dual_theme.md) — Dual theme architecture & glassmorphism
5. [`05_brand_name_migration_to_seiko_labs.md`](./documentation_md_files/05_brand_name_migration_to_seiko_labs.md) — SEIKO LABS brand migration
6. [`06_global_design_system_and_brand_redesign.md`](./documentation_md_files/06_global_design_system_and_brand_redesign.md) — **v6.0.0 Global Design System & Minimal Brand Redesign**

---

## 🛠️ Multi-Page Routing Architecture

| Route Path | Page Title | Key Components & Purpose |
| :--- | :--- | :--- |
| `/` | **Home Page** | Minimal 5-section layout: Hero, Brand Value, Product Showcase, Projects, and CTA. |
| `/products` | **STEM Kits Catalog & Flagship Kit** | Comprehensive hardware kit details, 12 core included items, 6 project blueprints, specifications, transparent $129 pricing, and FAQ. |
| `/about` | **About Us** | Minimal company mission: Why SEIKO LABS, What we believe, What we're building. |
| `/contact` | **Contact & Inquiry Form** | Minimal inquiry choices (General, Support, School, Partnerships) with interactive contact form. |
| `/kits` | **Legacy Kits Catalog** | Category filterable catalog view. |
| `/projects` | **Projects Gallery** | Interactive maker project gallery. |
| `/learn` | **Learning Hub** | Digital learning platform with step-by-step tutorials. |
| `/schools` | **For Schools** | Institutional STEM hub and lab packages. |
| `/student-showcase` | **Student Showcase** | Community gallery featuring student innovations. |

---

## 🎨 Global Design System Summary

- **Palette (Light Theme)**: Cream Page (`#FFEED6`), Soft Cream (`#FFF6EA`), Sage Green (`#A5AF79`), Coral (`#E8A07C`), Earth Bronze (`#827148`).
- **Palette (Dark Theme)**: Charcoal Page (`#37353E`), Surface (`#44444E`), Mauve (`#715A5A`), Silver (`#D3DAD9`), Soft Sage (`#C2CA9F`).
- **Typography**: Display Serif (`Fraunces`), Body (`DM Sans`), Monospace (`JetBrains Mono`).
- **Iconography**: Bootstrap Icons CDN (`1.11.3`).
- **Motion**: Calm micro-animations, gentle floating, hover elevation, scroll reveal staggering.


---

## 📦 Expanded STEM Kit Categories

1. **Robotics Kits** (*Smart Robotics & STEM Learning Kit*)
2. **AI Robots** (*AI Vision & Voice Autonomous Robot Kit with ESP32-CAM & Speech AI*)
3. **Medical STEM & Bio-Electronics Kits** (*Heart Rate Monitor, ECG Pulse, EMG Muscle Sensor & SpO2 Oximeter*)
4. **RF Robots** (*433MHz Telemetry Long-Range Offroad Rover*)
5. **DIY Drones** (*DIY STEM Quadcopter Flight Controller Drone Kit*)
6. **Water Boats & Marine Robotics** (*Autonomous Solar River Water Boat Kit*)
7. **Basic Electronics & Circuit Starters** (*Breadboard, Resistors, Capacitors & Logic Gate Kit*)
8. **Smart Applications & IoT** (*Smart Home & Cloud Sensor Network Kit*)
9. **Craft & DIY Projects** (*Creative DIY Electronic Art & Wearable STEAM Kit*)

---

## 🤖 Interactive AI Learning & Debugging Assistant

Integrated across all pages via `AiAssistantWidget.tsx`:
- **Location**: Floating widget on bottom-right corner.
- **Capabilities**:
  - Answers hardware wiring questions (e.g. *"Why is my motor driver not running?"*).
  - Explains Arduino C++ functions (e.g. `pulseIn()`, I2C protocol, PWM control).
  - Provides real-time C++ code snippets and troubleshooting checklists.

---

## 🌐 Internet Access & Deployment

- **Local Dev Server**: `http://localhost:3000`
- **Worldwide Public Internet Tunnel**: `https://forty-rules-matter.loca.lt` (Tunnel Password: `106.222.235.240`)
- **Same Wi-Fi Network Access**: `http://192.168.1.12:3000`
