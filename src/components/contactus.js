import React, { useState } from 'react';
import '../styles/contact.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    Message: '',
  });
  const [msg, setMsg] = useState('');

  const scriptURL = 'https://script.google.com/macros/s/AKfycbyIS2aMhtSy-nVF9YT7RL7OM-m1J7h-nwoSsr6xSlFGbaYBJrp95Vv2ev4C08WAyDcp9Q/exec';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(scriptURL, {
      method: 'POST',
      body: new FormData(e.target),
    })
      .then((response) => {
        setMsg('Message sent successfully');
        setFormData({ Name: '', email: '', Message: '' }); // Reset the form
        setTimeout(() => {
          setMsg('');
        }, 5000);
      })
      .catch((error) => {
        console.error('Error!', error.message);
        setMsg('Error sending message. Please try again.');
      });
  };

  return (
    <div className="contact-page">
    <div className="contact-right">
      <h2>Contact Us</h2>
      <p>We'll get back to you soon!</p>
      <form name="submit-to-google-sheet" onSubmit={handleSubmit}>
        <input
          type="text"
          name="Name"
          placeholder="Your Name"
          required
          value={formData.Name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
          title="Please enter a valid Gmail address ending with @gmail.com"
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          name="Message"
          rows="6"
          placeholder="Your Message"
          value={formData.Message}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn2">Submit</button>
      </form>
      <span id="msg">{msg}</span>
    </div>
    </div>
  );
};

export default ContactForm;
