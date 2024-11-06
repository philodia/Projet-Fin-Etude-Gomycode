import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './InvoiceDetail.css'; // Assurez-vous de créer ce fichier CSS pour les styles

const InvoiceDetail = ({ invoiceId }) => {
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvoiceDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/invoices/${invoiceId}`);
        setInvoice(response.data);
        setError('');
      } catch (err) {
        setError('Erreur lors de la récupération des détails de la facture.');
      }
    };

    fetchInvoiceDetail();
  }, [invoiceId]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!invoice) {
    return <div>Chargement...</div>; // Affichage d'un message pendant le chargement
  }

  return (
    <div className="invoice-detail">
      <h2>Détails de la Facture</h2>
      <div className="invoice-info">
        <p><strong>ID Facture:</strong> {invoice.invoiceId}</p>
        <p><strong>Commande ID:</strong> {invoice.orderId}</p>
        <p><strong>Montant Dû:</strong> {invoice.amountDue}€</p>
        <p><strong>Montant Payé:</strong> {invoice.amountPaid}€</p>
        <p><strong>Statut du Paiement:</strong> {invoice.paymentStatus}</p>
        <p><strong>Date d'Émission:</strong> {new Date(invoice.issueDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default InvoiceDetail;
