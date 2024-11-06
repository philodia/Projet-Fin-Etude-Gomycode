import React, { useState } from 'react';
import axios from 'axios';
import './AddCustomer.css'; // Assurez-vous de créer ce fichier CSS pour les styles

const AddCustomer = () => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCustomer = {
      name,
      contactInfo,
      purchaseHistory,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/customers', newCustomer);
      setMessage('Client ajouté avec succès!');
      setError('');
      setName('');
      setContactInfo('');
      setPurchaseHistory([]);
    } catch (err) {
      setError('Erreur lors de l\'ajout du client.');
      setMessage('');
    }
  };

  return (
    <div className="add-customer">
      <h2>Ajouter un Nouveau Client</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="add-customer-form">
        <label>
          Nom:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Informations de Contact:
          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
          />
        </label>
        <label>
          Historique des Achats (ID de commandes séparés par des virgules):
          <input
            type="text"
            value={purchaseHistory}
            onChange={(e) => setPurchaseHistory(e.target.value.split(','))}
          />
        </label>
        <button type="submit" className="submit-button">Ajouter le Client</button>
      </form>
    </div>
  );
};

export default AddCustomer;
