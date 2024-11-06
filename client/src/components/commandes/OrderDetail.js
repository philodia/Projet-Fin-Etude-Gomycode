import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderDetail.css'; // Assurez-vous de créer ce fichier CSS pour les styles

const OrderDetail = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
        setOrder(response.data);
        setError('');
      } catch (err) {
        setError('Erreur lors de la récupération des détails de la commande.');
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!order) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="order-detail">
      <h2>Détails de la Commande</h2>
      <div className="order-info">
        <p><strong>Commande ID:</strong> {order.orderId}</p>
        <p><strong>Client ID:</strong> {order.customerId}</p>
        <p><strong>Montant Total:</strong> {order.totalAmount}€</p>
        <p><strong>Date de Commande:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
        <p><strong>Statut:</strong> {order.status}</p>
      </div>
      <h3>Produits Commandés</h3>
      <ul className="product-list">
        {order.products.map((product, index) => (
          <li key={index}>
            <p><strong>Produit ID:</strong> {product.productId}</p>
            <p><strong>Quantité:</strong> {product.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetail;
