import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import VirtualTryOn from './components/VirtualTryOn';
import Explore from './components/Explore';
import ContactUs from './components/contactus';
import ProductList from './components/Productlist';
import WebPage from './components/WebPage';
import ProductDetails from './components/productdetails';
import StyleQuiz from './components/StyleQuiz';
import PrivacyPolicy from './components/privacyPolicy';
import AboutUs from './components/AboutUs';
import ProductSuggestions from './components/ProductSuggestions';
import ImageUpload from './components/ImageUpload';
function App() {
  const location = useLocation(); // Get the current route

  return (
    <>
      <Routes>
        <Route path="/" element={<WebPage />} />
        <Route path="/VirtualTryOn" element={<VirtualTryOn />} />
        <Route path="/Quiz" element={<StyleQuiz />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} /> {/* Add AboutUs route */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/suggestions" element={<ProductSuggestions/>}/>
        <Route path="/upload-image" element={<ImageUpload/>}/>
        {/* Add other routes as needed */}
      </Routes>
      
      {/* Conditionally render Footer based on the route */}
      {location.pathname !== '/contact-us' && location.pathname !== '/privacy-policy' && location.pathname !== '/about-us' && <Footer />}
    </>
  );
}


export default App;
