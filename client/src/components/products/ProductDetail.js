import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductDetail.css'; // Assurez-vous de créer ce fichier CSS pour les styles

const ProductDetail = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(response.data);
        setError('');
      } catch (err) {
        setError('Erreur lors de la récupération des détails du produit.');
      }
    };

    fetchProductDetail();
  }, [productId]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!product) {
    return <div>Chargement...</div>; // Affichage d'un message pendant le chargement
  }

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Prix:</strong> {product.price}€</p>
      <button className="add-to-cart-button">Ajouter au panier</button>
    </div>
  );
};

export default ProductDetail;
