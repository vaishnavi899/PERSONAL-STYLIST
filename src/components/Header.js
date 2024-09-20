import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/Header.css';  // Import your custom CSS

function Header() {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0();

  if (isLoading) {
    return <header className="header">Loading...</header>;
  }

  return (
    <header className="header">
      <div className="logo">
        {/* Insert the logo image next to the title */}
        {/* <img src={process.env.PUBLIC_URL + '/Outfitter (1).png'} alt="Logo" className="header-logo" /> */}
        <h1 className="title">Outfitter</h1>
      </div>
      <div className="header-right">
        <Link to="/" className="nav-link">Home</Link> {/* Link for Home */}
        <Link to="/contact-us" className="nav-link">About Us</Link> {/* Link for About Us */}
        <Link to="/contact-us" className="nav-link">Contact Us</Link> {/* Link for Contact Us */}
        <Link to="/Quiz" className="nav-link">StyleQuiz</Link> {/* New Link for StyleQuiz */}
        <Link to="/VirtualTryOn" className="nav-link">VirtualTryOn</Link> {/* New Link for VirtualTryOn */}
      </div>
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
          Sign Up / Log In
        </button>
      )}
    </header>
  );
}

export default Header;
