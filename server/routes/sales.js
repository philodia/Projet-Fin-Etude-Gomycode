// routes/sales.js
const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

// Route to create a new sale
router.post('/', saleController.createSale);

// Route to get all sales
router.get('/', saleController.getSales);

// Route to get a specific sale by ID
router.get('/:id', saleController.getSaleById);

// Route to update a sale by ID
router.put('/:id', saleController.updateSale);

// Route to delete a sale by ID
router.delete('/:id', saleController.deleteSale);

module.exports = router;
