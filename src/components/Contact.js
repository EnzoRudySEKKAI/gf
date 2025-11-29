import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Remplacez ces IDs par les vôtres depuis EmailJS
    const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    emailjs.send(serviceID, templateID, {
      from_name: formData.name || ' Your boyfriend',
      message: formData.message,
      to_email: 'ton-email@gmail.com', // Ton adresse email
      reply_to: 'email-de-ta-copine@gmail.com' // Son email si elle veut répondre
    }, publicKey)
    .then((response) => {
      console.log('Email successfully sent!', response);
      alert('Love letter sent! 💖 I will receive it soon.');
      setFormData({ name: '', message: '' });
    })
    .catch((error) => {
      console.error('Error while sending:', error);
      alert('An error occured. But i know that you love me! 😉');
    })
    .finally(() => {
      setIsSending(false);
    });
  };

  return (
    <section id="contact" className="contact section">
      <h2 className="section-title">Send a love letter</h2>
      <div className="contact-container">
        <form onSubmit={handleSubmit} className="love-form">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your love letter here..."
            rows="6"
            required
          ></textarea>
          <button 
            type="submit" 
            className="cta-button"
            disabled={isSending}
          >
            {isSending ? 'Sending in progress... 💌' : 'Send the love letter 💌'}
          </button>
        </form>
        <div className="final-message">
            <h3>To My Wonderful Yisheng,</h3>
            <p>
                You are the most amazing person I have met. Every moments with you is amazing, 
                and I cherish every moment we spend together. Thank you for being who you are, 
                and being with me. Love U more than words can say.
            </p>
            <p className="signature">Love U<br />Enzo Rudy SEKKAI 夏立</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;