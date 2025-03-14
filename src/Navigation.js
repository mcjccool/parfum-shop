// src/Navigation.js

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';
import { CartContext } from './CartContext';

const Navigation = ({ user, setUser }) => {
  const navigate = useNavigate();
  const { getTotalItems } = useContext(CartContext);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <nav>
      <input type="checkbox" id="menu-toggle" />
      <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>
      <ul className="menu">
        <li><Link to="/">Startseite</Link></li>
        <li><Link to="/cart" className="cart-icon">
          Warenkorb {getTotalItems() > 0 && (
            <span className="cart-count">
              {getTotalItems() > 9 ? '9+' : getTotalItems()}
            </span>
          )}
        </Link></li>
        {!user && <li><Link to="/login">Anmelden</Link></li>}
        {!user && <li><Link to="/register">Registrieren</Link></li>}
        {user && <li><Link to="/orders">Bestellungen</Link></li>}
        {user && <li><button onClick={handleLogout} className="logout-button">Abmelden</button></li>}
      </ul>
    </nav>
  );
};

export default Navigation;
