"use client";

import React from "react";
import { cn } from "@/lib/cn";
import { ArrowRight } from "lucide-react";

export interface RetailPriceTagCardProps {
  id?: string;
  name: string;
  categoryLabel?: string;
  categoryFullName?: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  description?: string;
  projectsCount?: number;
  targetAge?: string;
  difficulty?: string;
  icon?: string;
  onAddToCart?: () => void;
  onViewDetails?: () => void;
  className?: string;
}

export function RetailPriceTagCard({
  name,
  categoryLabel = "STEM Kit",
  price,
  originalPrice,
  badge,
  description,
  projectsCount = 10,
  targetAge = "Ages 10+",
  difficulty = "Intermediate",
  icon = "bi-box-seam",
  onAddToCart,
  onViewDetails,
  className,
}: RetailPriceTagCardProps) {
  const discountAmount = originalPrice ? originalPrice - price : 0;
  const discountPercent = originalPrice ? Math.round((discountAmount / originalPrice) * 100) : 0;

  return (
    <div
      onClick={onViewDetails}
      className={cn(
        "relative rounded-2xl border p-5 sm:p-6 transition-all duration-300 group cursor-pointer hover-lift shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-6 items-center",
        className
      )}
      style={{
        backgroundColor: "var(--bg-surface-1)",
        borderColor: "var(--border-subtle)",
        color: "var(--text-primary)",
      }}
    >
      {/* Left Column: Hardware Visual Stage (sm:col-span-5) */}
      <div
        className="sm:col-span-5 h-40 rounded-xl border p-4 flex flex-col justify-between overflow-hidden group-hover:border-[var(--border-accent)] transition-colors duration-300 relative shadow-2xs"
        style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}
      >
        {/* Top Badges */}
        <div className="flex items-center justify-between z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-primary)] font-mono px-2.5 py-1 rounded-md bg-[var(--bg-surface-1)] border border-[var(--border-subtle)]">
            {categoryLabel}
          </span>
          
          {discountPercent > 0 && (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[var(--accent-primary)] text-white shadow-2xs">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Center Hardware Icon Badge */}
        <div className="my-auto flex items-center justify-center z-10">
          <div
            className="w-14 h-14 rounded-2xl border flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-300"
            style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
          >
            <i className={`bi ${icon} text-2xl text-[var(--accent-primary)]`}></i>
          </div>
        </div>

        {/* Bottom Status & Projects Meta */}
        <div className="flex items-center justify-between text-[10px] text-[var(--text-tertiary)] font-mono z-10 pt-2 border-t" style={{ borderColor: "var(--border-subtle)" }}>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-tertiary)] animate-pulse" />
            In Stock
          </span>
          <span>{projectsCount} Projects</span>
        </div>
      </div>

      {/* Right Column: Info, Specs, Price & Action (sm:col-span-7) */}
      <div className="sm:col-span-7 space-y-4 flex flex-col justify-between h-full py-0.5">
        
        <div className="space-y-2">
          {/* Product Title */}
          <h3 className="text-lg font-bold font-['Fraunces'] text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors duration-200 leading-snug tracking-tight">
            {name}
          </h3>

          {/* Specs Meta Row */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-[var(--text-tertiary)]">
            <span className="px-2.5 py-0.5 rounded-md border font-semibold" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
              {difficulty}
            </span>
            <span>•</span>
            <span>{targetAge.split(" to ")[0]}</span>
            {badge && (
              <>
                <span>•</span>
                <span className="text-[var(--accent-primary)] font-semibold">{badge}</span>
              </>
            )}
          </div>

          {/* Description */}
          {description && (
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 pt-1 font-normal">
              {description}
            </p>
          )}
        </div>

        {/* Bottom Price & Action Row */}
        <div className="pt-3.5 border-t flex items-center justify-between gap-4" style={{ borderColor: "var(--border-subtle)" }}>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-['Fraunces'] text-[var(--text-primary)] tracking-tight">
              ${price}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-xs text-[var(--text-tertiary)] line-through font-mono">
                ${originalPrice}
              </span>
            )}
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase">USD</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onAddToCart) onAddToCart();
            }}
            className="seiko-primary-btn px-4 py-2.5 rounded-xl text-xs font-semibold inline-flex items-center gap-2 shadow-xs shrink-0"
          >
            <span>Add to Cart</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
