"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState("General Enquiries");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const inquiryOptions = [
    { label: "General Enquiries", icon: "bi-chat-dots" },
    { label: "Product Support", icon: "bi-headset" },
    { label: "School / Institutional", icon: "bi-mortarboard" },
    { label: "Partnerships", icon: "bi-people" }
  ];

  const contactCards = [
    {
      title: "Global Support Email",
      value: "hello@seikolabs.com",
      sub: "Average response under 2 hours",
      icon: "bi-envelope-check"
    },
    {
      title: "Hardware Hotline",
      value: "+1 (800) 735-6522",
      sub: "Mon–Fri, 9am–6pm PST",
      icon: "bi-telephone"
    },
    {
      title: "Headquarters",
      value: "San Francisco, CA",
      sub: "USA Engineering HQ",
      icon: "bi-geo-alt"
    },
    {
      title: "Live Tech Response",
      value: "< 2 Hours",
      sub: "7 days a week customer care",
      icon: "bi-clock-history"
    }
  ];

  const faqs = [
    {
      q: "Do you offer institutional discounts for schools & universities?",
      a: "Yes! We provide tiered bulk discounts (10-Kit Lab, 30-Kit STEM Lab, and Custom University Engineering Packages) complete with teacher curriculum guides and component replenishment packs. Select 'School / Institutional' in the form above to request a custom quote."
    },
    {
      q: "Is soldering required for SEIKO LABS kits?",
      a: "No! All our starter, intermediate, and advanced kits utilize 100% safe, high-quality solderless breadboards, pre-crimped jumper wires, and plug-and-play breakout modules — making them perfect for classrooms and beginners."
    },
    {
      q: "What programming languages and environments are supported?",
      a: "Our kits support C/C++ via the official Arduino IDE, MicroPython, and JavaScript/Node.js for IoT kits. Detailed code libraries and step-by-step installation guides are provided for Windows, macOS, and Linux."
    },
    {
      q: "What if a component or sensor arrives damaged?",
      a: "Every kit includes our 1-Year Free Hardware Component Replacement Warranty. If any micro-servo, sensor, or microcontroller is defective, we ship a free replacement immediately with zero hassle."
    },
    {
      q: "Can I download user manuals and project lists before buying?",
      a: "Absolutely! You can view and download complete 120-page project manuals and project lists directly on our Products catalog page or by selecting 'Product Support' above."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div
      className="pt-32 pb-28 min-h-screen transition-colors duration-400"
      style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}
    >
      <div className="seiko-container space-y-16 animate-fade-in-up">
        
        {/* 1. Page Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="section-dot"></span>
            <span className="text-eyebrow">GET IN TOUCH</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-['DM_Sans'] text-[var(--text-primary)]">
            Let&apos;s build together.
          </h1>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Whether you need product support, curriculum details for your school, or custom hardware inquiries, our team is here to help.
          </p>
        </div>

        {/* 2. Direct Contact Info Cards (CNT-01) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactCards.map((c, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl border space-y-3 card hover-lift"
              style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
            >
              <div
                className="w-10 h-10 rounded-2xl border flex items-center justify-center"
                style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}
              >
                <i className={`bi ${c.icon} text-lg text-[var(--accent-primary)]`}></i>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] font-mono">{c.title}</span>
                <h3 className="text-sm font-bold font-['DM_Sans'] text-[var(--text-primary)] mt-0.5">{c.value}</h3>
                <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">{c.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Form Container & Quick Links Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Inquiry Form */}
          <div
            className="lg:col-span-8 p-8 rounded-3xl border space-y-8 card shadow-md"
            style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
          >
            
            {/* Inquiry Options Selection (CNT-05) */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] font-mono">
                Select Enquiry Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {inquiryOptions.map((opt) => (
                  <button
                    type="button"
                    key={opt.label}
                    onClick={() => setInquiryType(opt.label)}
                    className={`p-3.5 rounded-2xl border text-xs font-semibold text-left transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                      inquiryType === opt.label
                        ? "bg-[var(--accent-primary)] text-white border-[var(--accent-primary)] shadow-sm scale-[1.02]"
                        : "bg-[var(--bg-page)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-default)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <i className={`bi ${opt.icon} text-sm ${inquiryType === opt.label ? "text-white" : "text-[var(--accent-primary)]"}`}></i>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {submitted ? (
              /* Success Celebration Burst (CNT-04) */
              <div className="py-12 text-center space-y-4 animate-scale-in">
                <div className="w-16 h-16 rounded-full bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)] flex items-center justify-center mx-auto text-[var(--accent-primary)]">
                  <i className="bi bi-check-circle-fill text-3xl animate-bounce"></i>
                </div>
                <h3 className="text-2xl font-bold font-['DM_Sans'] text-[var(--text-primary)]">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out regarding <span className="font-semibold text-[var(--text-primary)]">{inquiryType}</span>. Our hardware engineers will respond to <span className="font-mono text-[var(--text-primary)]">{formData.email}</span> within 2 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", message: "" });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl seiko-primary-btn text-xs font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[var(--text-secondary)]">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border text-xs outline-none transition-all duration-200"
                      style={{ backgroundColor: "var(--bg-page)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[var(--text-secondary)]">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border text-xs outline-none transition-all duration-200"
                      style={{ backgroundColor: "var(--bg-page)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}
                    />
                  </div>
                </div>

                {/* Message Field with Real-Time Character Counter (CNT-03) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-medium text-[var(--text-secondary)]">Message</label>
                    <span className={`font-mono text-[10px] ${formData.message.length > 450 ? "text-[var(--accent-secondary)] font-bold" : "text-[var(--text-tertiary)]"}`}>
                      {formData.message.length} / 500 characters
                    </span>
                  </div>
                  <textarea
                    rows={5}
                    maxLength={500}
                    required
                    placeholder="How can our hardware team help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border text-xs outline-none resize-none transition-all duration-200"
                    style={{ backgroundColor: "var(--bg-page)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-2 shadow-sm seiko-primary-btn"
                >
                  <span>Send Message to SEIKO Team</span>
                  <i className="bi bi-send text-xs"></i>
                </button>
              </form>
            )}

          </div>

          {/* Quick Support Links & Fast Help (CNT-06) */}
          <div className="lg:col-span-4 space-y-6">
            <div
              className="p-6 rounded-3xl border space-y-4 card"
              style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
            >
              <div className="flex items-center gap-2 text-xs font-bold font-['DM_Sans'] text-[var(--text-primary)]">
                <i className="bi bi-lightning-charge text-[var(--accent-secondary)] text-base"></i>
                <span>Direct Support Triggers</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Need immediate help with manuals or bulk school orders? Use quick links below:
              </p>
              <div className="space-y-2 pt-1">
                <Link
                  href="/products"
                  className="w-full p-3 rounded-xl border flex items-center justify-between text-xs font-semibold text-[var(--text-primary)] bg-[var(--bg-page)] hover:bg-[var(--bg-surface-2)] transition-colors"
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  <span>Browse STEM Catalog</span>
                  <i className="bi bi-arrow-right text-xs"></i>
                </Link>
                <Link
                  href="/products"
                  className="w-full p-3 rounded-xl border flex items-center justify-between text-xs font-semibold text-[var(--text-primary)] bg-[var(--bg-page)] hover:bg-[var(--bg-surface-2)] transition-colors"
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  <span>Download PDF Manuals</span>
                  <i className="bi bi-file-earmark-pdf text-xs"></i>
                </Link>
              </div>
            </div>

            <div
              className="p-6 rounded-3xl border space-y-3 card"
              style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
            >
              <div className="text-xs font-mono text-[var(--accent-primary)] font-bold uppercase">100% Warranty Guarantee</div>
              <h4 className="text-sm font-bold font-['DM_Sans'] text-[var(--text-primary)]">Free Replacement Guarantee</h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Accidentally burned an LED or damaged a motor driver while learning? We replace individual components free of charge.
              </p>
            </div>
          </div>

        </div>

        {/* 4. Searchable FAQ Accordion Section (CNT-02) */}
        <section className="space-y-8 pt-8 border-t animate-fade-in-up" style={{ borderColor: "var(--border-subtle)" }}>
          <div className="space-y-2 max-w-xl">
            <span className="text-eyebrow">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="text-3xl font-bold font-['DM_Sans'] text-[var(--text-primary)]">
              Got questions? We have answers.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border overflow-hidden transition-all duration-300 card"
                  style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm font-bold font-['DM_Sans'] text-[var(--text-primary)]">
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-[var(--accent-primary)] text-white border-[var(--accent-primary)]" : "bg-[var(--bg-page)] text-[var(--text-secondary)] border-[var(--border-subtle)]"}`}
                    >
                      <i className="bi bi-chevron-down text-xs"></i>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs text-[var(--text-secondary)] leading-relaxed border-t" style={{ borderColor: "var(--border-subtle)" }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
