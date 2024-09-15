import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/Header.css'; // Ensure your styles are updated accordingly

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
        <nav className="nav-links">
        <Link to="/" className="nav-link">Home</Link> {/* Updated to Link */}
          <Link to="/virtual-try-on" className="nav-link">Virtual Try On</Link>
          <Link to="/explore" className="nav-link">Explore</Link>
          <Link to="/contact-us" className="nav-link">Contact Us</Link>
          <Link to="/products" className='nav-link'>Products</Link> {/* Added Products Link */}
        </nav>
        <div className="search-container">
          <input type="text" className="search-bar" placeholder="Search..." />
          <button className="search-btn">
            <i className="fas fa-search"></i> {/* FontAwesome icon for search */}
          </button>
        </div>
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
