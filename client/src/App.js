import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import SignUpForm from './components/signUpForm';
import LoginForm from './components/login';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminLoginPage from './components/AdminLoginPage';
import AdminSignupPage from './components/AdminSignupPage';

function App() {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <>
      <div>
        <h1>Welcome to Your App</h1>
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

        <Routes>
          <Route path="/signup" element={<SignUpForm role={selectedRole} />} />
          <Route path="/login" element={<LoginForm role={selectedRole} />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/signup" element={<AdminSignupPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
