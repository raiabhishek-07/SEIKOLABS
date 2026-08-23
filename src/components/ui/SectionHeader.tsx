"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  highlightedText?: string;
  description?: string;
  linkText?: string;
  linkHref?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  highlightedText,
  description,
  linkText,
  linkHref,
  align = "left"
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 ${isCenter ? "text-center items-center" : ""}`}>
      <div className={`space-y-2 ${isCenter ? "max-w-2xl mx-auto" : "max-w-xl"}`}>
        
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-semibold" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)", color: "var(--accent-primary)" }}>
          <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
          <span>{eyebrow.toUpperCase()}</span>
        </div>

        {/* Section Heading — Fraunces Serif */}
        <h2 className="text-3xl sm:text-4xl font-bold font-['Fraunces'] tracking-tight text-[var(--text-primary)] leading-tight">
          {title}{" "}
          {highlightedText && (
            <span className="text-[var(--accent-primary)]">{highlightedText}</span>
          )}
        </h2>

        {/* Description */}
        {description && (
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
            {description}
          </p>
        )}
      </div>

      {/* Optional Action Link */}
      {linkText && linkHref && (
        <Link
          href={linkHref}
          className="text-xs font-semibold text-[var(--accent-primary)] hover:underline inline-flex items-center gap-1.5 shrink-0 group"
        >
          <span>{linkText}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}
    </div>
  );
}
