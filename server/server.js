// server.js

// Importer les modules nécessaires
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const authroutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes'); // Chemin vers vos routes de commandes
const invoiceRoutes = require('./routes/invoiceRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const reportRoutes = require('./routes/reportRoutes');
const salesRoutes = require('./routes/sales');

// Créer une instance d'Express
const app = express();
const port = process.env.PORT || 5000;

// Middleware pour permettre l'utilisation de JSON dans les requêtes
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Route 
//http://localhost:5000/auth*
app.use('/api/auth', authroutes);
app.use('./api/users', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/sales', salesRoutes);


// Écouter le serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
