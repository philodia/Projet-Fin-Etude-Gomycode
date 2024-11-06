import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Assurez-vous de créer ce fichier CSS pour les styles

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('manager'); // Rôle par défaut
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Envoie les données d'inscription à l'API
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
        role,
      });
      setMessage('Inscription réussie ! Vous pouvez vous connecter maintenant.');
      setError('');
    } catch (err) {
      setError('Erreur lors de l\'inscription. Veuillez réessayer.');
      setMessage('');
    }
  };

  return (
    <div className="register">
      <h2>Créer un compte</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Nom d'utilisateur :</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Rôle :</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="manager">Manager</option>
            <option value="accountant">Comptable</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>
        <button type="submit" className="register-button">S'inscrire</button>
      </form>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Register;
