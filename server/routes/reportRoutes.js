const express = require('express');
const { generateReport, getReports, getReportById } = require('../controllers/reportController');
const { authenticate } = require('../middleware/authMiddleware'); // Middleware pour l'authentification

const router = express.Router();

// Route pour générer un nouveau rapport
router.post('/', authenticate, generateReport);

// Route pour récupérer tous les rapports
router.get('/', authenticate, getReports);

// Route pour récupérer un rapport par son ID
router.get('/:id', authenticate, getReportById);

module.exports = router;
