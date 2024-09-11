import React from 'react';
import '../styles/Footer.css'; // Separate CSS for the footer component

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Wedding Styling</h3>
        <ul>
          <li>Bride/Groom Styling</li>
          <li>Virtual Bride/Groom Styling</li>
          <li>Family Styling</li>
          <li>Trousseau Shopping</li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Personal Styling</h3>
        <ul>
          <li>Style Makeover</li>
          <li>Event Styling</li>
          <li>Personal Shopping</li>
          <li>Capsule Wardrobe</li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Support</h3>
        <ul>
          <li>GS Concierge</li>
          <li>Help Center</li>
          <li>GetCover</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>About</h3>
        <ul>
          <li>Our Story</li>
          <li>Join as a pro</li>
          <li>Careers</li>
          <li>Get the app</li>
          <li>Blog</li>
        </ul>
      </div>
      <div className="footer-branding">
        <h2>GetStyled</h2>
        <p>Book India's most in-demand styling and shopping pros from around the world and get advice over video call.</p>
        <div className="social-icons">
          <a href="#instagram"><i class="fab fa-instagram"></i></a>
          <a href="#gmail"><i class="fa-regular fa-envelope"></i></a>
          <a href="#facebook"><i class="fa-brands fa-facebook"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
