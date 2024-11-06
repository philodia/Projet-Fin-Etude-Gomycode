const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware'); // Importez le middleware

// Route d'inscription
router.post('/register', register);

// Route de connexion
router.post('/login', login);

// Route de déconnexion
router.post('/logout', logout);

// Exemple d'une route protégée
router.get('/protected', authenticate, (req, res) => { // Utilisation du middleware authenticate
  res.status(200).json({ message: "Vous avez accès à cette ressource." });
});

module.exports = router;
