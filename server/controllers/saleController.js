// controllers/saleController.js
const Sale = require('../models/Sale');

// Create a new sale
exports.createSale = async (req, res) => {
  try {
    const sale = new Sale(req.body);
    await sale.save();
    res.status(201).json({ message: 'Sale created successfully', sale });
  } catch (error) {
    res.status(400).json({ message: 'Error creating sale', error });
  }
};

// Get all sales
exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving sales', error });
  }
};

// Get a single sale by ID
exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) return res.status(404).json({ message: 'Sale not found' });
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving sale', error });
  }
};

// Update a sale by ID
exports.updateSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!sale) return res.status(404).json({ message: 'Sale not found' });
    res.status(200).json({ message: 'Sale updated successfully', sale });
  } catch (error) {
    res.status(400).json({ message: 'Error updating sale', error });
  }
};

// Delete a sale by ID
exports.deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);
    if (!sale) return res.status(404).json({ message: 'Sale not found' });
    res.status(200).json({ message: 'Sale deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sale', error });
  }
};
