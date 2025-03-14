import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        setError(data.message);
      } else {
        setUser(data);
        navigate('/');
      }
    })
    .catch(error => console.error('Error logging in user:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Anmelden</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="email" placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Passwort" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Anmelden</button>
    </form>
  );
};

export default Login;
