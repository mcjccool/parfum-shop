// src/PaymentForm.js

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentForm.css';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: ''
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBack = () => {
    navigate('/address', { state: location.state });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { cardNumber, expiryDate, cvv, cardHolder } = formData;

    if (!cardNumber || !expiryDate || !cvv || !cardHolder) {
      setError('Es sind nicht alle Pflichtfelder ausgefüllt worden');
      return;
    }

    setError('');
    // Bestellvorgang abschliessen und die Bestellung speichern
    navigate('/confirmation');
  };

  return (
    <div className="payment-form">
      <h2>Bezahlart</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Kartennummer:
          <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} />
        </label>
        <label>
          Gültig bis (MM/JJ):
          <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleChange} />
        </label>
        <label>
          Prüfnummer. (3-stellig):
          <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} />
        </label>
        <label>
          Inhaber der Karte:
          <input type="text" name="cardHolder" value={formData.cardHolder} onChange={handleChange} />
        </label>
        <div className="form-buttons">
          <button type="button" onClick={handleBack}>Zurück</button>
          <button type="submit">Bestellung abschliessen</button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
