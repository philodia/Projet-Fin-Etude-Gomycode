import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SalesReport.css'; // Assurez-vous de créer ce fichier CSS pour les styles

const SalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sales'); // Ajustez l'URL selon votre API
        setSalesData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des données de ventes.');
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="sales-report">
      <h2>Rapport de Ventes</h2>
      {salesData.length === 0 ? (
        <div>Aucune donnée de vente disponible.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID de la Commande</th>
              <th>ID du Client</th>
              <th>Montant Total</th>
              <th>Date de Commande</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale) => (
              <tr key={sale.orderId}>
                <td>{sale.orderId}</td>
                <td>{sale.customerId}</td>
                <td>{sale.totalAmount}XOF</td>
                <td>{new Date(sale.orderDate).toLocaleDateString()}</td>
                <td>{sale.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SalesReport;
