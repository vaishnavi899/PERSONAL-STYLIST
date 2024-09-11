import React, { useState } from 'react';
import '../styles/Header.css';
import LoginWithGoogle from '../components/Login.jsx';

function Header() {
  const [showLogin, setShowLogin] = useState(false);  // State to manage login visibility

  const handleLoginClick = () => {
    setShowLogin(!showLogin);  // Toggle the login component visibility
  };

  return (
    <header className="header">
      <div className="logo">
        <h1 className="title">GET STYLED</h1>
      </div>

      <div className="header-right">
        <a href="/virtual-try-on" className="nav-link">Virtual Try On</a>
        <input type="text" className="search-bar" placeholder="Search..." />
        <button className="login-btn" onClick={handleLoginClick}>
          {showLogin ? 'Close Login' : 'Login'}  {/* Button text changes based on state */}
        </button>
      </div>

      {/* Conditionally render the LoginWithGoogle component */}
      {showLogin && <LoginWithGoogle />}
    </header>
  );
}

export default Header;
