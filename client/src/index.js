import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './components/admin/User'; // Assurez-vous d'avoir ce composant
import AdminReports from './components/admin/Report'; // Assurez-vous d'avoir ce composant
import ManagerDashboard from './pages/ManagerDashboard';
import AccountantDashboard from './pages/AccountantDashboard';
import PrivateRoute from './components/security/PrivateRoute';
import AccessDenied from './components/security/AccessDenied';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './context/AuthContext';
import { ReportProvider } from './context/ReportContext';

function App() {
  return (
    <AuthProvider>
      <ReportProvider>
        <Router>
          {/* La Header est rendue uniquement pour les rôles admin, manager, et accountant */}
          {/* La Sidebar est rendue uniquement pour les rôles admin, manager, et accountant */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Route pour le tableau de bord général accessible par tous les utilisateurs */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute requiredRoles={['admin', 'manager', 'accountant']}>
                  <Header />
                  <Sidebar /> {/* Affichage de la Sidebar */}
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* Routes spécifiques pour l'administrateur */}
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute requiredRoles={['admin']}>
                  <Header />
                  <Sidebar /> {/* Affichage de la Sidebar pour l'admin */}
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <PrivateRoute requiredRoles={['admin']}>
                  <Header />
                  <Sidebar /> {/* Affichage de la Sidebar pour l'admin */}
                  <UserManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <PrivateRoute requiredRoles={['admin']}>
                  <Header />
                  <Sidebar /> {/* Affichage de la Sidebar pour l'admin */}
                  <AdminReports />
                </PrivateRoute>
              }
            />

            {/* Routes pour les tableaux de bord des autres rôles */}
            <Route
              path="/manager"
              element={
                <PrivateRoute requiredRoles={['manager']}>
                  <Header />
                  <Sidebar /> {/* Affichage de la Sidebar pour le manager */}
                  <ManagerDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/accountant"
              element={
                <PrivateRoute requiredRoles={['accountant']}>
                  <Header />
                  <Sidebar /> {/* Affichage de la Sidebar pour le comptable */}
                  <AccountantDashboard />
                </PrivateRoute>
              }
            />

            {/* Page d'accès refusé */}
            <Route path="/access-denied" element={<AccessDenied />} />
          </Routes>
        </Router>
      </ReportProvider>
    </AuthProvider>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
