"use client";

import React from "react";
import Link from "next/link";
import { Package, BookOpen, Wrench, Lightbulb, ArrowRight } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      num: "1",
      title: "Unbox Your Kit",
      desc: "Everything you need, carefully packed.",
      icon: Package,
      image: "/assets/kit-starter.jpg"
    },
    {
      num: "2",
      title: "Follow the Guide",
      desc: "Easy step-by-step instructions.",
      icon: BookOpen,
      image: "/assets/kit-workbench.jpg"
    },
    {
      num: "3",
      title: "Build & Learn",
      desc: "Assemble, experiment and understand.",
      icon: Wrench,
      image: "/assets/kit-robotics.jpg"
    },
    {
      num: "4",
      title: "Create & Innovate",
      desc: "Apply your skills to build amazing things.",
      icon: Lightbulb,
      image: "/assets/kit-iot.jpg"
    }
  ];

  return (
    <section className="py-20 border-t transition-colors duration-400" style={{ backgroundColor: "var(--bg-page-alt)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}>
      <div className="seiko-container space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--accent-primary)]">
              SIMPLE, PRACTICAL, FUN
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-['Fraunces'] tracking-tight text-[var(--text-primary)]">
              From unboxing to innovating in 4 simple steps.
            </h2>
          </div>

          <Link
            href="/about"
            className="text-xs font-semibold text-[var(--accent-primary)] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>See how it works</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Horizontal Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div
                key={step.num}
                className="p-5 rounded-3xl border flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md transition-all duration-300 relative group"
                style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}
              >
                {/* Top Step Number Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-2xl bg-[var(--accent-primary)] text-white flex items-center justify-center text-sm font-mono font-bold">
                    {step.num}
                  </div>
                  <div className="w-8 h-8 rounded-xl border flex items-center justify-center text-[var(--accent-primary)]" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>

                {/* Step Image Stage */}
                <div className="aspect-[4/3] rounded-2xl overflow-hidden p-2 flex items-center justify-center border" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Step Title & Description */}
                <div className="space-y-1">
                  <h3 className="text-base font-bold font-['Fraunces'] text-[var(--text-primary)]">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
