import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import ManagerDashboard from './ManagerDashboard';
import AccountantDashboard from './AccountantDashboard';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
    return <Navigate to="/" />;
  }

  // Rendu du tableau de bord correspondant au rôle de l'utilisateur
  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'manager':
      return <ManagerDashboard />;
    case 'accountant':
      return <AccountantDashboard />;
    default:
      return <Navigate to="/access-denied" />; // Redirection vers une page d'accès refusé pour un rôle non autorisé
  }
};

export default Dashboard;
