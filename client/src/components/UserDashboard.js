import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserDashboard = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/user/${userId}`); // Updated endpoint
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          setError('Failed to fetch user data.');
        }
      } catch (error) {
        setError('Error fetching user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>User Dashboard</h2>

      {/* Display user details */}
      <div>
        <h3>User Details</h3>
        <p>ID: {userData.id}</p>
        <p>First Name: {userData.first_name}</p>
        <p>Last Name: {userData.last_name}</p>
        <p>Username: {userData.username}</p>
        <p>Email: {userData.email}</p>
      </div>
    </div>
  );
};

export default UserDashboard;
