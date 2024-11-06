const mongoose = require('mongoose');

// Définition du schéma pour les rapports
const reportSchema = new mongoose.Schema({
  reportId: {
    type: String,
    required: true,
    unique: true, // Identifiant unique pour le rapport
  },
  reportType: {
    type: String,
    enum: ['sales', 'inventory', 'finance'], // Types de rapports possibles
    required: true,
  },
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId, // Référence à l'utilisateur qui a généré le rapport
    ref: 'User', // Assurez-vous d'avoir un modèle 'User' pour cette référence
    required: true,
  },
  dateGenerated: {
    type: Date,
    default: Date.now, // Date de génération par défaut
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed, // Données du rapport en JSON
    required: true,
  },
});

// Création du modèle à partir du schéma
const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
