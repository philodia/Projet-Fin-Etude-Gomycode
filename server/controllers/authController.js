const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Clé secrète pour JWT (à stocker en sécurité dans un fichier d'environnement)
const JWT_SECRET = process.env.JWT_SECRET || 'votre_clé_secrète';

// Fonction pour l'inscription d'un utilisateur
const register = async (req, res) => {
  const { userId, username, password, role, permissions } = req.body;

  try {
    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "L'utilisateur existe déjà." });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création d'un nouvel utilisateur
    const newUser = new User({
      userId,
      username,
      password: hashedPassword,
      role,
      permissions,
    });

    // Enregistrement de l'utilisateur dans la base de données
    await newUser.save();
    res.status(201).json({ message: "Utilisateur créé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'inscription." });
  }
};

// Fonction pour la connexion d'un utilisateur
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Trouver l'utilisateur par nom d'utilisateur
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
    }

    // Comparer le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
    }

    // Créer un token JWT
    const token = jwt.sign({ userId: user.userId, role: user.role, permissions: user.permissions }, JWT_SECRET, { expiresIn: '1h' });

    // Réponse avec le token et les informations de l'utilisateur
    res.status(200).json({
      token,
      user: {
        userId: user.userId,
        username: user.username,
        role: user.role,
        permissions: user.permissions,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la connexion." });
  }
};

// Fonction pour la déconnexion de l'utilisateur
const logout = (req, res) => {
  // Logique pour la déconnexion (cela pourrait simplement être un message de succès)
  res.status(200).json({ message: "Déconnexion réussie." });
};

// Middleware pour vérifier les permissions
const authorize = (permissions) => {
  return (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(403).json({ message: "Accès refusé." });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token invalide." });
      }

      // Vérification des permissions
      const userPermissions = decoded.permissions || [];
      const hasPermission = permissions.every((perm) => userPermissions.includes(perm));

      if (!hasPermission) {
        return res.status(403).json({ message: "Vous n'avez pas les permissions nécessaires." });
      }

      req.user = decoded; // Stocker les informations de l'utilisateur dans la requête
      next(); // Passer au middleware suivant
    });
  };
};

// Export des fonctions
module.exports = {
  register,
  login,
  logout,
  authorize,
};
