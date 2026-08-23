"use client";

import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "bestseller" | "new" | "discount" | "category" | "difficulty" | "default";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className = ""
}: BadgeProps) {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[9px]" : "px-2.5 py-1 text-[10px]";

  const getVariantStyles = () => {
    switch (variant) {
      case "bestseller":
        return "bg-[#E8A838] text-white shadow-2xs";
      case "new":
        return "bg-[#4E7A4A] text-white shadow-2xs";
      case "discount":
        return "bg-[#E87050] text-white shadow-2xs";
      case "category":
        return "bg-[var(--bg-surface-2)] text-[var(--accent-primary)] border border-[var(--border-subtle)]";
      case "difficulty":
        return "bg-[var(--bg-surface-2)] text-[var(--text-tertiary)] border border-[var(--border-subtle)]";
      default:
        return "bg-[var(--bg-surface-2)] text-[var(--text-primary)] border border-[var(--border-subtle)]";
    }
  };

  return (
    <span className={`inline-flex items-center font-mono font-bold uppercase tracking-wider rounded-md font-sans ${sizeClasses} ${getVariantStyles()} ${className}`}>
      {children}
    </span>
  );
}
