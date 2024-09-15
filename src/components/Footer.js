import React from 'react';
import '../styles/Footer.css'; // Separate CSS for the footer component

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Services</h3>
        <ul>
          <li>Personal Styling</li>
          <li>Virtual Try-On</li>
          <li>Wardrobe Consultation</li>
          <li>Shopping Assistance</li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Explore</h3>
        <ul>
          <li>Latest Arrivals</li>
          <li>Trending Styles</li>
          <li>Style Blog</li>
          <li>Client Testimonials</li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Support</h3>
        <ul>
          <li>Help Center</li>
          <li>FAQs</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Company</h3>
        <ul>
          <li>About Us</li>
          <li>Careers</li>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div className="footer-branding">
        <h2>GetStyled</h2>
        <p>Redefining personal styling with the latest fashion trends, right at your fingertips.</p>
        <div className="social-icons">
          <a href="#instagram"><i className="fab fa-instagram"></i></a>
          <a href="#gmail"><i className="fa-regular fa-envelope"></i></a>
          <a href="#facebook"><i className="fa-brands fa-facebook"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
