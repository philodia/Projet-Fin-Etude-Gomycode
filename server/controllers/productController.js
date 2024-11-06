const Product = require('../models/Product');

// Créer un nouveau produit
const createProduct = async (req, res) => {
  const { productId, name, description, price, quantity, category } = req.body;

  try {
    const newProduct = new Product({
      productId,
      name,
      description,
      price,
      quantity,
      category,
    });

    await newProduct.save();
    res.status(201).json({ message: "Produit créé avec succès.", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du produit.", error: error.message });
  }
};

// Lire tous les produits
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des produits.", error: error.message });
  }
};

// Lire un produit par son ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ productId: id });
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du produit.", error: error.message });
  }
};

// Mettre à jour un produit
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findOneAndUpdate({ productId: id }, updates, { new: true });
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }
    res.status(200).json({ message: "Produit mis à jour avec succès.", product });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du produit.", error: error.message });
  }
};

// Supprimer un produit
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOneAndDelete({ productId: id });
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }
    res.status(200).json({ message: "Produit supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du produit.", error: error.message });
  }
};

// Export des fonctions du contrôleur
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
