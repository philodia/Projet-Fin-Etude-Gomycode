const express = require('express');
const router = express.Router();
const {
  createCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getPurchaseHistory,
} = require('../controllers/customerController'); // Importation du contrôleur

// Route pour créer un nouveau client
router.post('/', createCustomer);

// Route pour récupérer un client par son ID
router.get('/:id', getCustomerById);

// Route pour mettre à jour un client
router.put('/:id', updateCustomer);

// Route pour supprimer un client
router.delete('/:id', deleteCustomer);

// Route pour récupérer l'historique des achats d'un client
router.get('/:id/purchase-history', getPurchaseHistory);

module.exports = router;
