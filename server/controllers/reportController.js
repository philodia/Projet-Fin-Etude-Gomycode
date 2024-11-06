const Report = require('../models/Report');
const User = require('../models/User'); // Assurez-vous d'avoir un modèle User pour la référence

// Fonction pour générer un nouveau rapport
const generateReport = async (req, res) => {
  const { reportType, data } = req.body; // Récupérer le type de rapport et les données du corps de la requête
  const generatedBy = req.user.id; // L'utilisateur qui génère le rapport, supposant que l'authentification est en place

  try {
    const reportId = `RPT-${Date.now()}`; // Génération d'un identifiant unique pour le rapport

    // Création d'un nouveau rapport
    const report = new Report({
      reportId,
      reportType,
      generatedBy,
      data,
    });

    await report.save(); // Sauvegarder le rapport dans la base de données
    res.status(201).json({ message: 'Rapport généré avec succès', report });
  } catch (error) {
    console.error('Erreur lors de la génération du rapport:', error);
    res.status(500).json({ message: 'Erreur lors de la génération du rapport' });
  }
};

// Fonction pour récupérer tous les rapports
const getReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('generatedBy', 'username'); // Récupérer tous les rapports avec les détails de l'utilisateur
    res.status(200).json(reports);
  } catch (error) {
    console.error('Erreur lors de la récupération des rapports:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des rapports' });
  }
};

// Fonction pour récupérer un rapport par son ID
const getReportById = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await Report.findOne({ reportId: id }).populate('generatedBy', 'username'); // Récupérer un rapport spécifique
    if (!report) {
      return res.status(404).json({ message: 'Rapport non trouvé' });
    }
    res.status(200).json(report);
  } catch (error) {
    console.error('Erreur lors de la récupération du rapport:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du rapport' });
  }
};

// Exporter les fonctions du contrôleur
module.exports = {
  generateReport,
  getReports,
  getReportById,
};
