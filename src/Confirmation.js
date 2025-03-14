// src/Confirmation.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Confirmation.css';

const Confirmation = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  const handleOrders = () => {
    navigate('/orders');
  };

  return (
    <div className="confirmation">
      <h2>Bestellung bestätigt!</h2>
      Vielen Dank für Ihre Bestellung! Wir werden Ihre Bestellung so schnell es geht verpacken und zu Ihnen versenden.
      <div className="form-buttons">
        <button onClick={handleHome}>Zurück zur Startseite</button>
        <button onClick={handleOrders}>Meine Bestellung ansehen</button>
      </div>
    </div>
  );
};

export default Confirmation;
