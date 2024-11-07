import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo/logo1.png'; // Assurez-vous que le chemin est correct
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

const LoginForm = () => {
  const { login, user } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // État pour le loader
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Activer le loader
    setError(''); // Réinitialiser les erreurs
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError("Nom d’utilisateur ou mot de passe incorrect");
      }
    } catch (error) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false); // Désactiver le loader
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="login-container">
      {isLoading ? (
        <div className="loader">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Avatar de l'utilisateur et logo */}
          <div className="logo-avatar-container">
            <img src={logo} alt="Logo" className="login-logo" />
            <img src={user?.avatarUrl || '/assets/img/default-avatar.png'} alt="Avatar" className="avatar-image" />
          </div>

          <h2 className="text-center login-title">Connexion</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Champ de nom d'utilisateur */}
            <div className="form-group mb-3 position-relative">
              <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Entrez votre nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Champ de mot de passe */}
            <div className="form-group mb-3 position-relative">
              <label htmlFor="password" className="form-label">Mot de passe</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">Se connecter</button>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginForm;
