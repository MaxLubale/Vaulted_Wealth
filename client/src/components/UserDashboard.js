import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserAccountsPage from './UserAccountsPage';
import './UserDashboard.css';
const UserDashboard = () => {
  const { userId } = useParams();
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserData(userData.user);
        } else {
          console.error('Error fetching user data. Status:', response.status);
          const errorMessage = await response.text();
          console.error('Error message:', errorMessage);
          setError(`Error fetching user data: ${errorMessage}`);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle logout function
  const handleLogout = () => {
    // Add logic to perform logout actions (clear tokens, etc.)
    // For now, let's just redirect to the login page
    navigate('/');
  };

  return (
    <div>
      <h1>Your Dashboard</h1>
      {loading && <p>Fetching user data...</p>}
      {error && <p>{error}</p>}
      {userData && (
        <div>
          <h2>User Information</h2>
          
          <p>First Name: {userData.first_name}</p>
          <p>Last Name: {userData.last_name}</p>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>

          {/* Route for the User Accounts Page */}
          <UserAccountsPage userId={userId} />

          
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
