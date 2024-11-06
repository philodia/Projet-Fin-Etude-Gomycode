const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware'); // Importez votre middleware d'authentification
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require('../controllers/orderController');

// Route pour créer une nouvelle commande
router.post('/', authenticate, createOrder); // Assurez-vous que l'utilisateur est authentifié

// Route pour récupérer toutes les commandes
router.get('/', authenticate, getAllOrders); // Assurez-vous que l'utilisateur est authentifié

// Route pour récupérer une commande par ID
router.get('/:orderId', authenticate, getOrderById); // Assurez-vous que l'utilisateur est authentifié

// Route pour mettre à jour le statut d'une commande
router.put('/:orderId/status', authenticate, updateOrderStatus); // Assurez-vous que l'utilisateur est authentifié

module.exports = router;
