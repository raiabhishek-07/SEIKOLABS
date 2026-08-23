"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { PRODUCT_DOMAINS, ProductDomain } from "@/data/domains";
import { 
  ChevronRight, 
  ChevronLeft, 
  ArrowRight, 
  Wrench, 
  Cpu, 
  Target, 
  Sparkles, 
  Grid, 
  X, 
  Search,
  CheckCircle2,
  Layers,
  Box
} from "lucide-react";

export default function ShopPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAllModalOpen, setIsAllModalOpen] = useState(false);
  const [modalSearch, setModalSearch] = useState("");
  const bottomCarouselRef = useRef<HTMLDivElement>(null);

  const activeDomain = PRODUCT_DOMAINS[activeIndex] || PRODUCT_DOMAINS[0];

  // Auto-scroll sidebar or carousel when active index changes
  const handleSelectDomain = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? PRODUCT_DOMAINS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === PRODUCT_DOMAINS.length - 1 ? 0 : prev + 1));
  };

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAllModalOpen) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAllModalOpen]);

  // Filter for modal search
  const modalFilteredDomains = PRODUCT_DOMAINS.filter(
    (d) =>
      d.title.toLowerCase().includes(modalSearch.toLowerCase()) ||
      d.discipline.toLowerCase().includes(modalSearch.toLowerCase()) ||
      d.purpose.toLowerCase().includes(modalSearch.toLowerCase())
  );

  // Sidebar domains (First 8 domains displayed in sidebar + View All button)
  const sidebarDomains = PRODUCT_DOMAINS.slice(0, 8);

  // Bottom carousel domains (First 8 domains + View All card)
  const bottomDomains = PRODUCT_DOMAINS.slice(0, 8);

  return (
    <div className="pt-28 pb-20 min-h-screen transition-colors duration-400" style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}>
      <div className="seiko-container space-y-12">
        
        {/* ═══ SECTION 1: HEADER & BREADCRUMB ═══ */}
        <div className="pt-4 space-y-3">
          <div className="flex items-center gap-2 text-[11px] font-mono font-semibold tracking-wider text-[var(--accent-primary)] uppercase">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
            <span>SHOP / DOMAINS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Fraunces'] tracking-tight text-[var(--text-primary)] leading-[1.1]">
            Explore 20+ Product Domains
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl leading-relaxed">
            Choose a domain to explore specialized engineering kits and build real-world innovations.
          </p>
        </div>

        {/* ═══ SECTION 2: MAIN SHOWCASE HERO STAGE ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Domain Selector Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div 
              className="p-3.5 rounded-[28px] border shadow-sm space-y-2 flex flex-col justify-between h-full"
              style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
            >
              <div className="space-y-1.5">
                {sidebarDomains.map((domain, idx) => {
                  const isActive = activeIndex === idx;

                  return (
                    <button
                      key={domain.slug}
                      onClick={() => handleSelectDomain(idx)}
                      className={`w-full p-2.5 sm:p-3 rounded-2xl flex items-center justify-between text-left transition-all duration-300 group ${
                        isActive
                          ? "bg-[#5C6B38] text-white shadow-md"
                          : "text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div 
                          className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 transition-transform ${
                            isActive ? "bg-white/20 text-white" : ""
                          }`}
                          style={{
                            backgroundColor: isActive ? "rgba(255, 255, 255, 0.2)" : `${domain.color}15`,
                            color: isActive ? "#FFFFFF" : domain.color
                          }}
                        >
                          <i className={`bi ${domain.icon}`} />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold truncate">
                          {domain.title}
                        </span>
                      </div>

                      <ChevronRight 
                        className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                          isActive ? "text-white" : "text-[var(--text-tertiary)]"
                        }`} 
                      />
                    </button>
                  );
                })}
              </div>

              {/* View All 20 Domains Button */}
              <button
                onClick={() => setIsAllModalOpen(true)}
                className="w-full py-3 px-4 rounded-2xl border text-xs font-bold text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors flex items-center justify-center gap-2 mt-2 group"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                <Grid className="w-4 h-4 text-[var(--accent-primary)] group-hover:rotate-12 transition-transform" />
                <span>View All 20 Domains</span>
              </button>
            </div>
          </div>

          {/* Right Column: Featured Domain Stage */}
          <div className="lg:col-span-8 xl:col-span-9 relative flex items-center">
            
            {/* Prev Arrow Button */}
            <button
              onClick={handlePrev}
              className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full shadow-lg border items-center justify-center z-20 hover:scale-110 active:scale-95 transition-all duration-200"
              style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}
              aria-label="Previous Domain"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Arrow Button */}
            <button
              onClick={handleNext}
              className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full shadow-lg border items-center justify-center z-20 hover:scale-110 active:scale-95 transition-all duration-200"
              style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}
              aria-label="Next Domain"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Featured Domain Showcase Card */}
            <div 
              className="w-full rounded-[36px] border p-6 sm:p-10 shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[460px] animate-fadeInUp"
              style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Showcase Info */}
                <div className="lg:col-span-6 space-y-6">
                  
                  {/* Index Badge */}
                  <div className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider" style={{ backgroundColor: "var(--bg-surface-2)", color: "var(--text-secondary)" }}>
                    {String(activeIndex + 1).padStart(2, "0")} / {PRODUCT_DOMAINS.length}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Fraunces'] tracking-tight text-[var(--text-primary)] leading-[1.1]">
                      {activeDomain.title}
                    </h2>
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-md font-medium">
                      {activeDomain.tagline || activeDomain.purpose}
                    </p>
                  </div>

                  {/* 3 Value Pillars */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {/* Pillar 1 */}
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center bg-[#8A965E20] text-[#5C6B38] dark:text-[#8A965E] shadow-2xs">
                        <Wrench className="w-5 h-5" />
                      </div>
                      <div className="text-[11px] font-semibold text-[var(--text-primary)] leading-tight">
                        Hands-on<br /><span className="text-[var(--text-secondary)] font-normal">Learning</span>
                      </div>
                    </div>

                    {/* Pillar 2 */}
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center bg-[#F2994A20] text-[#D97724] shadow-2xs">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div className="text-[11px] font-semibold text-[var(--text-primary)] leading-tight">
                        Industry Grade<br /><span className="text-[var(--text-secondary)] font-normal">Components</span>
                      </div>
                    </div>

                    {/* Pillar 3 */}
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center bg-[#5C6B3820] text-[#5C6B38] dark:text-[#C2CA9F] shadow-2xs">
                        <Target className="w-5 h-5" />
                      </div>
                      <div className="text-[11px] font-semibold text-[var(--text-primary)] leading-tight">
                        Real-world<br /><span className="text-[var(--text-secondary)] font-normal">Applications</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-2">
                    <Link
                      href={`/${activeDomain.slug}`}
                      className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold text-white bg-[#5C6B38] hover:bg-[#4E5B2E] transition-all duration-300 shadow-md hover:shadow-lg hover:gap-3.5"
                    >
                      <span>Explore {activeDomain.title} Kits</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                </div>

                {/* Right Showcase Hardware Image Stage */}
                <div className="lg:col-span-6 flex items-center justify-center">
                  <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden flex items-center justify-center p-2 group">
                    <img
                      src={activeDomain.image}
                      alt={activeDomain.title}
                      className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 shadow-sm"
                    />
                  </div>
                </div>

              </div>

              {/* Bottom Pagination Dots */}
              <div className="flex items-center justify-center gap-2 pt-6">
                {PRODUCT_DOMAINS.slice(0, 8).map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => handleSelectDomain(dotIdx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === dotIdx
                        ? "w-7 bg-[#5C6B38]"
                        : "w-2 bg-[var(--border-default)] hover:bg-[var(--text-tertiary)]"
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* ═══ SECTION 3: ALL PRODUCT DOMAINS CAROUSEL ═══ */}
        <div className="space-y-6 pt-4">
          
          {/* Section Centered Title */}
          <div className="flex items-center justify-center gap-2 text-center">
            <Sparkles className="w-4 h-4 text-[#8A965E]" />
            <h2 className="text-xl sm:text-2xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
              All Product Domains
            </h2>
            <Sparkles className="w-4 h-4 text-[#8A965E]" />
          </div>

          {/* Horizontal Card Row */}
          <div className="relative flex items-center">
            <div 
              ref={bottomCarouselRef}
              className="flex items-center gap-4 overflow-x-auto pb-4 pt-1 px-1 scrollbar-none w-full justify-start md:justify-center"
            >
              {bottomDomains.map((domain, idx) => {
                const isSelected = activeIndex === idx;

                return (
                  <button
                    key={domain.slug}
                    onClick={() => handleSelectDomain(idx)}
                    className={`flex-shrink-0 w-32 sm:w-36 p-4 rounded-2xl border text-center flex flex-col items-center justify-between gap-3 transition-all duration-300 group hover:-translate-y-1 ${
                      isSelected
                        ? "border-[#5C6B38] ring-2 ring-[#5C6B38]/30 shadow-md scale-105"
                        : "border-[var(--border-subtle)] hover:border-[var(--border-default)]"
                    }`}
                    style={{ backgroundColor: isSelected ? "var(--bg-surface-2)" : "var(--bg-surface-1)" }}
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${domain.color}20`, color: domain.color }}
                    >
                      <i className={`bi ${domain.icon}`} />
                    </div>
                    <span className="text-xs font-bold text-[var(--text-primary)] leading-tight line-clamp-2">
                      {domain.shortLabel || domain.title}
                    </span>
                  </button>
                );
              })}

              {/* View All Card */}
              <button
                onClick={() => setIsAllModalOpen(true)}
                className="flex-shrink-0 w-32 sm:w-36 p-4 rounded-2xl border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] text-center flex flex-col items-center justify-between gap-3 transition-all duration-300 group hover:-translate-y-1"
                style={{ backgroundColor: "var(--bg-surface-1)" }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg bg-[var(--accent-primary-glow)] text-[var(--accent-primary)] transition-transform group-hover:rotate-12">
                  <Grid className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[var(--text-primary)] leading-tight">
                  View All
                </span>
              </button>

              {/* Next Arrow Button for Carousel */}
              <button
                onClick={handleNext}
                className="flex-shrink-0 w-10 h-10 rounded-full border shadow-sm flex items-center justify-center text-[var(--text-primary)] hover:scale-110 transition-transform ml-2"
                style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
                aria-label="Next Carousel Item"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* ═══ MODAL: VIEW ALL 20 DOMAINS FULL GRID ═══ */}
        {isAllModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
            <div 
              className="w-full max-w-5xl max-h-[90vh] rounded-[36px] border shadow-2xl flex flex-col overflow-hidden animate-scaleUp"
              style={{ backgroundColor: "var(--bg-page)", borderColor: "var(--border-default)" }}
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 border-b flex items-center justify-between" style={{ borderColor: "var(--border-subtle)" }}>
                <div>
                  <h3 className="text-2xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
                    All 20 Product Domains
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Select any engineering discipline to view full specifications and hardware tracks.
                  </p>
                </div>
                <button
                  onClick={() => setIsAllModalOpen(false)}
                  className="w-10 h-10 rounded-full border flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                  style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Search Bar */}
              <div className="p-4 sm:px-8 border-b" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search all 20 domains by name or technology..."
                    value={modalSearch}
                    onChange={(e) => setModalSearch(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 rounded-2xl border text-xs text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none focus:border-[var(--accent-primary)] transition-colors"
                    style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}
                  />
                  <Search className="w-4 h-4 text-[var(--text-tertiary)] absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Modal Grid of All 20 Domains */}
              <div className="p-6 sm:p-8 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {modalFilteredDomains.map((domain, index) => (
                  <Link
                    key={domain.slug}
                    href={`/${domain.slug}`}
                    onClick={() => setIsAllModalOpen(false)}
                    className="p-4 rounded-2xl border flex flex-col justify-between gap-3 group hover:-translate-y-1 transition-all duration-300"
                    style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
                  >
                    <div className="flex items-center justify-between">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${domain.color}20`, color: domain.color }}
                      >
                        <i className={`bi ${domain.icon}`} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[var(--text-tertiary)]">
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                        {domain.title}
                      </h4>
                      <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 mt-1 leading-snug">
                        {domain.tagline || domain.purpose}
                      </p>
                    </div>

                    <div className="pt-2 border-t flex items-center justify-between text-xs font-semibold text-[var(--accent-primary)]" style={{ borderColor: "var(--border-subtle)" }}>
                      <span>View Track</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
