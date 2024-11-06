import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FaUser, FaChartBar, FaSignOutAlt, FaUserCog, FaFileAlt } from 'react-icons/fa'; // Importez les icônes nécessaires
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Mon Application</h1>
        <nav className="nav">
          <ul className="nav-links">
            {user?.role === 'admin' && (
              <>
                <li><a href="/admin/dashboard"><FaChartBar /> Tableau de Bord Admin</a></li>
                <li><a href="/admin/users"><FaUserCog /> Gestion des Utilisateurs</a></li>
                <li><a href="/admin/reports"><FaFileAlt /> Rapports Admin</a></li>
              </>
            )}
            {user?.role === 'manager' && (
              <>
                <li><a href="/manager/dashboard"><FaChartBar /> Tableau de Bord</a></li>
                <li><a href="/manager/reports"><FaFileAlt /> Rapports</a></li>
              </>
            )}
            {user?.role === 'accountant' && (
              <>
                <li><a href="/accountant/dashboard"><FaChartBar /> Tableau de Bord</a></li>
                <li><a href="/accountant/financial-reports"><FaFileAlt /> Rapports Financiers</a></li>
              </>
            )}
            <li><a href="/profile"><FaUser /> Profil</a></li>
            <li><button onClick={logout} className="logout-button"><FaSignOutAlt /> Déconnexion</button></li>
          </ul>
        </nav>
        {user && (
          <div className="user-info">
            <img 
              src={user.avatarUrl || '/assets/img/default-avatar.png'} 
              alt="Avatar de l'utilisateur" 
              className="user-avatar" 
            />
            <span>Bienvenue, {user.username}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
