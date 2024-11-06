const Order = require('../models/Order'); // Importation du modèle Order
const Customer = require('../models/Customer'); // Importation du modèle Customer
const Product = require('../models/Product'); // Importation du modèle Product

// Création d'une nouvelle commande
const createOrder = async (req, res) => {
  const { customerId, products } = req.body;

  try {
    // Vérification que le client existe
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }

    // Vérification que les produits existent et calcul du montant total
    let totalAmount = 0;
    const productIds = products.map(product => product.productId);
    const productList = await Product.find({ _id: { $in: productIds } });

    products.forEach(product => {
      const foundProduct = productList.find(p => p._id.toString() === product.productId);
      if (foundProduct) {
        totalAmount += foundProduct.price * product.quantity; // On suppose que chaque produit a un prix
      }
    });

    // Création de la nouvelle commande
    const newOrder = new Order({
      orderId: `ORD-${Date.now()}`, // Génération d'un ID de commande simple
      customerId,
      products,
      totalAmount,
      orderDate: new Date(),
      status: 'en cours',
    });

    await newOrder.save();
    return res.status(201).json(newOrder);
  } catch (error) {
    console.error('Erreur lors de la création de la commande:', error);
    return res.status(500).json({ message: 'Erreur lors de la création de la commande' });
  }
};

// Récupération de toutes les commandes
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customerId', 'name').populate('products.productId');
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    return res.status(500).json({ message: 'Erreur lors de la récupération des commandes' });
  }
};

// Récupération d'une commande par ID
const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findOne({ orderId }).populate('customerId', 'name').populate('products.productId');
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.error('Erreur lors de la récupération de la commande:', error);
    return res.status(500).json({ message: 'Erreur lors de la récupération de la commande' });
  }
};

// Mise à jour du statut d'une commande
const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      { status },
      { new: true } // Renvoie la version mise à jour
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la commande:', error);
    return res.status(500).json({ message: 'Erreur lors de la mise à jour de la commande' });
  }
};

// Exportation des fonctions du contrôleur
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
};
