const express = require('express');
const router = express.Router();
const { createUser, getUser, updateUser, deleteUser } = require('../controllers/userController');

// Route pour créer un utilisateur
router.post('/users', createUser);

// Route pour lire un utilisateur
router.get('/users/:userId', getUser);

// Route pour mettre à jour un utilisateur
router.put('/users/:userId', updateUser);

// Route pour supprimer un utilisateur
router.delete('/users/:userId', deleteUser);

module.exports = router;
