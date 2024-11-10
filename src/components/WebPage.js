import React, { useState, useEffect } from 'react';
import '../styles/WebPage.css'; // Import your custom CSS
import Header from './Header.js'; // Import the Header component
import StyleQuiz from './StyleQuiz'; // Import the StyleQuiz component
import Review from './review.js';

const WebPage = () => {
  const [showQuiz, setShowQuiz] = useState(false); // State to toggle between WebPage and StyleQuiz
  const [showChatbot, setShowChatbot] = useState(false); // State to toggle chatbot visibility

  // Debugging: Log when the button is clicked
  const handleGetOutfittedClick = () => {
    console.log("Get Outfitted button clicked");
    setShowQuiz(true); // Show the StyleQuiz when button is clicked
  };

  const handleChatbotClick = () => {
    setShowChatbot(!showChatbot); // Toggle chatbot visibility
  };

  useEffect(() => {
    // Load the chatbot script only if it's needed
    if (showChatbot) {
      window.embeddedChatbotConfig = {
        chatbotId: "FhFB72KrOsX0rGT1jvcJ4",
        domain: "www.chatbase.co"
      };

      const script = document.createElement('script');
      script.src = "https://www.chatbase.co/embed.min.js";
      script.setAttribute('chatbotId', "FhFB72KrOsX0rGT1jvcJ4");
      script.setAttribute('domain', "www.chatbase.co");
      script.defer = true;

      document.body.appendChild(script);

      // Cleanup script on unmount
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showChatbot]);

  return (
    <div className="webpage">
      {showQuiz ? (
        <StyleQuiz />
      ) : (
        <>
          <Header />
          <section className="hero">
            <div className="hero">
              <div className="hero-image"></div>
              <div className="hero-video">
                <video
                  className="hover-video"
                  width="800"
                  height="auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source
                    src={process.env.PUBLIC_URL + '/mixkit-hand-selecting-through-clothes-23327-hd-ready.mp4'}
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          </section>
  
          <div className="button-container">
            <button className="button" onClick={handleGetOutfittedClick}>
              Get Outfitted
            </button>
          </div>
  
          {/* Image and Video Section */}
          <section className="media-section">
            <div className="image-container">
              <img
                src={process.env.PUBLIC_URL + '/image123.png'}
                alt="Fashion Outfit"
                className="fashion-image"
              />
              <img
                src={process.env.PUBLIC_URL + '/image.png'}
                alt="Fashion Outfit"
                className="fashion-image"
              />
            </div>
  
            <div className="video-container">
              <video
                className="hover-video"
                width="800"
                height="auto"
                autoPlay
                loop
                muted
                playsInline
              >
                <source
                  src={process.env.PUBLIC_URL + '/steps-video-optimized.mp4'}
                  type="video/mp4"
                />
              </video>
            </div>
          </section>
  
          {/* Review Component Section */}
          <section className="review-section">
            <Review />
          </section>

          
        </>
      )}
    </div>
  );
};

export default WebPage;
