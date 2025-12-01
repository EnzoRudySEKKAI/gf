import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-brand">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <h2>For My Girlfriend Yisheng 💖💜</h2>
          </Link>
        </div>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <NavLink to="/" end onClick={() => setIsMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/next-date" onClick={() => setIsMenuOpen(false)}>
            Next Date
          </NavLink>
          <NavLink to="/reasons" onClick={() => setIsMenuOpen(false)}>
            Why I Love You
          </NavLink>
          <NavLink to="/time-loving-you" onClick={() => setIsMenuOpen(false)}>
            Time Loving U
          </NavLink>
          <NavLink to="/love-letter" onClick={() => setIsMenuOpen(false)}>
            Love Letter
          </NavLink>
          <NavLink to="/tic-tac-toe" onClick={() => setIsMenuOpen(false)}>
            Play Tic Tac Toe
          </NavLink>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;