"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Building2, 
  Layers, 
  ShieldCheck, 
  Flag, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  Hand, 
  Briefcase, 
  Rocket
} from "lucide-react";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const metrics = [
    {
      value: "10,000+",
      label: "Makers & Students",
      sub: "learning with our kits",
      icon: Users
    },
    {
      value: "500+",
      label: "Institutions & Labs",
      sub: "trust SEIKO LABS",
      icon: Building2
    },
    {
      value: "10+",
      label: "Projects per Kit",
      sub: "average hands-on experience",
      icon: Layers
    },
    {
      value: "100%",
      label: "Solderless & Safe",
      sub: "learn without worries",
      icon: ShieldCheck
    },
    {
      value: "Made in India",
      label: "Designed & Assembled",
      sub: "for future innovators",
      icon: Flag
    }
  ];

  const pillars = [
    {
      num: "01",
      badgeColor: "bg-[var(--accent-secondary)] text-white",
      title: "Physical First",
      desc: "We believe real learning happens when you build with your hands and see real results."
    },
    {
      num: "02",
      badgeColor: "bg-[var(--accent-secondary)] text-white",
      title: "Industry Standards",
      desc: "Our kits use industry-grade components and follow real-world engineering practices."
    },
    {
      num: "03",
      badgeColor: "bg-[var(--accent-primary)] text-white",
      title: "Zero Black Boxes",
      desc: "Everything is open, explained, and beginner friendly — so you understand every step you build."
    }
  ];

  const pedagogyMatrix = [
    {
      feature: "Learning Approach",
      traditional: "Theoretical concepts, reading & memorization",
      seikolabs: "Hands-on building, testing & real understanding"
    },
    {
      feature: "Hands-on Experience",
      traditional: "Limited or no practical exposure with real electronics",
      seikolabs: "100% practical with real components & step-by-step projects"
    },
    {
      feature: "Learning Impact",
      traditional: "Hard to apply in real-life situations",
      seikolabs: "Builds confidence, problem-solving & innovation"
    },
    {
      feature: "Outcome",
      traditional: "Temporary understanding for exams",
      seikolabs: "Real engineering skills & portfolio project creation"
    }
  ];

  const interactiveFeatures = [
    {
      title: "Authentic Hardware Microcontrollers",
      icon: Cpu,
      desc: "We use genuine Arduino UNO, ESP32, and ESP8266 processors so learners gain industry-relevant C++ programming skills instead of plastic black-box toys."
    },
    {
      title: "Plug-and-Play Solderless Prototyping",
      icon: Hand,
      desc: "All circuits connect seamlessly via high-grade jumper wires and 830 tie-point breadboards, making hardware assembly 100% safe and reusable."
    },
    {
      title: "Real-World Engineering Projects",
      icon: Briefcase,
      desc: "Every kit includes step-by-step project blueprints — building obstacle-avoiding rovers, IoT sensors, pulse oximeters, and flight controllers."
    }
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen transition-colors duration-400" style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}>
      <div className="seiko-container space-y-16 sm:space-y-20">
        
        {/* ═══ SECTION 1: ABOUT HERO HEADER ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Copy & Micro Badges */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-semibold" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)", color: "var(--accent-primary)" }}>
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
              <span>ABOUT SEIKO LABS</span>
            </div>

            {/* Headline — Fraunces Serif */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Fraunces'] tracking-tight leading-[1.1] text-[var(--text-primary)]">
              Empowering future engineers by building{" "}
              <span className="text-[var(--accent-primary)]">real hardware.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl leading-relaxed font-normal">
              At SEIKO LABS, we make electronics and technology education practical, engaging, and accessible for everyone. Our STEM kits and learning modules help students, educators, and innovators turn ideas into working solutions.
            </p>

            {/* 4 Feature Micro Badges Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-2xl border flex items-center gap-2 text-xs font-medium text-[var(--text-primary)]" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
                <Hand className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
                <span>Hands-on Learning</span>
              </div>

              <div className="p-3 rounded-2xl border flex items-center gap-2 text-xs font-medium text-[var(--text-primary)]" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
                <Cpu className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
                <span>Real Components</span>
              </div>

              <div className="p-3 rounded-2xl border flex items-center gap-2 text-xs font-medium text-[var(--text-primary)]" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
                <Briefcase className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
                <span>Industry Relevant</span>
              </div>

              <div className="p-3 rounded-2xl border flex items-center gap-2 text-xs font-medium text-[var(--text-primary)]" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
                <Rocket className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
                <span>Future-Ready Skills</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Arch Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-[70px] sm:rounded-[90px] border-4 border-[var(--border-default)] shadow-xl overflow-hidden flex items-center justify-center p-3 group" style={{ backgroundColor: "var(--bg-surface-2)" }}>
              <img
                src="/assets/hero-banner.jpg"
                alt="SEIKO LABS Starter Kit & Hardware"
                className="w-full h-full object-cover rounded-[60px] sm:rounded-[80px] group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

        </div>

        {/* ═══ SECTION 2: METRICS & IMPACT BAR ═══ */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
              Creating <span className="text-[var(--accent-primary)]">impact</span> through learning.
            </h2>
          </div>

          {/* 5 Impact Metric Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {metrics.map((m, idx) => {
              const IconComp = m.icon;
              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-3xl border text-center space-y-2 shadow-2xs hover:shadow-md transition-all duration-300 group"
                  style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}
                >
                  <div className="w-8 h-8 rounded-xl border flex items-center justify-center text-[var(--accent-primary)] mx-auto group-hover:bg-[var(--accent-primary)] group-hover:text-white transition-colors" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                    <IconComp className="w-4 h-4" />
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-xl sm:text-2xl font-bold font-['Fraunces'] text-[var(--text-primary)] block">
                      {m.value}
                    </span>
                    <h4 className="text-xs font-bold text-[var(--text-primary)]">{m.label}</h4>
                    <p className="text-[10px] text-[var(--text-tertiary)] leading-tight">{m.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══ SECTION 3: THE THREE PILLARS ═══ */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-semibold" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)", color: "var(--accent-primary)" }}>
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
              <span>OUR FOUNDATION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
              The three pillars that <span className="text-[var(--accent-primary)]">define us.</span>
            </h2>
          </div>

          {/* 3 Pillar Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div
                key={p.num}
                className="p-6 sm:p-8 rounded-3xl border space-y-4 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}
              >
                <div className="space-y-4">
                  {/* Number Circle Badge */}
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold font-mono ${p.badgeColor}`}>
                    {p.num}
                  </div>

                  <h3 className="text-xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
                    {p.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ SECTION 4: PEDAGOGY COMPARISON TABLE ═══ */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-semibold" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)", color: "var(--accent-primary)" }}>
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
              <span>WHY SEIKO LABS?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
              Pedagogy <span className="text-[var(--accent-primary)]">comparison</span>
            </h2>
          </div>

          {/* Comparison Matrix Container */}
          <div className="rounded-3xl border overflow-hidden shadow-sm" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b text-xs font-mono font-bold uppercase tracking-wider" style={{ borderColor: "var(--border-subtle)" }}>
                    <th className="p-4 sm:p-5 text-[var(--text-tertiary)] bg-[var(--bg-page-alt)] w-1/4">FEATURE</th>
                    <th className="p-4 sm:p-5 text-[var(--text-secondary)] bg-[var(--bg-surface-2)] w-3/8">TRADITIONAL LEARNING</th>
                    <th className="p-4 sm:p-5 text-[var(--accent-primary)] bg-[var(--bg-surface-3)] w-3/8">SEIKO LABS LEARNING</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-xs sm:text-sm" style={{ borderColor: "var(--border-subtle)" }}>
                  {pedagogyMatrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[var(--bg-surface-2)]/50 transition-colors">
                      <td className="p-4 sm:p-5 font-bold font-['Fraunces'] text-[var(--text-primary)] bg-[var(--bg-page-alt)]/30">
                        {row.feature}
                      </td>
                      <td className="p-4 sm:p-5 text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-surface-2)]/30">
                        {row.traditional}
                      </td>
                      <td className="p-4 sm:p-5 font-semibold text-[var(--text-primary)] bg-[var(--bg-surface-3)]/30">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                          <span>{row.seikolabs}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ═══ SECTION 5: INTERACTIVE PHILOSOPHY TABS & CTA ═══ */}
        <div className="p-8 sm:p-12 rounded-3xl border space-y-8 shadow-2xs" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}>
          <div className="max-w-2xl space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
              Discover our hardware philosophy.
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Explore how SEIKO LABS engineers authentic hardware kits for schools, universities, and independent makers worldwide.
            </p>
          </div>

          {/* Interactive Feature Accordion Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {interactiveFeatures.map((feat, fIdx) => {
              const IconComp = feat.icon;
              const isActive = activeTab === fIdx;

              return (
                <div
                  key={fIdx}
                  onClick={() => setActiveTab(fIdx)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer space-y-3 ${
                    isActive
                      ? "bg-[var(--bg-surface-1)] border-[var(--accent-primary)] shadow-sm ring-2 ring-[var(--accent-primary)]/20"
                      : "bg-[var(--bg-surface-1)]/70 border-[var(--border-subtle)] hover:border-[var(--accent-primary)]"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isActive ? "bg-[var(--accent-primary)] text-white" : "bg-[var(--bg-surface-2)] text-[var(--accent-primary)]"}`}>
                    <IconComp className="w-5 h-5" />
                  </div>

                  <h4 className="text-sm font-bold font-['Fraunces'] text-[var(--text-primary)]">
                    {feat.title}
                  </h4>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t flex flex-wrap items-center justify-between gap-4" style={{ borderColor: "var(--border-subtle)" }}>
            <span className="text-xs text-[var(--text-secondary)] font-mono">Ready to experience STEM learning first-hand?</span>
            <div className="flex items-center gap-3">
              <Link
                href="/products"
                className="px-6 py-3 rounded-2xl bg-[var(--accent-primary)] text-white text-xs font-semibold hover:opacity-90 transition-all flex items-center gap-2 shadow-xs"
              >
                <span>Explore STEM Kits</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-2xl border text-[var(--text-primary)] text-xs font-semibold hover:border-[var(--accent-primary)] transition-colors"
                style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
              >
                Talk to Education Team
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
