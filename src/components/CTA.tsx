"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Bot } from "lucide-react";

export function CTA() {
  return (
    <section className="py-16 border-t transition-colors duration-400" style={{ backgroundColor: "var(--bg-page)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}>
      <div className="seiko-container">
        
        {/* Warm CTA Card Banner */}
        <div className="p-8 sm:p-12 rounded-3xl border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden shadow-2xs" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}>
          
          {/* Left Column: Copy & Action */}
          <div className="lg:col-span-8 space-y-5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Fraunces'] tracking-tight text-[var(--text-primary)] leading-tight">
              Ready to build something amazing?
            </h2>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-lg leading-relaxed font-normal">
              Join thousands of learners building, coding and creating with SEIKO LABS.
            </p>

            <div className="pt-2">
              <Link
                href="/products"
                className="px-7 py-3.5 rounded-2xl bg-[var(--accent-primary-deep,#5C6B38)] text-white text-sm font-semibold hover:opacity-90 transition-all inline-flex items-center gap-2.5 shadow-sm group cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Friendly Robot Mascot Graphic */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-[var(--border-default)] shadow-md flex items-center justify-center p-4" style={{ backgroundColor: "var(--bg-surface-1)" }}>
              <div className="flex flex-col items-center justify-center text-center space-y-1">
                <Bot className="w-16 h-16 text-[var(--accent-primary)] animate-bounce" />
                <span className="text-[10px] font-mono font-bold text-[var(--accent-secondary)] uppercase tracking-wider">
                  Build &amp; Code 🚀
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
