// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="webfooter">
        <div className="footer-section">
        <Link to="/about-us"><h3>About Us</h3></Link>
          <Link to="/privacy-policy"><h3>Privacy Policy</h3></Link>
          {/* Update the Contact Us link to navigate to /contact-us */}
          <Link to="/contact-us"><h3>Contact Us</h3></Link>
          <div className="social-icons">
            <a href="#instagram"><i className="fab fa-instagram"></i></a>
            <a href="#gmail"><i className="fa-regular fa-envelope"></i></a>
            <a href="#facebook"><i className="fa-brands fa-facebook"></i></a>
          </div>
        </div>
        <div className="rights">
          <p>© 2024 Outfitter - All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
