import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FinanceReport.css'; // Assurez-vous de créer ce fichier CSS pour les styles

const FinanceReport = () => {
  const [financeData, setFinanceData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/finance'); // Ajustez l'URL selon votre API
        setFinanceData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des données financières.');
        setLoading(false);
      }
    };

    fetchFinanceData();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="finance-report">
      <h2>Rapport Financier</h2>
      {financeData.length === 0 ? (
        <div>Aucune donnée financière disponible.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID de la Facture</th>
              <th>Montant à Payer</th>
              <th>Montant Payé</th>
              <th>Statut de Paiement</th>
              <th>Date d'Émission</th>
            </tr>
          </thead>
          <tbody>
            {financeData.map((item) => (
              <tr key={item.invoiceId}>
                <td>{item.invoiceId}</td>
                <td>{item.amountDue}€</td>
                <td>{item.amountPaid}€</td>
                <td>{item.paymentStatus}</td>
                <td>{new Date(item.issueDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FinanceReport;
