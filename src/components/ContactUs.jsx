// components/ContactUs.jsx
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactUs.css';

const ContactUs = () => {
  const form = useRef();
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_i4flnti',          // ✅ Your EmailJS Service ID
      'template_icr72em',         // ✅ Your EmailJS Template ID
      form.current,
      'uD9_u_-UHIPrX73gp'         // ✅ Your EmailJS Public Key
    )
    .then(
      (result) => {
        console.log('SUCCESS!', result.text);
        setStatus('SUCCESS');
        form.current.reset();
      },
      (error) => {
        console.error('FAILED...', error);
        setStatus('FAILED');
      }
    );
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <label>Name</label>
        <input type="text" name="name" placeholder="Your Name" required />

        <label>Email</label>
        <input type="email" name="email" placeholder="Your Email" required />

        <label>Message</label>
        <textarea name="reason" placeholder="Reason for contacting us" required />

        <button type="submit">Send</button>
      </form>

      {status === 'SUCCESS' && (
        <p className="form-message success">✅ Your message has been sent!</p>
      )}
      {status === 'FAILED' && (
        <p className="form-message error">❌ Error sending message. Try again later.</p>
      )}
    </div>
  );
};

export default ContactUs;