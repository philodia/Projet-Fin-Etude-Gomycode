const express = require('express');
const {
  createInvoice,
  getInvoiceById,
  updateInvoice,
  getAllInvoices,
  deleteInvoice
} = require('../controllers/invoiceController');
const { authenticate } = require('../middleware/authMiddleware'); // Middleware d'authentification

const router = express.Router();

// Route pour créer une nouvelle facture
router.post('/', authenticate, createInvoice);

// Route pour récupérer une facture par son ID
router.get('/:id', authenticate, getInvoiceById);

// Route pour mettre à jour une facture
router.put('/:id', authenticate, updateInvoice);

// Route pour récupérer toutes les factures
router.get('/', authenticate, getAllInvoices);

// Route pour supprimer une facture
router.delete('/:id', authenticate, deleteInvoice);

module.exports = router;
