const jwt = require('jsonwebtoken'); // Assurez-vous d'avoir installé jsonwebtoken
const User = require('../models/User'); // Remplacez par votre modèle d'utilisateur si nécessaire

// Middleware pour vérifier l'authentification de l'utilisateur
const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Récupération du token depuis l'en-tête

  // Vérifier si le token est présent
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé, token manquant' });
  }

  try {
    // Vérification du token avec votre clé secrète
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Récupération de l'utilisateur à partir de son ID
    req.user = await User.findById(verified.id).select('-password'); // Exclure le mot de passe du résultat
    if (!req.user) {
      return res.status(401).json({ message: 'Accès refusé, utilisateur non trouvé' });
    }
    
    next(); // Passer au prochain middleware ou à la route
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error); // Journaliser l'erreur pour le débogage
    res.status(401).json({ message: 'Token invalide' });
  }
};

module.exports = { authenticate };
