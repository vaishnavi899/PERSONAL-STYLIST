import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import VirtualTryOn from './components/VirtualTryOn'; // Import your components
import Explore from './components/Explore'; // Import your components
import ContactUs from './components/contactus'; // Import your components
import ProductList from './components/Productlist'; // Import your ProductList component
import WebPage from './components/WebPage';
import ProductDetails from './components/productdetails'; 
import StyleQuiz from './components/StyleQuiz';
import ProductSuggestions from './components/ProductSuggestions';
const App = () => {
  return (
    <>
      
      <Routes>
      <Route path="/" element={<WebPage />} />
      
        <Route path="/VirtualTryOn" element={<VirtualTryOn />} />
        <Route path="/Quiz" element={<StyleQuiz />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/suggestions" element={<ProductSuggestions/>}/>
        {/* Add other routes as needed */}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
