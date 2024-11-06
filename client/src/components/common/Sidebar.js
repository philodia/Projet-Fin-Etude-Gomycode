import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Sidebar.css'; // Assurez-vous de créer ce fichier CSS pour les styles

const Sidebar = () => {
  const { user } = useContext(AuthContext); // Récupérer les informations de l'utilisateur depuis le contexte

  // Fonction pour générer les liens du menu en fonction du rôle
  const renderLinks = () => {
    if (user?.role === 'admin') {
      return (
        <>
          <li><a href="/admin/dashboard">Tableau de Bord Admin</a></li>
          <li><a href="/admin/users">Gestion des Utilisateurs</a></li>
          <li><a href="/admin/reports">Rapports Admin</a></li>
        </>
      );
    } else if (user?.role === 'manager') {
      return (
        <>
          <li><a href="/manager/orders">Gestion des Commandes</a></li>
          <li><a href="/manager/products">Gestion des Produits</a></li>
          <li><a href="/manager/clients">Gestion des Clients</a></li>
          <li><a href="/manager/reports">Rapports</a></li>
        </>
      );
    } else if (user?.role === 'accountant') {
      return (
        <>
          <li><a href="/accountant/invoices">Factures</a></li>
          <li><a href="/accountant/financial-reports">Rapports Financiers</a></li>
          <li><a href="/accountant/expenses">Gestion des Dépenses</a></li>
        </>
      );
    } else {
      return <li><a href="/unauthorized">Accès Interdit</a></li>;
    }
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <ul className="sidebar-links">
        {renderLinks()}
      </ul>
    </aside>
  );
};

export default Sidebar;
