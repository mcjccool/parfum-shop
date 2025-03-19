import React, { useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import './Orders.css';

const Orders = ({ user }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`https://parfum-shop.onrender.com/api/orders?userId=${user.id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Orders fetched:', data);
          if (Array.isArray(data)) {
            setOrders(data);
          } else {
            console.error('Unexpected response format:', data);
          }
        })
        .catch(error => console.error('Error fetching orders:', error));
    }
  }, [user]);

  return (
    <div className="orders-container">
      <h2>Deine Bestellung</h2>
      {orders.length === 0 ? (
        <p>Keine Bestellung gefunden.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <OrderItem key={order.id} order={order} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
