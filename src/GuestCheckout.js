// src/GuestCheckout.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GuestCheckout.css';

const GuestCheckout = () => {
  const [gender, setGender] = useState(user ? user.gender : '');
  const [firstName, setFirstName] = useState(user ? user.firstName : '');
  const [lastName, setLastName] = useState(user ? user.lastName : '');
  const [country, setCountry] = useState('Schweiz');
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [addressAddition, setAddressAddition] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const allFieldsFilled = () => {
    return gender && firstName && lastName && country && street && streetNumber && zip && city;
  };
    
    // Bestellung speichern
    console.log('Bestellung als Gast:', { gender, firstName, lastName, country, street, streetNumber, zip, city });
    
    // Weiter zur Zahlungsseite
    navigate('/payment');
  };

  return (
    <div className="guest-checkout">
      <h2>Bestellung als Gast</h2>
      {error && <p className="error-message">{error}</p>}
      <label>
        Vorname:
        <input type="text" value={setFirstName} onChange={(e) => setFirstName(e.target.value)} required />
      </label>
      <label>
        Nachname:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </label>
      <div className="checkout-buttons">
        <button onClick={() => navigate('/')}>Bestellung abbrechen</button>
        <button onClick={() => navigate('/login')}>Fortfahren mit Anmeldung</button>
        <button onClick={handleOrderSubmit}>Bestellung abschließen</button>
      </div>
    </div>
  );

export default GuestCheckout;