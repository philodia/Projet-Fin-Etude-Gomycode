const Expense = require('../models/Expense');

// Créer une nouvelle dépense
const createExpense = async (req, res) => {
  const { description, amount, date } = req.body;

  try {
    const expense = new Expense({ description, amount, date });
    await expense.save();
    res.status(201).json({ message: 'Dépense créée avec succès', expense });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la dépense', error: error.message });
  }
};

// Récupérer toutes les dépenses
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des dépenses', error: error.message });
  }
};

// Récupérer une dépense par son ID
const getExpenseById = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ message: 'Dépense non trouvée' });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la dépense', error: error.message });
  }
};

// Mettre à jour une dépense par son ID
const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { description, amount, date } = req.body;

  try {
    const expense = await Expense.findByIdAndUpdate(id, { description, amount, date }, { new: true });
    if (!expense) {
      return res.status(404).json({ message: 'Dépense non trouvée' });
    }
    res.status(200).json({ message: 'Dépense mise à jour avec succès', expense });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la dépense', error: error.message });
  }
};

// Supprimer une dépense par son ID
const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) {
      return res.status(404).json({ message: 'Dépense non trouvée' });
    }
    res.status(200).json({ message: 'Dépense supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la dépense', error: error.message });
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
