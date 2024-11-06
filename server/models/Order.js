const mongoose = require('mongoose');

// Définition du schéma de la commande
const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true, // Identifiant unique pour chaque commande
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId, // Référence au modèle Client
    ref: 'Customer', // Nom du modèle référencé
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId, // Référence au modèle Produit
        ref: 'Product', // Nom du modèle référencé
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1, // Quantité minimale d'un produit dans une commande
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now, // Date par défaut à la date actuelle
  },
  status: {
    type: String,
    enum: ['en cours', 'livrée', 'annulée'], // Liste des statuts autorisés
    default: 'en cours', // Statut par défaut
  },
});

// Création du modèle à partir du schéma
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
