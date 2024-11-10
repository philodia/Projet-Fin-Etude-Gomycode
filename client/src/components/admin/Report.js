// src/components/admin/Reports.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Report.css';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  // Function to fetch reports data
  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/reports'); // Replace with actual API endpoint
      setReports(response.data);
      setError('');
    } catch (err) {
      setError('Erreur lors de la récupération des rapports');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Rapports de Ventes</h2>
      
      {loading && <p>Chargement des rapports...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      
      {!loading && !error && reports.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Client</th>
              <th>Produit</th>
              <th>Quantité</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td>{new Date(report.saleDate).toLocaleDateString()}</td>
                <td>{report.customerName}</td>
                <td>{report.product}</td>
                <td>{report.quantity}</td>
                <td>{report.totalPrice} €</td>
                <td>{report.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>Aucun rapport disponible</p>
      )}
    </div>
  );
};

export default Reports;
