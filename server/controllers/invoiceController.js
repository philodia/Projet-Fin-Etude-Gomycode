const Invoice = require('../models/Invoice');

// Créer une nouvelle facture
const createInvoice = async (req, res) => {
  try {
    const { clientId, orderId, amountDue } = req.body;

    // Création de la facture
    const newInvoice = new Invoice({
      clientId,
      orderId,
      amountDue
    });

    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la facture', error });
  }
};

// Récupérer une facture par ID
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('clientId').populate('orderId');
    if (!invoice) return res.status(404).json({ message: 'Facture non trouvée' });
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la facture', error });
  }
};

// Mettre à jour le statut ou le paiement d'une facture
const updateInvoice = async (req, res) => {
  try {
    const { amountPaid, paymentStatus, status } = req.body;
    const updatedData = {
      amountPaid,
      paymentStatus,
      status,
      updatedAt: Date.now()
    };

    const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedInvoice) return res.status(404).json({ message: 'Facture non trouvée' });

    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la facture', error });
  }
};

// Récupérer toutes les factures
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('clientId').populate('orderId');
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des factures', error });
  }
};

// Supprimer une facture
const deleteInvoice = async (req, res) => {
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!deletedInvoice) return res.status(404).json({ message: 'Facture non trouvée' });

    res.status(200).json({ message: 'Facture supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la facture', error });
  }
};

module.exports = {
  createInvoice,
  getInvoiceById,
  updateInvoice,
  getAllInvoices,
  deleteInvoice
};
