"use client";

import React, { useState } from "react";
import Link from "next/link";
import { STEM_KITS_CATALOG, KitProduct } from "@/data/products";
import { useApp } from "@/context/AppContext";
import { ChevronLeft, ChevronRight, Star, ArrowRight, ShoppingBag } from "lucide-react";

export function FeaturedProductsSection() {
  const { addToCart, setIsCartOpen } = useApp();
  const [scrollIndex, setScrollIndex] = useState(0);

  const featuredKits = STEM_KITS_CATALOG.slice(0, 5);

  const handlePrev = () => {
    setScrollIndex((prev) => (prev > 0 ? prev - 1 : featuredKits.length - 1));
  };

  const handleNext = () => {
    setScrollIndex((prev) => (prev < featuredKits.length - 1 ? prev + 1 : 0));
  };

  const handleAddToCart = (product: KitProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setIsCartOpen(true);
  };

  const getBadgeStyle = (badgeText: string) => {
    const text = badgeText.toLowerCase();
    if (text.includes("bestseller") || text.includes("flagship") || text.includes("essential")) {
      return "bg-[#E8A838] text-white";
    }
    if (text.includes("new") || text.includes("pro") || text.includes("pioneer")) {
      return "bg-[#4E7A4A] text-white";
    }
    return "bg-[#E87050] text-white";
  };

  return (
    <section className="py-20 border-t transition-colors duration-400" style={{ backgroundColor: "var(--bg-page)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}>
      <div className="seiko-container space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--accent-primary)]">
              FEATURED KITS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-['Fraunces'] tracking-tight text-[var(--text-primary)]">
              Most loved by learners like you.
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Arrow Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full border flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--accent-primary)] hover:text-white transition-colors cursor-pointer"
                style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
                title="Previous Kit"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full border flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--accent-primary)] hover:text-white transition-colors cursor-pointer"
                style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
                title="Next Kit"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <Link
              href="/products"
              className="text-xs font-semibold text-[var(--accent-primary)] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>View all products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 5 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {featuredKits.map((product) => {
            const discountAmount = product.originalPrice ? product.originalPrice - product.price : 0;
            const discountPercent = product.originalPrice ? Math.round((discountAmount / product.originalPrice) * 100) : 0;

            return (
              <div
                key={product.id}
                className="rounded-3xl border p-3.5 flex flex-col justify-between space-y-3 hover:shadow-md transition-all duration-300 group"
                style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}
              >
                <div className="space-y-2.5">
                  {/* Top Image Stage */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden p-2 flex items-center justify-center border" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                    {/* Badge */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      {product.badge && (
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md font-mono shadow-2xs ${getBadgeStyle(product.badge)}`}>
                          {product.badge}
                        </span>
                      )}
                    </div>

                    <img
                      src={product.image || "/assets/kit-starter.jpg"}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold font-['Fraunces'] text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors leading-snug line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-bold font-['Fraunces'] text-[var(--text-primary)]">
                        ${product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-[10px] text-[var(--text-tertiary)] line-through font-mono">
                          ${product.originalPrice}
                        </span>
                      )}
                      {discountPercent > 0 && (
                        <span className="text-[9px] font-mono font-bold text-[var(--accent-primary)]">
                          {discountPercent}% OFF
                        </span>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-[10px]">
                      <div className="flex text-[#E5A83B]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-[#E5A83B] text-[#E5A83B]" : "text-[var(--text-tertiary)]"}`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-[var(--text-primary)]">{product.rating}</span>
                      <span className="text-[var(--text-tertiary)] font-mono">({product.reviewCount})</span>
                    </div>
                  </div>
                </div>

                {/* Quick Add to Cart button */}
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="w-full py-2 rounded-xl border text-[var(--text-primary)] text-xs font-semibold hover:bg-[var(--accent-primary)] hover:text-white hover:border-[var(--accent-primary)] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
