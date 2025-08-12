// src/GuestCheckout.js

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AddressForm.css';

const GuestCheckout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initial = (location && location.state) ? location.state : {};

  const [gender, setGender] = useState(initial.gender || '');
  const [firstName, setFirstName] = useState(initial.firstName || '');
  const [lastName, setLastName] = useState(initial.lastName || '');
  const [country, setCountry] = useState(initial.country || 'Schweiz');
  const [street, setStreet] = useState(initial.street || '');
  const [streetNumber, setStreetNumber] = useState(initial.streetNumber || '');
  const [zip, setZip] = useState(initial.zip || '');
  const [city, setCity] = useState(initial.city || '');
  const [addressAddition, setAddressAddition] = useState(initial.addressAddition || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [gender, firstName, lastName, street, streetNumber, zip, city]);

  const allFieldsFilled = () => {
    return gender && firstName && lastName && street && streetNumber && zip && city;
  };

  const handleOrderSubmit = () => {
    if (!allFieldsFilled()) {
      setError('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }
    navigate('/payment', {
      state: {
        guest: true,
        address: { gender, firstName, lastName, country, street, streetNumber, zip, city, addressAddition }
      }
    });
  };

  return (
    <div className="address-form">
      <h2>Bestellung als Gast</h2>
      {error && <p className="error">{error}</p>}

      <label>
        <h4>Geschlecht:</h4>
        <div>
          <div>Männlich</div>
          <input
            type="radio"
            name="gender"
            value="Männlich"
            checked={gender === 'Männlich'}
            onChange={(e) => setGender(e.target.value)}
          />
          <div>Weiblich</div>
          <input
            type="radio"
            name="gender"
            value="Weiblich"
            checked={gender === 'Weiblich'}
            onChange={(e) => setGender(e.target.value)}
          />
          <div>Keine Angabe</div>
          <input
            type="radio"
            name="gender"
            value="Keine Angabe"
            checked={gender === 'Keine Angabe'}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
      </label>

      <label>
        Vorname:
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </label>

      <label>
        Nachname:
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </label>

      <label>
        Land:
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="Schweiz">Schweiz</option>
          <option value="Österreich">Österreich</option>
          <option value="Deutschland">Deutschland</option>
          <option value="Lichtenstein">Lichtenstein</option>
        </select>
      </label>

      <label>
        Strasse:
        <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} required />
      </label>

      <label>
        Nr.:
        <input type="text" value={streetNumber} onChange={(e) => setStreetNumber(e.target.value)} required />
      </label>

      <label>
        PLZ:
        <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} required />
      </label>

      <label>
        Ort:
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
      </label>

      <label>
        Adresszusatz (optional):
        <input type="text" value={addressAddition} onChange={(e) => setAddressAddition(e.target.value)} />
      </label>

      <div className="button-container">
        <div>
          <button onClick={() => navigate('/cart')} className="back-btn">Zurück</button>
        </div>
        <div>
          <button onClick={() => navigate('/address')} className="checkout-btn">Fortfahren mit Anmeldung</button>
          <button onClick={handleOrderSubmit} className="checkout-btn">Bezahlen</button>
        </div>
      </div>
      <div className="benefits">
            <h3>Ihre Vorteile mit einem Kundenkonto:</h3>
            <ul>
              <li>Status der Bestellung online einsehen</li>
              <li>Bestellhistorie</li>
              <li>Geburtstagsüberraschung</li>
            </ul>
          </div>
    </div>
  );
};

export default GuestCheckout;
