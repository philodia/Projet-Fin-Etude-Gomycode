import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './ManagerDashboard.css'; // Assurez-vous de créer ce fichier CSS pour les styles

const ManagerDashboard = () => {
  const { user } = useContext(AuthContext); // Contexte pour obtenir l'utilisateur connecté
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true); // État de chargement

  // Vérifiez si l'utilisateur est un gestionnaire
  useEffect(() => {
    if (user?.role !== 'manager') {
      // Redirection ou affichage d'un message d'accès interdit
      window.location.href = '/unauthorized'; // Remplacez par votre route de redirection
    }
  }, [user]);

  // Récupérer les données du tableau de bord pour les commandes, produits et clients
  useEffect(() => {
    const fetchManagerData = async () => {
      try {
        const ordersResponse = await axios.get('http://localhost:5000/api/orders'); // API pour les commandes
        const productsResponse = await axios.get('http://localhost:5000/api/products'); // API pour les produits
        const clientsResponse = await axios.get('http://localhost:5000/api/clients'); // API pour les clients

        setOrders(ordersResponse.data);
        setProducts(productsResponse.data);
        setClients(clientsResponse.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du tableau de bord', error);
      } finally {
        setLoading(false); // Met à jour l'état de chargement une fois les données récupérées
      }
    };

    fetchManagerData();
  }, []);

  // Affichez un indicateur de chargement si les données sont en cours de récupération
  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="manager-dashboard">
      <h2 className="text-center">Tableau de Bord Gestionnaire</h2>

      <div className="dashboard-section">
        <h3>Gestion des Commandes</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>{order.status}</td>
                <td>{order.total} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboard-section">
        <h3>Gestion des Produits</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Quantité</th>
              <th>Prix</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboard-section">
        <h3>Gestion des Clients</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerDashboard;
