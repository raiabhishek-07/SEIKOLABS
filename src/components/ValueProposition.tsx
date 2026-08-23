"use client";

import React from "react";
import { BookOpen, Layers, GraduationCap, ShieldCheck } from "lucide-react";

export function ValueProposition() {
  const pillars = [
    {
      icon: BookOpen,
      title: "Hands-On Learning",
      description: "Build real projects and understand how things work in the real world."
    },
    {
      icon: Layers,
      title: "Project-Based Approach",
      description: "Step-by-step guided projects that make learning effective."
    },
    {
      icon: GraduationCap,
      title: "Beginner Friendly",
      description: "Designed for students, hobbyists and educators of all levels."
    },
    {
      icon: ShieldCheck,
      title: "Quality You Can Trust",
      description: "High-quality components, safe design and durable builds."
    }
  ];

  return (
    <section className="py-20 border-t transition-colors duration-400" style={{ backgroundColor: "var(--bg-page-alt)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}>
      <div className="seiko-container">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Title & Description */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--accent-primary)]">
              WHY SEIKO LABS?
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold font-['Fraunces'] tracking-tight text-[var(--text-primary)] leading-tight">
              Learning by building.
            </h2>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
              We make electronics and technology easy, practical and exciting through hands-on learning experiences.
            </p>
          </div>

          {/* Right 4 Pillars Cards Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl border space-y-3 hover:shadow-sm transition-all duration-300 group"
                  style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}
                >
                  <div className="w-10 h-10 rounded-2xl border flex items-center justify-center text-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)] group-hover:text-white transition-colors" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                    <IconComp className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold font-['Fraunces'] text-[var(--text-primary)]">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
