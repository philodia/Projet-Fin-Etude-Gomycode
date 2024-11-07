import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import User from './components/layouts/User';
import ManagerDashboard from './pages/ManagerDashboard';
import AccountantDashboard from './pages/AccountantDashboard';
import PrivateRoute from './components/security/PrivateRoute';
import AccessDenied from './components/security/AccessDenied';

import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './context/AuthContext'; // Assurez-vous que c'est l'import par défaut
import { ReportProvider } from './context/ReportContext';

function App() {
  return (
    <AuthProvider>
      <ReportProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/header" element={<Header />} />
            <Route path="/sidebar" element={<Sidebar />} />

            {/* Route pour le tableau de bord général accessible par tous les utilisateurs */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute requiredRoles={['admin', 'manager', 'accountant']}>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* Routes pour les tableaux de bord spécifiques */}
            <Route
              path="/admin"
              element={
                <PrivateRoute requiredRoles={['admin']}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            
            <Route
              path="/manager"
              element={
                <PrivateRoute requiredRoles={['manager']}>
                  <ManagerDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/accountant"
              element={
                <PrivateRoute requiredRoles={['accountant']}>
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
