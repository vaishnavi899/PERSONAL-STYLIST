import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      const res = await axios.post("http://127.0.0.1:5000/chat", { message });
      setResponse(res.data.reply);
      setMessage(""); // Clear input after sending
    } catch (error) {
      console.error("Error:", error);
      setResponse("There was an error communicating with the chatbot.");
    }
  };

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible); // Toggle chatbot visibility
  };

  return (
    <>
      {/* Floating Button */}
      <button
        style={styles.floatingButton}
        onClick={toggleChatbot}
        title="Your personal fashion stylist, here to help you shine!"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#fff"
          width="24px"
          height="24px"
        >
          <path d="M12 2C9.24 2 7 4.24 7 7H9C9 5.34 10.34 4 12 4C13.66 4 15 5.34 15 7C15 8.1 14.1 9 13 9H11C10.45 9 10 9.45 10 10V13H12V11H13C15.21 11 17 9.21 17 7C17 4.24 14.76 2 12 2ZM12 16C11.45 16 11 16.45 11 17V20H5C3.9 20 3 19.1 3 18C3 16.9 3.9 16 5 16H12ZM19 16H22C23.1 16 24 16.9 24 18C24 19.1 23.1 20 22 20H19V17C19 16.45 18.55 16 18 16C17.45 16 17 16.45 17 17V20H14C12.9 20 12 19.1 12 18C12 16.9 12.9 16 14 16H19Z" />
        </svg>
      </button>

      {/* Chatbot Modal */}
      {isChatbotVisible && (
        <div style={styles.chatbotContainer}>
          <div style={styles.chatbotHeader}>
            <h2 style={styles.chatbotTitle}>Zara-Your style Buddy</h2>
            
            <button style={styles.closeButton} onClick={toggleChatbot}>
              &times;
            </button>
          </div>
          <div style={styles.inputContainer}>
            <input
              style={styles.input}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about fashion..."
            />
            <button style={styles.button} onClick={sendMessage}>
              Send
            </button>
          </div>
          {response && (
            <div style={styles.responseContainer}>
              <p style={styles.response}><strong>Response:</strong> {response}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const styles = {
  // Floating button with hanger icon
  floatingButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "15px",
    backgroundColor: "#ff004f",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    fontSize: "24px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease, background-color 0.3s ease",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  // Chatbot container styling
  chatbotContainer: {
    position: "fixed",
    bottom: "80px",
    right: "20px",
    width: "350px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    padding: "15px",
    zIndex: 10000,
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
  },

  chatbotHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },

  chatbotTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    margin: "0",
  },

  closeButton: {
    background: "none",
    border: "none",
    fontSize: "20px",
    color: "#555",
    cursor: "pointer",
  },

  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    marginTop: "15px",
  },

  input: {
    flex: "1",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    transition: "border-color 0.2s ease",
  },

  button: {
    padding: "10px 15px",
    backgroundColor: "#ff004f",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  },

  responseContainer: {
    maxHeight: "200px",
    overflowY: "auto",
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    borderLeft: "4px solid #ff004f",
    fontSize: "14px",
    color: "#333",
  },

  response: {
    whiteSpace: "pre-wrap",
    margin: "0",
    lineHeight: "1.5",
  },
};


export default Chatbot;
