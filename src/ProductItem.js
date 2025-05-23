// src/ProductItem.js

import React from 'react';
import { Link } from 'react-router-dom';
import './ProductItem.css';

const ProductItem = ({ product }) => {
  const { id, name, brand, imageUrl, sizes } = product;
  const price = sizes[0].price; // Annahme: Preis ist im ersten Grössenobjekt

  return (
    <div className="product-item">
      <img src={process.env.PUBLIC_URL + product.imageUrl} alt={product.name} />
      <h2>{name}</h2>
      <p>{brand}</p>
      <p>ab {price.toFixed(2)} CHF</p>
      <p>2ml, 5ml, 10ml</p>
      <Link to={`/product/${id}`}>Details anzeigen</Link>
    </div>
  );
};

export default ProductItem;
