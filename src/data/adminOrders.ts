export interface OrderItemRecord {
  kitId: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export type PaymentStatus = "PAID" | "PENDING" | "REFUNDED" | "FAILED";
export type FulfillmentStatus = "UNFULFILLED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface OrderRecord {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: OrderItemRecord[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: "UPI" | "Credit / Debit Card" | "Net Banking" | "Cash on Delivery";
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  courier?: string;
  trackingNumber?: string;
  createdAt: string;
  notes?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: "Complete Kit" | "Microcontroller" | "Motor & Driver" | "Sensors" | "Chassis & Hardware";
  stockQuantity: number;
  minThreshold: number;
  unitCost: number;
  retailPrice: number;
  sku: string;
  status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
}

export interface CouponRecord {
  id: string;
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minOrderValue: number;
  maxUses: number;
  usedCount: number;
  active: boolean;
  expiresAt: string;
}

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: "SEIKO-8492",
    customerName: "Dr. Vikram Patel",
    customerEmail: "vikram.patel@hyderabad-stem.edu",
    customerPhone: "+91 98490 12345",
    address: "Plot 42, Hitech City Main Rd, Madhapur",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500081",
    items: [
      {
        kitId: "smart-robotics-rover-kit",
        name: "SEIKO RoverX: ESP32 4WD Connected RC Bot",
        quantity: 2,
        price: 149,
        image: "/assets/kit-robotics.jpg"
      }
    ],
    subtotal: 298,
    discount: 29.8,
    couponCode: "STEM10",
    total: 268.2,
    paymentMethod: "UPI",
    paymentStatus: "PAID",
    fulfillmentStatus: "PROCESSING",
    courier: "BlueDart Express",
    trackingNumber: "BD982341908IN",
    createdAt: "2026-08-26T18:30:00Z",
    notes: "School Lab Order - Deliver during 9 AM - 4 PM"
  },
  {
    id: "SEIKO-8491",
    customerName: "Sarah Jenkins",
    customerEmail: "sarah.j@gmail.com",
    customerPhone: "+91 98860 98765",
    address: "12A Orchid Residency, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
    items: [
      {
        kitId: "robotic-arm-kinetic-kit",
        name: "SEIKO 4-DOF Robotic Arm Manipulator",
        quantity: 1,
        price: 169,
        image: "/assets/kit-workbench.jpg"
      }
    ],
    subtotal: 169,
    discount: 20,
    couponCode: "SEIKOEDU",
    total: 149,
    paymentMethod: "Credit / Debit Card",
    paymentStatus: "PAID",
    fulfillmentStatus: "SHIPPED",
    courier: "Delhivery Logistics",
    trackingNumber: "DLH7849120938",
    createdAt: "2026-08-25T14:15:00Z"
  },
  {
    id: "SEIKO-8490",
    customerName: "Arjun K. Sharma",
    customerEmail: "arjun.maker@outlook.com",
    customerPhone: "+91 98110 55432",
    address: "Flat 402, Green Glen Heights, Sector 62",
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201309",
    items: [
      {
        kitId: "smart-robotics-rover-kit",
        name: "SEIKO RoverX: ESP32 4WD Connected RC Bot",
        quantity: 1,
        price: 149,
        image: "/assets/kit-robotics.jpg"
      },
      {
        kitId: "robotic-arm-kinetic-kit",
        name: "SEIKO 4-DOF Robotic Arm Manipulator",
        quantity: 1,
        price: 169,
        image: "/assets/kit-workbench.jpg"
      }
    ],
    subtotal: 318,
    discount: 25,
    total: 293,
    paymentMethod: "UPI",
    paymentStatus: "PAID",
    fulfillmentStatus: "DELIVERED",
    courier: "BlueDart Express",
    trackingNumber: "BD872390142IN",
    createdAt: "2026-08-24T10:00:00Z"
  },
  {
    id: "SEIKO-8489",
    customerName: "Pooja Deshmukh",
    customerEmail: "pooja.d@mitpune.edu",
    customerPhone: "+91 97654 32109",
    address: "Dept of ECE, MIT World Peace University, Kothrud",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411038",
    items: [
      {
        kitId: "smart-robotics-rover-kit",
        name: "SEIKO RoverX: ESP32 4WD Connected RC Bot",
        quantity: 4,
        price: 149,
        image: "/assets/kit-robotics.jpg"
      }
    ],
    subtotal: 596,
    discount: 59.6,
    couponCode: "STEM10",
    total: 536.4,
    paymentMethod: "Net Banking",
    paymentStatus: "PAID",
    fulfillmentStatus: "PROCESSING",
    createdAt: "2026-08-26T20:10:00Z"
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: "inv-rover-kit",
    name: "SEIKO RoverX: ESP32 4WD Wireless Bot",
    category: "Complete Kit",
    stockQuantity: 42,
    minThreshold: 10,
    unitCost: 75,
    retailPrice: 149,
    sku: "KIT-ROVERX-01",
    status: "IN_STOCK"
  },
  {
    id: "inv-arm-kit",
    name: "SEIKO 4-DOF Robotic Arm Manipulator",
    category: "Complete Kit",
    stockQuantity: 4,
    minThreshold: 8,
    unitCost: 85,
    retailPrice: 169,
    sku: "KIT-ARMD4-02",
    status: "LOW_STOCK"
  },
  {
    id: "inv-esp32-mcu",
    name: "ESP32 Dual-Core 240MHz Wi-Fi/BLE MCU",
    category: "Microcontroller",
    stockQuantity: 180,
    minThreshold: 30,
    unitCost: 6.5,
    retailPrice: 14.9,
    sku: "COMP-ESP32-D1",
    status: "IN_STOCK"
  },
  {
    id: "inv-l298n-driver",
    name: "L298N Dual H-Bridge Motor Driver Module",
    category: "Motor & Driver",
    stockQuantity: 3,
    minThreshold: 15,
    unitCost: 2.2,
    retailPrice: 5.5,
    sku: "COMP-L298N-H2",
    status: "LOW_STOCK"
  },
  {
    id: "inv-bms-typec",
    name: "2S Li-ion Boost Charger BMS (Type-C)",
    category: "Chassis & Hardware",
    stockQuantity: 95,
    minThreshold: 20,
    unitCost: 3.1,
    retailPrice: 7.9,
    sku: "COMP-BMS-2STC",
    status: "IN_STOCK"
  },
  {
    id: "inv-sg90-servo",
    name: "SG90 Metal-Gear 180° Micro Servos (Pack of 4)",
    category: "Motor & Driver",
    stockQuantity: 0,
    minThreshold: 12,
    unitCost: 5.8,
    retailPrice: 16.0,
    sku: "COMP-SG90-M4",
    status: "OUT_OF_STOCK"
  }
];

export const INITIAL_COUPONS: CouponRecord[] = [
  {
    id: "coup-stem10",
    code: "STEM10",
    discountPercent: 10,
    minOrderValue: 99,
    maxUses: 500,
    usedCount: 142,
    active: true,
    expiresAt: "2026-12-31"
  },
  {
    id: "coup-seikoedu",
    code: "SEIKOEDU",
    discountAmount: 20,
    minOrderValue: 140,
    maxUses: 200,
    usedCount: 68,
    active: true,
    expiresAt: "2026-11-30"
  },
  {
    id: "coup-labs20",
    code: "LABS20",
    discountPercent: 20,
    minOrderValue: 250,
    maxUses: 100,
    usedCount: 29,
    active: true,
    expiresAt: "2026-09-30"
  }
];

// ════ PERSISTENCE & STORAGE HELPERS ════

const ORDERS_STORAGE_KEY = "seiko_orders_store_v1";
const INVENTORY_STORAGE_KEY = "seiko_inventory_store_v1";
const COUPONS_STORAGE_KEY = "seiko_coupons_store_v1";

export function getStoredOrders(): OrderRecord[] {
  if (typeof window === "undefined") return INITIAL_ORDERS;
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_ORDERS;
  }
}

export function saveStoredOrders(orders: OrderRecord[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error("Failed to save orders to localStorage", e);
  }
}

export function getStoredInventory(): InventoryItem[] {
  if (typeof window === "undefined") return INITIAL_INVENTORY;
  try {
    const raw = localStorage.getItem(INVENTORY_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(INITIAL_INVENTORY));
      return INITIAL_INVENTORY;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_INVENTORY;
  }
}

export function saveStoredInventory(items: InventoryItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Failed to save inventory to localStorage", e);
  }
}

/**
 * Places a real new customer order, saves it to store, and deducts inventory stock!
 */
export function placeCustomerOrder(params: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: OrderItemRecord[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: "UPI" | "Credit / Debit Card" | "Net Banking" | "Cash on Delivery";
}): OrderRecord {
  const currentOrders = getStoredOrders();
  const newId = `SEIKO-${Math.floor(1000 + Math.random() * 9000)}`;

  const newOrder: OrderRecord = {
    id: newId,
    customerName: params.customerName,
    customerEmail: params.customerEmail,
    customerPhone: params.customerPhone,
    address: params.address,
    city: params.city,
    state: params.state,
    pincode: params.pincode,
    items: params.items,
    subtotal: params.subtotal,
    discount: params.discount,
    couponCode: params.couponCode,
    total: params.total,
    paymentMethod: params.paymentMethod,
    paymentStatus: "PAID",
    fulfillmentStatus: "PROCESSING",
    createdAt: new Date().toISOString()
  };

  // 1. Add order to beginning of list
  const updatedOrders = [newOrder, ...currentOrders];
  saveStoredOrders(updatedOrders);

  // 2. Automatically deduct inventory
  const currentInventory = getStoredInventory();
  const updatedInventory = currentInventory.map((inv) => {
    // Check if kit matches
    const matchedItem = params.items.find((itm) => itm.kitId.includes("rover") && inv.id === "inv-rover-kit" || itm.kitId.includes("arm") && inv.id === "inv-arm-kit");
    if (matchedItem) {
      const newStock = Math.max(0, inv.stockQuantity - matchedItem.quantity);
      let newStatus: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK" = "IN_STOCK";
      if (newStock === 0) newStatus = "OUT_OF_STOCK";
      else if (newStock <= inv.minThreshold) newStatus = "LOW_STOCK";
      return { ...inv, stockQuantity: newStock, status: newStatus };
    }
    return inv;
  });
  saveStoredInventory(updatedInventory);

  return newOrder;
}
