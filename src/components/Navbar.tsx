"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { X, Menu, ShoppingBag, ArrowRight, ChevronRight } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { cart, setIsCartOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "/", icon: "bi-house" },
    { label: "Shop", href: "/products", icon: "bi-box-seam" },
    { label: "About Us", href: "/about", icon: "bi-info-circle" },
    { label: "Contact", href: "/contact", icon: "bi-envelope" },
  ];

  return (
    <>
      <header className={scrolled ? "fixed top-0 left-0 right-0 z-40 py-2.5 transition-all duration-300 seiko-header-scrolled shadow-xs" : "fixed top-0 left-0 right-0 z-40 py-3.5 transition-all duration-300 bg-transparent"}>
        <div className="w-[min(100%-48px,1440px)] mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">

          {/* Logo — Fraunces Serif for Brand Presence */}
          <Link href="/" className="flex items-center gap-1.5 group">
            <span className="text-2xl font-bold tracking-tight font-['Fraunces'] text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors duration-300">
              SEIKO
            </span>
            <span className="text-2xl font-bold tracking-tight font-['Fraunces'] text-[var(--accent-secondary)]">
              LABS
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href === "/products" && pathname.startsWith("/products"));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                    isActive
                      ? "text-[#2C241B] font-semibold"
                      : "text-[#6B5E52] hover:text-[#2C241B]"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-[#E88A58]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Desktop: Cart + Theme toggle + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/cart"
              className="p-2.5 rounded-xl border relative text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors cursor-pointer"
              style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
              aria-label="Open cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--accent-primary)] text-white text-[9px] font-bold flex items-center justify-center font-mono">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <ThemeToggle />

            <Link
              href="/products"
              className="seiko-primary-btn px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Right Bar */}
          <div className="md:hidden flex items-center gap-3">
            <Link
              href="/cart"
              className="p-2 rounded-xl border relative text-[var(--text-primary)] bg-[var(--bg-surface-1)] border-[var(--border-subtle)]"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--accent-primary)] text-white text-[9px] font-bold flex items-center justify-center font-mono">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <ThemeToggle />

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl border text-[var(--text-primary)] bg-[var(--bg-surface-1)] border-[var(--border-subtle)]"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Backdrop & Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide Drawer Content Box */}
          <div className="relative w-full max-w-xs h-full bg-[var(--bg-surface-1)] border-l border-[var(--border-subtle)] p-6 flex flex-col justify-between overflow-y-auto shadow-2xl z-10 animate-fade-in-right">
            
            <div className="space-y-6">
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-1">
                  <span className="text-xl font-bold font-['Fraunces'] text-[var(--text-primary)]">SEIKO</span>
                  <span className="text-xl font-bold font-['Fraunces'] text-[var(--accent-secondary)]">LABS</span>
                </Link>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl border text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Section */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-tertiary)] px-2">
                  Navigation Menu
                </span>
                
                <nav className="flex flex-col space-y-1 pt-1">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href || (link.href === "/products" && pathname.startsWith("/products"));
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`px-3.5 py-3 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${
                          isActive
                            ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-semibold border border-[var(--accent-primary)]/20"
                            : "text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <i className={`bi ${link.icon} text-base ${isActive ? "text-[var(--accent-primary)]" : "text-[var(--text-tertiary)]"}`} />
                          <span>{link.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-40" />
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[var(--border-subtle)] space-y-3">
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="seiko-primary-btn w-full py-3 rounded-xl text-center text-xs font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <div className="text-[10px] text-center font-mono text-[var(--text-tertiary)] pt-1">
                SEIKO LABS STEM Hardware Platform
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
