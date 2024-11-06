const express = require('express');
const router = express.Router();
const {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenseController');

// Définir les routes pour les dépenses
router.post('/', createExpense); // Créer une dépense
router.get('/', getAllExpenses); // Récupérer toutes les dépenses
router.get('/:id', getExpenseById); // Récupérer une dépense par ID
router.put('/:id', updateExpense); // Mettre à jour une dépense par ID
router.delete('/:id', deleteExpense); // Supprimer une dépense par ID

module.exports = router;
