"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { STEM_KITS_CATALOG } from "@/data/products";
import { placeCustomerOrder, OrderRecord } from "@/data/adminOrders";
import confetti from "canvas-confetti";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
  Percent,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Heart,
  Star,
  Check,
  AlertCircle,
  HelpCircle,
  Play,
  X,
  CreditCard,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { toast } from "sonner";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotalPrice } = useApp();

  // State Management
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>(
    cart.map((item) => item.product.id)
  );
  const [itemPendingRemoval, setItemPendingRemoval] = useState<string | null>(null);
  const [savedForLaterIds, setSavedForLaterIds] = useState<string[]>([]);
  const [couponCode, setCouponCode] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountRate: number; amount: number } | null>(null);
  const [showCouponAccordion, setShowCouponAccordion] = useState<boolean>(false);
  const [useSeikoPoints, setUseSeikoPoints] = useState<boolean>(false);
  const seikoPointsBalance = 250; // 250 points = $25 discount
  const pointsDiscountValue = 25;

  // Checkout Modal State
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [isProcessingOrder, setIsProcessingOrder] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  // Form Fields
  const [customerName, setCustomerName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("Hyderabad");
  const [state, setState] = useState<string>("Telangana");
  const [pincode, setPincode] = useState<string>("500081");
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "Credit / Debit Card" | "Net Banking" | "Cash on Delivery">("UPI");

  // Free shipping threshold ($150)
  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(100, Math.round((cartTotalPrice / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartTotalPrice);

  // Selection handlers
  const handleToggleSelectAll = () => {
    if (selectedItemIds.length === cart.length) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(cart.map((item) => item.product.id));
    }
  };

  const handleToggleSelectItem = (id: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    selectedItemIds.forEach((id) => removeFromCart(id));
    setSelectedItemIds([]);
    toast.success("Selected items removed from cart");
  };

  // Save for later
  const handleSaveForLater = (id: string) => {
    setSavedForLaterIds((prev) => [...prev, id]);
    removeFromCart(id);
    toast.info("Item moved to Saved for Later");
  };

  // Coupon handling
  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (useSeikoPoints) {
      toast.error("You can use either a coupon or SEIKO points, but not both.");
      return;
    }
    if (code === "STEM10" || code === "STEMFIRST10") {
      const discount = Math.round(cartTotalPrice * 0.10);
      setAppliedCoupon({ code: "STEM10", discountRate: 0.10, amount: discount });
      toast.success("Coupon STEM10 applied! 10% Extra Discount");
    } else if (code === "SEIKOEDU" || code === "LABS20") {
      setAppliedCoupon({ code: "SEIKOEDU", discountRate: 0, amount: 20 });
      toast.success("Coupon SEIKOEDU applied! $20 Off Instantly");
    } else {
      toast.error("Invalid promo code. Try 'STEM10' or 'SEIKOEDU'!");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    toast.info("Coupon removed");
  };

  const handleTogglePoints = () => {
    if (!useSeikoPoints && appliedCoupon) {
      toast.error("You can use either a coupon or SEIKO points, but not both.");
      return;
    }
    setUseSeikoPoints(!useSeikoPoints);
    if (!useSeikoPoints) {
      toast.success("250 SEIKO Points Applied (-$25.00)");
    }
  };

  // Price calculations
  const subtotal = cartTotalPrice;
  const couponDiscount = appliedCoupon ? appliedCoupon.amount : 0;
  const pointsDiscount = useSeikoPoints ? pointsDiscountValue : 0;
  const totalDiscounts = couponDiscount + pointsDiscount;
  const grandTotal = Math.max(0, subtotal - totalDiscounts);

  // Submit Real Customer Order
  const handleConfirmOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone || !address) {
      toast.error("Please fill in all shipping details");
      return;
    }

    setIsProcessingOrder(true);

    setTimeout(() => {
      // 1. Create order record and deduct inventory in store
      const orderItems = cart.map((itm) => ({
        kitId: itm.product.id,
        name: itm.product.name,
        quantity: itm.quantity,
        price: itm.product.price,
        image: itm.product.image
      }));

      const newOrder = placeCustomerOrder({
        customerName,
        customerEmail,
        customerPhone,
        address,
        city,
        state,
        pincode,
        items: orderItems,
        subtotal,
        discount: totalDiscounts,
        couponCode: appliedCoupon?.code,
        total: grandTotal,
        paymentMethod
      });

      setConfirmedOrder(newOrder);
      setIsProcessingOrder(false);
      setIsCheckoutModalOpen(false);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      clearCart();
    }, 1000);
  };

  // Recommended products for progression (Excluding items in cart)
  const recommendedKits = STEM_KITS_CATALOG.filter(
    (k) => !cart.some((c) => c.product.id === k.id)
  ).slice(0, 3);

  // ════ STATE 1: ORDER CONFIRMED SCREEN ════
  if (confirmedOrder) {
    return (
      <div className="pt-32 pb-24 min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}>
        <div className="seiko-container max-w-2xl mx-auto text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-[#5C6B38]/10 text-[#5C6B38] border border-[#5C6B38]/30 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#5C6B38] uppercase tracking-wider">
              ORDER CONFIRMED #{confirmedOrder.id}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
              You&apos;re Ready to Start Building!
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto">
              Thank you, <strong>{confirmedOrder.customerName}</strong>! Confirmation details and tracking will be sent to <strong>{confirmedOrder.customerEmail}</strong>.
            </p>
          </div>

          <div className="p-6 rounded-3xl border text-left space-y-4 shadow-xs" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <h3 className="text-xs font-bold font-mono text-[#5C6B38] uppercase">Order Breakdown</h3>
              <span className="text-xs font-mono font-bold text-[var(--text-primary)]">Total: ${confirmedOrder.total.toFixed(2)}</span>
            </div>

            <div className="space-y-2 text-xs">
              {confirmedOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-[var(--text-primary)] font-medium">{item.quantity}x {item.name}</span>
                  <span className="font-mono text-[var(--text-secondary)]">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <strong>Delivering to:</strong> {confirmedOrder.address}, {confirmedOrder.city}, {confirmedOrder.state} ({confirmedOrder.pincode})
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/robotics/smart-robotics-rover-kit"
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E] transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Open Learners Workbench →</span>
              </Link>
              <Link
                href="/products"
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-2)] text-[var(--text-primary)] transition-colors text-center"
              >
                Continue Browsing
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ════ STATE 2: EMPTY CART ════
  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}>
        <div className="seiko-container max-w-xl mx-auto text-center space-y-6 py-12 animate-fadeIn">
          <div className="w-20 h-20 rounded-3xl bg-[var(--bg-surface-1)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto text-[var(--text-tertiary)] shadow-xs">
            <ShoppingBag className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#5C6B38] uppercase tracking-wider">
              YOUR CART IS EMPTY
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
              Your next project is waiting.
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm mx-auto">
              Discover something. Build something. Create something real.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E] transition-all shadow-xs hover:scale-105"
            >
              <span>Explore STEM Kits</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 sm:pt-32 pb-24 min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}>
      <div className="seiko-container space-y-8">
        
        {/* ═══ 1. COMPACT HEADER & BREADCRUMB ═══ */}
        <div className="space-y-2 border-b border-[var(--border-subtle)] pb-4">
          <nav className="flex items-center gap-2 text-xs font-mono text-[var(--text-tertiary)]">
            <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[var(--text-primary)] font-semibold">Cart</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold font-['Fraunces'] text-[var(--text-primary)] tracking-tight">
              Your Cart
            </h1>
            <span className="text-xs font-mono text-[var(--text-tertiary)]">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} Items in Cart
            </span>
          </div>
        </div>

        {/* ═══ 2. FREE SHIPPING PROGRESS BAR ═══ */}
        <div className="p-3.5 rounded-2xl border space-y-1.5 shadow-2xs" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
          <div className="flex items-center justify-between text-xs">
            {amountNeededForFreeShipping > 0 ? (
              <span className="text-[var(--text-secondary)]">
                🚚 Add <strong className="text-[#5C6B38]">${amountNeededForFreeShipping}</strong> more for <strong>FREE Delivery</strong>
              </span>
            ) : (
              <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> You have unlocked FREE Standard Delivery!
              </span>
            )}
            <span className="text-[11px] font-mono text-[var(--text-tertiary)]">{progressToFreeShipping}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-[var(--bg-surface-2)] overflow-hidden border border-[var(--border-subtle)]">
            <div className="h-full bg-[#5C6B38] rounded-full transition-all duration-400" style={{ width: `${progressToFreeShipping}%` }} />
          </div>
        </div>

        {/* ═══ 3. MAIN 2-COLUMN LAYOUT (DESKTOP: 68% / 32% STICKY) ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ════ LEFT COLUMN: CART ITEMS (68% Width) ════ */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Bulk Selection Bar (Shown only when multiple items exist) */}
            {cart.length > 1 && (
              <div className="p-3 rounded-2xl border flex items-center justify-between text-xs" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedItemIds.length === cart.length}
                    onChange={handleToggleSelectAll}
                    className="w-4 h-4 rounded text-[#5C6B38] accent-[#5C6B38] cursor-pointer"
                  />
                  <span className="font-semibold text-[var(--text-primary)]">
                    Select all ({cart.length} items)
                  </span>
                </label>

                {selectedItemIds.length > 0 && (
                  <button
                    onClick={handleBulkDelete}
                    className="text-xs text-red-600 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete selected ({selectedItemIds.length})</span>
                  </button>
                )}
              </div>
            )}

            {/* Cart Product Cards List */}
            <div className="space-y-3">
              {cart.map((item) => {
                const isSelected = selectedItemIds.includes(item.product.id);
                const isConfirmingRemoval = itemPendingRemoval === item.product.id;

                return (
                  <div
                    key={item.product.id}
                    className="p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 shadow-2xs"
                    style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
                  >
                    {/* Item Checkbox + Image + Info */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      {cart.length > 1 && (
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectItem(item.product.id)}
                          className="w-4 h-4 rounded text-[#5C6B38] accent-[#5C6B38] cursor-pointer shrink-0"
                        />
                      )}

                      {/* Product Thumbnail (80-100px) */}
                      <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden border p-1 bg-[var(--bg-surface-2)] shrink-0" style={{ borderColor: "var(--border-subtle)" }}>
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Info */}
                      <div className="min-w-0 space-y-1">
                        <span className="text-[10px] font-mono font-bold text-[#5C6B38] uppercase">
                          {item.product.discipline || item.product.categoryLabel || "STEM LAB"}
                        </span>

                        <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] leading-snug line-clamp-2">
                          <Link href={`/products/${item.product.id}/pd`} className="hover:text-[#5C6B38] transition-colors">
                            {item.product.name}
                          </Link>
                        </h3>

                        <p className="text-[11px] text-[var(--text-tertiary)] truncate">
                          {item.product.tagline || "Complete Solderless Hardware Kit"}
                        </p>

                        {/* Actions: Remove & Save for later */}
                        <div className="flex items-center gap-3 pt-1 text-[11px]">
                          {isConfirmingRemoval ? (
                            <div className="flex items-center gap-2 bg-red-500/10 px-2 py-0.5 rounded-lg text-red-600 font-semibold">
                              <span>Remove?</span>
                              <button onClick={() => removeFromCart(item.product.id)} className="underline cursor-pointer">Yes</button>
                              <span>•</span>
                              <button onClick={() => setItemPendingRemoval(null)} className="underline text-[var(--text-secondary)] cursor-pointer">Cancel</button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setItemPendingRemoval(item.product.id)}
                              className="text-[var(--text-tertiary)] hover:text-red-600 transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Remove</span>
                            </button>
                          )}

                          <span className="text-[var(--text-tertiary)]">•</span>

                          <button
                            onClick={() => handleSaveForLater(item.product.id)}
                            className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Heart className="w-3 h-3" />
                            <span>Save for later</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price & Quantity Selector */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-[var(--border-subtle)] shrink-0">
                      <div className="text-right">
                        <div className="text-base sm:text-lg font-bold font-mono text-[var(--text-primary)]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-[10px] font-mono text-[var(--text-tertiary)]">
                            ${item.product.price} each
                          </div>
                        )}
                      </div>

                      {/* Quantity Selector [-] [ 1 ] [+] */}
                      <div className="flex items-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] overflow-hidden text-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-2.5 py-1.5 font-bold hover:bg-[var(--bg-surface-1)] transition-colors disabled:opacity-30 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-3 py-1.5 font-mono font-bold text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1.5 font-bold hover:bg-[var(--bg-surface-1)] transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Continue Shopping Action */}
            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Continue Shopping</span>
              </Link>
            </div>

          </div>

          {/* ════ RIGHT COLUMN: STICKY ORDER SUMMARY (32% Width) ════ */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
            
            {/* Order Summary Card */}
            <div 
              className="p-5 sm:p-6 rounded-3xl border space-y-4 shadow-sm"
              style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
            >
              <h2 className="text-sm font-bold font-['Fraunces'] text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2.5">
                Order Summary
              </h2>

              {/* Coupon Accordion */}
              <div className="space-y-2 border-b border-[var(--border-subtle)] pb-3">
                <button
                  onClick={() => setShowCouponAccordion(!showCouponAccordion)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#5C6B38]" />
                    <span>Have a promo code?</span>
                  </span>
                  {showCouponAccordion ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showCouponAccordion && (
                  <div className="space-y-2 pt-1 animate-fadeIn">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter Code (e.g. STEM10)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] font-mono uppercase focus:outline-none focus:border-[#5C6B38]"
                      />
                      {appliedCoupon ? (
                        <button onClick={handleRemoveCoupon} className="px-3 py-1.5 rounded-xl text-xs font-semibold text-red-600 border border-red-500/30 cursor-pointer">
                          Remove
                        </button>
                      ) : (
                        <button onClick={() => handleApplyCoupon()} className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E] cursor-pointer">
                          Apply
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      <button onClick={() => handleApplyCoupon("STEM10")} className="text-[10px] font-mono px-2 py-0.5 rounded-lg border border-dashed border-[#5C6B38] text-[#5C6B38] hover:bg-[#5C6B38]/10 cursor-pointer">
                        % STEM10 (10% Off)
                      </button>
                      <button onClick={() => handleApplyCoupon("SEIKOEDU")} className="text-[10px] font-mono px-2 py-0.5 rounded-lg border border-dashed border-[#5C6B38] text-[#5C6B38] hover:bg-[#5C6B38]/10 cursor-pointer">
                        🏷 SEIKOEDU ($20 Off)
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* SEIKO Loyalty Points Option */}
              <div className="p-3 rounded-2xl border space-y-1.5 text-xs" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-semibold text-[var(--text-primary)]">
                    <Star className="w-3.5 h-3.5 text-[#E8A838] fill-[#E8A838]" />
                    <span>SEIKO Reward Points</span>
                  </div>
                  <span className="text-[11px] font-mono text-[var(--text-tertiary)]">{seikoPointsBalance} pts</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[var(--text-secondary)]">Redeem 250 pts ($25 Off)</span>
                  <button
                    onClick={handleTogglePoints}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      useSeikoPoints
                        ? "bg-red-500/10 text-red-600 border border-red-500/30"
                        : "bg-[#5C6B38] text-white hover:bg-[#4E5B2E]"
                    }`}
                  >
                    {useSeikoPoints ? "Remove" : "Apply"}
                  </button>
                </div>
                {useSeikoPoints && (
                  <p className="text-[10px] text-emerald-600 font-medium">✓ $25.00 points discount applied</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs pt-1">
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Subtotal</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount ({appliedCoupon.code})</span>
                    <span className="font-mono">-${appliedCoupon.amount.toFixed(2)}</span>
                  </div>
                )}

                {useSeikoPoints && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>SEKO Points Discount</span>
                    <span className="font-mono">-${pointsDiscountValue.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Delivery</span>
                  <span className="font-mono text-emerald-600 font-bold">FREE</span>
                </div>

                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Taxes &amp; GST</span>
                  <span className="font-mono text-[var(--text-tertiary)]">Included (18%)</span>
                </div>

                {/* Grand Total */}
                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold text-[var(--text-primary)] block">Grand Total</span>
                    {totalDiscounts > 0 && (
                      <span className="text-[11px] font-mono text-emerald-600 font-semibold">
                        You save ${totalDiscounts.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-[var(--text-primary)]">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Dominant Primary Checkout Button (48-54px) */}
              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full h-12 rounded-full text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E] transition-all flex items-center justify-center gap-2 shadow-xs hover:shadow-md hover:scale-102 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-1 pt-2 text-center text-[10px] text-[var(--text-tertiary)] border-t border-[var(--border-subtle)]">
                <div className="flex flex-col items-center gap-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5C6B38]" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <Truck className="w-3.5 h-3.5 text-[#5C6B38]" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <RotateCcw className="w-3.5 h-3.5 text-[#5C6B38]" />
                  <span>7-Day Return</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ═══ 4. CONTINUE BUILDING • RECOMMENDED PROJECTS ═══ */}
        {recommendedKits.length > 0 && (
          <div className="pt-10 border-t border-[var(--border-subtle)] space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#5C6B38] uppercase">RECOMMENDED NEXT KITS</span>
              <h3 className="text-base font-bold font-['Fraunces'] text-[var(--text-primary)]">
                Continue Building • Recommended Kits
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendedKits.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-2xl border flex items-center justify-between gap-3 shadow-2xs"
                  style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={rec.image} alt={rec.name} className="w-12 h-12 rounded-xl object-cover border p-0.5 bg-[var(--bg-surface-2)] shrink-0" />
                    <div className="min-w-0 space-y-0.5">
                      <h4 className="text-xs font-bold text-[var(--text-primary)] truncate">{rec.name}</h4>
                      <div className="text-[11px] font-mono text-[#5C6B38] font-bold">${rec.price}</div>
                    </div>
                  </div>

                  <Link
                    href={`/products/${rec.id}/pd`}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-2)] text-[var(--text-primary)] shrink-0"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ═══ 5. REAL CHECKOUT & SHIPPING DETAILS MODAL ═══ */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <form
            onSubmit={handleConfirmOrderSubmit}
            className="w-full max-w-lg rounded-3xl border p-6 space-y-4 shadow-2xl animate-scaleUp max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold font-['Fraunces'] text-[var(--text-primary)]">
                  Delivery &amp; Payment Details
                </h3>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  Complete your order of {cart.length} STEM kits (${grandTotal.toFixed(2)})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCheckoutModalOpen(false)}
                className="p-1.5 rounded-xl text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[var(--text-secondary)] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Vikram Patel"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-xs focus:outline-none focus:border-[#5C6B38]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[var(--text-secondary)] mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98490 12345"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-xs font-mono focus:outline-none focus:border-[#5C6B38]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[var(--text-secondary)] mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="vikram@stem.edu"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-xs focus:outline-none focus:border-[#5C6B38]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[var(--text-secondary)] mb-1">Shipping Street Address *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Plot 42, Hitech City Main Rd, Madhapur"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-xs focus:outline-none focus:border-[#5C6B38]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-medium text-[var(--text-secondary)] mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-xs focus:outline-none focus:border-[#5C6B38]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-[var(--text-secondary)] mb-1">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-xs focus:outline-none focus:border-[#5C6B38]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-[var(--text-secondary)] mb-1">PIN Code</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-xs font-mono focus:outline-none focus:border-[#5C6B38]"
                  />
                </div>
              </div>

              {/* Payment Method Radio */}
              <div className="pt-2">
                <label className="block text-[11px] font-medium text-[var(--text-secondary)] mb-1.5">Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "UPI", label: "UPI / GPay / PhonePe" },
                    { id: "Credit / Debit Card", label: "Cards & Net Banking" }
                  ].map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2 cursor-pointer transition-all ${
                        paymentMethod === m.id
                          ? "border-[#5C6B38] bg-[#5C6B38]/10 text-[#5C6B38] font-bold"
                          : "border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)]"
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span className="text-[11px]">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsCheckoutModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessingOrder}
                className="px-6 py-3 rounded-full text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E] transition-all flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-60"
              >
                {isProcessingOrder ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <span>Pay &amp; Confirm Order (${grandTotal.toFixed(2)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
