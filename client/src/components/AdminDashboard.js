import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch('/users');

        if (response.ok) {
          const data = await response.json();

          // Log the received data to understand its structure
          console.log('Received data:', data);

          // Check if the data is an array or an object
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

    fetchUsersData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* Display user data */}
      {Array.isArray(usersData) && usersData.length > 0 ? (
        usersData.map((user) => (
          <div key={user.id}>
            <h3>User ID: {user.username}</h3>
            <p>
              Name: {`${user.first_name || 'N/A'} ${user.last_name || 'N/A'}`}
            </p>
            <p>Email: {user.email || 'N/A'}</p>

            {/* Display user accounts */}
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

            {/* Display user transactions */}
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
