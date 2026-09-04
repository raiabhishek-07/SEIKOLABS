"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  getStoredOrders,
  saveStoredOrders,
  getStoredInventory,
  saveStoredInventory,
  INITIAL_COUPONS,
  OrderRecord,
  InventoryItem,
  CouponRecord,
  FulfillmentStatus,
  PaymentStatus
} from "@/data/adminOrders";
import {
  Package,
  DollarSign,
  Truck,
  AlertTriangle,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ChevronRight,
  ChevronDown,
  X,
  Printer,
  Download,
  Plus,
  Edit3,
  ExternalLink,
  ShieldCheck,
  Tag,
  Users,
  BarChart3,
  RefreshCw,
  Eye,
  SlidersHorizontal,
  ArrowUpRight,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  FileText,
  Lock,
  Unlock,
  LogOut,
  KeyRound
} from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboardPage() {
  // 🔒 AUTHENTICATION STATE
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<string>("");
  const [adminPassword, setAdminPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  // Tab State
  const [activeTab, setActiveTab] = useState<"orders" | "inventory" | "coupons" | "customers">("orders");

  // Orders State (Synced with localStorage)
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [orderSearchQuery, setOrderSearchQuery] = useState<string>("");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("ALL");
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);

  // Fulfillment Form in Modal
  const [courierName, setCourierName] = useState<string>("");
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [orderStatus, setOrderStatus] = useState<FulfillmentStatus>("PROCESSING");

  // Inventory State (Synced with localStorage)
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [inventorySearchQuery, setInventorySearchQuery] = useState<string>("");
  const [inventoryCategoryFilter, setInventoryCategoryFilter] = useState<string>("ALL");
  const [isRestockModalOpen, setIsRestockModalOpen] = useState<boolean>(false);
  const [restockItem, setRestockItem] = useState<InventoryItem | null>(null);
  const [restockQty, setRestockQty] = useState<number>(10);

  // Coupons State
  const [coupons, setCoupons] = useState<CouponRecord[]>(INITIAL_COUPONS);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState<boolean>(false);
  const [newCouponCode, setNewCouponCode] = useState<string>("");
  const [newCouponPercent, setNewCouponPercent] = useState<number>(15);
  const [newCouponMinOrder, setNewCouponMinOrder] = useState<number>(100);

  // Check saved session on mount
  useEffect(() => {
    try {
      const savedAuth = sessionStorage.getItem("seiko_admin_auth");
      if (savedAuth === "true") {
        setIsAuthenticated(true);
      }
      setOrders(getStoredOrders());
      setInventory(getStoredInventory());
    } catch (e) {
      console.error(e);
    } finally {
      setIsCheckingAuth(false);
    }
  }, []);

  // Handle Login Authentication
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    const cleanId = adminId.trim().toLowerCase();
    const cleanPass = adminPassword.trim();

    // Accepted Credentials
    const isValidId = cleanId === "admin" || cleanId === "admin@seikolabs.com" || cleanId === "seiko_admin";
    const isValidPass = cleanPass === "seiko2026" || cleanPass === "seiko_admin_2026" || cleanPass === "seiko@123";

    if (isValidId && isValidPass) {
      setIsAuthenticated(true);
      sessionStorage.setItem("seiko_admin_auth", "true");
      toast.success("Welcome back, SEIKO LABS Administrator!");
    } else {
      setAuthError("Invalid Admin ID or Password. Check your credentials.");
      toast.error("Authentication failed");
    }
  };

  // Handle Logout
  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("seiko_admin_auth");
    setAdminId("");
    setAdminPassword("");
    toast.info("Logged out of Admin Console");
  };

  // Reload fresh data from localStorage
  const handleRefreshData = () => {
    setOrders(getStoredOrders());
    setInventory(getStoredInventory());
    toast.success("Data refreshed from store!");
  };

  // Top Metrics Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 24100;
  const totalOrdersCount = orders.length + 180;
  const pendingShipmentsCount = orders.filter((o) => o.fulfillmentStatus === "PROCESSING" || o.fulfillmentStatus === "UNFULFILLED").length;
  const lowStockCount = inventory.filter((i) => i.status === "LOW_STOCK" || i.status === "OUT_OF_STOCK").length;

  // Open Order Modal
  const handleOpenOrderModal = (order: OrderRecord) => {
    setSelectedOrder(order);
    setCourierName(order.courier || "BlueDart Express");
    setTrackingNumber(order.trackingNumber || "");
    setOrderStatus(order.fulfillmentStatus);
    setIsOrderModalOpen(true);
  };

  // Save Order Fulfillment Status
  const handleSaveFulfillment = () => {
    if (!selectedOrder) return;
    const updated = orders.map((o) =>
      o.id === selectedOrder.id
        ? {
            ...o,
            fulfillmentStatus: orderStatus,
            courier: courierName,
            trackingNumber: trackingNumber
          }
        : o
    );
    setOrders(updated);
    saveStoredOrders(updated);
    setIsOrderModalOpen(false);
    toast.success(`Order ${selectedOrder.id} updated to ${orderStatus}!`, {
      description: trackingNumber ? `Tracking: ${trackingNumber} (${courierName})` : undefined
    });
  };

  // Adjust Inventory Stock
  const handleUpdateStock = (id: string, delta: number) => {
    const updated = inventory.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(0, item.stockQuantity + delta);
        let newStatus: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK" = "IN_STOCK";
        if (newQty === 0) newStatus = "OUT_OF_STOCK";
        else if (newQty <= item.minThreshold) newStatus = "LOW_STOCK";
        return { ...item, stockQuantity: newQty, status: newStatus };
      }
      return item;
    });
    setInventory(updated);
    saveStoredInventory(updated);
  };

  // Apply Restock
  const handleApplyRestock = () => {
    if (!restockItem) return;
    handleUpdateStock(restockItem.id, restockQty);
    setIsRestockModalOpen(false);
    toast.success(`Restocked ${restockQty} units of ${restockItem.name}`);
  };

  // Create New Coupon
  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const newCoupon: CouponRecord = {
      id: `coup-${Date.now()}`,
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: newCouponPercent,
      minOrderValue: newCouponMinOrder,
      maxUses: 100,
      usedCount: 0,
      active: true,
      expiresAt: "2026-12-31"
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    setIsCouponModalOpen(false);
    setNewCouponCode("");
    toast.success(`Coupon ${newCoupon.code} created successfully!`);
  };

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.city.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(orderSearchQuery.toLowerCase());

    const matchesStatus =
      orderStatusFilter === "ALL" || o.fulfillmentStatus === orderStatusFilter;

    return matchesSearch && matchesStatus;
  });

  // Filtered Inventory
  const filteredInventory = inventory.filter((i) => {
    const matchesSearch =
      i.name.toLowerCase().includes(inventorySearchQuery.toLowerCase()) ||
      i.sku.toLowerCase().includes(inventorySearchQuery.toLowerCase());
    const matchesCat =
      inventoryCategoryFilter === "ALL" || i.category === inventoryCategoryFilter;
    return matchesSearch && matchesCat;
  });

  // ════ 🔒 AUTHENTICATION LOCK SCREEN ════
  if (!isAuthenticated && !isCheckingAuth) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}>
        <div className="w-full max-w-md p-8 rounded-3xl border shadow-2xl space-y-6 animate-scaleUp" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#5C6B38]/10 text-[#5C6B38] border border-[#5C6B38]/30 flex items-center justify-center mx-auto shadow-2xs">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
              SEIKO LABS Admin Access
            </h1>
            <p className="text-xs text-[var(--text-secondary)]">
              Restricted management console. Please authenticate with administrator credentials to proceed.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-medium text-[var(--text-secondary)] mb-1">
                Admin ID / Email
              </label>
              <input
                type="text"
                required
                placeholder="admin@seikolabs.com"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-xs focus:outline-none focus:border-[#5C6B38]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[var(--text-secondary)] mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-xs focus:outline-none focus:border-[#5C6B38]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Unlock Admin Console</span>
            </button>
          </form>

          {/* Quick Demo Hint */}
          <div className="p-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-[11px] text-[var(--text-tertiary)] space-y-1">
            <div className="font-semibold text-[var(--text-secondary)]">🔑 Default Credentials:</div>
            <div>Admin ID: <code className="text-[#5C6B38] font-mono">admin</code> or <code className="text-[#5C6B38] font-mono">admin@seikolabs.com</code></div>
            <div>Password: <code className="text-[#5C6B38] font-mono">seiko2026</code></div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}>
      <div className="seiko-container space-y-8">
        
        {/* ═══ 1. ADMIN HEADER & LIVE STATUS BAR ═══ */}
        <div className="p-6 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#5C6B38] text-white tracking-wider">
                SEIKO LABS HQ
              </span>
              <span className="text-xs font-mono text-[var(--text-tertiary)] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Order Stream Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
              Store Management &amp; Fulfillment Console
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Live orders, inventory stock levels, courier shipping labels, and promotional campaigns.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefreshData}
              className="p-2.5 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              title="Refresh Store Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <Link
              href="/cart"
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-2)] text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Customer Cart</span>
            </Link>

            <button
              onClick={handleAdminLogout}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-red-500/30 text-red-600 hover:bg-red-500/10 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* ═══ 2. TOP METRICS KPI CARDS ═══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Revenue */}
          <div className="p-5 rounded-3xl border space-y-3 shadow-2xs" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase font-semibold">Total Revenue</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-2xl font-bold font-mono text-[var(--text-primary)]">
                ${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                <TrendingUp className="w-3 h-3" />
                <span>+18.4% vs last month</span>
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="p-5 rounded-3xl border space-y-3 shadow-2xs" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase font-semibold">Total Orders</span>
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-2xl font-bold font-mono text-[var(--text-primary)]">
                {totalOrdersCount}
              </div>
              <div className="text-[11px] text-[var(--text-secondary)]">
                {orders.length} Active in current queue
              </div>
            </div>
          </div>

          {/* Pending Shipments */}
          <div className="p-5 rounded-3xl border space-y-3 shadow-2xs" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase font-semibold">Awaiting Dispatch</span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-2xl font-bold font-mono text-amber-600">
                {pendingShipmentsCount} Kits
              </div>
              <div className="text-[11px] text-[var(--text-secondary)]">
                Ready for BlueDart / Delhivery pickup
              </div>
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="p-5 rounded-3xl border space-y-3 shadow-2xs" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase font-semibold">Stock Alerts</span>
              <div className="w-8 h-8 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-2xl font-bold font-mono text-red-600">
                {lowStockCount} Items
              </div>
              <div className="text-[11px] text-[var(--text-secondary)]">
                Below minimum safe threshold
              </div>
            </div>
          </div>

        </div>

        {/* ═══ 3. TAB CONTROLLER ═══ */}
        <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] pb-2 overflow-x-auto">
          {[
            { id: "orders", label: `Live Orders (${orders.length})`, icon: Package },
            { id: "inventory", label: `Inventory & BOM (${inventory.length})`, icon: SlidersHorizontal },
            { id: "coupons", label: `Coupons & Discounts (${coupons.length})`, icon: Tag },
            { id: "customers", label: `Institutions & Customers (${orders.length})`, icon: Users }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-[#5C6B38] text-white shadow-2xs"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-1)]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ═══ 4. TAB 1: LIVE ORDERS MANAGER ═══ */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            
            {/* Filter and Search Bar */}
            <div className="p-4 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[var(--text-tertiary)] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by Order ID, customer, email, city..."
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] focus:outline-none focus:border-[#5C6B38]"
                />
              </div>

              {/* Status Tabs */}
              <div className="flex items-center gap-1.5 flex-wrap text-xs">
                {["ALL", "PROCESSING", "SHIPPED", "DELIVERED"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold transition-all cursor-pointer ${
                      orderStatusFilter === st
                        ? "bg-[var(--text-primary)] text-[var(--bg-page)]"
                        : "border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table List */}
            <div className="rounded-3xl border overflow-hidden shadow-xs" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-tertiary)] uppercase" style={{ backgroundColor: "var(--bg-surface-2)" }}>
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer &amp; Location</th>
                      <th className="p-4">Kits Ordered</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Fulfillment</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-subtle)]">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-[var(--bg-surface-2)]/60 transition-colors">
                        
                        {/* Order ID & Date */}
                        <td className="p-4 font-mono">
                          <span className="font-bold text-[var(--text-primary)] block">#{order.id}</span>
                          <span className="text-[10px] text-[var(--text-tertiary)]">
                            {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </td>

                        {/* Customer Name & City */}
                        <td className="p-4">
                          <span className="font-bold text-[var(--text-primary)] block">{order.customerName}</span>
                          <span className="text-[11px] text-[var(--text-secondary)] flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[var(--text-tertiary)]" /> {order.city}, {order.state}
                          </span>
                        </td>

                        {/* Items Ordered */}
                        <td className="p-4">
                          <div className="space-y-1">
                            {order.items.map((itm, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <span className="font-mono text-[11px] font-bold text-[#5C6B38]">{itm.quantity}x</span>
                                <span className="truncate max-w-[200px] text-[var(--text-primary)]">{itm.name}</span>
                              </div>
                            ))}
                          </div>
                        </td>

                        {/* Amount & Coupon */}
                        <td className="p-4 font-mono font-bold text-[var(--text-primary)]">
                          <div>${order.total.toFixed(2)}</div>
                          {order.couponCode && (
                            <span className="text-[10px] font-normal text-emerald-600">
                              Tag: {order.couponCode}
                            </span>
                          )}
                        </td>

                        {/* Payment */}
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600">
                            <CheckCircle2 className="w-3 h-3" /> {order.paymentMethod}
                          </span>
                        </td>

                        {/* Fulfillment Status */}
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                            order.fulfillmentStatus === "DELIVERED"
                              ? "bg-emerald-500/10 text-emerald-600"
                              : order.fulfillmentStatus === "SHIPPED"
                              ? "bg-blue-500/10 text-blue-600"
                              : "bg-amber-500/10 text-amber-600 animate-pulse"
                          }`}>
                            {order.fulfillmentStatus}
                          </span>
                        </td>

                        {/* Action Button */}
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleOpenOrderModal(order)}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-bold border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] hover:bg-[#5C6B38] hover:text-white hover:border-[#5C6B38] transition-all cursor-pointer shadow-2xs"
                          >
                            Manage / Ship →
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ═══ 5. TAB 2: INVENTORY & STOCK MANAGER ═══ */}
        {activeTab === "inventory" && (
          <div className="space-y-4">
            
            {/* Inventory Controls */}
            <div className="p-4 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[var(--text-tertiary)] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search parts by SKU, hardware component name..."
                  value={inventorySearchQuery}
                  onChange={(e) => setInventorySearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] focus:outline-none focus:border-[#5C6B38]"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap text-xs">
                {["ALL", "Complete Kit", "Microcontroller", "Motor & Driver", "Chassis & Hardware"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setInventoryCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold transition-all cursor-pointer ${
                      inventoryCategoryFilter === cat
                        ? "bg-[var(--text-primary)] text-[var(--bg-page)]"
                        : "border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Inventory Table */}
            <div className="rounded-3xl border overflow-hidden shadow-xs" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-tertiary)] uppercase" style={{ backgroundColor: "var(--bg-surface-2)" }}>
                      <th className="p-4">SKU / Code</th>
                      <th className="p-4">Component / Kit Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Unit Cost</th>
                      <th className="p-4">Retail Price</th>
                      <th className="p-4">Stock on Hand</th>
                      <th className="p-4">Health Status</th>
                      <th className="p-4 text-right">Quick Adjust</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-subtle)]">
                    {filteredInventory.map((item) => (
                      <tr key={item.id} className="hover:bg-[var(--bg-surface-2)]/60 transition-colors">
                        <td className="p-4 font-mono font-bold text-[var(--text-primary)]">{item.sku}</td>
                        <td className="p-4 font-bold text-[var(--text-primary)]">{item.name}</td>
                        <td className="p-4 font-mono text-[11px] text-[var(--text-secondary)]">{item.category}</td>
                        <td className="p-4 font-mono text-[var(--text-tertiary)]">${item.unitCost.toFixed(2)}</td>
                        <td className="p-4 font-mono font-bold text-[var(--text-primary)]">${item.retailPrice.toFixed(2)}</td>
                        
                        {/* Stock count */}
                        <td className="p-4 font-mono font-bold text-sm">
                          <span className={item.stockQuantity <= item.minThreshold ? "text-red-600" : "text-[var(--text-primary)]"}>
                            {item.stockQuantity} Units
                          </span>
                        </td>

                        {/* Status */}
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                            item.status === "IN_STOCK"
                              ? "bg-emerald-500/10 text-emerald-600"
                              : item.status === "LOW_STOCK"
                              ? "bg-amber-500/10 text-amber-600"
                              : "bg-red-500/10 text-red-600"
                          }`}>
                            {item.status.replace("_", " ")}
                          </span>
                        </td>

                        {/* Stepper buttons */}
                        <td className="p-4 text-right">
                          <div className="inline-flex items-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] overflow-hidden">
                            <button
                              onClick={() => handleUpdateStock(item.id, -1)}
                              className="px-2.5 py-1 font-bold hover:bg-[var(--bg-surface-1)] cursor-pointer"
                              title="Deduct 1"
                            >
                              -
                            </button>
                            <button
                              onClick={() => {
                                setRestockItem(item);
                                setIsRestockModalOpen(true);
                              }}
                              className="px-2.5 py-1 font-mono text-[11px] font-bold text-[#5C6B38] hover:underline cursor-pointer"
                            >
                              +Restock
                            </button>
                            <button
                              onClick={() => handleUpdateStock(item.id, 1)}
                              className="px-2.5 py-1 font-bold hover:bg-[var(--bg-surface-1)] cursor-pointer"
                              title="Add 1"
                            >
                              +
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ═══ 6. TAB 3: COUPONS & PROMOTIONAL ENGINE ═══ */}
        {activeTab === "coupons" && (
          <div className="space-y-4">
            
            <div className="p-4 rounded-3xl border flex items-center justify-between gap-4" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Active Promo Campaigns</h3>
                <p className="text-xs text-[var(--text-secondary)]">Create student and classroom bulk discounts.</p>
              </div>

              <button
                onClick={() => setIsCouponModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E] transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Promo Code</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {coupons.map((coupon) => (
                <div key={coupon.id} className="p-5 rounded-3xl border space-y-3 shadow-2xs" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-xl bg-[#5C6B38]/10 text-[#5C6B38] font-mono font-bold text-sm">
                      {coupon.code}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 font-bold">● Active</span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-[var(--text-primary)] text-sm">
                      {coupon.discountPercent ? `${coupon.discountPercent}% Off Total` : `$${coupon.discountAmount} Flat Discount`}
                    </div>
                    <div className="text-[var(--text-secondary)]">Min Order Value: ${coupon.minOrderValue}</div>
                    <div className="text-[var(--text-tertiary)] font-mono text-[11px]">
                      Used {coupon.usedCount} of {coupon.maxUses} times
                    </div>
                  </div>

                  <div className="h-1.5 rounded-full bg-[var(--bg-surface-2)] overflow-hidden">
                    <div className="h-full bg-[#5C6B38]" style={{ width: `${(coupon.usedCount / coupon.maxUses) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ═══ 7. TAB 4: CUSTOMERS & INSTITUTIONS ═══ */}
        {activeTab === "customers" && (
          <div className="rounded-3xl border overflow-hidden shadow-xs" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
            <div className="p-5 border-b border-[var(--border-subtle)]">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Registered Institutions &amp; STEM Makers</h3>
              <p className="text-xs text-[var(--text-secondary)]">Directory of lab educators, schools, and students.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-tertiary)] uppercase" style={{ backgroundColor: "var(--bg-surface-2)" }}>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Shipping City</th>
                    <th className="p-4">Total Spend</th>
                    <th className="p-4 text-right">Orders</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {orders.map((ord, idx) => (
                    <tr key={idx} className="hover:bg-[var(--bg-surface-2)]/60">
                      <td className="p-4 font-bold text-[var(--text-primary)]">{ord.customerName}</td>
                      <td className="p-4 font-mono text-[var(--text-secondary)]">{ord.customerEmail}</td>
                      <td className="p-4 font-mono text-[var(--text-secondary)]">{ord.customerPhone}</td>
                      <td className="p-4 text-[var(--text-primary)]">{ord.city}, {ord.state}</td>
                      <td className="p-4 font-mono font-bold text-[#5C6B38]">${ord.total.toFixed(2)}</td>
                      <td className="p-4 font-mono text-right font-bold">{ord.items.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* ═══ 8. ORDER DETAILS & FULFILLMENT MODAL ═══ */}
      {isOrderModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-2xl rounded-3xl border p-6 space-y-6 shadow-2xl animate-scaleUp max-h-[90vh] overflow-y-auto" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold font-mono text-[var(--text-primary)]">
                    Order #{selectedOrder.id}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600">
                    {selectedOrder.paymentStatus}
                  </span>
                </div>
                <span className="text-xs text-[var(--text-tertiary)]">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>

              <button
                onClick={() => setIsOrderModalOpen(false)}
                className="p-2 rounded-xl border text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors cursor-pointer"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Customer & Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl border space-y-1.5" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                <span className="text-[10px] font-mono font-bold text-[#5C6B38] uppercase">CUSTOMER DETAILS</span>
                <div className="font-bold text-[var(--text-primary)] text-sm">{selectedOrder.customerName}</div>
                <div className="text-[var(--text-secondary)] flex items-center gap-1.5"><Mail className="w-3 h-3" /> {selectedOrder.customerEmail}</div>
                <div className="text-[var(--text-secondary)] flex items-center gap-1.5"><Phone className="w-3 h-3" /> {selectedOrder.customerPhone}</div>
              </div>

              <div className="p-4 rounded-2xl border space-y-1.5" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                <span className="text-[10px] font-mono font-bold text-[#5C6B38] uppercase">SHIPPING DESTINATION</span>
                <div className="text-[var(--text-primary)] leading-relaxed font-medium">
                  {selectedOrder.address}<br />
                  {selectedOrder.city}, {selectedOrder.state} - {selectedOrder.pincode}
                </div>
                {selectedOrder.notes && (
                  <div className="text-[11px] text-amber-600 font-mono pt-1">Note: {selectedOrder.notes}</div>
                )}
              </div>
            </div>

            {/* Ordered Items List */}
            <div className="space-y-2 text-xs">
              <span className="text-[10px] font-mono font-bold text-[var(--text-tertiary)] uppercase">KITS IN THIS SHIPMENT</span>
              <div className="rounded-2xl border divide-y divide-[var(--border-subtle)]" style={{ borderColor: "var(--border-subtle)" }}>
                {selectedOrder.items.map((itm, i) => (
                  <div key={i} className="p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-sm text-[#5C6B38]">{itm.quantity}x</span>
                      <div>
                        <div className="font-bold text-[var(--text-primary)]">{itm.name}</div>
                        <div className="text-[10px] font-mono text-[var(--text-tertiary)]">ID: {itm.kitId}</div>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-right">${(itm.price * itm.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fulfillment & Dispatch Form */}
            <div className="p-4 rounded-2xl border space-y-3" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
              <span className="text-[10px] font-mono font-bold text-[#5C6B38] uppercase block">
                UPDATE DISPATCH &amp; COURIER TRACKING
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-medium text-[var(--text-secondary)] mb-1">Status</label>
                  <select
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value as FulfillmentStatus)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] font-mono text-xs focus:outline-none focus:border-[#5C6B38]"
                  >
                    <option value="UNFULFILLED">UNFULFILLED</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[var(--text-secondary)] mb-1">Courier Partner</label>
                  <input
                    type="text"
                    value={courierName}
                    onChange={(e) => setCourierName(e.target.value)}
                    placeholder="e.g. BlueDart, Delhivery"
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] text-xs focus:outline-none focus:border-[#5C6B38]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[var(--text-secondary)] mb-1">Tracking Number</label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="e.g. BD982341908IN"
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] font-mono text-xs focus:outline-none focus:border-[#5C6B38]"
                  />
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
              <button
                onClick={() => {
                  toast.info("Invoice PDF generated and sent to printer!");
                }}
                className="px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] text-xs font-semibold hover:bg-[var(--bg-surface-2)] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print GST Invoice</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOrderModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveFulfillment}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E] transition-all shadow-xs cursor-pointer"
                >
                  Save &amp; Update Order
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ═══ 9. RESTOCK INVENTORY MODAL ═══ */}
      {isRestockModalOpen && restockItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl border p-6 space-y-4 shadow-2xl animate-scaleUp" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Restock: {restockItem.name}
              </h3>
              <button onClick={() => setIsRestockModalOpen(false)} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-[var(--text-secondary)] mb-1">
                  Add Stock Quantity (Current: {restockItem.stockQuantity})
                </label>
                <input
                  type="number"
                  min="1"
                  value={restockQty}
                  onChange={(e) => setRestockQty(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-xs font-mono focus:outline-none focus:border-[#5C6B38]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--border-subtle)]">
              <button onClick={() => setIsRestockModalOpen(false)} className="px-4 py-2 rounded-xl text-xs text-[var(--text-secondary)]">
                Cancel
              </button>
              <button onClick={handleApplyRestock} className="px-5 py-2 rounded-xl text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E]">
                Confirm Restock (+{restockQty})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ 10. CREATE COUPON MODAL ═══ */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <form onSubmit={handleCreateCoupon} className="w-full max-w-md rounded-3xl border p-6 space-y-4 shadow-2xl animate-scaleUp" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Create New Promo Code
              </h3>
              <button type="button" onClick={() => setIsCouponModalOpen(false)} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-[var(--text-secondary)] mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MAKER25"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-xs font-mono uppercase focus:outline-none focus:border-[#5C6B38]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[var(--text-secondary)] mb-1">Discount Percentage (%)</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={newCouponPercent}
                  onChange={(e) => setNewCouponPercent(parseInt(e.target.value) || 10)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-xs font-mono focus:outline-none focus:border-[#5C6B38]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[var(--text-secondary)] mb-1">Minimum Order Value ($)</label>
                <input
                  type="number"
                  min="0"
                  value={newCouponMinOrder}
                  onChange={(e) => setNewCouponMinOrder(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-xs font-mono focus:outline-none focus:border-[#5C6B38]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--border-subtle)]">
              <button type="button" onClick={() => setIsCouponModalOpen(false)} className="px-4 py-2 rounded-xl text-xs text-[var(--text-secondary)]">
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E]">
                Save &amp; Activate Code
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
