// OrderCreation.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderCreation.css';

const OrderCreation = () => {
    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const [orderItems, setOrderItems] = useState([{ productId: '', quantity: 1 }]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch clients and products when the component mounts
        const fetchClientsAndProducts = async () => {
            try {
                const clientResponse = await axios.get('/api/clients'); // Endpoint pour récupérer les clients
                const productResponse = await axios.get('/api/products'); // Endpoint pour récupérer les produits
                setClients(clientResponse.data);
                setProducts(productResponse.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des clients ou des produits", error);
            }
        };

        fetchClientsAndProducts();
    }, []);

    const handleOrderItemChange = (index, field, value) => {
        const updatedOrderItems = [...orderItems];
        updatedOrderItems[index][field] = value;
        setOrderItems(updatedOrderItems);
    };

    const addOrderItem = () => {
        setOrderItems([...orderItems, { productId: '', quantity: 1 }]);
    };

    const removeOrderItem = (index) => {
        const updatedOrderItems = orderItems.filter((_, i) => i !== index);
        setOrderItems(updatedOrderItems);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderDetails = {
            clientId: selectedClient,
            items: orderItems,
        };

        try {
            await axios.post('/api/orders', orderDetails); // Envoie les détails de la commande au backend
            setMessage("Commande créée avec succès !");
            // Réinitialiser le formulaire après création de la commande
            setSelectedClient('');
            setOrderItems([{ productId: '', quantity: 1 }]);
        } catch (error) {
            console.error("Erreur lors de la création de la commande", error);
            setMessage("Erreur lors de la création de la commande");
        }
    };

    return (
        <div className="order-creation-container">
            <h2>Créer une commande</h2>
            {message && <p className="message">{message}</p>}

            <form onSubmit={handleSubmit}>
                {/* Sélection du client */}
                <div className="form-group">
                    <label htmlFor="client">Client</label>
                    <select
                        id="client"
                        value={selectedClient}
                        onChange={(e) => setSelectedClient(e.target.value)}
                        required
                    >
                        <option value="">Sélectionner un client</option>
                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>{client.name}</option>
                        ))}
                    </select>
                </div>

                {/* Articles de commande */}
                <h3>Articles</h3>
                {orderItems.map((item, index) => (
                    <div key={index} className="order-item">
                        <select
                            value={item.productId}
                            onChange={(e) => handleOrderItemChange(index, 'productId', e.target.value)}
                            required
                        >
                            <option value="">Sélectionner un produit</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleOrderItemChange(index, 'quantity', e.target.value)}
                            required
                        />
                        {index > 0 && (
                            <button type="button" onClick={() => removeOrderItem(index)}>Supprimer</button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={addOrderItem}>Ajouter un produit</button>

                {/* Bouton de soumission */}
                <button type="submit" className="submit-button">Créer la commande</button>
            </form>
        </div>
    );
};

export default OrderCreation;
