//src/OrderItem.js

import React, { useState } from 'react';
import './Orders.css';

const OrderItem = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);

  const calculateTotalPrice = () => {
    return order.cart.reduce((total, item) => {
      const sizeOption = item.product.sizes.find(size => size.size === item.size);
      const price = sizeOption ? sizeOption.price : 0;
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  return (
    <li className="order-item">
      <h3>Bestellungsnummer: {order.id}</h3>
      <p>Datum: {order.date}</p>
      <p className="total-price">Gesammt Kosten: CHF {calculateTotalPrice()}</p>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && (
        <div className="order-details">
          <ul>
            {order.cart.map((item, index) => {
              const sizeOption = item.product.sizes.find(size => size.size === item.size);
              const price = sizeOption ? sizeOption.price : 0;
              return (
                <li key={index} className="order-details-item">
                  <span>{item.product.name}</span> - {item.size} - {item.quantity} x CHF {price.toFixed(2)} = CHF {(price * item.quantity).toFixed(2)}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </li>
  );
};

export default OrderItem;
