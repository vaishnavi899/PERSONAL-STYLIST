import React from 'react';
import '../styles/WebPage.css'; // Import your custom CSS


const WebPage = () => {
  return (
    <div className="webpage">
      
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>DISCOVER YOUR PERSONAL STYLE</h1>
          <p>Let us be your perfect styling partner</p>
          <a href="#get-started" className="cta-button">GET STARTED</a>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="categories">
        <h2 className="section-title">EXPLORE BY CATEGORY</h2>
        <div className="category-grid">
          {/* Category Cards */}
          <a href="/category/genz" className="category-card genz">
            <div className="category-info">
              <h3>GenZ</h3>
              <p>Trendy and bold styles for the youth</p>
            </div>
          </a>
          
          <a href="/category/luxury" className="category-card luxury">
            <div className="category-info">
              <h3>Luxury</h3>
              <p>Exclusive and premium fashion</p>
            </div>
          </a>
          
          <a href="/category/latest" className="category-card latest">
            <div className="category-info">
              <h3>Latest Arrivals</h3>
              <p>Fresh fashion arrivals for the season</p>
            </div>
          </a>
          
          <a href="/category/formal" className="category-card formal">
            <div className="category-info">
              <h3>Formal</h3>
              <p>Classic and elegant office wear</p>
            </div>
          </a>
          
          <a href="/category/traditionals" className="category-card traditionals">
            <div className="category-info">
              <h3>Traditionals</h3>
              <p>Beautiful traditional outfits for special occasions</p>
            </div>
          </a>
          
          <a href="/category/party-wear" className="category-card party-wear">
            <div className="category-info">
              <h3>Party Wear</h3>
              <p>Glamorous outfits to shine at any event</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default WebPage;
