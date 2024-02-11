// UserAccountsPage.js

import React, { useState, useEffect } from 'react';

const UserAccountsPage = ({ userId }) => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAccounts = async () => {
      try {
        setLoading(true);

        // Fetch user accounts data from the backend
        const response = await fetch(`/user/${userId}/accounts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const accountsData = await response.json();
          console.log('User accounts data:', accountsData);

          // Update the accounts state
          setAccounts(accountsData.accounts);
        } else {
          console.error('Error fetching user accounts. Status:', response.status);
          const errorMessage = await response.text();
          console.error('Error message:', errorMessage);
          setError(`Error fetching user accounts: ${errorMessage}`);
        }
      } catch (error) {
        console.error('Error fetching user accounts:', error);
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAccounts();
  }, [userId]);

  return (
    <div>
      <h1>User Accounts</h1>
      {loading && <p>Loading user accounts...</p>}
      {error && <p>{error}</p>}
      {accounts.length > 0 && (
        <div>
          <h2>Accounts List</h2>
          {accounts.map((account) => (
            <div key={account.id}>
              <p>Account ID: {account.id}</p>
              <p>Balance: {account.balance}</p>
              <p>Created Date: {account.created_date}</p>
              {/* Fetch and display transactions for this account if needed */}
              {/* You can link to a transactions page or include them here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAccountsPage;
