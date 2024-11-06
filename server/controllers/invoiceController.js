const Invoice = require('../models/Invoice'); // Importer le modèle Invoice
const Order = require('../models/Order'); // Importer le modèle Order si nécessaire

// Créer une nouvelle facture
const createInvoice = async (req, res) => {
  const { orderId, amountDue } = req.body;

  try {
    const invoice = new Invoice({
      invoiceId: `INV-${Date.now()}`, // Générer un identifiant de facture unique
      orderId,
      amountDue,
      paymentStatus: 'pending', // Par défaut, le statut est "en attente"
    });

    await invoice.save(); // Sauvegarder la facture dans la base de données
    res.status(201).json(invoice); // Retourner la facture créée
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de la facture' });
  }
};

// Récupérer une facture par son ID
const getInvoiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const invoice = await Invoice.findById(id).populate('orderId'); // Peupler avec les données de la commande

    if (!invoice) {
      return res.status(404).json({ message: 'Facture non trouvée' });
    }

    res.status(200).json(invoice); // Retourner la facture
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la facture' });
  }
};

// Mettre à jour le statut d'une facture (ex. paiement effectué)
const updateInvoiceStatus = async (req, res) => {
  const { id } = req.params;
  const { amountPaid, paymentStatus } = req.body;

  try {
    const invoice = await Invoice.findByIdAndUpdate(
      id,
      { amountPaid, paymentStatus },
      { new: true } // Retourner le document mis à jour
    );

    if (!invoice) {
      return res.status(404).json({ message: 'Facture non trouvée' });
    }

    res.status(200).json(invoice); // Retourner la facture mise à jour
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la facture' });
  }
};

// Récupérer toutes les factures
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('orderId'); // Peupler avec les données de la commande
    res.status(200).json(invoices); // Retourner toutes les factures
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des factures' });
  }
};

// Exporter les fonctions du contrôleur
module.exports = {
  createInvoice,
  getInvoiceById,
  updateInvoiceStatus,
  getAllInvoices,
};
