// Dashboard.js

import React, { useEffect, useState } from 'react';
import './App.css';
const Dashboard = () => {
  const [userInfo, setUserInfo] = useState({});
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    // Fetch user data and account balances after login
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Include the user's authentication token if needed
            // 'Authorization': Bearer ${yourAuthToken},
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUserInfo(data.user);
        setAccounts(data.accounts);

      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error as needed
      }
    };

    fetchUserData();
  }, []); // Run only once on component mount

  return (
    <div>
      <h1>Welcome, {userInfo.username}!</h1>

      <div>
        <h2>User Information</h2>
        <p>Email: {userInfo.email}</p>
        {/* Add other user information fields as needed */}
      </div>

      <div>
        <h2>Account Balances</h2>
        {accounts.map((account) => (
          <div key={account.id}>
            <p>Account Name: {account.name}</p>
            <p>Balance: {account.balance}</p>
            {/* Add other account details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;