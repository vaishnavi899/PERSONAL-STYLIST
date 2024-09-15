import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/Header.css';  // Import your custom CSS

function Header() {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0();

  if (isLoading) {
    return <header className="header">Loading...</header>;
  }

  return (
    <header className="header">
      <div className="logo">
        <h1 className="title">GET STYLED</h1>
      </div>
      <div className="header-right">
        <a href="/virtual-try-on" className="nav-link">Virtual Try On</a>
        <a href="/contact-us" className="nav-link">Contact Us</a> {/* Added Contact Us link */}
        <input type="text" className="search-bar" placeholder="Search..." />
      </div>
      {/* Conditionally render Login or Logout button based on authentication */}
      {isAuthenticated ? (
        <div className="profile-info">
          <div className="profile-picture-container">
            <img src={user.picture} alt={user.name} className="profile-picture" />
            <div className="user-details">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          </div>
          <button 
            className="login-btn logout-btn" 
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          >
            Log Out
          </button>
        </div>
      ) : (
        <button 
          className="login-btn" 
          onClick={() => loginWithRedirect()}
        >
          Log In
        </button>
      )}
    </header>
  );
}

export default Header;
