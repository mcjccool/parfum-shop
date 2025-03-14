// src/CartContext.js

import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, size, quantity) => {
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex(
      (item) => item.product.id === product.id && item.size === size
    );

    if (itemIndex > -1) {
      updatedCart[itemIndex].quantity += parseInt(quantity, 10);
    } else {
      updatedCart.push({ product, size, quantity: parseInt(quantity, 10) });
    }

    setCart(updatedCart);
  };

  const removeFromCart = (productId, size) => {
    const updatedCart = cart.filter(
      (item) => !(item.product.id === productId && item.size === size)
    );
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = item.product.sizes.find((s) => s.size === item.size).price;
      return total + price * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotalPrice, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};
