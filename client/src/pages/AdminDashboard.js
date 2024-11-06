import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './AdminDashboard.css'; // Assurez-vous de créer ce fichier pour les styles

const AdminDashboard = () => {
  const { user } = useContext(AuthContext); // Contexte pour obtenir l'utilisateur connecté
  const [salesOverview, setSalesOverview] = useState({});
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [financialReports, setFinancialReports] = useState([]);
  const [loading, setLoading] = useState(true); // État de chargement

  // Vérifiez si l'utilisateur est un administrateur
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      window.location.href = '/unauthorized'; // Redirection si l'utilisateur n'est pas admin
    }
  }, [user]);

  // Récupérer les données du tableau de bord
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const salesResponse = await axios.get('http://localhost:5000/api/sales/overview'); // API pour les ventes
        const usersResponse = await axios.get('http://localhost:5000/api/users/count'); // API pour le compte d'utilisateurs
        const productsResponse = await axios.get('http://localhost:5000/api/products/count'); // API pour le compte de produits
        const reportsResponse = await axios.get('http://localhost:5000/api/financial/reports'); // API pour les rapports financiers

        setSalesOverview(salesResponse.data);
        setUserCount(usersResponse.data.count);
        setProductCount(productsResponse.data.count);
        setFinancialReports(reportsResponse.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du tableau de bord', error);
      } finally {
        setLoading(false); // Met à jour l'état de chargement une fois les données récupérées
      }
    };

    fetchDashboardData();
  }, []);

  // Affichez un indicateur de chargement si les données sont en cours de récupération
  if (loading) {
    return <div className="loading">Chargement...</div>; // Vous pouvez styliser cela dans CSS
  }

  return (
    <div className="admin-dashboard">
      <h2 className="text-center">Tableau de Bord Administrateur</h2>

      <div className="dashboard-overview">
        <div className="card">
          <h3>Ventes Totales</h3>
          <p>{salesOverview.totalSales || 0} €</p>
        </div>
        <div className="card">
          <h3>Nombre d'Utilisateurs</h3>
          <p>{userCount}</p>
        </div>
        <div className="card">
          <h3>Nombre de Produits</h3>
          <p>{productCount}</p>
        </div>
      </div>

      <h3 className="text-center">Rapports Financiers</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Montant</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {financialReports.map((report, index) => (
            <tr key={index}>
              <td>{new Date(report.date).toLocaleDateString()}</td>
              <td>{report.amount} €</td>
              <td>{report.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
