import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css'; // Assurez-vous de créer ce fichier CSS pour les styles

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // Remplacez par l'URL de votre API
        setProducts(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des produits');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Chargement des produits...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-list">
      <h2>Liste des Produits</h2>
      <ul className="product-items">
        {products.map(product => (
          <li key={product.productId} className="product-item">
            <h3>{product.name}</h3>
            <p>Description : {product.description}</p>
            <p>Prix : {product.price} €</p>
            <p>Quantité en stock : {product.stock}</p>
            <button className="add-to-cart-button">Ajouter au Panier</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
