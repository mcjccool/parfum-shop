// src/OrderList.js

import React, { useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import './OrderList.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/orders')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  return (
    <div className="order-list">
      <h2>Deine Bestellung</h2>
      <ul>
        {orders.map(order => (
          <OrderItem key={order.id} order={order} />
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
