// HomePage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the common CSS file


const HomePage = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <div className="container">
      <h1>Welcome to Vaulted Wealth</h1>
      <div>
        <h2>Select Role:</h2>
        
        <p><button onClick={() => setSelectedRole('user')}>User</button></p>
      </div>
    
      <div>
        <button onClick={() => setSelectedRole('admin')}>Admin</button>
      </div>

      {selectedRole && (
        <div className="button-container">
          <h2>Select Action:</h2>

          {/* Conditionally render links based on the selected role */}
          {selectedRole === 'user' && (
            <>
              <Link to="/signup">
                <button className="left-button">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className="right-button">Login</button>
              </Link>
            </>
          )}

          {selectedRole === 'admin' && (
            <>
              <Link to="/admin/signup">
                <button className="left-button">Admin Sign Up</button>
              </Link>
              <Link to="/admin/login">
                <button className="right-button">Admin Login</button>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
