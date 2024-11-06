const Customer = require('../models/Customer'); // Modèle Client

// Créer un nouveau client
const createCustomer = async (req, res) => {
  try {
    const { customerId, name, contactInfo } = req.body;
    const newCustomer = new Customer({ customerId, name, contactInfo });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création du client', error: error.message });
  }
};

// Récupérer un client par ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate('purchaseHistory');
    if (!customer) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la récupération du client', error: error.message });
  }
};

// Mettre à jour les informations d'un client
const updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du client', error: error.message });
  }
};

// Supprimer un client
const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }
    res.status(204).json(); // No content
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la suppression du client', error: error.message });
  }
};

// Récupérer l'historique des achats d'un client
const getPurchaseHistory = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate('purchaseHistory');
    if (!customer) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }
    res.status(200).json(customer.purchaseHistory);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la récupération de l\'historique des achats', error: error.message });
  }
};

module.exports = {
  createCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getPurchaseHistory,
};
