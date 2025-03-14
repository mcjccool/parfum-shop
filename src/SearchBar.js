// src/SearchBar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredProducts);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Suche nach Parfums..."
      />
      {suggestions.length > 0 && (
        <div className="search-suggestions">
          <ul>
            {suggestions.map(product => (
              <li key={product.id}>
                <Link to={`/product/${product.id}`} onClick={() => setSuggestions([])}>
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
