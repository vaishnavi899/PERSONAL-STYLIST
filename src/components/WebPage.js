import React from 'react';
import '../styles/WebPage.css'; // Import your custom CSS
import Header from './Header.js'; // Import the Header component
import Footer from './Footer.js'; // Import the Footer component

const WebPage = () => {
  return (
    <div className="webpage">
      <Header />
      <section className="hero">
        <div className="hero-content">
          <h1>DISCOVER YOUR PERSONAL STYLE</h1>
          <p>Let us be your perfect styling partner</p>
          <a href="#get-started" className="cta-button">GET STARTED</a>
        </div>
      </section>

      {/* Include Footer here */}
      <Footer />
    </div>
  );
};

export default WebPage;
