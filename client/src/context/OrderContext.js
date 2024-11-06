import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Création du contexte
export const OrderContext = createContext();

// Fournisseur du contexte
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupération des commandes et factures depuis l'API
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const ordersResponse = await axios.get('http://localhost:5000/api/orders');
        const invoicesResponse = await axios.get('http://localhost:5000/api/invoices');
        setOrders(ordersResponse.data);
        setInvoices(invoicesResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des commandes et des factures');
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  // Fonction pour ajouter une commande
  const addOrder = async (newOrder) => {
    try {
      const response = await axios.post('http://localhost:5000/api/orders', newOrder);
      setOrders((prevOrders) => [...prevOrders, response.data]);
    } catch (err) {
      setError('Erreur lors de l’ajout de la commande');
    }
  };

  // Fonction pour mettre à jour une commande
  const updateOrder = async (id, updatedOrder) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${id}`, updatedOrder);
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === id ? response.data : order))
      );
    } catch (err) {
      setError('Erreur lors de la mise à jour de la commande');
    }
  };

  // Fonction pour supprimer une commande
  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    } catch (err) {
      setError('Erreur lors de la suppression de la commande');
    }
  };

  // Fonction pour ajouter une facture
  const addInvoice = async (newInvoice) => {
    try {
      const response = await axios.post('http://localhost:5000/api/invoices', newInvoice);
      setInvoices((prevInvoices) => [...prevInvoices, response.data]);
    } catch (err) {
      setError('Erreur lors de l’ajout de la facture');
    }
  };

  // Fonction pour mettre à jour une facture
  const updateInvoice = async (id, updatedInvoice) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/invoices/${id}`, updatedInvoice);
      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice.id === id ? response.data : invoice
        )
      );
    } catch (err) {
      setError('Erreur lors de la mise à jour de la facture');
    }
  };

  // Fonction pour supprimer une facture
  const deleteInvoice = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/invoices/${id}`);
      setInvoices((prevInvoices) =>
        prevInvoices.filter((invoice) => invoice.id !== id)
      );
    } catch (err) {
      setError('Erreur lors de la suppression de la facture');
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        invoices,
        loading,
        error,
        addOrder,
        updateOrder,
        deleteOrder,
        addInvoice,
        updateInvoice,
        deleteInvoice,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
