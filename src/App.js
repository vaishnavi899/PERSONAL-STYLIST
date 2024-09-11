import React from 'react';
import WebPage from './components/WebPage.js'; // Make sure your WebPage is correctly imported
import Footer from './components/Footer.js';
import LoginWithGoogle from './components/Login.jsx';

const App = () => {
  return (
    <div className="App">
      <WebPage />
      <LoginWithGoogle/>
      <Footer/>
    </div>
  );
};

export default App;
