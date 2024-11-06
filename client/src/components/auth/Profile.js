import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import './Profile.css'; // Assurez-vous de créer ce fichier CSS pour les styles

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${user?.username}`); // Remplacez par l'URL de votre API pour récupérer les informations de l'utilisateur
        setProfileData(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des données de profil');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfileData();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <div>Chargement des informations de profil...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile">
      <h2>Profil de {profileData?.name}</h2>
      <p><strong>Nom d'utilisateur :</strong> {profileData?.username}</p>
      <p><strong>Email :</strong> {profileData?.email}</p>
      <p><strong>Rôle :</strong> {profileData?.role}</p>
      <button onClick={handleLogout} className="logout-button">Déconnexion</button>
    </div>
  );
};

export default Profile;
