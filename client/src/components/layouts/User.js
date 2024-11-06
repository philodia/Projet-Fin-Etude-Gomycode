import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const User = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
    permissions: []
  });
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]); // Liste des utilisateurs
  const [editMode, setEditMode] = useState(false); // Mode d'édition
  const [currentUserId, setCurrentUserId] = useState(null); // ID de l'utilisateur en cours de modification
  const navigate = useNavigate();

  useEffect(() => {
    // Charger la liste des utilisateurs au montage du composant
    fetchUsers();
  }, []);

  // Fonction pour récupérer tous les utilisateurs
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data.users);
    } catch (error) {
      setMessage('Erreur lors de la récupération des utilisateurs');
    }
  };

  // Gestion de l'entrée des données du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Gestion de la sélection des permissions
  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const newPermissions = checked
        ? [...prevData.permissions, value]
        : prevData.permissions.filter((perm) => perm !== value);
      return { ...prevData, permissions: newPermissions };
    });
  };

  // Fonction pour créer ou mettre à jour un utilisateur
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        // Mise à jour de l'utilisateur
        await axios.put(`/api/users/${currentUserId}`, formData);
        setMessage('Utilisateur mis à jour avec succès.');
      } else {
        // Création d'un nouvel utilisateur
        await axios.post('/api/users', formData);
        setMessage('Utilisateur créé avec succès.');
      }
      resetForm();
      fetchUsers();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur lors de la création ou de la mise à jour de l\'utilisateur');
    }
  };

  // Fonction pour remplir le formulaire avec les données d'un utilisateur pour l'édition
  const handleEdit = (user) => {
    setFormData({
      username: user.username,
      password: '', // Laisser vide pour ne pas afficher le mot de passe
      role: user.role,
      permissions: user.permissions
    });
    setCurrentUserId(user._id);
    setEditMode(true);
  };

  // Fonction pour supprimer un utilisateur
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      setMessage('Utilisateur supprimé avec succès.');
      fetchUsers();
    } catch (error) {
      setMessage('Erreur lors de la suppression de l\'utilisateur');
    }
  };

  // Fonction pour réinitialiser le formulaire
  const resetForm = () => {
    setFormData({
      username: '',
      password: '',
      role: '',
      permissions: []
    });
    setEditMode(false);
    setCurrentUserId(null);
  };

  return (
    <div className="container mt-5">
      <h2>{editMode ? 'Éditer l\'utilisateur' : 'Créer un utilisateur'}</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="form-control"
            required={!editMode} // Le mot de passe est requis uniquement en mode création
          />
        </div>

        <div className="form-group mb-3">
          <label>Rôle</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="form-control"
            required
          >
            <option value="">Sélectionner un rôle</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="accountant">Accountant</option>
          </select>
        </div>

        <div className="form-group mb-3">
          <label>Permissions</label>
          <div className="form-check">
            <input
              type="checkbox"
              name="permissions"
              value="view_reports"
              onChange={handlePermissionChange}
              checked={formData.permissions.includes('view_reports')}
              className="form-check-input"
            />
            <label className="form-check-label">Voir les rapports</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              name="permissions"
              value="edit_users"
              onChange={handlePermissionChange}
              checked={formData.permissions.includes('edit_users')}
              className="form-check-input"
            />
            <label className="form-check-label">Éditer les utilisateurs</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              name="permissions"
              value="manage_finances"
              onChange={handlePermissionChange}
              checked={formData.permissions.includes('manage_finances')}
              className="form-check-input"
            />
            <label className="form-check-label">Gérer les finances</label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {editMode ? 'Mettre à jour l\'utilisateur' : 'Créer l\'utilisateur'}
        </button>
        {editMode && (
          <button type="button" onClick={resetForm} className="btn btn-secondary ms-2">
            Annuler
          </button>
        )}
      </form>

      <h2 className="mt-5">Liste des utilisateurs</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nom d'utilisateur</th>
            <th>Rôle</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{user.permissions.join(', ')}</td>
              <td>
                <button onClick={() => handleEdit(user)} className="btn btn-sm btn-warning me-2">Éditer</button>
                <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
