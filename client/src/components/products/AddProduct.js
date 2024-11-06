import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css'; // Assurez-vous de créer ce fichier CSS pour les styles

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !description || !price || !imageUrl) {
      setError('Tous les champs sont requis.');
      return;
    }

    try {
      const newProduct = { name, description, price, imageUrl };
      await axios.post('http://localhost:5000/api/products', newProduct);
      setSuccess('Produit ajouté avec succès!');
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
    } catch (error) {
      setError("Erreur lors de l'ajout du produit.");
    }
  };

  return (
    <div className="add-product">
      <h2>Ajouter un Produit</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleAddProduct} className="add-product-form">
        <div className="form-group">
          <label htmlFor="name">Nom du produit</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Prix (€)</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">URL de l'image</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Ajouter le produit</button>
      </form>
    </div>
  );
};

export default AddProduct;
