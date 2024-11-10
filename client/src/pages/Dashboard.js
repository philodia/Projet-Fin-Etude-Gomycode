// Dashboard.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import ManagerDashboard from './ManagerDashboard';
import AccountantDashboard from './AccountantDashboard';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" />;
  }

  switch (user.role) {
    case 'admin':
      return (
        <div className="dashboard-container">
          <h2 className="dashboard-title">Admin Dashboard</h2>
          <div className="dashboard-content admin-dashboard">
            <AdminDashboard />
          </div>
        </div>
      );
    case 'manager':
      return (
        <div className="dashboard-container">
          <h2 className="dashboard-title">Manager Dashboard</h2>
          <div className="dashboard-content manager-dashboard">
            <ManagerDashboard />
          </div>
        </div>
      );
    case 'accountant':
      return (
        <div className="dashboard-container">
          <h2 className="dashboard-title">Accountant Dashboard</h2>
          <div className="dashboard-content accountant-dashboard">
            <AccountantDashboard />
          </div>
        </div>
      );
    default:
      return <Navigate to="/access-denied" />;
  }
};

export default Dashboard;
