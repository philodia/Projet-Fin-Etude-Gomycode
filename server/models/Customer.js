const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  contactInfo: {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  purchaseHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order', // Remplacez 'Order' par le nom de votre modèle de commande
  }],
}, {
  timestamps: true, // Ajoute des champs createdAt et updatedAt
});

// Créez et exportez le modèle
const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
