import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Création du contexte
export const ReportContext = createContext();

// Fournisseur du contexte
export const ReportProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupération des rapports depuis l'API lors du chargement initial
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reports');
        setReports(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des rapports');
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Fonction pour ajouter un rapport
  const addReport = async (newReport) => {
    try {
      const response = await axios.post('http://localhost:5000/api/reports', newReport);
      setReports((prevReports) => [...prevReports, response.data]);
    } catch (err) {
      setError('Erreur lors de l’ajout du rapport');
    }
  };

  // Fonction pour mettre à jour un rapport
  const updateReport = async (id, updatedReport) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/reports/${id}`, updatedReport);
      setReports((prevReports) =>
        prevReports.map((report) => (report.id === id ? response.data : report))
      );
    } catch (err) {
      setError('Erreur lors de la mise à jour du rapport');
    }
  };

  // Fonction pour supprimer un rapport
  const deleteReport = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reports/${id}`);
      setReports((prevReports) => prevReports.filter((report) => report.id !== id));
    } catch (err) {
      setError('Erreur lors de la suppression du rapport');
    }
  };

  return (
    <ReportContext.Provider
      value={{
        reports,
        loading,
        error,
        addReport,
        updateReport,
        deleteReport,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
