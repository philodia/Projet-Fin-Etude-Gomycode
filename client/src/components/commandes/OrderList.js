import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderList.css'; // Assurez-vous de créer ce fichier CSS pour les styles

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders');
        setOrders(response.data);
        setError('');
      } catch (err) {
        setError('Erreur lors de la récupération des commandes.');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-list">
      <h2>Liste des Commandes</h2>
      {error && <div className="error-message">{error}</div>}
      <table className="order-table">
        <thead>
          <tr>
            <th>Commande ID</th>
            <th>Client</th>
            <th>Produits</th>
            <th>Montant Total</th>
            <th>Date de Commande</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.customerId}</td>
              <td>
                <ul>
                  {order.products.map((product, index) => (
                    <li key={index}>
                      {product.productId} - Quantité: {product.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{order.totalAmount}€</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
