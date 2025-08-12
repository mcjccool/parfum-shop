// src/AddressForm.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddressForm.css';

const Address = ({ user }) => {
  const navigate = useNavigate();
  const [gender, setGender] = useState(user ? user.gender : '');
  const [firstName, setFirstName] = useState(user ? user.firstName : '');
  const [lastName, setLastName] = useState(user ? user.lastName : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const today = new Date().toISOString().split('T')[0]; // Heutiges Datum im Format YYYY-MM-DD
  const [date, setDate] = useState(today); // Standardmäßig auf das heutige Datum setzen
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Schweiz');
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [addressAddition, setAddressAddition] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [email, password]);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&.,]{6,}$/.test(password);
  };

  const allFieldsFilled = () => {
    return gender && firstName && lastName && street && streetNumber && zip && city;
  };

  const handleProceedWithRegistration = () => {
    if (!allFieldsFilled() || !validateEmail(email) || !validatePassword(password)) {
      setError('Sie müssen alle Pflichtfelder ausfüllen.');
      return;
    }

    // Schaut ob die E-Mail bereits vorhanden ist
    fetch(`https://parfum-shop.onrender.com/api/users?email=${email}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0 && data[0].password !== password) {
          setError('Die E-Mail wird bereits verwendet. Geben Sie das richtige Passwort an.');
        } else {
          // Speichert die Daten des Users
          fetch('https://parfum-shop.onrender.com/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              firstName,
              lastName,
              email,
              password,
              gender
            })
          })
            .then(response => response.json())
            .then(() => {
              navigate('/payment');
            })
            .catch(error => console.error('Error registering user:', error));
        }
      })
      .catch(error => console.error('Error checking email:', error));
  };

  const handleProceedWithoutRegistration = () => {
    navigate('/GuestCheckout', {
        state: {
            firstName,
            lastName,
            street,
            streetNumber,
            zip,
            city
        }
    });
};

  const handleProceedLoggedInUser = () => {
    if (!allFieldsFilled()) {
      setError('Sie haben nicht alle Pflichtfelder ausgefüllt.');
      return;
    }

    navigate('/payment');
  };

  return (
    <div className="address-form">
      <h2>Adresse und Daten</h2>
      {error && <p className="error">{error}</p>}
      <label>
        <h4>Geschlecht:</h4>
        <div>
          Männlich
          <input
            type="radio"
            value="männlich"
            checked={gender === 'männlich'}
            onChange={() => setGender('männlich')}
          />
          Weiblich
          <input
            type="radio"
            value="weiblich"
            checked={gender === 'weiblich'}
            onChange={() => setGender('weiblich')}
          />
           Keine Angabe
          <input
            type="radio"
            value="keine Angabe"
            checked={gender === 'keine Angabe'}
            onChange={() => setGender('keine Angabe')}
          />
        </div>
      </label>
      <label>
        Vorname:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label>
        Nachname:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <label>
        Geburtsdatum:
        <input
          type="date"
          id="start"
          name="trip-start"
          value={date} // Heutiges Datum wird angezeigt
          onChange={(e) => setDate(e.target.value)} // Benutzer kann ein früheres Datum wählen
          min="1900-01-01" // Frühestes Datum: 01.01.1900
          max={today} // Spätestes Datum: Heute
        />
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
        <input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
        />
      </label>
      <label>
        Nr.:
        <input
          type="text"
          value={streetNumber}
          onChange={(e) => setStreetNumber(e.target.value)}
          required
        />
      </label>
      <label>
        PLZ:
        <input
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          required
        />
      </label>
      <label>
        Ort:
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
        Adressezusatz (optional):
        <input
          type="text"
          value={addressAddition}
          onChange={(e) => setAddressAddition(e.target.value)}
        />
      </label>
      <label>
        E-Mail:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!!user}
          className={user ? 'disabled' : ''}
        />
      </label>
      <label>
        Telefonnummer:
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      {!user && (
        <>
          <label>
            Passwort:
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className="password-container">
            <label>Passwort anzeigen:</label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className="button-container">
            <div>
              <button onClick={() => navigate('/cart')} className="back-btn">Zurück</button>
            </div>
            <div>
              <button onClick={handleProceedWithoutRegistration} className="checkout-btn">Fortfahren ohne Anmeldung</button>
              <button onClick={handleProceedWithRegistration} className="checkout-btn">Bezahlen</button>
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
        </>
      )}
      {user && (
        <div className="button-container">
          <button onClick={() => navigate('/cart')} className="back-btn">Zurück</button>
          <button onClick={handleProceedLoggedInUser} className="checkout-btn">Bezahlen</button>
        </div>
      )}
    </div>
  );
};

export default Address;
