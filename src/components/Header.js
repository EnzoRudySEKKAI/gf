import React, { useState } from 'react';
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
          <h2>For My Girlfriend Yisheng 💖💜</h2>
        </div>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#next-meeting" onClick={() => setIsMenuOpen(false)}>Next Date</a>
          <a href="#reasons" onClick={() => setIsMenuOpen(false)}>Why I Love You</a>
          <a href="#countdown" onClick={() => setIsMenuOpen(false)}>Time Loving U</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Love Letter</a>
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