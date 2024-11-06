import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CustomerList.css'; // Assurez-vous de créer ce fichier CSS pour les styles

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/customers');
        setCustomers(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des clients.');
      }
    };

    fetchCustomers();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="customer-list">
      <h2>Liste des Clients</h2>
      {customers.length === 0 ? (
        <p>Aucun client trouvé.</p>
      ) : (
        <table className="customer-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Contact</th>
              <th>Historique des Achats</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.contactInfo}</td>
                <td>
                  {customer.purchaseHistory.length > 0 ? (
                    <ul>
                      {customer.purchaseHistory.map((orderId) => (
                        <li key={orderId}>{orderId}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>Aucun achat</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerList;
