"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import confetti from "canvas-confetti";
import { 
  ShoppingBag, 
  X, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Tag, 
  ChevronDown, 
  ChevronUp, 
  Percent, 
  CheckCircle2, 
  Sparkles,
  Play
} from "lucide-react";
import { toast } from "sonner";

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart, cartTotalPrice } = useApp();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; amount: number } | null>(null);
  const [showCouponInput, setShowCouponInput] = useState(false);

  if (!isCartOpen) return null;

  // Free shipping progress calculation (Free shipping threshold: $150)
  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(100, Math.round((cartTotalPrice / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartTotalPrice);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (code === "STEM10" || code === "STEMFIRST10") {
      const discount = Math.round(cartTotalPrice * 0.10);
      setAppliedDiscount({ code: "STEM10", amount: discount });
      toast.success("Coupon STEM10 applied! 10% Extra Discount");
    } else if (code === "SEIKOEDU" || code === "LABS20") {
      setAppliedDiscount({ code: "SEIKOEDU", amount: 20 });
      toast.success("Coupon SEIKOEDU applied! $20 Off Instantly");
    } else {
      toast.error("Invalid coupon code. Try 'STEM10' or 'SEIKOEDU'!");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedDiscount(null);
    setCouponCode("");
    toast.info("Coupon removed");
  };

  const discountAmount = appliedDiscount ? appliedDiscount.amount : 0;
  const finalTotal = Math.max(0, cartTotalPrice - discountAmount);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutComplete(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => {
      clearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      
      {/* Slide Drawer */}
      <div
        className="w-full max-w-md border-l h-full flex flex-col justify-between shadow-2xl animate-fade-in-right"
        style={{
          backgroundColor: "var(--bg-surface-1)",
          borderColor: "var(--border-subtle)",
          color: "var(--text-primary)"
        }}
      >
        
        {/* ═══ DRAWER HEADER ═══ */}
        <div
          className="p-5 border-b flex items-center justify-between"
          style={{ backgroundColor: "var(--bg-page-alt)", borderColor: "var(--border-subtle)" }}
        >
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#5C6B38]" />
            <h3 className="text-base font-bold font-['Fraunces'] text-[var(--text-primary)]">
              Your STEM Cart
            </h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#5C6B38]/10 text-[#5C6B38] font-bold">
              {cart.reduce((tot, itm) => tot + itm.quantity, 0)} Items
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl border text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors cursor-pointer"
            style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ═══ FREE SHIPPING PROGRESS BAR ═══ */}
        {cart.length > 0 && !checkoutComplete && (
          <div className="px-5 py-3 border-b space-y-1.5" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
            <div className="flex items-center justify-between text-xs">
              {amountNeededForFreeShipping > 0 ? (
                <span className="text-[var(--text-secondary)] font-medium">
                  🚚 Add <strong className="text-[#5C6B38]">${amountNeededForFreeShipping}</strong> more for <strong>FREE Delivery</strong>
                </span>
              ) : (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> You unlocked FREE Standard Delivery!
                </span>
              )}
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">{progressToFreeShipping}%</span>
            </div>

            <div className="h-1.5 rounded-full bg-[var(--bg-surface-1)] overflow-hidden border border-[var(--border-subtle)]">
              <div 
                className="h-full rounded-full bg-[#5C6B38] transition-all duration-400"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>
        )}

        {/* ═══ CONTENT BODY ═══ */}
        <div className="p-5 space-y-5 overflow-y-auto flex-1">
          
          {/* STATE A: ORDER CONFIRMED */}
          {checkoutComplete ? (
            <div className="text-center space-y-4 py-8 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-[#5C6B38]/10 text-[#5C6B38] border border-[#5C6B38]/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
                Order Confirmed!
              </h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-xs mx-auto">
                Thank you for empowering hands-on STEM learning. Order confirmation and tracking updates have been sent to your email.
              </p>
              
              <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2">
                <Link
                  href="/robotics/smart-robotics-rover-kit"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E] transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Start Building with Guided Lessons →</span>
                </Link>

                <button
                  onClick={() => {
                    setCheckoutComplete(false);
                    setIsCheckingOut(false);
                    setIsCartOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Continue Browsing Shop
                </button>
              </div>
            </div>
          ) : isCheckingOut ? (
            
            /* STATE B: EXPRESS CHECKOUT FORM */
            <form onSubmit={handleCheckoutSubmit} className="space-y-4 animate-fadeIn text-xs">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                <h4 className="font-bold font-['Fraunces'] text-sm text-[var(--text-primary)]">
                  Delivery Details
                </h4>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-[#5C6B38] hover:underline"
                >
                  ← Back to Cart
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-[var(--text-secondary)] mb-1">Full Name</label>
                  <input required type="text" placeholder="e.g. Dr. Vikram Patel" className="w-full px-3 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-xs focus:outline-none focus:border-[#5C6B38]" />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[var(--text-secondary)] mb-1">Email Address</label>
                  <input required type="email" placeholder="vikram@stem.edu" className="w-full px-3 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-xs focus:outline-none focus:border-[#5C6B38]" />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[var(--text-secondary)] mb-1">Shipping Address</label>
                  <textarea required rows={2} placeholder="Street address, apartment, city, state, zip" className="w-full px-3 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-xs focus:outline-none focus:border-[#5C6B38]" />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-full text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E] transition-all shadow-xs cursor-pointer"
                >
                  Pay &amp; Confirm Order (${finalTotal.toFixed(2)})
                </button>
              </div>
            </form>

          ) : cart.length === 0 ? (
            
            /* STATE C: INSPIRING SEIKO LABS EMPTY CART */
            <div className="text-center space-y-4 py-12 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto text-[var(--text-tertiary)]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold font-['Fraunces'] text-[var(--text-primary)]">
                  YOUR CART IS EMPTY
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-xs mx-auto">
                  Your next project is waiting.<br />
                  <span className="font-semibold text-[#5C6B38]">Discover something. Build something. Create something.</span>
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/products"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E] transition-all shadow-2xs"
                >
                  <span>Explore STEM Kits</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          ) : (
            
            /* STATE D: CART ITEMS LIST */
            <div className="space-y-3.5">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-2xl border flex items-center justify-between gap-3 shadow-2xs"
                  style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={item.product.image} alt={item.product.name} className="w-13 h-13 rounded-xl object-cover border p-0.5 bg-[var(--bg-surface-1)] shrink-0" />
                    <div className="min-w-0 space-y-0.5">
                      <h4 className="text-xs font-bold text-[var(--text-primary)] truncate">{item.product.name}</h4>
                      <div className="text-[11px] font-mono text-[#5C6B38] font-bold">${item.product.price}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] text-xs overflow-hidden">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-2 py-1 font-bold hover:bg-[var(--bg-surface-2)] cursor-pointer">-</button>
                      <span className="px-2.5 py-1 font-mono text-[11px] font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2 py-1 font-bold hover:bg-[var(--bg-surface-2)] cursor-pointer">+</button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1.5 rounded-lg text-[var(--text-tertiary)] hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          )}

        </div>

        {/* ═══ DRAWER FOOTER (ORDER SUMMARY & CHECKOUT) ═══ */}
        {cart.length > 0 && !checkoutComplete && !isCheckingOut && (
          <div className="p-5 border-t space-y-4" style={{ backgroundColor: "var(--bg-page-alt)", borderColor: "var(--border-subtle)" }}>
            
            {/* Promo Code Accordion */}
            <div className="space-y-2">
              <button
                onClick={() => setShowCouponInput(!showCouponInput)}
                className="w-full flex items-center justify-between text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#5C6B38]" />
                  <span>Have a promo code?</span>
                </span>
                {showCouponInput ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showCouponInput && (
                <div className="space-y-2 pt-1 animate-fadeIn">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code (e.g. STEM10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] font-mono uppercase focus:outline-none focus:border-[#5C6B38]"
                    />
                    {appliedDiscount ? (
                      <button onClick={handleRemoveCoupon} className="px-3 py-1.5 rounded-xl text-xs font-semibold text-red-600 border border-red-500/30">Remove</button>
                    ) : (
                      <button onClick={() => handleApplyCoupon()} className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#5C6B38] text-white">Apply</button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Details */}
            <div className="space-y-1.5 text-xs border-t border-[var(--border-subtle)] pt-3">
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Subtotal</span>
                <span className="font-mono">${cartTotalPrice.toFixed(2)}</span>
              </div>

              {appliedDiscount && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount ({appliedDiscount.code})</span>
                  <span className="font-mono">-${appliedDiscount.amount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Delivery</span>
                <span className="font-mono text-emerald-600 font-bold">FREE</span>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t border-[var(--border-subtle)] text-sm font-bold text-[var(--text-primary)]">
                <span>TOTAL</span>
                <div className="text-right">
                  <span className="font-mono text-base">${finalTotal.toFixed(2)}</span>
                  {appliedDiscount && (
                    <div className="text-[10px] text-emerald-600 font-mono">You save ${appliedDiscount.amount.toFixed(2)}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => setIsCheckingOut(true)}
              className="w-full py-3.5 px-6 rounded-full text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E] transition-all flex items-center justify-center gap-2 shadow-xs hover:scale-102 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <Link
              href="/cart"
              onClick={() => setIsCartOpen(false)}
              className="block text-center text-xs font-semibold text-[var(--text-secondary)] hover:text-[#5C6B38] transition-colors"
            >
              View Full Cart Page →
            </Link>

            {/* Trust Footer */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-[var(--text-tertiary)] pt-1">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-[#5C6B38]" /> Secure Payment</span>
              <span>•</span>
              <span className="flex items-center gap-1"><RotateCcw className="w-3 h-3 text-[#5C6B38]" /> 7-Day Replacement</span>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
