import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <Link to="/" className="home-link">Home</Link>
      <h2>Add a user</h2>
      <div className="profile-icon">
        <img
          src="https://via.placeholder.com/30"
          alt="User"
        />
      </div>
    </header>
  );
};

export default Header;
