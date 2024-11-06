const express = require('express');
const { 
  createInvoice, 
  getInvoiceById, 
  updateInvoiceStatus, 
  getAllInvoices 
} = require('../controllers/invoiceController');
const { authenticate } = require('../middleware/authMiddleware'); // Middleware d'authentification

const router = express.Router();

// Route pour créer une nouvelle facture
router.post('/', authenticate, createInvoice);

// Route pour récupérer une facture par son ID
router.get('/:id', authenticate, getInvoiceById);

// Route pour mettre à jour le statut d'une facture
router.put('/:id', authenticate, updateInvoiceStatus);

// Route pour récupérer toutes les factures
router.get('/', authenticate, getAllInvoices);

module.exports = router;
