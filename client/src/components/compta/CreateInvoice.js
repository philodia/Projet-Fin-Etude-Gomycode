import React, { useState } from 'react';
import axios from 'axios';
import './CreateInvoice.css'; // Assurez-vous de créer ce fichier CSS pour les styles

const CreateInvoice = () => {
  const [orderId, setOrderId] = useState('');
  const [amountDue, setAmountDue] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const newInvoice = {
        orderId,
        amountDue,
        amountPaid,
        paymentStatus,
        issueDate: new Date().toISOString(), // Date actuelle
      };

      const response = await axios.post('http://localhost:5000/api/invoices', newInvoice);
      setSuccess('Facture créée avec succès !');
      // Réinitialiser le formulaire
      setOrderId('');
      setAmountDue('');
      setAmountPaid('');
      setPaymentStatus('pending');
    } catch (err) {
      setError('Erreur lors de la création de la facture. Vérifiez les informations saisies.');
    }
  };

  return (
    <div className="create-invoice">
      <h2>Créer une Facture</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID de la Commande :</label>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Montant Dû :</label>
          <input
            type="number"
            value={amountDue}
            onChange={(e) => setAmountDue(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Montant Payé :</label>
          <input
            type="number"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Statut du Paiement :</label>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
          >
            <option value="paid">Payé</option>
            <option value="pending">En attente</option>
            <option value="failed">Échoué</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Créer la Facture</button>
      </form>
    </div>
  );
};

export default CreateInvoice;
