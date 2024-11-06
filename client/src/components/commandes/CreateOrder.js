import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateOrder.css'; // Assurez-vous de créer ce fichier CSS pour les styles

const CreateOrder = () => {
  const [customerId, setCustomerId] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [message, setMessage] = useState('');

  // Charger la liste des produits disponibles
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      }
    };

    fetchProducts();
  }, []);

  // Mettre à jour le montant total à chaque modification de la sélection
  useEffect(() => {
    const total = selectedProducts.reduce((sum, product) => 
      sum + product.quantity * product.price, 0);
    setTotalAmount(total);
  }, [selectedProducts]);

  // Gérer l'ajout de produits à la commande
  const handleAddProduct = (productId) => {
    const product = products.find(p => p._id === productId);
    if (product) {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  // Gérer la modification de la quantité pour un produit sélectionné
  const handleQuantityChange = (productId, quantity) => {
    setSelectedProducts(selectedProducts.map(product =>
      product._id === productId ? { ...product, quantity: parseInt(quantity) } : product
    ));
  };

  // Soumettre la commande
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        customerId,
        products: selectedProducts.map(({ _id, quantity }) => ({ productId: _id, quantity })),
        totalAmount,
      };
      await axios.post('/api/orders', orderData);
      setMessage('Commande créée avec succès !');
      setCustomerId('');
      setSelectedProducts([]);
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error);
      setMessage("Erreur lors de la création de la commande.");
    }
  };

  return (
    <div className="create-order">
      <h2>Créer une Nouvelle Commande</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Identifiant Client:</label>
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Ajouter Produits:</label>
          <select onChange={(e) => handleAddProduct(e.target.value)}>
            <option value="">Sélectionnez un produit</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} - {product.price}€
              </option>
            ))}
          </select>
        </div>
        <div className="selected-products">
          <h3>Produits Sélectionnés</h3>
          {selectedProducts.map((product) => (
            <div key={product._id} className="product-item">
              <p>{product.name}</p>
              <input
                type="number"
                min="1"
                value={product.quantity}
                onChange={(e) => handleQuantityChange(product._id, e.target.value)}
              />
              <span>Prix Unitaire: {product.price}€</span>
            </div>
          ))}
        </div>
        <div className="total-amount">
          <p><strong>Montant Total:</strong> {totalAmount}€</p>
        </div>
        <button type="submit" className="submit-button">Créer Commande</button>
      </form>
    </div>
  );
};

export default CreateOrder;
