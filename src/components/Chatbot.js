import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isChatbotVisible, setIsChatbotVisible] = useState(false); // To control modal visibility

  const sendMessage = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/chat", { message });
      setResponse(res.data.reply);
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
      <button style={styles.floatingButton} onClick={toggleChatbot}>
        Chat
      </button>

      {/* Chatbot Modal */}
      {isChatbotVisible && (
        <div style={styles.chatbotContainer}>
          <div style={styles.chatbotHeader}>
            <h2 style={styles.chatbotTitle}>Fashion Chatbot</h2>
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
          {response && <p style={styles.response}>Response: {response}</p>}
        </div>
      )}
    </>
  );
};

const styles = {
  // Floating button at the bottom-right corner
  floatingButton: {
    position: "fixed",
    bottom: "80px", // Keep it above the footer space
    right: "20px",
    padding: "15px 30px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    fontSize: "20px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
    zIndex: 9999, // Ensure it's on top of everything else
  },

  // Chatbot modal popup styling
  chatbotContainer: {
    position: "fixed",
    bottom: "80px", // Keep the chatbot above the footer
    right: "20px",
    width: "300px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    zIndex: 10000, // Make sure it appears above everything else
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
  },

  closeButton: {
    background: "none",
    border: "none",
    fontSize: "20px",
    color: "#333",
    cursor: "pointer",
  },

  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },

  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginRight: "10px",
  },

  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },

  response: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#eef4ff",
    borderLeft: "4px solid #007bff",
    borderRadius: "5px",
    fontSize: "16px",
    color: "#333",
  },
};

export default Chatbot;































