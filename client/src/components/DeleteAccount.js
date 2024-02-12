import React, { useState } from 'react';

const DeleteAccount = ({ userId, accountId, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      setLoading(true);

      // Send a DELETE request to the backend
      const response = await fetch(`/user/${userId}/accounts/${accountId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ account_id: accountId }),
      });

      if (response.ok) {
        // If successful, trigger the callback function
        onDeleteSuccess(accountId);
      } else {
        // If unsuccessful, handle the error
        const errorMessage = await response.text();
        setError(`Error deleting account: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setError('Failed to delete account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={loading}>
        Delete Account
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default DeleteAccount;
