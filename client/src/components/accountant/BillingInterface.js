// BillingInterface.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BillingInterface = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Récupère les commandes en attente de facturation
        const fetchPendingOrders = async () => {
            try {
                const response = await axios.get('/api/orders/pending');
                setPendingOrders(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des commandes en attente :", error);
            }
        };
        fetchPendingOrders();
    }, []);

    // Sélectionner une commande pour la visualiser en détail
    const handleSelectOrder = (order) => {
        setSelectedOrder(order);
    };

    // Générer une facture pour la commande sélectionnée
    const handleGenerateInvoice = async () => {
        if (!selectedOrder) return;
        try {
            const response = await axios.post(`/api/invoices/generate`, { orderId: selectedOrder._id });
            setMessage(response.data.message || 'Facture générée avec succès');
            // Mettre à jour la liste des commandes après facturation
            setPendingOrders(pendingOrders.filter(order => order._id !== selectedOrder._id));
            setSelectedOrder(null);
        } catch (error) {
            console.error("Erreur lors de la génération de la facture", error);
            setMessage("Erreur lors de la génération de la facture");
        }
    };

    return (
        <div className="billing-interface">
            <h2>Interface de Facturation</h2>
            {message && <div className="alert alert-info">{message}</div>}

            <div className="order-list">
                <h4>Commandes en attente de facturation</h4>
                <ul>
                    {pendingOrders.map(order => (
                        <li key={order._id} onClick={() => handleSelectOrder(order)}>
                            Commande #{order._id} - Client : {order.clientId.name}
                        </li>
                    ))}
                </ul>
            </div>

            {selectedOrder && (
                <div className="order-details">
                    <h4>Détails de la Commande</h4>
                    <p><strong>Client:</strong> {selectedOrder.clientId.name}</p>
                    <p><strong>Produits:</strong></p>
                    <ul>
                        {selectedOrder.items.map((item, index) => (
                            <li key={index}>
                                {item.productId.name} - Quantité : {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <button className="btn btn-primary" onClick={handleGenerateInvoice}>
                        Générer la Facture
                    </button>
                </div>
            )}
        </div>
    );
};

export default BillingInterface;
