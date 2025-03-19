// src/Register.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = ({ setUser }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&.,<>'^`]{6,}$/.test(password);
  };

  const handleRegister = () => {
    setError('');
    if (!validateEmail(email)) {
      setError('Ungültige E-Mail-Adresse.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Das Passwort muss mindestens 6 Zeichen lang sein, mindestens 1 Buchstabe und 1 Ziffer beinhalten. Sonderzeichen sind erlaubt, aber nicht notwendig.');
      return;
    }

    fetch(`https://parfum-shop.onrender.com/api/users?email=${email}`)
      .then(response => {
        if (response.status === 404) {
          return [];
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.length > 0) {
          setError('Die E-Mail wird bereits verwendet.');
        } else {
          fetch('https://parfum-shop.onrender.com/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              firstName,
              lastName,
              email,
              password
            })
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(user => {
              setUser(user);
              navigate('/');
            })
            .catch(error => {
              console.error('Error registering user:', error);
              setError('Registrierungsfehler. Bitte versuchen Sie es später erneut.');
            });
        }
      })
      .catch(error => {
        console.error('Error checking email:', error);
        setError('Fehler bei der Überprüfung der E-Mail. Bitte versuchen Sie es später erneut.');
      });
  };

  return (
    <div className="register-form">
      <h2>Registrieren</h2>
      {error && <p className="error">{error}</p>}
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
        E-Mail:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Passwort:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <p className="password-criteria">
        Das Passwort muss mindestens 6 Zeichen lang sein, mindestens 1 Buchstabe und 1 Ziffer beinhalten. Sonderzeichen sind erlaubt, aber nicht notwendig.
      </p>
      <button onClick={handleRegister} className="register-btn">Registrieren</button>
    </div>
  );
};

export default Register;
