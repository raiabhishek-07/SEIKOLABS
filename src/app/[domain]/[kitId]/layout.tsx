"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getKitById } from "@/data/kits/registry";
import { PRODUCT_DOMAINS } from "@/data/domains";
import { 
  Sparkles, 
  Wrench, 
  FileText, 
  BookOpen, 
  Award, 
  ArrowLeft,
  ChevronRight,
  PanelRightClose,
  PanelRightOpen,
  Play,
  ShoppingBag,
  Star
} from "lucide-react";

export default function KitHubLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ domain: string; kitId: string }>;
}) {
  const resolvedParams = use(params);
  const pathname = usePathname();

  // State to open/close the right sidebar in studio sub-pages
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const domain = PRODUCT_DOMAINS.find((d) => d.slug === resolvedParams.domain) || PRODUCT_DOMAINS[0];
  const kitData = getKitById(resolvedParams.kitId, resolvedParams.domain);

  const isLessonsRoute = pathname.includes("/lessons");

  // If we are directly on the interactive lesson player, render children directly with fluid 1440px container
  if (isLessonsRoute) {
    return (
      <div className="pt-20 sm:pt-24 pb-16 min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}>
        <div className="w-[min(100%-48px,1440px)] mx-auto">
          {children}
        </div>
      </div>
    );
  }

  const basePath = `/${resolvedParams.domain}/${resolvedParams.kitId}`;

  // 5 Essential Sections
  const navItems = [
    {
      id: "overview",
      label: "Overview & Specs",
      icon: Sparkles,
      href: basePath,
      isActive: pathname === basePath
    },
    {
      id: "components",
      label: `Component Inventory (${kitData.components.length} Parts)`,
      icon: Wrench,
      href: `${basePath}/components`,
      isActive: pathname.startsWith(`${basePath}/components`)
    },
    {
      id: "docs",
      label: "Documentation & Schematics",
      icon: FileText,
      href: `${basePath}/docs`,
      isActive: pathname.startsWith(`${basePath}/docs`)
    },
    {
      id: "curriculum",
      label: `Curriculum (${kitData.curriculum.length} Modules)`,
      icon: BookOpen,
      href: `${basePath}/curriculum`,
      isActive: pathname.startsWith(`${basePath}/curriculum`)
    },
    {
      id: "assessments",
      label: "Assessments & Quiz",
      icon: Award,
      href: `${basePath}/assessments`,
      isActive: pathname.startsWith(`${basePath}/assessments`)
    }
  ];

  const currentTab = navItems.find((n) => n.isActive) || navItems[0];

  return (
    <div className="pt-22 sm:pt-26 pb-20 min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}>
      <div className="w-[min(100%-48px,1440px)] mx-auto space-y-6">
        
        {/* ═══ COMPACT, ELEGANT BREADCRUMB BAR ═══ */}
        <header className="flex items-center justify-between py-2 border-b border-[var(--border-subtle)]">
          
          {/* Clean Left Breadcrumb (Single Line, 11-12px) */}
          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] min-w-0">
            <Link 
              href={`/${domain.slug}`}
              className="inline-flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{domain.title}</span>
            </Link>
            <span className="text-[var(--text-tertiary)]">/</span>
            <span className="font-semibold text-[var(--text-primary)] truncate max-w-[180px] sm:max-w-md">
              {kitData.name}
            </span>
            <span className="text-[var(--text-tertiary)] hidden sm:inline">/</span>
            <span className="text-[11px] font-mono text-[#5C6B38] hidden sm:inline font-semibold">
              {currentTab.label}
            </span>
          </div>

          {/* Clean Right Actions & Sidebar Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href={`/${domain.slug}/${kitData.kitId}/lessons`}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E] transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>Lesson Player</span>
            </Link>

            {/* Sidebar Toggle Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="px-3 py-1.5 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-1)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center gap-1.5"
              title={isSidebarOpen ? "Collapse Sidebar for Full Width" : "Open Navigation Sidebar"}
            >
              {isSidebarOpen ? (
                <>
                  <PanelRightClose className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Hide Menu</span>
                </>
              ) : (
                <>
                  <PanelRightOpen className="w-3.5 h-3.5 text-[#5C6B38]" />
                  <span className="font-semibold text-[#5C6B38]">Menu</span>
                </>
              )}
            </button>
          </div>

        </header>

        {/* ═══ FLUID 2-COLUMN STUDIO WORKSPACE ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative">
          
          {/* ════ MAIN CONTENT CANVAS ════ */}
          <main className={`min-w-0 transition-all duration-300 ${isSidebarOpen ? "lg:col-span-8 xl:col-span-9" : "lg:col-span-12"}`}>
            {children}
          </main>

          {/* ════ RIGHT SIDEBAR ════ */}
          {isSidebarOpen && (
            <aside className="lg:col-span-4 xl:col-span-3 space-y-4 lg:sticky lg:top-24 animate-fadeIn shrink-0">
              
              {/* Navigation Menu Card */}
              <div 
                className="p-4 rounded-2xl border space-y-2.5 shadow-2xs"
                style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
              >
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                  <span className="text-[10px] font-mono font-bold text-[var(--text-tertiary)] uppercase tracking-wider">
                    SECTIONS
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                    {navItems.length} Topics
                  </span>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = item.isActive;

                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={`w-full p-2.5 rounded-xl text-xs transition-all flex items-center gap-2.5 ${
                          active
                            ? "bg-[#5C6B38] text-white font-semibold shadow-xs"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]"
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${active ? "text-white" : "text-[var(--text-tertiary)]"}`} />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Kit Summary Card */}
              <div 
                className="p-3.5 rounded-2xl border space-y-2.5"
                style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
              >
                <div className="aspect-[16/10] rounded-xl overflow-hidden border p-1" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                  <img
                    src={kitData.image}
                    alt={kitData.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[var(--text-primary)] leading-snug">
                    {kitData.name}
                  </h3>
                  <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5 line-clamp-2 leading-relaxed">
                    {kitData.tagline}
                  </p>
                </div>
              </div>

            </aside>
          )}

        </div>

      </div>
    </div>
  );
}
