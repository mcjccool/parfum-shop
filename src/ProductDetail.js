// src/ProductDetail.js

import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import { CartContext } from './CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, cart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    fetch(`https://parfum-shop.onrender.com/api/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setSelectedSize(data.sizes[0].size);
        setTotalPrice(data.sizes[0].price);
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    animateFlyToCart();
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const animateFlyToCart = () => {
    const productImage = document.querySelector('.product-detail img');
    const cartIcon = document.querySelector('.cart-icon');
    const clonedImage = productImage.cloneNode(true);
    const { top, left } = productImage.getBoundingClientRect();

    clonedImage.style.position = 'fixed';
    clonedImage.style.top = `${top}px`;
    clonedImage.style.left = `${left}px`;
    clonedImage.style.width = '50px';
    clonedImage.style.height = '50px';
    clonedImage.classList.add('fly');

    document.body.appendChild(clonedImage);

    clonedImage.addEventListener('animationend', () => {
      clonedImage.remove();
    });
  };

  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    setSelectedSize(newSize);
    const newSizePrice = product.sizes.find(size => size.size === newSize).price;
    setTotalPrice(newSizePrice * quantity);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);
    const newSizePrice = product.sizes.find(size => size.size === selectedSize).price;
    setTotalPrice(newSizePrice * newQuantity);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star">&#9733;</span>);
    }

    if (halfStar) {
      stars.push(<span key="half" className="star half">&#9733;</span>);
    }

    return stars;
  };

  if (!product) {
    return <p>Lädt...</p>;
  }

  return (
    <div className="product-detail">
      <img src={process.env.PUBLIC_URL + product.imageUrl} alt={product.name} className="product-image" />
      <h2>{product.name}</h2>
      <p>Marke: {product.brand}</p>
      <p>{product.description}</p>
      <p>Geeignete Jahreszeit: {product.suitableSeasons ? product.suitableSeasons.join(', ') : 'Keine Angabe'}</p>
      <p>Duftnoten:</p>
      <ul>
        <li>Kopf: {product.notes && product.notes.top ? product.notes.top : 'Keine Angabe'}</li>
        <li>Herz: {product.notes && product.notes.heart ? product.notes.heart : 'Keine Angabe'}</li>
        <li>Basis: {product.notes && product.notes.base ? product.notes.base : 'Keine Angabe'}</li>
      </ul>
      <p>Haltbarkeit: {renderStars(product.longevity)}</p>
      <p>Duftschweif: {renderStars(product.sillage)}</p>
      <p>Geschlecht: {product.gender}</p>
      <label>
        Größe:
        <select value={selectedSize} onChange={handleSizeChange}>
          {product.sizes.map(size => (
            <option key={size.size} value={size.size}>
              {size.size} - CHF {size.price.toFixed(2)}
            </option>
          ))}
        </select>
      </label>
      <label>
        Menge:
        <input type="number" min="1" value={quantity} onChange={handleQuantityChange} />
      </label>
      <div className="price-and-button">
        <button onClick={handleAddToCart}>In den Warenkorb</button>
        <span className="total-price">Gesamtpreis: CHF {totalPrice.toFixed(2)}</span>
      </div>
      {showNotification && <div className="notification">Produkt wurde erfolgreich zum Warenkorb hinzugefügt!</div>}
    </div>
  );
};

export default ProductDetail;
