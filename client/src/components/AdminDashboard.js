import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import DeleteUser from './DeleteUser';

const AdminDashboard = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const fetchUsersData = async () => {
    try {
      const response = await fetch('/users');

      if (response.ok) {
        const data = await response.json();

        if (Array.isArray(data)) {
          setUsersData(data);
        } else if (data.users) {
          setUsersData(data.users);
        } else {
          setError('Invalid data format received.');
        }
      } else {
        setError('Failed to fetch users data.');
      }
    } catch (error) {
      setError('Error fetching users data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  const handleDeleteUser = (userId) => {
    // Update the state to remove the deleted user
    setUsersData((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  const handleLogout = () => {
    // Add logic to perform logout actions (clear tokens, etc.)
    // For now, let's just redirect to the login page
    navigate('/');
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Clients:</h2>
      {Array.isArray(usersData) && usersData.length > 0 ? (
        usersData.map((user) => (
          <div key={user.id}>
            <h3>Username: {user.username}</h3>
            <p>Name: {`${user.first_name || 'N/A'} ${user.last_name || 'N/A'}`}</p>
            <p>Email: {user.email || 'N/A'}</p>

            <DeleteUser userId={user.id} onDeleteSuccess={handleDeleteUser} />

            {user.accounts && user.accounts.length > 0 && (
              <div>
                <h4>User Accounts</h4>
                {user.accounts.map((account) => (
                  <div key={account.id}>
                    <p>Account ID: {account.id}</p>
                    <p>Balance: ${account.balance}</p>
                  </div>
                ))}
              </div>
            )}

            {user.transactions && user.transactions.length > 0 && (
              <div>
                <h4>User Transactions</h4>
                {user.transactions.map((transaction) => (
                  <div key={transaction.id}>
                    <p>Transaction ID: {transaction.id}</p>
                    <p>Amount: ${transaction.amount}</p>
                  </div>
                ))}
              </div>
            )}
            <hr />
          </div>
        ))
      ) : (
        <p>No users data available.</p>
      )}
      
    </div>
  );
};

export default AdminDashboard;
