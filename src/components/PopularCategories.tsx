"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { PRODUCT_DOMAINS } from "@/data/domains";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export function PopularCategories() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to enable/disable arrow states
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Manual scroll handlers
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 370; // card width + gap
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  // Auto-sliding interval (advances every 3.2 seconds unless paused on hover)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // If at the end, loop back to the beginning
        if (scrollLeft >= scrollWidth - clientWidth - 20) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 370, behavior: "smooth" });
        }
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
      return () => el.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);

  return (
    <section 
      className="py-16 sm:py-24 border-t transition-colors duration-400 overflow-hidden" 
      style={{ backgroundColor: "var(--bg-page)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}
    >
      <div className="seiko-container space-y-8 sm:space-y-10">
        
        {/* ═══ SECTION HEADER & CONTROLS ═══ */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--accent-primary)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FEATURED HARDWARE TRACKS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Fraunces'] tracking-tight text-[var(--text-primary)] leading-[1.15]">
              Explore specialized engineering disciplines.
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pt-1">
              Select any hands-on track to explore hardware kits, circuit schematics, and guided curriculum workbooks.
            </p>
          </div>

          {/* Right Navigation Controls */}
          <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
            <Link
              href="/products"
              className="text-xs font-bold text-[var(--accent-primary)] hover:underline flex items-center gap-1.5 mr-2"
            >
              <span>Explore all disciplines</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Prev Arrow */}
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border shadow-sm flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
              disabled={!canScrollLeft}
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next Arrow */}
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border shadow-sm flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
              disabled={!canScrollRight}
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ═══ BIG CARDS AUTO-SLIDING CAROUSEL TRACK ═══ */}
        <div 
          className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div
            ref={scrollRef}
            className="flex items-stretch gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none scroll-smooth snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none"
            }}
          >
            {PRODUCT_DOMAINS.map((domain, index) => (
              <Link
                key={domain.slug}
                href={`/${domain.slug}`}
                className="w-[300px] sm:w-[340px] md:w-[360px] flex-shrink-0 snap-start p-5 sm:p-6 rounded-[32px] border flex flex-col justify-between space-y-5 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 group min-w-0"
                style={{
                  backgroundColor: "var(--bg-surface-1)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-primary)"
                }}
              >
                {/* Big Image Showcase Stage */}
                <div 
                  className="relative aspect-[16/11] rounded-2xl overflow-hidden p-2 flex items-center justify-center border shadow-xs"
                  style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}
                >
                  <img
                    src={domain.image}
                    alt={domain.title}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Icon Badge Overlay */}
                  <div 
                    className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-md backdrop-blur-md"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.92)", color: domain.color }}
                  >
                    <i className={`bi ${domain.icon}`} />
                  </div>

                  {/* Kit Count Pill */}
                  <span className="absolute bottom-4 right-4 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full backdrop-blur-md bg-black/60 text-white shadow-xs">
                    {domain.featuredKits.length} Kits
                  </span>
                </div>

                {/* Content Body */}
                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono font-semibold text-[var(--accent-primary)] block truncate">
                      {domain.discipline}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-['Fraunces'] text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors leading-tight">
                      {domain.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 pt-0.5">
                      {domain.tagline || domain.purpose}
                    </p>
                  </div>

                  {/* Bottom Footer with Action Arrow */}
                  <div className="pt-4 border-t flex items-center justify-between text-xs font-bold text-[var(--accent-primary)]" style={{ borderColor: "var(--border-subtle)" }}>
                    <span className="group-hover:underline">Explore Track</span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--bg-surface-2)] text-[var(--text-primary)] group-hover:bg-[var(--accent-primary)] group-hover:text-white transition-all duration-300 group-hover:translate-x-1 shadow-2xs">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
