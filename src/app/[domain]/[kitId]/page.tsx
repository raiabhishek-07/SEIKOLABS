"use client";

import React, { use } from "react";
import Link from "next/link";
import { getKitById } from "@/data/kits/registry";
import { PRODUCT_DOMAINS } from "@/data/domains";
import { 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  ShieldCheck, 
  ArrowRight
} from "lucide-react";

export default function KitOverviewPage({
  params
}: {
  params: Promise<{ domain: string; kitId: string }>;
}) {
  const resolvedParams = use(params);
  const domain = PRODUCT_DOMAINS.find((d) => d.slug === resolvedParams.domain) || PRODUCT_DOMAINS[0];
  const kitData = getKitById(resolvedParams.kitId, resolvedParams.domain);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Overview Intro */}
      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
          Overview &amp; Hardware Specifications
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
          {kitData.description}
        </p>
      </div>

      {/* 2-Column Clean Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Core Learning Outcomes */}
        <div 
          className="p-6 rounded-2xl border space-y-4"
          style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#5C6B38]" />
            <h2 className="text-sm font-bold text-[var(--text-primary)]">
              Core Learning Outcomes
            </h2>
          </div>

          <div className="space-y-2.5">
            {[
              "ESP32 Wi-Fi SoftAP Mode & Embedded Web Server Architecture",
              "L298N Dual H-Bridge Motor Control & PWM Velocity Modulation",
              "Type-C 2S Lithium Power Management & Synchronous Boost Charging",
              "Solderless Dupont Prototyping & Low-Voltage Safety Circuit Design"
            ].map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)] leading-relaxed">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5C6B38] shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hardware Specifications */}
        <div 
          className="p-6 rounded-2xl border space-y-4"
          style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
        >
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#5C6B38]" />
            <h2 className="text-sm font-bold text-[var(--text-primary)]">
              Hardware Parameters
            </h2>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { label: "Microcontroller", value: kitData.documentation.microcontrollerCore },
              { label: "Operating Voltage", value: kitData.documentation.operatingVoltage },
              { label: "Current Draw", value: kitData.documentation.currentDraw },
              { label: "Wireless Protocols", value: "2.4GHz Wi-Fi (SoftAP) + BLE 4.2" },
              { label: "Charging Interface", value: "USB Type-C 2S Fast-Charge (8.4V)" }
            ].map((spec, i) => (
              <div key={i} className="py-1.5 border-b border-[var(--border-subtle)] flex items-center justify-between gap-4 last:border-0">
                <span className="font-mono text-[var(--text-tertiary)]">{spec.label}</span>
                <span className="font-mono font-medium text-[var(--text-primary)] text-right truncate max-w-[200px]">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Peaceful Quick Footer */}
      <div 
        className="p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
      >
        <span className="text-xs text-[var(--text-secondary)]">
          Explore the {kitData.components.length} components or launch the step-by-step build modules.
        </span>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href={`/${domain.slug}/${kitData.kitId}/components`}
            className="px-4 py-2 rounded-xl text-xs font-semibold border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-2)] transition-colors"
          >
            Component BOM
          </Link>
          <Link
            href={`/${domain.slug}/${kitData.kitId}/lessons`}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E] transition-all flex items-center gap-1.5"
          >
            <span>Start Building</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </div>
  );
}
