import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <div>
      <h1>Welcome to Vaulted Wealth</h1>
      <div>
        <h2>Select Role:</h2>
        <button onClick={() => setSelectedRole('user')}>User</button>
        <button onClick={() => setSelectedRole('admin')}>Admin</button>
      </div>

      {selectedRole && (
        <div>
          <h2>Select Action:</h2>

          {/* Conditionally render links based on the selected role */}
          {selectedRole === 'user' && (
            <>
              <Link to="/signup">
                <button>Sign Up</button>
              </Link>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </>
          )}

          {selectedRole === 'admin' && (
            <>
              <Link to="/admin/signup">
                <button>Admin Sign Up</button>
              </Link>
              <Link to="/admin/login">
                <button>Admin Login</button>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
