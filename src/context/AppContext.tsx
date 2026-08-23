"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Project } from "@/data/projects";
import { KitProduct, MAIN_KIT } from "@/data/products";
import { toast } from "sonner";

export interface CartItem {
  product: KitProduct;
  quantity: number;
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (product: KitProduct, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  
  isSchoolModalOpen: boolean;
  setIsSchoolModalOpen: (open: boolean) => void;
  
  isSubmitModalOpen: boolean;
  setIsSubmitModalOpen: (open: boolean) => void;
  
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  
  cartTotalCount: number;
  cartTotalPrice: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([
    { product: MAIN_KIT, quantity: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const addToCart = (product: KitProduct, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
    toast.success(`Added "${product.name}" to cart!`, {
      description: `$${product.price} • ${(product.category || 'stem').toUpperCase()}`,
    });
  };

  const removeFromCart = (productId: string) => {
    const itemToRemove = cart.find(item => item.product.id === productId);
    setCart(prev => prev.filter(item => item.product.id !== productId));
    if (itemToRemove) {
      toast.info(`Removed "${itemToRemove.product.name}" from cart`);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.info("Shopping cart cleared");
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        selectedProject,
        setSelectedProject,
        isSchoolModalOpen,
        setIsSchoolModalOpen,
        isSubmitModalOpen,
        setIsSubmitModalOpen,
        isAdminOpen,
        setIsAdminOpen,
        cartTotalCount,
        cartTotalPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
