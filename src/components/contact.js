import React, { useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email ends with @gmail.com
    if (!formData.email.endsWith('@gmail.com')) {
      alert('Please enter a Gmail address.');
      return;
    }

    try {
      await axios.post('https://script.google.com/macros/s/AKfycbxIwrDasRo_BPzgC_bNmtKFu4psjyID070-bPfIpUBJuXNQKMoPrBuxuR1MKkjKKsc/exec', formData);
      setSubmitted(true);
      alert('Your message has been sent successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your message. Please try again.');
    }
  };

  return (
    <div>
      <h2>Contact Us</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>Thank you for contacting us!</p>
      )}
    </div>
  );
};

export default ContactUs;
