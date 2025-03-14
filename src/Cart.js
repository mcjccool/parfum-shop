// src/Cart.js

import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart, getTotalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate('/address');
  };

  return (
    <div className="cart">
      <h2>Dein Warenkorb</h2>
      {cart.length === 0 ? (
        <p>Dein Warenkorb ist leer</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.product.name} - {item.size} - {item.quantity} x CHF {item.product.sizes.find(s => s.size === item.size).price.toFixed(2)} = CHF {(item.product.sizes.find(s => s.size === item.size).price * item.quantity).toFixed(2)}
                <button onClick={() => removeFromCart(item.product.id, item.size)}>Entfernen</button>
              </li>
            ))}
          </ul>
          <h3>Kosten insgesammt: CHF {getTotalPrice().toFixed(2)}</h3>
          <div className="cart-buttons">
            <button onClick={clearCart} className="clear-cart-btn">Warenkorb leeren</button>
            <button onClick={handleProceed} className="checkout-btn">Bestellung abschließen</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
