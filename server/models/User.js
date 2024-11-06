const mongoose = require('mongoose');

// Définition du schéma pour l'utilisateur
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true, // Identifiant unique pour chaque utilisateur
  },
  username: {
    type: String,
    required: true,
    unique: true, // Nom d'utilisateur unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'accountant'], // Rôles autorisés
    required: true,
  },
  permissions: {
    type: [String], // Tableau de chaînes pour les permissions
    default: [], // Par défaut, aucun droit
  },
}, { timestamps: true }); // Ajoute des timestamps pour la création et la mise à jour

// Création du modèle User
const User = mongoose.model('User', userSchema);

module.exports = User;
