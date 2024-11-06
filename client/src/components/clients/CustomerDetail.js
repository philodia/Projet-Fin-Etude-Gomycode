import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CustomerDetail.css'; // Assurez-vous de créer ce fichier CSS pour les styles

const CustomerDetail = ({ customerId }) => {
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomerDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/customers/${customerId}`);
        setCustomer(response.data);
        setError('');
      } catch (err) {
        setError('Erreur lors de la récupération des détails du client.');
      }
    };

    fetchCustomerDetail();
  }, [customerId]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!customer) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="customer-detail">
      <h2>Détails du Client</h2>
      <p><strong>Nom:</strong> {customer.name}</p>
      <p><strong>Contact:</strong> {customer.contactInfo}</p>
      <h3>Historique des Achats</h3>
      {customer.purchaseHistory.length > 0 ? (
        <ul>
          {customer.purchaseHistory.map((orderId) => (
            <li key={orderId}>Commande ID: {orderId}</li>
          ))}
        </ul>
      ) : (
        <p>Aucun achat trouvé.</p>
      )}
    </div>
  );
};

export default CustomerDetail;
