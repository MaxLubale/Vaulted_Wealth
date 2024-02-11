import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const CreateAccount = () => {
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    accountName: '',  // Updated to include accountName
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your logic to send the form data to the backend
  };

  return (
    <div>
      <h2>Create New Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Account Name:</label>
          <select name="accountName" value={formData.accountName} onChange={handleChange} required>
            <option value="">Select Account Name</option>
            <option value="personal">Personal</option>
            <option value="business">Business</option>
            <option value="other">Other</option>
          </select>
        </div>
        {/* Add other form fields as needed */}
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;
