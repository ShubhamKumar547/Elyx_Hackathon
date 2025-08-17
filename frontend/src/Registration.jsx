import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Registration.css';

const initialFormState = {
  name: "",
  username: "",
  password: "",
  mobile: "",
  email: "",
  healthId: "",
};

const Registration = () => {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.password) newErrors.password = "Password is required";
    if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (!form.mobile.trim()) newErrors.mobile = "Mobile number is required";
    if (!/^\d{10}$/.test(form.mobile)) newErrors.mobile = "Invalid mobile number";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email format";
    if (!form.healthId.trim()) newErrors.healthId = "Health ID is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
     
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      
      setSuccessMessage("Registration successful! Redirecting...");
      setForm(initialFormState);
      
    
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        apiError: "Registration failed. Please try again."
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <header className="register-header">
          <h2 className="register-title">Create Your Account</h2>
          <p className="register-subtitle">Join our health platform today</p>
        </header>

        <form onSubmit={handleSubmit} className="register-form" noValidate>
          <div className={`register-input-group ${errors.name ? 'error' : ''}`}>
            <label htmlFor="name" className="register-label">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              className="register-input"
              required
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && <span id="name-error" className="register-error-message">{errors.name}</span>}
          </div>

          <div className={`register-input-group ${errors.username ? 'error' : ''}`}>
            <label htmlFor="username" className="register-label">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Choose a username"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              className="register-input"
              required
              aria-required="true"
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? "username-error" : undefined}
            />
            {errors.username && <span id="username-error" className="register-error-message">{errors.username}</span>}
          </div>

          <div className={`register-input-group ${errors.password ? 'error' : ''}`}>
            <label htmlFor="password" className="register-label">Password</label>
            <div className="register-password-wrapper">
              <input
                id="password"
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Create a password (min 8 characters)"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                className="register-input"
                required
                minLength="8"
                aria-required="true"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                className="register-password-toggle"
                onClick={togglePasswordVisibility}
                aria-label={passwordVisible ? "Hide password" : "Show password"}
              >
                {passwordVisible ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <span id="password-error" className="register-error-message">{errors.password}</span>}
          </div>

          <div className={`register-input-group ${errors.mobile ? 'error' : ''}`}>
            <label htmlFor="mobile" className="register-label">Mobile Number</label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={form.mobile}
              onChange={handleChange}
              autoComplete="tel"
              className="register-input"
              required
              pattern="\d{10}"
              aria-required="true"
              aria-invalid={!!errors.mobile}
              aria-describedby={errors.mobile ? "mobile-error" : undefined}
            />
            {errors.mobile && <span id="mobile-error" className="register-error-message">{errors.mobile}</span>}
          </div>

          <div className={`register-input-group ${errors.email ? 'error' : ''}`}>
            <label htmlFor="email" className="register-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              className="register-input"
              required
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && <span id="email-error" className="register-error-message">{errors.email}</span>}
          </div>

          <div className={`register-input-group ${errors.healthId ? 'error' : ''}`}>
            <label htmlFor="healthId" className="register-label">Health ID</label>
            <input
              id="healthId"
              name="healthId"
              type="text"
              placeholder="Enter your health ID"
              value={form.healthId}
              onChange={handleChange}
              className="register-input"
              required
              aria-required="true"
              aria-invalid={!!errors.healthId}
              aria-describedby={errors.healthId ? "healthId-error" : undefined}
            />
            {errors.healthId && <span id="healthId-error" className="register-error-message">{errors.healthId}</span>}
          </div>

          {errors.apiError && (
            <div className="register-api-error" role="alert">
              {errors.apiError}
            </div>
          )}

          {successMessage && (
            <div className="register-success-message" role="alert">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            className="register-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="register-spinner" aria-hidden="true"></span>
                <span>Processing...</span>
              </>
            ) : 'Register'}
          </button>
        </form>

        <div className="register-footer">
          <p className="register-login-text">
            Already have an account?{' '}
            <Link to="/login" className="register-login-link">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;