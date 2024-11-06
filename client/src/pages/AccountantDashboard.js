import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './AccountantDashboard.css'; // Assurez-vous de créer ce fichier CSS pour les styles

const AccountantDashboard = () => {
  const { user } = useContext(AuthContext); // Contexte pour obtenir l'utilisateur connecté
  const [invoices, setInvoices] = useState([]);
  const [financialReports, setFinancialReports] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true); // État de chargement

  // Vérifiez si l'utilisateur est un comptable
  useEffect(() => {
    if (user?.role !== 'accountant') {
      // Redirection ou affichage d'un message d'accès interdit
      window.location.href = '/unauthorized'; // Remplacez par votre route de redirection
    }
  }, [user]);

  // Récupérer les données du tableau de bord pour les factures, rapports financiers et dépenses
  useEffect(() => {
    const fetchAccountantData = async () => {
      try {
        const invoicesResponse = await axios.get('http://localhost:5000/api/invoices'); // API pour les factures
        const reportsResponse = await axios.get('http://localhost:5000/api/financial/reports'); // API pour les rapports financiers
        const expensesResponse = await axios.get('http://localhost:5000/api/expenses'); // API pour les dépenses

        setInvoices(invoicesResponse.data);
        setFinancialReports(reportsResponse.data);
        setExpenses(expensesResponse.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du tableau de bord', error);
      } finally {
        setLoading(false); // Met à jour l'état de chargement une fois les données récupérées
      }
    };

    fetchAccountantData();
  }, []);

  // Affichez un indicateur de chargement si les données sont en cours de récupération
  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="accountant-dashboard">
      <h2 className="text-center">Tableau de Bord Comptable</h2>

      <div className="dashboard-section">
        <h3>Factures</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Client</th>
              <th>Montant</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{new Date(invoice.date).toLocaleDateString()}</td>
                <td>{invoice.client}</td>
                <td>{invoice.amount} XOF</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboard-section">
        <h3>Rapports Financiers</h3>
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

      <div className="dashboard-section">
        <h3>Gestion des Dépenses</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Catégorie</th>
              <th>Montant</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.id}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.category}</td>
                <td>{expense.amount} XOF</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountantDashboard;
