import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("shop_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("shop_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, qty) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === product.id);
      if (existing) {
        return prev.map((c) =>
          c.id === product.id ? { ...c, qty: Math.min(product.stock, c.qty + qty) } : c
        );
      }
      return [...prev, { id: product.id, qty }];
    });
  };

  const updateQty = (id, qty) =>
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, qty } : c)));

  const removeFromCart = (id) => setCart((prev) => prev.filter((c) => c.id !== id));

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
