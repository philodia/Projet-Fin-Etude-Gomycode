import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Ajustez le chemin si nécessaire

const PrivateRoute = ({ component: Component, requiredRoles, ...rest }) => {
  const { user } = useContext(AuthContext);

  const isAuthorized = () => {
    if (!user) return false; // Non connecté
    return requiredRoles.includes(user.role); // Vérifie si l'utilisateur a l'un des rôles requis
  };

  return isAuthorized() ? <Component {...rest} /> : <Navigate to="/access-denied" />;
};

export default PrivateRoute;
