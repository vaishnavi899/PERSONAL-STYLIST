import React from 'react';
import '../styles/Header.css'; // Import your custom CSS

const Header = () => {
  return (
    <header className="header">
      <div className="styled-text">Styled</div> {/* Move "Styled" to the far left */}
      <div className="logo">
        <span>Get</span>
      </div>
      <nav className="nav">
        <a href="#portfolio">Portfolio</a>
        <a href="#blog">Blog</a>
        <a href="#for-stylists" className="button">For Stylists</a>
        <a href="#get-started" className="button button-dark">Get Started</a>
      </nav>
    </header>
  );
};

export default Header;
