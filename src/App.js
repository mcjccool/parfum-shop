// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SearchBar from './SearchBar';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import Login from './Login';
import Register from './Register';
import Orders from './Orders';
import Navigation from './Navigation';
import { CartProvider } from './CartContext';
import Address from './AddressForm';
import Payment from './PaymentForm';
import Confirmation from './Confirmation';

const App = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <header>
            <h1>ParfumSamples.ch</h1>
            <SearchBar products={products} />
            <Navigation user={user} setUser={setUser} />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart user={user} />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register setUser={setUser} />} />
              {user && <Route path="/orders" element={<Orders user={user} />} />}
              <Route path="/address" element={<Address user={user} />} />
              <Route path="/payment" element={<Payment user={user} />} />
              <Route path="/confirmation" element={<Confirmation />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
