"use client";

import React, { use } from "react";
import Link from "next/link";
import { PRODUCT_DOMAINS } from "@/data/domains";
import { STEM_KITS_CATALOG, KitProduct } from "@/data/products";
import { useApp } from "@/context/AppContext";
import { 
  ArrowLeft, 
  ArrowRight, 
  ChevronRight, 
  Sparkles, 
  Cpu, 
  Layers, 
  Box, 
  ShoppingBag,
  Star,
  ShieldCheck
} from "lucide-react";

export default function DomainDetailPage({ params }: { params: Promise<{ domain: string }> }) {
  const resolvedParams = use(params);
  const { addToCart, setIsCartOpen } = useApp();

  const domain = PRODUCT_DOMAINS.find((d) => d.slug === resolvedParams.domain);

  if (!domain) {
    return (
      <div className="pt-40 pb-24 text-center space-y-4 min-h-screen px-4" style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}>
        <i className="bi bi-compass text-4xl text-[var(--text-tertiary)] block" />
        <h1 className="text-2xl font-bold font-['Fraunces'] text-[var(--text-primary)]">Discipline Not Found</h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto">
          The engineering track you are looking for does not exist or has been relocated.
        </p>
        <Link href="/products" className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary-deep)] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Disciplines</span>
        </Link>
      </div>
    );
  }

  // Find kits mapped to this domain
  const mappedKits = STEM_KITS_CATALOG.filter((k) => k.domainSlug === domain.slug);
  const primaryKit = mappedKits[0] || STEM_KITS_CATALOG[0];

  // Related other domains to explore
  const otherDomains = PRODUCT_DOMAINS.filter((d) => d.slug !== domain.slug).slice(0, 4);

  const handleAddToCart = (product: KitProduct, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <div className="pt-36 sm:pt-40 pb-24 min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}>
      <div className="seiko-container space-y-10">
        
        {/* ═══ BREADCRUMB ═══ */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[var(--text-tertiary)]">
          <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/products" className="hover:text-[var(--text-primary)] transition-colors">Disciplines</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[var(--text-primary)] font-semibold">{domain.title}</span>
        </nav>

        {/* ═══ SECTION 1: CLEAN RESPONSIVE HERO ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-mono font-medium" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: domain.color }} />
              <span className="text-[var(--text-primary)]">{domain.discipline}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-['Fraunces'] tracking-tight text-[var(--text-primary)] leading-tight">
              {domain.title}
            </h1>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl leading-relaxed">
              {domain.purpose}
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono px-3 py-1 rounded-lg border text-[var(--text-secondary)]" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                Audience: {domain.targetAudience}
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-lg border text-[var(--text-secondary)]" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                Track: {domain.featuredKits.length} Core Kit
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm aspect-[4/3] rounded-2xl border p-2 shadow-sm overflow-hidden group" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
              <img
                src={domain.image}
                alt={domain.title}
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
              />
              <div 
                className="absolute top-4 left-4 w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow-sm backdrop-blur-md"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", color: domain.color }}
              >
                <i className={`bi ${domain.icon}`} />
              </div>
            </div>
          </div>

        </div>

        {/* ═══ SECTION 2: BENTO GRID - APPLICATIONS & HARDWARE ARCHITECTURE ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Applications Column */}
          <div className="md:col-span-7 p-6 sm:p-7 rounded-2xl border space-y-4 flex flex-col justify-between" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm bg-[var(--accent-primary-glow)] text-[var(--accent-primary)]">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold font-['Fraunces'] text-[var(--text-primary)]">
                    Industry &amp; Practical Applications
                  </h2>
                  <p className="text-[11px] text-[var(--text-tertiary)]">Real-world implementation of this engineering discipline</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {domain.applications.map((app, i) => (
                  <div key={i} className="p-3.5 rounded-xl border flex items-start gap-2.5" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                    <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: domain.color }} />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold font-['Fraunces'] text-[var(--text-primary)] leading-snug">{app}</h3>
                      <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5 leading-normal">
                        Real-world circuit testing &amp; hardware simulation
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-xs text-[var(--text-tertiary)] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span>Integrated into structured lab curriculum</span>
            </div>
          </div>

          {/* Component Hardware Stack */}
          <div className="md:col-span-5 p-6 sm:p-7 rounded-2xl border space-y-4 flex flex-col justify-between" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm bg-[var(--accent-secondary-glow)] text-[var(--accent-secondary)]">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold font-['Fraunces'] text-[var(--text-primary)]">
                    Hardware Architecture
                  </h2>
                  <p className="text-[11px] text-[var(--text-tertiary)]">Integrated controllers, drivers &amp; power modules</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {domain.hardwareComponents.map((comp, idx) => (
                  <span 
                    key={idx}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg border font-medium text-[var(--text-primary)]"
                    style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl border flex items-center gap-2.5" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
              <ShieldCheck className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
              <p className="text-xs text-[var(--text-secondary)] leading-tight">
                100% Solderless, low-voltage (3.3V/5V) safe breadboard prototyping.
              </p>
            </div>
          </div>

        </div>

        {/* ═══ SECTION 3: RESPONSIVE HORIZONTAL HARDWARE KIT SHOWCASE ═══ */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--accent-primary)] uppercase">
                <Box className="w-3.5 h-3.5" />
                <span>PRIMARY HARDWARE KIT</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-['Fraunces'] text-[var(--text-primary)] mt-0.5">
                Hardware Kit for this Track
              </h2>
            </div>

            <span className="text-xs font-mono px-3 py-1 rounded-full border text-[var(--text-secondary)]" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
              1 Kit Available
            </span>
          </div>

          {/* Wide Landscape Kit Card */}
          <div 
            className="p-6 sm:p-8 rounded-3xl border shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center group hover:shadow-md transition-all duration-300"
            style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
          >
            {/* Left Image Column */}
            <div className="lg:col-span-5 relative aspect-[16/11] rounded-xl overflow-hidden border p-1.5 flex items-center justify-center" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
              <img
                src={domain.image}
                alt={domain.featuredKits[0] || domain.title}
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#5C6B38] text-white shadow-xs">
                FLAGSHIP LAB
              </span>
              <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[#E8A838] font-bold text-xs bg-black/70 px-2 py-0.5 rounded-full text-white backdrop-blur-md">
                <Star className="w-3 h-3 fill-[#E8A838]" />
                <span>4.9</span>
              </div>
            </div>

            {/* Right Info Column */}
            <div className="lg:col-span-7 space-y-3.5 flex flex-col justify-between h-full">
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-[var(--accent-primary)] font-semibold uppercase">
                  {domain.discipline}
                </span>

                <h3 className="text-lg sm:text-xl font-bold font-['Fraunces'] text-[var(--text-primary)] leading-snug">
                  <Link href={`/${domain.slug}/${primaryKit ? primaryKit.id : 'smart-robotics-rover-kit'}`} className="hover:text-[var(--accent-primary)] transition-colors">
                    {domain.featuredKits[0] || primaryKit.name}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                  {domain.tagline || primaryKit.tagline || primaryKit.description}
                </p>
              </div>

              {/* Specs Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-xs font-mono px-2.5 py-1 rounded-lg border text-[var(--text-secondary)]" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                  Level: Beginner / Intermediate
                </span>
                <span className="text-xs font-mono px-2.5 py-1 rounded-lg border text-[var(--text-secondary)]" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                  Age: 10+
                </span>
                <span className="text-xs font-mono px-2.5 py-1 rounded-lg border text-[var(--text-secondary)]" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                  Type-C 2S BMS Fast-Charge
                </span>
              </div>

              {/* Price & Action Buttons */}
              <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-2xl font-bold font-mono text-[var(--text-primary)]">
                    $149
                  </div>
                  <div className="text-[10px] font-mono text-[var(--text-tertiary)]">Complete Solderless Lab Kit</div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <Link
                    href={`/products/${primaryKit ? primaryKit.id : 'smart-robotics-rover-kit'}/pd`}
                    className="px-5 py-2.5 rounded-full text-xs font-bold border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-2)] text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
                  >
                    <span>Product Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={(e) => handleAddToCart(primaryKit, e)}
                    className="px-5 py-2.5 rounded-full text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E] transition-all duration-300 flex items-center gap-1.5 shadow-2xs hover:scale-105"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ SECTION 4: EXPLORE OTHER DISCIPLINES ═══ */}
        <div className="p-6 sm:p-8 rounded-2xl border space-y-4" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-['Fraunces'] text-[var(--text-primary)]">
                Explore Other Engineering Disciplines
              </h2>
              <p className="text-xs text-[var(--text-tertiary)] mt-0.5">Discover cross-disciplinary hardware tracks</p>
            </div>
            <Link
              href="/products"
              className="text-xs font-semibold text-[var(--accent-primary)] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {otherDomains.map((other) => (
              <Link
                key={other.slug}
                href={`/${other.slug}`}
                className="p-3.5 rounded-xl border group hover:-translate-y-0.5 transition-all duration-200"
                style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}
              >
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0"
                    style={{ backgroundColor: `${other.color}20`, color: other.color }}
                  >
                    <i className={`bi ${other.icon}`} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold font-['Fraunces'] text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors truncate">
                      {other.title}
                    </h3>
                    <p className="text-[10px] text-[var(--text-tertiary)] truncate">{other.shortLabel}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
