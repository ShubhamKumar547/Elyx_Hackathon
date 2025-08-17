import React, { useState, useEffect } from 'react';
import MedicineImage from './assets/Medicine-cuate.png';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  // const { login, currentUser } = useAuth(); // Removed: Using auth context for better state management

  // Redirect if already logged in
  // useEffect(() => {
  //   if (currentUser) {
  //     navigate('/dashboard');
  //   }
  // }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-container">
      <div className="login-image-section">
        <div className="login-image-content">
          <img 
            src={MedicineImage} 
            alt="elyx Medicine AI" 
            className="login-image" 
            loading="lazy"
          />
          <h1 className="elyx-header">elyx- Nural Nomads</h1>
          <blockquote className="elyx-quote">
            "Empowering your health journey with intelligence and care."
          </blockquote>
        </div>
      </div>
      
      <div className="login-card">
        <header className="login-header">
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Sign in to your health dashboard</p>
        </header>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="input-group">
            <label htmlFor="username">Username or Email</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username or email"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              required
              aria-required="true"
            />
          </div>

          <div className="input-group password-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                aria-required="true"
                minLength="6"
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={togglePasswordVisibility}
                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
              >
                {passwordVisible ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {/* Forgot password link removed */}
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading || !formData.username || !formData.password}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}
        </form>

  {/* Register link and footer removed */}
      </div>
    </div>
  );
}

export default Login;