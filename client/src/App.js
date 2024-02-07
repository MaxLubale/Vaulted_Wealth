// App.js

import React, {useState } from 'react';
import SignUpForm from './components/signUpForm';  
import SignInForm from './components/signInForm';  
// import './App.css';

function App() {
  const [userType, setUserType] = useState('User');

  return (
    <div>
      <h1>Bank App</h1>
      <div>
        <button onClick={() => setUserType('User')}>Sign Up/In as User</button>
        <button onClick={() => setUserType('Admin')}>Sign Up/In as Admin</button>
      </div>
      {userType === 'User' ? <SignUpForm userType="User" /> : <SignUpForm userType="Admin" />}
      {userType === 'User' ? <SignInForm userType="User" /> : <SignInForm userType="Admin" />}
    </div>
  );
}

export default App;