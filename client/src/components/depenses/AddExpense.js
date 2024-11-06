import React, { useState } from 'react';
import axios from 'axios';
import './AddExpense.css'; // Assurez-vous de créer ce fichier CSS pour les styles

const AddExpense = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des champs
    if (!description || !amount || !date) {
      setError('Tous les champs sont obligatoires.');
      return;
    }

    try {
      const newExpense = { description, amount: parseFloat(amount), date };
      await axios.post('http://localhost:5000/api/expenses', newExpense);
      setSuccess('Dépense ajoutée avec succès !');
      setDescription('');
      setAmount('');
      setDate('');
      setError('');
    } catch (err) {
      setError('Erreur lors de l\'ajout de la dépense.');
      setSuccess('');
    }
  };

  return (
    <div className="add-expense">
      <h2>Ajouter une Dépense</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Montant</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Ajouter Dépense</button>
      </form>
    </div>
  );
};

export default AddExpense;
