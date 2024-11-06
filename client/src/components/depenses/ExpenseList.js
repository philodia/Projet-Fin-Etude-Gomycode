import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ExpenseList.css'; // Assurez-vous de créer ce fichier CSS pour les styles

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/expenses');
        setExpenses(response.data);
        setError('');
      } catch (err) {
        setError('Erreur lors de la récupération des dépenses.');
      }
    };

    fetchExpenses();
  }, []);

  const handleDelete = async (expenseId) => {
    try {
      await axios.delete(`/api/expenses/${expenseId}`);
      setExpenses(expenses.filter(expense => expense.expenseId !== expenseId));
    } catch (err) {
      setError('Erreur lors de la suppression de la dépense.');
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="expense-list">
      <h2>Liste des Dépenses</h2>
      {expenses.length === 0 ? (
        <p>Aucune dépense enregistrée.</p>
      ) : (
        <table className="expenses-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Montant</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense.expenseId}>
                <td>{expense.expenseId}</td>
                <td>{expense.description}</td>
                <td>{expense.amount}€</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDelete(expense.expenseId)} className="delete-button">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpenseList;
