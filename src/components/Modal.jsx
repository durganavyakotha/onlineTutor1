import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ForgotPasswordModal from './ForgotPasswordModal'; // Import the new modal
import './Modal.css';

const Modal = ({ type, onClose }) => {
  const isLogin = type === 'login';
  const isSignup = type === 'signup';

  const navigate = useNavigate();
  const [showForgotModal, setShowForgotModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setServerError(''); // Reset server error message on input change
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (isSignup) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm your password';
      if (formData.password !== formData.confirmPassword) newErrors.passwordMatch = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:8080/api/auth/login', {
          email: formData.email,
          password: formData.password
        });

        localStorage.setItem('email', response.data.email);
        navigate('/dashboard');
      } else {
        await axios.post('http://localhost:8080/api/auth/signup', formData);
        alert("Signup successful!");
        onClose();
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      setServerError(errorMsg);
    }
  };

  // If forgot password modal is open, render it instead
  if (showForgotModal) {
    return <ForgotPasswordModal onClose={() => setShowForgotModal(false)} />;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

        {!isLogin && (
          <>
            <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
            {errors.firstName && <p className="error">{errors.firstName}</p>}

            <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </>
        )}

        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}

        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        {errors.password && <p className="error">{errors.password}</p>}

        {!isLogin && (
          <>
            <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            {errors.passwordMatch && <p className="error">{errors.passwordMatch}</p>}
          </>
        )}

        {serverError && <p className="error">{serverError}</p>}

        <button className="submit-btn" onClick={handleSubmit}>
          {isLogin ? 'Login' : 'Sign Up'}
        </button>

        {isLogin && (
          <p className="forgot-link" onClick={() => setShowForgotModal(true)}>
            Forgot Password?
          </p>
        )}
      </div>
    </div>
  );
};

export default Modal;
