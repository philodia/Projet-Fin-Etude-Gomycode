import React, { createContext, useContext, useState } from 'react';
import axios from 'axios'; // Importation d'axios pour les requêtes API

// Création du contexte d'authentification
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // État pour les erreurs

  // Fonction de connexion avec gestion des rôles
  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });

      // Supposons que l'API retourne les détails de l'utilisateur, y compris son rôle
      const { role } = response.data;

      // Stockez l'utilisateur avec son rôle
      setUser({ username, role });
      setError(null); // Réinitialiser les erreurs
      return true; // Retourne true si la connexion est réussie
    } catch (err) {
      console.error('Erreur lors de la connexion:', err);
      setError('Erreur de connexion. Veuillez vérifier vos identifiants.'); // Message d'erreur
      return false; // Retourne false si la connexion échoue
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    setUser(null); // Efface les informations de l'utilisateur et du rôle
    setError(null); // Réinitialiser l'erreur lors de la déconnexion
  };

  // Fonction pour vérifier si l'utilisateur est connecté
  const isAuthenticated = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // Hook pour utiliser le contexte facilement

export default AuthProvider;
