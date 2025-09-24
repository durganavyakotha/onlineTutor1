// components/ForgotPasswordModal.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPasswordModal.css';

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [serverError, setServerError] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/forgot-password', { email });
      alert(response.data.message); // e.g., "Reset link sent"
      onClose();
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      setServerError(errorMsg);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {serverError && <p className="error">{serverError}</p>}

        <button onClick={handleSubmit} className="submit-btn">Send Reset Link</button>
        <button onClick={onClose} className="back-btn">Back to Login</button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
