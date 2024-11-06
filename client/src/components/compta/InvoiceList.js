import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './InvoiceList.css'; // Assurez-vous de créer ce fichier CSS pour les styles

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/invoices');
        setInvoices(response.data);
        setError('');
      } catch (err) {
        setError('Erreur lors de la récupération des factures.');
      }
    };

    fetchInvoices();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="invoice-list">
      <h2>Liste des Factures</h2>
      {invoices.length === 0 ? (
        <p>Aucune facture disponible.</p>
      ) : (
        <table className="invoice-table">
          <thead>
            <tr>
              <th>ID Facture</th>
              <th>Montant Dû</th>
              <th>Montant Payé</th>
              <th>Statut</th>
              <th>Date d'Émission</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.invoiceId}>
                <td>{invoice.invoiceId}</td>
                <td>{invoice.amountDue}€</td>
                <td>{invoice.amountPaid}€</td>
                <td>{invoice.paymentStatus}</td>
                <td>{new Date(invoice.issueDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InvoiceList;
