"use client";

import React, { use, useState } from "react";
import { getKitById } from "@/data/kits/registry";
import { PRODUCT_DOMAINS } from "@/data/domains";
import { 
  ShieldAlert, 
  ChevronDown, 
  ChevronUp, 
  Zap,
  HelpCircle
} from "lucide-react";

export default function KitDocumentationPage({
  params
}: {
  params: Promise<{ domain: string; kitId: string }>;
}) {
  const resolvedParams = use(params);
  const domain = PRODUCT_DOMAINS.find((d) => d.slug === resolvedParams.domain) || PRODUCT_DOMAINS[0];
  const kitData = getKitById(resolvedParams.kitId, resolvedParams.domain);

  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex((prev) => (prev === index ? null : index));
  };

  const schematicLesson = kitData.curriculum
    .flatMap((m) => m.lessons)
    .find((l) => l.schematic !== undefined);

  const pinConnections = schematicLesson?.schematic?.pinConnections || [
    { componentPin: "L298N IN1", mcuPin: "ESP32 GPIO 18", functionType: "Left Forward", colorCode: "Blue", note: "Forward Left Logic HIGH" },
    { componentPin: "L298N IN2", mcuPin: "ESP32 GPIO 19", functionType: "Left Reverse", colorCode: "Green", note: "Reverse Left Logic HIGH" },
    { componentPin: "L298N IN3", mcuPin: "ESP32 GPIO 22", functionType: "Right Forward", colorCode: "Yellow", note: "Forward Right Logic HIGH" },
    { componentPin: "L298N IN4", mcuPin: "ESP32 GPIO 23", functionType: "Right Reverse", colorCode: "Orange", note: "Reverse Right Logic HIGH" },
    { componentPin: "L298N ENA (PWM)", mcuPin: "ESP32 GPIO 16", functionType: "Left Speed PWM", colorCode: "White", note: "ledcWrite() Left Velocity" },
    { componentPin: "L298N ENB (PWM)", mcuPin: "ESP32 GPIO 17", functionType: "Right Speed PWM", colorCode: "Purple", note: "ledcWrite() Right Velocity" }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
          Documentation &amp; Circuit Schematics
        </h1>
        <p className="text-xs text-[var(--text-secondary)]">
          Pinout connections, power rails, safety rules, and diagnostics
        </p>
      </div>

      {/* Pin Connection Table */}
      <div 
        className="p-5 sm:p-6 rounded-2xl border space-y-4"
        style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
      >
        <h2 className="text-xs font-mono font-bold text-[#5C6B38] uppercase tracking-wider">
          Pinout Wiring Matrix
        </h2>

        <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)]">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface-2)]">
                <th className="p-3 font-mono font-semibold text-[var(--text-primary)]">Component Pin</th>
                <th className="p-3 font-mono font-semibold text-[var(--text-primary)]">ESP32 Pin</th>
                <th className="p-3 font-mono font-semibold text-[var(--text-primary)]">Function</th>
                <th className="p-3 font-mono font-semibold text-[var(--text-primary)]">Wire Color</th>
                <th className="p-3 font-mono font-semibold text-[var(--text-primary)]">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {pinConnections.map((pin, pIdx) => (
                <tr key={pIdx} className="hover:bg-[var(--bg-surface-2)] transition-colors">
                  <td className="p-3 font-mono font-bold text-[#5C6B38]">{pin.componentPin}</td>
                  <td className="p-3 font-mono font-medium text-[var(--text-primary)]">{pin.mcuPin}</td>
                  <td className="p-3 text-[var(--text-secondary)]">{pin.functionType}</td>
                  <td className="p-3 font-mono text-[11px] text-[var(--text-tertiary)]">{pin.colorCode}</td>
                  <td className="p-3 text-[11px] text-[var(--text-secondary)]">{pin.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Safety & Troubleshooting */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Safety Guidelines */}
        <div 
          className="p-5 rounded-2xl border space-y-3"
          style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-700 dark:text-amber-300 uppercase">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Safety Guidelines</span>
          </div>

          <div className="space-y-2">
            {kitData.documentation.safetyGuidelines.map((guide, gIdx) => (
              <div key={gIdx} className="text-xs text-[var(--text-secondary)] leading-relaxed flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 shrink-0 font-bold">•</span>
                <span>{guide}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div 
          className="p-5 rounded-2xl border space-y-3"
          style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#5C6B38] uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Troubleshooting &amp; FAQs</span>
          </div>

          <div className="space-y-2">
            {kitData.documentation.troubleshootingFaqs.map((faq, fIdx) => {
              const isExpanded = expandedFaqIndex === fIdx;

              return (
                <div 
                  key={fIdx}
                  className="rounded-xl border border-[var(--border-subtle)] overflow-hidden text-xs"
                  style={{ backgroundColor: "var(--bg-surface-2)" }}
                >
                  <button
                    onClick={() => toggleFaq(fIdx)}
                    className="w-full p-3 text-left font-semibold text-[var(--text-primary)] flex items-center justify-between gap-3 hover:bg-[var(--bg-surface-1)] transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5 shrink-0 text-[#5C6B38]" /> : <ChevronDown className="w-3.5 h-3.5 shrink-0 text-[var(--text-tertiary)] text-opacity-50" />}
                  </button>

                  {isExpanded && (
                    <div className="p-3 pt-0 text-[11px] text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] bg-[var(--bg-surface-1)]">
                      <p className="pt-2">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
