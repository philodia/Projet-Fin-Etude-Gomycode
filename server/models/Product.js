const mongoose = require('mongoose');

// Définition du schéma pour le produit
const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true, // Identifiant unique pour chaque produit
  },
  name: {
    type: String,
    required: true, // Nom du produit requis
  },
  description: {
    type: String,
    required: true, // Description du produit requise
  },
  price: {
    type: Number,
    required: true, // Prix du produit requis
    min: 0, // Le prix ne peut pas être négatif
  },
  quantity: {
    type: Number,
    required: true, // Quantité en stock requise
    min: 0, // La quantité ne peut pas être négative
  },
  category: {
    type: String,
    required: true, // Catégorie du produit requise
  },
}, { timestamps: true }); // Ajoute des timestamps pour la création et la mise à jour

// Création du modèle Product
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
