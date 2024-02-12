// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/"><i className="fas fa-home"></i>Home</Link>
        </li>
        <li>
          <Link to="/user/:userId/accounts"><i className="fas fa-chart-bar"></i>Services</Link>
        </li>
        <li>
          <Link to="/dashboard/:userId"><i class="fa-solid fa-building"></i>About Us</Link>
        </li>
        <li>
          <Link to="/"><i className="fas fa-sign-out-alt"></i> Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
