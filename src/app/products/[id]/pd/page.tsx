"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { STEM_KITS_CATALOG, KitProduct } from "@/data/products";
import { PRODUCT_DOMAINS } from "@/data/domains";
import { getKitById } from "@/data/kits/registry";
import { useApp } from "@/context/AppContext";
import {
  ShoppingBag,
  CheckCircle2,
  Star,
  Download,
  FileText,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  Wrench,
  BookOpen,
  Sparkles,
  Bot,
  Award,
  ShieldCheck,
  Zap,
  Box,
  Layers,
  Cpu,
  Play,
  Tag,
  Percent,
  Truck,
  RotateCcw,
  Check,
  ThumbsUp,
  Clock,
  UserCheck,
  HelpCircle,
  Laptop,
  CheckCircle,
  XCircle,
  Smile
} from "lucide-react";
import { toast } from "sonner";

export default function ProductDescriptionPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { addToCart, setIsCartOpen } = useApp();

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [couponCode, setCouponCode] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountRate: number; amount: number } | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [showStickyBar, setShowStickyBar] = useState<boolean>(false);

  // Lookup kit from catalog or registry
  const kitProduct = STEM_KITS_CATALOG.find((k) => k.id === resolvedParams.id) || STEM_KITS_CATALOG[0];
  const domain = PRODUCT_DOMAINS.find((d) => d.slug === kitProduct.domainSlug) || PRODUCT_DOMAINS[0];
  const kitHubData = getKitById(kitProduct.id, domain.slug);

  // Gallery media
  const galleryImages = [
    kitProduct.image || "/assets/kit-robotics.jpg",
    "/assets/kit-workbench.jpg",
    "/assets/kit-starter.jpg",
    "/assets/kit-iot.jpg"
  ];

  // Pricing calculations
  const basePrice = kitProduct.price;
  const originalPrice = kitProduct.originalPrice;
  const initialDiscount = Math.round(((originalPrice - basePrice) / originalPrice) * 100);

  // Coupon handlers
  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (code === "STEM10" || code === "STEMFIRST10") {
      setAppliedCoupon({ code: "STEM10", discountRate: 0.10, amount: Math.round(basePrice * quantity * 0.10) });
      toast.success("Coupon STEM10 Applied! 10% Extra Discount");
    } else if (code === "SEIKOEDU" || code === "LABS20") {
      setAppliedCoupon({ code: "SEIKOEDU", discountRate: 0, amount: 20 });
      toast.success("Coupon SEIKOEDU Applied! $20 Off Instantly");
    } else {
      toast.error("Invalid coupon code. Try 'STEM10' or 'SEIKOEDU'!");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    toast.info("Coupon removed");
  };

  const subtotal = basePrice * quantity;
  const couponDiscount = appliedCoupon ? (appliedCoupon.discountRate > 0 ? subtotal * appliedCoupon.discountRate : appliedCoupon.amount) : 0;
  const finalPrice = Math.max(0, subtotal - couponDiscount);
  const totalSavings = (originalPrice * quantity) - finalPrice;

  // Add to Cart
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(kitProduct);
    }
    setIsCartOpen(true);
    toast.success(`Added ${quantity}x ${kitProduct.name} to cart!`);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(kitProduct);
    }
    setIsCartOpen(true);
  };

  // Sticky Bar Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 480);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // FAQs Data
  const faqs = [
    {
      q: "Is soldering required for this kit?",
      a: "No soldering is required! All circuit components connect via standard solderless Dupont jumper wires and screw terminals, making it 100% safe for beginners and classroom environments."
    },
    {
      q: "What age group is this kit designed for?",
      a: "SEIKO RoverX is designed for ages 10+ and students/makers. Step-by-step visual guides allow kids to build independently, with adult guidance recommended for younger beginners."
    },
    {
      q: "How long does it take to assemble and test?",
      a: "Mechanical assembly takes about 45–60 minutes. Complete wiring, firmware flashing, and smartphone teleoperation takes 2–4 hours across the 4 learning modules."
    },
    {
      q: "Do I need prior programming experience?",
      a: "No prior experience needed. Pre-written open-source C++ firmware is provided with line-by-line breakdowns and our 24/7 AI tutor guides you through customizing speeds and controls."
    },
    {
      q: "What happens if a component doesn't work or arrives damaged?",
      a: "Every kit includes a 1-Year Free Parts Replacement Warranty. If any motor, wire, or chip is defective, we ship a free replacement immediately."
    }
  ];

  return (
    <div className="pt-28 pb-24 min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}>
      <div className="seiko-container space-y-14">
        
        {/* ═══ 01. BREADCRUMB ═══ */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[var(--text-tertiary)] flex-wrap">
          <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/products" className="hover:text-[var(--text-primary)] transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/${domain.slug}`} className="hover:text-[var(--text-primary)] transition-colors">{domain.title}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[var(--text-primary)] font-semibold truncate max-w-xs">{kitProduct.name}</span>
        </nav>

        {/* ═══ 01. PRODUCT HERO (ABOVE THE FOLD) ═══ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Product Visuals & Thumbnails */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Main Product Showcase Image */}
            <div className="relative aspect-[4/3] rounded-3xl border p-2 shadow-sm overflow-hidden group" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
              <img
                src={galleryImages[selectedImageIndex]}
                alt={kitProduct.name}
                className="w-full h-full object-cover rounded-2xl transition-all duration-300"
              />
              <span className="absolute top-4 left-4 text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-[#5C6B38] text-white shadow-xs">
                {domain.title.toUpperCase()} TRACK
              </span>
              <span className="absolute bottom-4 right-4 text-[10px] font-mono font-bold px-3 py-1 rounded-full backdrop-blur-md bg-black/70 text-white shadow-xs">
                {kitHubData.components.length} Included Parts
              </span>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((imgSrc, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`aspect-square rounded-2xl border p-1 overflow-hidden transition-all cursor-pointer ${
                    selectedImageIndex === idx
                      ? "border-[#5C6B38] ring-2 ring-[#5C6B38]/30 shadow-xs"
                      : "border-[var(--border-subtle)] hover:opacity-80"
                  }`}
                  style={{ backgroundColor: "var(--bg-surface-2)" }}
                >
                  <img src={imgSrc} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover rounded-xl" />
                </button>
              ))}
            </div>

            {/* Trust Badges Strip */}
            <div className="grid grid-cols-3 gap-2.5 pt-2 text-center text-xs">
              <div className="p-3 rounded-2xl border" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
                <Truck className="w-4 h-4 text-[#5C6B38] mx-auto mb-1" />
                <span className="font-semibold block text-[11px]">Free Delivery</span>
                <span className="text-[10px] text-[var(--text-tertiary)]">Ships in 24 Hours</span>
              </div>
              <div className="p-3 rounded-2xl border" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
                <RotateCcw className="w-4 h-4 text-[#5C6B38] mx-auto mb-1" />
                <span className="font-semibold block text-[11px]">7-Day Replacement</span>
                <span className="text-[10px] text-[var(--text-tertiary)]">100% Quality Check</span>
              </div>
              <div className="p-3 rounded-2xl border" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
                <ShieldCheck className="w-4 h-4 text-[#5C6B38] mx-auto mb-1" />
                <span className="font-semibold block text-[11px]">Secure Checkout</span>
                <span className="text-[10px] text-[var(--text-tertiary)]">SSL Encrypted</span>
              </div>
            </div>

          </div>

          {/* Right: Purchase Information & Action */}
          <div className="lg:col-span-6 space-y-5">
            
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[var(--accent-primary)] uppercase">
                  SEIKO LABS • {domain.discipline}
                </span>
                <span className="text-xs text-[var(--text-tertiary)]">•</span>
                <div className="flex items-center gap-1 text-[#E8A838] text-xs font-bold font-mono">
                  <Star className="w-3.5 h-3.5 fill-[#E8A838]" />
                  <span>4.8</span>
                  <span className="text-[var(--text-tertiary)]">(126 reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-['Fraunces'] tracking-tight text-[var(--text-primary)] leading-tight">
                {kitProduct.name}
              </h1>

              {/* One-Line Value Proposition */}
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-medium">
                Build a real working wireless 4WD smart car while learning electronics, circuits and embedded C++ programming.
              </p>
            </div>

            {/* Price Banner */}
            <div className="p-4 rounded-2xl border space-y-1.5" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-mono text-[var(--text-primary)]">
                      ${finalPrice.toFixed(2)}
                    </span>
                    <span className="text-sm font-mono text-[var(--text-tertiary)] line-through">
                      ${(originalPrice * quantity).toFixed(2)}
                    </span>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                      SAVE {initialDiscount}%
                    </span>
                  </div>
                  <div className="text-[11px] text-[var(--text-tertiary)] mt-0.5">
                    Inclusive of all components &amp; taxes • Free standard shipping
                  </div>
                </div>

                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-bold">
                  ● In Stock
                </span>
              </div>

              {appliedCoupon && (
                <div className="text-xs text-emerald-600 font-medium pt-1 border-t border-[var(--border-subtle)] flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Coupon {appliedCoupon.code} applied (-${couponDiscount.toFixed(2)})</span>
                </div>
              )}
            </div>

            {/* Key Benefits Checklist */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5C6B38] shrink-0" />
                <span>Beginner friendly</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5C6B38] shrink-0" />
                <span>Everything included in box</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5C6B38] shrink-0" />
                <span>Step-by-step video guide</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5C6B38] shrink-0" />
                <span>Ages 10+ (Students &amp; Makers)</span>
              </div>
            </div>

            {/* Coupons Box */}
            <div className="p-3.5 rounded-2xl border space-y-2 text-xs" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
              <div className="flex items-center justify-between text-xs font-bold text-[var(--text-primary)]">
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#5C6B38]" /> Available Student Coupons
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Promo Code (e.g. STEM10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] font-mono uppercase focus:outline-none focus:border-[#5C6B38]"
                />
                {appliedCoupon ? (
                  <button onClick={handleRemoveCoupon} className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-red-500/30 text-red-600 hover:bg-red-500/10">
                    Remove
                  </button>
                ) : (
                  <button onClick={() => handleApplyCoupon()} className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E]">
                    Apply
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 pt-0.5">
                <button onClick={() => handleApplyCoupon("STEM10")} className="text-[10px] font-mono px-2 py-0.5 rounded-lg border border-dashed border-[#5C6B38] text-[#5C6B38] hover:bg-[#5C6B38]/10 cursor-pointer">
                  % STEM10 (10% Off)
                </button>
                <button onClick={() => handleApplyCoupon("SEIKOEDU")} className="text-[10px] font-mono px-2 py-0.5 rounded-lg border border-dashed border-[#5C6B38] text-[#5C6B38] hover:bg-[#5C6B38]/10 cursor-pointer">
                  🏷 SEIKOEDU ($20 Off)
                </button>
              </div>
            </div>

            {/* Quantity + Add to Cart + Buy Now */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-xl border border-[var(--border-subtle)] overflow-hidden bg-[var(--bg-surface-1)]">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-xs font-bold hover:bg-[var(--bg-surface-2)] transition-colors cursor-pointer">-</button>
                  <span className="px-4 py-2 text-xs font-mono font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-xs font-bold hover:bg-[var(--bg-surface-2)] transition-colors cursor-pointer">+</button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-5 rounded-full text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E] transition-all flex items-center justify-center gap-2 shadow-xs hover:scale-102 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart • ${finalPrice.toFixed(2)}</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3 px-5 rounded-full text-xs font-bold bg-[var(--text-primary)] text-[var(--bg-page)] hover:opacity-90 transition-all cursor-pointer shadow-xs"
                >
                  Buy Now
                </button>
              </div>

              {/* 🌟 Direct Access to Learners Studio 🌟 */}
              <div className="p-3.5 rounded-2xl border border-[#5C6B38]/30 bg-[#5C6B38]/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-[var(--text-primary)] block">Already have the kit?</span>
                  <span className="text-[11px] text-[var(--text-secondary)]">Access 4 guided modules, C++ code &amp; certification exam.</span>
                </div>
                <Link
                  href={`/${domain.slug}/${kitProduct.id}`}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E] transition-all flex items-center gap-1.5 shrink-0 shadow-2xs"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Launch Learners Hub</span>
                </Link>
              </div>

            </div>

          </div>

        </section>

        {/* ═══ 02. WHAT WILL YOU BUILD? (HIGHLY VISUAL) ═══ */}
        <section className="p-6 sm:p-8 rounded-3xl border space-y-6" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold text-[#5C6B38] uppercase tracking-wider">
              PROJECT OUTCOME
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
              What Will You Build?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl">
              Build a fully functional 4-wheel drive connected robot car from scratch with real embedded telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: Laptop, title: "Web Joystick Controller", desc: "HTML5 virtual touch joystick hosted directly on the ESP32." },
              { icon: Cpu, title: "Processing Logic", desc: "Dual-Core 240MHz Xtensa MCU managing WebSockets & motors." },
              { icon: Zap, title: "L298N Dual H-Bridge", desc: "High-current bidirectional PWM motor driving electronics." },
              { icon: Sparkles, title: "Type-C 2S Power", desc: "Rechargeable 7.4V lithium pack with onboard boost charging." },
              { icon: Box, title: "Laser-Cut Chassis", desc: "Dual-layer 3mm acrylic frame with all-terrain rubber wheels." }
            ].map((feature, fIdx) => {
              const Icon = feature.icon;
              return (
                <div key={fIdx} className="p-4 rounded-2xl border space-y-2 text-xs" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                  <div className="w-8 h-8 rounded-xl bg-[#5C6B38]/10 text-[#5C6B38] flex items-center justify-center font-bold">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)]">{feature.title}</h3>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ 03. PRODUCT DEMO VIDEO (PROBLEM → BUILD → DEBUG → SUCCESS) ═══ */}
        <section className="p-6 sm:p-8 rounded-3xl border space-y-6" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-[#5C6B38] uppercase tracking-wider">
                MAKER STORY
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
                The Building Experience in Action
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                From unboxing to troubleshooting and driving across the room.
              </p>
            </div>
            <span className="text-xs font-mono text-[var(--text-tertiary)]">
              ⏱ 4-Minute Lab Walkthrough
            </span>
          </div>

          <div className="rounded-2xl overflow-hidden border shadow-sm aspect-video bg-black flex items-center justify-center max-w-4xl mx-auto" style={{ borderColor: "var(--border-subtle)" }}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
              title="SEIKO RoverX Demo Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Story Timeline */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 text-center text-xs">
            <div className="p-2.5 rounded-xl border" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
              <div className="font-mono text-[10px] font-bold text-[#5C6B38]">01. UNBOX</div>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">Inspect parts</p>
            </div>
            <div className="p-2.5 rounded-xl border" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
              <div className="font-mono text-[10px] font-bold text-[#5C6B38]">02. ASSEMBLE</div>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">Mount motors</p>
            </div>
            <div className="p-2.5 rounded-xl border" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
              <div className="font-mono text-[10px] font-bold text-amber-600">03. DEBUG</div>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">Check wiring</p>
            </div>
            <div className="p-2.5 rounded-xl border" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
              <div className="font-mono text-[10px] font-bold text-[#5C6B38]">04. FLASH</div>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">Upload C++</p>
            </div>
            <div className="p-2.5 rounded-xl border" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
              <div className="font-mono text-[10px] font-bold text-emerald-600">05. SUCCESS</div>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">Drive car!</p>
            </div>
          </div>
        </section>

        {/* ═══ 04. WHAT'S INSIDE THE BOX (COMPACT LIST) ═══ */}
        <section className="space-y-4 pt-4 border-t border-[var(--border-subtle)]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono font-bold text-[#5C6B38] uppercase tracking-wider">
                BILL OF MATERIALS
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-['Fraunces'] text-[var(--text-primary)] mt-0.5">
                What&apos;s Inside the Box ({kitHubData.components.length} Included Parts)
              </h2>
            </div>
            <span className="text-xs font-mono text-[var(--text-tertiary)] hidden sm:inline">
              Anti-Static Bagged &amp; Quality Checked
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {kitHubData.components.map((comp, idx) => (
              <div
                key={comp.id}
                className="p-3.5 rounded-2xl border flex items-center justify-between gap-3.5 group hover:bg-[var(--bg-surface-2)] transition-all duration-200"
                style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-13 h-13 rounded-xl overflow-hidden border p-0.5 shrink-0" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                    <img src={comp.image || kitProduct.image} alt={comp.name} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#5C6B38] uppercase">{comp.category}</span>
                      <span className="text-[10px] font-mono text-[var(--text-tertiary)]">• #{idx + 1}</span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate">{comp.name}</h3>
                    <p className="text-[11px] font-mono text-[var(--text-tertiary)] truncate">{comp.spec}</p>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl border text-[var(--text-primary)] shrink-0" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                  Qty: {comp.quantity}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 05. WHAT WILL YOU LEARN? ═══ */}
        <section className="p-6 sm:p-8 rounded-3xl border space-y-6" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold text-[#5C6B38] uppercase tracking-wider">
              EDUCATIONAL PILLARS
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
              What Will You Learn?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Key engineering, programming, and electronics skills mastered through this project.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
            <div className="p-4 rounded-2xl border space-y-2" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
              <Zap className="w-5 h-5 text-[#5C6B38]" />
              <h3 className="font-bold text-[var(--text-primary)] text-sm">Electronics</h3>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Understand DC motor polarity, H-bridge switches, PWM velocity, and 2S lithium battery power rails.
              </p>
            </div>

            <div className="p-4 rounded-2xl border space-y-2" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
              <Cpu className="w-5 h-5 text-[#5C6B38]" />
              <h3 className="font-bold text-[var(--text-primary)] text-sm">Programming</h3>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Write asynchronous C++ code on ESP32, broadcast Wi-Fi SoftAP, and manage full-duplex WebSockets.
              </p>
            </div>

            <div className="p-4 rounded-2xl border space-y-2" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
              <HelpCircle className="w-5 h-5 text-[#5C6B38]" />
              <h3 className="font-bold text-[var(--text-primary)] text-sm">Problem Solving</h3>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Debug inverted motor directions, diagnose loose grounds, and calibrate straight-line motor trim.
              </p>
            </div>

            <div className="p-4 rounded-2xl border space-y-2" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
              <Wrench className="w-5 h-5 text-[#5C6B38]" />
              <h3 className="font-bold text-[var(--text-primary)] text-sm">Engineering</h3>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Understand how microcontrollers, motor drivers, and mechanical chassis fit together as a system.
              </p>
            </div>

            <div className="p-4 rounded-2xl border space-y-2" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
              <Smile className="w-5 h-5 text-[#5C6B38]" />
              <h3 className="font-bold text-[var(--text-primary)] text-sm">Confidence</h3>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Experience the genuine thrill of building a complex, working robotic device from individual loose parts.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ 06. HOW IT WORKS (5-STEP TIMELINE) ═══ */}
        <section className="space-y-6 pt-4 border-t border-[var(--border-subtle)]">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold text-[#5C6B38] uppercase tracking-wider">
              PROJECT TIMELINE
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
              How It Works (5 Guided Steps)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              { num: "01", title: "UNDERSTAND", desc: "Learn what the ESP32, L298N driver, and battery do." },
              { num: "02", title: "ASSEMBLE", desc: "Mount the 4 motors and wheels to the acrylic chassis." },
              { num: "03", title: "WIRE", desc: "Connect solderless Dupont jumpers using color-coded pinouts." },
              { num: "04", title: "PROGRAM", desc: "Upload the C++ web server firmware to the ESP32." },
              { num: "05", title: "DRIVE", desc: "Connect smartphone Wi-Fi and steer with virtual joystick!" }
            ].map((step, sIdx) => (
              <div key={sIdx} className="p-4 rounded-2xl border space-y-2 text-xs" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
                <div className="text-lg font-bold font-mono text-[#5C6B38]">{step.num}</div>
                <h3 className="font-bold text-[var(--text-primary)]">{step.title}</h3>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 07. AGE + DIFFICULTY + WHO IS IT FOR? + WHAT YOU NEED ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[var(--border-subtle)]">
          
          {/* Age & Difficulty Card */}
          <div className="p-6 rounded-3xl border space-y-4" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
            <span className="text-[10px] font-mono font-bold text-[#5C6B38] uppercase">RECOMMENDED FOR</span>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2 font-medium">👦 Age 10+ (Students &amp; Makers)</div>
              <div className="flex items-center gap-2 font-medium">🟢 Beginner to Intermediate</div>
              <div className="flex items-center gap-2 font-medium">⏱ 2–4 Hours Build Time</div>
              <div className="flex items-center gap-2 font-medium">💻 Basic C++ / Block / Arduino</div>
            </div>
          </div>

          {/* Who Is This For */}
          <div className="p-6 rounded-3xl border space-y-4" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
            <span className="text-[10px] font-mono font-bold text-[#5C6B38] uppercase">PERFECT FOR</span>
            <div className="space-y-1.5 text-xs text-[var(--text-secondary)]">
              <div>• Curious children exploring engineering</div>
              <div>• STEM learners &amp; robotics hobbyists</div>
              <div>• Coding beginners seeking hands-on projects</div>
              <div>• Parents looking for educational family activities</div>
              <div>• School STEM labs and science fairs</div>
            </div>
          </div>

          {/* What You Need */}
          <div className="p-6 rounded-3xl border space-y-4" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
            <span className="text-[10px] font-mono font-bold text-[#5C6B38] uppercase">WHAT YOU NEED</span>
            <div className="space-y-2 text-xs">
              <div>
                <strong className="text-[var(--text-primary)] block">✓ Included in Box:</strong>
                <span className="text-[11px] text-[var(--text-secondary)]">All 8 electronics, motors, chassis, battery, cables &amp; guide.</span>
              </div>
              <div>
                <strong className="text-[var(--text-primary)] block">✓ You Provide:</strong>
                <span className="text-[11px] text-[var(--text-secondary)]">Laptop/PC or Smartphone with USB-C cable for initial setup.</span>
              </div>
            </div>
          </div>

        </div>

        {/* ═══ 08. TECHNICAL SPECIFICATIONS TABLE ═══ */}
        <section className="p-6 sm:p-8 rounded-3xl border space-y-4 max-w-3xl mx-auto" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
          <h2 className="text-base font-bold font-['Fraunces'] text-[var(--text-primary)]">
            Product Specifications
          </h2>

          <div className="space-y-2 text-xs">
            {[
              { label: "Product Type", value: "STEM Wireless Robotics & IoT Kit" },
              { label: "Microcontroller Core", value: "ESP32 32-bit Dual-Core Xtensa LX6 (240MHz)" },
              { label: "Drivetrain", value: "4WD (4x High-Torque 1:48 Geared Motors)" },
              { label: "Operating Voltage", value: "3.3V/5V Logic • 7.4V Motor Rail" },
              { label: "Current Consumption", value: "120mA Idle • 1.2A Active • 2.5A Peak" },
              { label: "Wireless Connectivity", value: "2.4GHz Wi-Fi (SoftAP Web Server) + BLE 4.2" },
              { label: "Battery & Charging", value: "7.4V 2S Li-ion with Onboard Type-C 2S BMS Fast-Charger" },
              { label: "Prototyping Safety", value: "100% Solderless, Low-Voltage Classroom Certified" }
            ].map((spec, i) => (
              <div key={i} className="py-2 border-b border-[var(--border-subtle)] flex items-center justify-between gap-4 last:border-0">
                <span className="font-mono text-[var(--text-tertiary)]">{spec.label}</span>
                <span className="font-mono font-semibold text-[var(--text-primary)] text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 09. VERIFIED CUSTOMER REVIEWS (BREAKDOWN & TESTIMONIALS) ═══ */}
        <section className="p-6 sm:p-8 rounded-3xl border space-y-6" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-[#5C6B38] uppercase tracking-wider">
                REAL FEEDBACK
              </span>
              <h2 className="text-xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
                Student &amp; Educator Reviews
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold font-mono text-[var(--text-primary)]">4.8 / 5.0</div>
                <div className="text-[10px] text-[var(--text-tertiary)] font-mono">126 Verified Reviews</div>
              </div>
              <div className="flex text-[#E8A838]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E8A838]" />
                ))}
              </div>
            </div>
          </div>

          {/* Rating Breakdown Bars */}
          <div className="space-y-1.5 max-w-md text-xs font-mono">
            {[
              { stars: "5 Stars", percent: "87%", count: "110" },
              { stars: "4 Stars", percent: "9%", count: "11" },
              { stars: "3 Stars", percent: "3%", count: "4" },
              { stars: "2 Stars", percent: "1%", count: "1" },
              { stars: "1 Star", percent: "0%", count: "0" }
            ].map((bar, bIdx) => (
              <div key={bIdx} className="flex items-center gap-3">
                <span className="w-16 text-[var(--text-secondary)]">{bar.stars}</span>
                <div className="flex-1 h-2 rounded-full bg-[var(--bg-surface-2)] overflow-hidden border border-[var(--border-subtle)]">
                  <div className="h-full bg-[#E8A838] rounded-full" style={{ width: bar.percent }} />
                </div>
                <span className="w-8 text-right text-[var(--text-tertiary)]">{bar.percent}</span>
              </div>
            ))}
          </div>

          {/* Highlighted Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {[
              {
                name: "Dr. Vikram Patel",
                role: "STEM Educator",
                comment: "The Type-C 2S onboard charging is a game-changer for classroom use. No more taking batteries out of 20 rovers every day. The ESP32 web joystick worked on our school iPads flawlessly.",
                date: "3 days ago"
              },
              {
                name: "Sarah Jenkins",
                role: "Parent & Maker",
                comment: "My 11-year-old son assembled the RoverX in an afternoon. The step-by-step schematics were very clear, and he loved driving it from my iPhone browser without having to download any suspicious app!",
                date: "1 week ago"
              },
              {
                name: "Arjun K.",
                role: "First-Year Eng Student",
                comment: "Great quality hardware. Metal motor brackets, clean acrylic cuts, and the WebSocket C++ firmware is well documented. Passed the milestone certification exam and earned my diploma!",
                date: "2 weeks ago"
              }
            ].map((rev, rIdx) => (
              <div key={rIdx} className="p-4 rounded-2xl border space-y-2.5 text-xs" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[var(--text-primary)]">{rev.name}</div>
                    <div className="text-[10px] text-[var(--text-tertiary)] font-mono">{rev.role}</div>
                  </div>
                  <div className="flex text-[#E8A838]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#E8A838]" />
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
                </p>
                <div className="text-[10px] font-mono text-emerald-600 flex items-center justify-between pt-1">
                  <span>✓ Verified Purchase</span>
                  <span className="text-[var(--text-tertiary)]">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 10. FAQ ACCORDION ═══ */}
        <section className="p-6 sm:p-8 rounded-3xl border space-y-4 max-w-3xl mx-auto" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold text-[#5C6B38] uppercase tracking-wider">
              QUESTIONS &amp; ANSWERS
            </span>
            <h2 className="text-xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-2 text-xs">
            {faqs.map((faq, fIdx) => {
              const isExpanded = expandedFaq === fIdx;
              return (
                <div key={fIdx} className="rounded-xl border border-[var(--border-subtle)] overflow-hidden" style={{ backgroundColor: "var(--bg-surface-2)" }}>
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : fIdx)}
                    className="w-full p-3.5 text-left font-semibold text-[var(--text-primary)] flex items-center justify-between gap-3 hover:bg-[var(--bg-surface-1)] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-[#5C6B38] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[var(--text-tertiary)] shrink-0" />}
                  </button>
                  {isExpanded && (
                    <div className="p-3.5 pt-0 text-[11px] text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] bg-[var(--bg-surface-1)]">
                      <p className="pt-2">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ 11. ECOSYSTEM PROGRESSION (START → EXPLORE → BUILD → MASTER) ═══ */}
        <section className="space-y-6 pt-4 border-t border-[var(--border-subtle)]">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold text-[#5C6B38] uppercase tracking-wider">
              LEARNING PATHWAY
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
              Keep Building • Recommended Next Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl border space-y-3" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600">STAGE 1 • EXPLORE (CURRENT)</span>
              <h3 className="font-bold text-sm text-[var(--text-primary)]">{kitProduct.name}</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">ESP32 4WD Wi-Fi &amp; Bluetooth Teleoperation.</p>
              <span className="text-xs font-mono font-bold text-[#5C6B38] block">${kitProduct.price}</span>
            </div>

            <div className="p-4 rounded-2xl border space-y-3" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600">STAGE 2 • BUILD (NEXT)</span>
              <h3 className="font-bold text-sm text-[var(--text-primary)]">SEIKO 4-DOF Robotic Arm</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Servo Articulation &amp; Dual Joystick Manipulator.</p>
              <Link href="/products/robotic-arm-kinetic-kit/pd" className="text-xs font-semibold text-[#5C6B38] hover:underline block">
                Explore Robotic Arm ($169) →
              </Link>
            </div>

            <div className="p-4 rounded-2xl border space-y-3" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600">STAGE 3 • MASTER</span>
              <h3 className="font-bold text-sm text-[var(--text-primary)]">SEIKO AI Vision Autonomous Bot</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Edge AI Object Tracking &amp; Neural Line Following.</p>
              <Link href="/ai-intelligent-machines" className="text-xs font-semibold text-[#5C6B38] hover:underline block">
                Explore AI Vision Track ($189) →
              </Link>
            </div>
          </div>
        </section>

      </div>

      {/* ═══ 12. STICKY ADD TO CART BAR (APPEARS ON SCROLL) ═══ */}
      {showStickyBar && (
        <div 
          className="fixed bottom-0 left-0 right-0 z-40 border-t shadow-2xl py-3 px-4 sm:px-8 transition-all animate-fadeIn"
          style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
        >
          <div className="seiko-container flex items-center justify-between gap-4 p-0">
            <div className="flex items-center gap-3 min-w-0">
              <img src={kitProduct.image} alt={kitProduct.name} className="w-10 h-10 rounded-xl object-cover border hidden sm:block" />
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate">{kitProduct.name}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#5C6B38]">${kitProduct.price}</span>
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)] line-through hidden sm:inline">${kitProduct.originalPrice}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={handleAddToCart}
                className="px-5 py-2 rounded-full text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="px-5 py-2 rounded-full text-xs font-bold bg-[var(--text-primary)] text-[var(--bg-page)] hover:opacity-90 transition-all cursor-pointer shadow-xs hidden sm:block"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
