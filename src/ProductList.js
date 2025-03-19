// src/ProductList.js

import React, { useState, useEffect } from 'react';
import './ProductList.css';
import ProductItem from './ProductItem';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch('https://parfum-shop.onrender.com/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const applyFilters = () => {
    const priceFilter = document.getElementById('price-filter').value;
    const brandFilter = document.getElementById('brand-filter').value;

    let filtered = products;

    if (priceFilter !== 'all') {
      const [min, max] = priceFilter.split('-');
      filtered = filtered.filter(product => {
        const price = product.sizes[0].price;
        return (!min || price >= min) && (!max || price <= max);
      });
    }

    if (brandFilter !== 'all') {
      filtered = filtered.filter(product => product.brand === brandFilter);
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    document.getElementById('apply-filters').addEventListener('click', applyFilters);
  }, [products]);

  return (
    <div className="product-list-container">
      <div className="filter-section">
        <h3>Filter</h3>
        <div className="filter-group">
          <label htmlFor="price-filter">Preis:</label>
          <select id="price-filter">
            <option value="all">Alle</option>
            <option value="0-4.95">0 - 4.95 CHF, 2ml</option>
            <option value="5-9.95">5 - 9.95 CHF, 2ml</option>
            <option value="10-14.95">10 - 14.95 CHF, 2ml</option>
            <option value="15+">15+ CHF, 2ml</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="brand-filter">Marke:</label>
          <select id="brand-filter">
            <option value="all">Alle</option>
            <option value="Xerjoff">Xerjoff</option>
            <option value="Mancera">Mancera</option>
            <option value="Tom Ford">Tom Ford</option>
            <option value="Acqua di Parma">Acqua di Parma</option>
            <option value="Gisada">Gisada</option>
            <option value="Montblanc">Montblanc</option>
          </select>
        </div>
        <button id="apply-filters">Filter anwenden</button>
      </div>
      <div className="product-list">
        {filteredProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
