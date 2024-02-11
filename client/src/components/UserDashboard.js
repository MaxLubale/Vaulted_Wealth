import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserAccountsPage from './UserAccountsPage';

const UserDashboard = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Use the user ID from the URL params to fetch user data
        const response = await fetch(`/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          console.log('User data:', userData);

          // Update the userData state
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

  return (
    <div>
      <h1>User Dashboard</h1>
      {loading && <p>Fetching user data...</p>}
      {error && <p>{error}</p>}
      {userData && (
        <div>
          <h2>User Information</h2>
          <p>ID: {userData.id}</p>
          <p>First Name: {userData.first_name}</p>
          <p>Last Name: {userData.last_name}</p>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>

          {/* Link to the User Accounts Page */}
          <Link to={`/dashboard/${userId}/accounts`}>View Accounts</Link>

          {/* Route for the User Accounts Page */}
          <UserAccountsPage userId={userId} />
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
