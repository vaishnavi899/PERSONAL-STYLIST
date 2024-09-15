import React from 'react';
import WebPage from './components/WebPage.js'; // Make sure your WebPage is correctly imported
import Footer from './components/Footer.js';
import LoginWithGoogle from './components/Login.jsx';
import ProductList from './components/Productlist.js';

const App = () => {
  return (
    <div className="App">
      <WebPage />
      <ProductList />
      <LoginWithGoogle/>
      <Footer/>
    </div>
  );
};

export default App;
