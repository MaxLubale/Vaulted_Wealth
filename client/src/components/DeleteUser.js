import React, { useState } from 'react';

const DeleteUser = ({ userId, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');

    if (!isConfirmed) {
      return; // If not confirmed, do nothing
    }

    try {
      setLoading(true);

      // Send a DELETE request to the backend
      const response = await fetch(`/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // If successful, trigger the callback function
        onDeleteSuccess(userId);
      } else {
        // If unsuccessful, handle the error
        const errorMessage = await response.text();
        setError(`Error deleting user: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={loading}>
        Delete User
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default DeleteUser;
