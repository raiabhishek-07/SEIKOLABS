"use client";

import React from "react";
import { ShieldCheck, Zap, Truck, Headphones } from "lucide-react";

export function TrustBar() {
  return (
    <section className="py-8 border-t transition-colors duration-400" style={{ backgroundColor: "var(--bg-page)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}>
      <div className="seiko-container">
        
        <div className="p-6 sm:p-8 rounded-3xl border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
          
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 text-[var(--accent-primary)]" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[var(--text-primary)] font-['Fraunces']">Quality Assured</h4>
              <p className="text-[11px] text-[var(--text-secondary)]">Tested and trusted components</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 text-[var(--accent-primary)]" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[var(--text-primary)] font-['Fraunces']">Safe &amp; Beginner Friendly</h4>
              <p className="text-[11px] text-[var(--text-secondary)]">No soldering. Safe for all ages.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 text-[var(--accent-primary)]" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[var(--text-primary)] font-['Fraunces']">Free Shipping</h4>
              <p className="text-[11px] text-[var(--text-secondary)]">Fast delivery across the country.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 text-[var(--accent-primary)]" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[var(--text-primary)] font-['Fraunces']">Dedicated Support</h4>
              <p className="text-[11px] text-[var(--text-secondary)]">We&apos;re here to help you learn and build.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
