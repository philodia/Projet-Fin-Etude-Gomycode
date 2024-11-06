const mongoose = require('mongoose');

// Définition du schéma pour les dépenses
const expenseSchema = new mongoose.Schema({
  expenseId: {
    type: mongoose.Schema.Types.ObjectId, // Utilisation de l'ObjectId de MongoDB comme identifiant unique
    auto: true,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true, // Description est requise
  },
  amount: {
    type: Number,
    required: true, // Montant est requis
  },
  date: {
    type: Date,
    default: Date.now, // Date par défaut est la date actuelle
  },
});

// Création du modèle pour les dépenses
const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
