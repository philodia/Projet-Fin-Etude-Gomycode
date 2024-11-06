const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// Fonction pour créer un nouvel utilisateur
const createUser = async (req, res) => {
  const { username, password, role, permissions } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Nom d\'utilisateur, mot de passe et rôle sont requis.' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Nom d\'utilisateur déjà pris.' });
    }

    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userId,
      username,
      password: hashedPassword,
      role,
      permissions: permissions || []
    });

    await newUser.save();

    res.status(201).json({
      message: 'Utilisateur créé avec succès.',
      user: {
        userId: newUser.userId,
        username: newUser.username,
        role: newUser.role,
        permissions: newUser.permissions
      }
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la création de l\'utilisateur.' });
  }
};

// Fonction pour lire un utilisateur par son userId
const getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération de l\'utilisateur' });
  }
};

// Fonction pour mettre à jour un utilisateur
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, password, role, permissions } = req.body;

  try {
    const updatedData = { username, role, permissions };

    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findOneAndUpdate(
      { userId },
      { $set: updatedData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({
      message: 'Utilisateur mis à jour avec succès',
      user: updatedUser
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de l\'utilisateur' });
  }
};

// Fonction pour supprimer un utilisateur
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ userId });

    if (!deletedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de l\'utilisateur' });
  }
};

// Exportation des fonctions du contrôleur
module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser
};
