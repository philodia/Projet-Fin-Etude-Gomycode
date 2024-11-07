const mongoose = require('mongoose');

// Définition du schéma de la facture
const invoiceSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client', // Référence au modèle Client
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order', // Référence au modèle Order
    required: true,
  },
  amountDue: {
    type: Number,
    required: true,
  },
  amountPaid: {
    type: Number,
    default: 0, // Par défaut, le montant payé est 0
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'pending'], // Les statuts possibles
    default: 'pending', // Par défaut, le statut est "pending"
  },
  status: {
    type: String,
    default: 'En attente de facturation', // Statut par défaut de la facture
  },
  issueDate: {
    type: Date,
    default: Date.now, // Date d'émission par défaut est la date actuelle
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Date de mise à jour par défaut est la date actuelle
  },
});

// Ajout d'un middleware pour mettre à jour `updatedAt` avant chaque sauvegarde
invoiceSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Création du modèle à partir du schéma
const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
