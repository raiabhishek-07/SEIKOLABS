"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t text-xs py-12 transition-colors duration-400" style={{ backgroundColor: "var(--bg-page-alt)", borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}>
      <div className="seiko-container space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-3">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
                SEIKO <span className="text-[var(--accent-secondary)]">LABS</span>
              </span>
            </Link>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-sm">
              Empowering learners to build, innovate and create with hands-on STEM kits.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1 text-[var(--text-primary)]">
              <a href="#" className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-[var(--accent-primary)] hover:text-white transition-colors" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }} title="Facebook">
                <i className="bi bi-facebook text-xs" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-[var(--accent-primary)] hover:text-white transition-colors" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }} title="Instagram">
                <i className="bi bi-instagram text-xs" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-[var(--accent-primary)] hover:text-white transition-colors" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }} title="YouTube">
                <i className="bi bi-youtube text-xs" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-[var(--accent-primary)] hover:text-white transition-colors" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }} title="Twitter / X">
                <i className="bi bi-twitter-x text-xs" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider font-mono">Quick Links</h4>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li><Link href="/products" className="hover:text-[var(--accent-primary)] transition-colors">Shop</Link></li>
              <li><Link href="/about" className="hover:text-[var(--accent-primary)] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--accent-primary)] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider font-mono">Support</h4>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li><Link href="/contact" className="hover:text-[var(--accent-primary)] transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--accent-primary)] transition-colors">Shipping &amp; Returns</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--accent-primary)] transition-colors">Track Order</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--accent-primary)] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Policy Bar */}
        <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[var(--text-tertiary)]" style={{ borderColor: "var(--border-subtle)" }}>
          <p>&copy; {new Date().getFullYear()} SEIKO Labs. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-[var(--text-primary)] transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-[var(--text-primary)] transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
