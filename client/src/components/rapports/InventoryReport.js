import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './InventoryReport.css'; // Assurez-vous de créer ce fichier CSS pour les styles

const InventoryReport = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/inventory'); // Ajustez l'URL selon votre API
        setInventoryData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des données d\'inventaire.');
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="inventory-report">
      <h2>Rapport d'Inventaire</h2>
      {inventoryData.length === 0 ? (
        <div>Aucune donnée d'inventaire disponible.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID du Produit</th>
              <th>Nom du Produit</th>
              <th>Quantité en Stock</th>
              <th>Prix Unitaire</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((item) => (
              <tr key={item.productId}>
                <td>{item.productId}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.unitPrice}€</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryReport;
