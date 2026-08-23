"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  variant?: "surface-1" | "surface-2" | "page-alt";
  hoverable?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Card({
  children,
  variant = "surface-1",
  hoverable = true,
  className = "",
  onClick
}: CardProps) {
  const getBgStyle = () => {
    switch (variant) {
      case "surface-2":
        return "var(--bg-surface-2)";
      case "page-alt":
        return "var(--bg-page-alt)";
      default:
        return "var(--bg-surface-1)";
    }
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-3xl border p-5 transition-all duration-300 ${
        hoverable ? "hover:shadow-md hover:border-[var(--accent-primary)] group cursor-pointer" : ""
      } ${className}`}
      style={{
        backgroundColor: getBgStyle(),
        borderColor: "var(--border-subtle)",
        color: "var(--text-primary)"
      }}
    >
      {children}
    </div>
  );
}
