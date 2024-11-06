import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Création du contexte
export const ProductContext = createContext();

// Fournisseur du contexte
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupération des produits depuis l'API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des produits');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fonction pour ajouter un produit
  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post('http://localhost:5000/api/products', newProduct);
      setProducts((prevProducts) => [...prevProducts, response.data]);
    } catch (err) {
      setError('Erreur lors de l’ajout du produit');
    }
  };

  // Fonction pour mettre à jour un produit
  const updateProduct = async (id, updatedProduct) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? response.data : product
        )
      );
    } catch (err) {
      setError('Erreur lors de la mise à jour du produit');
    }
  };

  // Fonction pour supprimer un produit
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (err) {
      setError('Erreur lors de la suppression du produit');
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
