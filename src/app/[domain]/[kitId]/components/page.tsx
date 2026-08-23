"use client";

import React, { use, useState } from "react";
import { getKitById } from "@/data/kits/registry";
import { PRODUCT_DOMAINS } from "@/data/domains";
import { Wrench } from "lucide-react";

export default function KitComponentsPage({
  params
}: {
  params: Promise<{ domain: string; kitId: string }>;
}) {
  const resolvedParams = use(params);
  const domain = PRODUCT_DOMAINS.find((d) => d.slug === resolvedParams.domain) || PRODUCT_DOMAINS[0];
  const kitData = getKitById(resolvedParams.kitId, resolvedParams.domain);

  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Microcontroller", "Sensor", "Actuator", "Power", "Mechanical", "Wiring"];

  const filteredComponents = activeCategory === "All"
    ? kitData.components
    : kitData.components.filter((c) => c.category === activeCategory);

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
            Component Inventory
          </h1>
          <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
            {filteredComponents.length} of {kitData.components.length} components shown
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const count = cat === "All" 
              ? kitData.components.length 
              : kitData.components.filter((c) => c.category === cat).length;

            if (count === 0 && cat !== "All") return null;

            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${
                  isActive
                    ? "bg-[#5C6B38] text-white font-bold"
                    : "border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-1)]"
                }`}
              >
                <span>{cat}</span>
                <span className="ml-1 opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredComponents.map((comp) => (
          <div
            key={comp.id}
            className="p-4 rounded-2xl border flex flex-col justify-between group hover:shadow-xs transition-all duration-200"
            style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="px-2 py-0.5 rounded-md font-semibold text-[var(--accent-primary)] bg-[var(--bg-surface-2)]">
                  {comp.category}
                </span>
                <span className="font-bold text-[var(--text-primary)]">
                  Qty: {comp.quantity}
                </span>
              </div>

              <div className="aspect-[4/3] rounded-xl overflow-hidden border p-1" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                <img
                  src={comp.image || kitData.image}
                  alt={comp.name}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] leading-snug">
                {comp.name}
              </h3>

              <div className="text-[10px] font-mono text-[var(--text-tertiary)] bg-[var(--bg-surface-2)] p-1.5 rounded-lg">
                {comp.spec}
              </div>

              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                {comp.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
