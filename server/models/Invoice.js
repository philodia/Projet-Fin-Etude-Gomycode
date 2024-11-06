const mongoose = require('mongoose');

// Définition du schéma de la facture
const invoiceSchema = new mongoose.Schema({
  invoiceId: {
    type: String,
    required: true,
    unique: true, // Assurez-vous que chaque facture a un identifiant unique
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
    default: 'pending', // Par défaut, le statut est "en attente"
  },
  issueDate: {
    type: Date,
    default: Date.now, // Date d'émission par défaut est la date actuelle
  },
});

// Création du modèle à partir du schéma
const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
