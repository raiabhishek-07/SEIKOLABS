"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Play, ArrowRight, CheckCircle2, ShieldCheck, Zap, Truck, GraduationCap, X } from "lucide-react";

export function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="pt-28 pb-16 sm:pb-24 transition-colors duration-400 overflow-hidden" style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}>
      <div className="seiko-container">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6 animate-fade-in-up">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-semibold" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)", color: "var(--accent-primary)" }}>
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
              <span>HANDS-ON STEM KITS</span>
            </div>

            {/* Headline — Fraunces Serif */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-['Fraunces'] tracking-tight leading-[1.05] text-[var(--text-primary)]">
              Build.<br />
              Code. Create.
            </h1>

            {/* Paragraph */}
            <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-lg leading-relaxed font-normal">
              Premium STEM hardware kits and learning modules for curious minds, innovators and future creators.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/products"
                className="px-7 py-3.5 rounded-2xl bg-[var(--accent-primary-deep,#5C6B38)] text-white text-sm font-semibold hover:opacity-90 transition-all shadow-sm flex items-center gap-2.5 group cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <button
                onClick={() => setVideoOpen(true)}
                className="px-6 py-3.5 rounded-2xl border text-[var(--text-primary)] text-sm font-semibold hover:border-[var(--accent-primary)] transition-all flex items-center gap-2.5 cursor-pointer shadow-2xs"
                style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
              >
                <div className="w-6 h-6 rounded-full border flex items-center justify-center text-[var(--accent-primary)]" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>

            {/* Trust Checkmarks Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t text-xs text-[var(--text-secondary)] font-medium" style={{ borderColor: "var(--border-subtle)" }}>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
                <span>10+ Projects</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[var(--accent-secondary)] shrink-0" />
                <span>No Soldering</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[var(--accent-secondary)] shrink-0" />
                <span>Made for Learners</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Oval Arch Container */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end animate-fade-in-right">
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-[90px] sm:rounded-[120px] border-4 border-[var(--border-default)] shadow-xl overflow-hidden flex items-center justify-center p-3 group" style={{ backgroundColor: "var(--bg-surface-2)" }}>
              <img
                src="/assets/hero-banner.jpg"
                alt="SEIKO Hardware Kit Showcase"
                className="w-full h-full object-cover rounded-[80px] sm:rounded-[110px] group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

        </div>

      </div>

      {/* Video Modal */}
      {videoOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl p-6 space-y-4 shadow-2xl relative border" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-default)", color: "var(--text-primary)" }}>
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "var(--border-subtle)" }}>
              <h3 className="text-lg font-bold font-['Fraunces'] text-[var(--text-primary)]">SEIKO LABS Product Showcase Video</h3>
              <button onClick={() => setVideoOpen(false)} className="p-1.5 rounded-xl border text-[var(--text-secondary)] hover:text-[var(--text-primary)]" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="aspect-video rounded-2xl flex flex-col items-center justify-center text-white p-6 text-center space-y-3" style={{ backgroundColor: "var(--bg-page-alt)" }}>
              <Play className="w-16 h-16 text-[var(--accent-primary)] fill-[var(--accent-primary)] animate-bounce" />
              <p className="text-sm font-semibold font-['Fraunces'] text-[var(--text-primary)]">Hands-On Hardware Kits in Action</p>
              <p className="text-xs text-[var(--text-secondary)]">HD Video walkthrough loaded.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
