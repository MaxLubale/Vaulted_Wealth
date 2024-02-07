// TransactionForm.js

import React, { useState } from 'react';
import './App.css';

const TransactionForm = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare transaction data
    const transactionData = {
      amount: amount,
      description: description,
      user_id: 1 // Replace with the actual user ID
      // Add other fields as needed
    };

    try {
      // Send transaction data to the Flask backend
      const response = await fetch('http://localhost:5000/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactionData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Transaction added successfully:', data);

      // Add any other logic you need after a successful transaction

    } catch (error) {
      console.error('Error adding transaction:', error);
      // Add error handling logic here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="amount">Amount:</label>
      <input
        type="number"
        id="amount"
        name="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      {/* Add other form fields as needed */}

      <button type="submit">Submit</button>
    </form>
  );
};

export default TransactionForm;