// EditAccountNameForm.js
import React, { useState } from 'react';

const EditAccountNameForm = ({ user_id, account_id, currentName, onEdit }) => {
  const [newAccountName, setNewAccountName] = useState(currentName);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform the edit operation and update the state
    // Call the onEdit function passed from the parent component
    onEdit(account_id, newAccountName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={`editAccountName_${account_id}`}>Edit Account Name:</label>
      <input
        type="text"
        id={`editAccountName_${account_id}`}
        name={`editAccountName_${account_id}`}
        value={newAccountName}
        onChange={(e) => setNewAccountName(e.target.value)}
        required
      />
      <button type="submit">Edit Name</button>
    </form>
  );
};

export default EditAccountNameForm;
