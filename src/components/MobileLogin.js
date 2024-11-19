import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ArrowRight, AlertCircle } from 'lucide-react';
import './MobileLogin.css';

const MobileLogin = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setIsValid(mobileNumber.length === 10 && /^\d+$/.test(mobileNumber));
  }, [mobileNumber]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      navigate('/mini-screening');
    } else {
      setError('Please enter a valid 10-digit mobile number');
    }
  };

  return (
    <div className="mobile-login-container fade-in">
      <div className="mobile-login-wrapper">
        <div className="mobile-login-card">
          <div className="mobile-brand-header">
            <div className="mobile-logo">YD</div>
            <h2>Welcome to <span className="highlight">YojanaDekhо</span></h2>
          </div>
          
          <p className="mobile-login-subtitle">Enter your mobile number to get started</p>
          
          <form onSubmit={handleSubmit}>
            <div className="mobile-input-group">
              <Phone className="mobile-input-icon" size={20} />
              <div className="mobile-country-code-wrapper">
                <span className="mobile-country-code">+91</span>
                <span className="mobile-divider"></span>
              </div>
              <input
                className="mobile-login-input"
                type="tel"
                value={mobileNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setMobileNumber(value);
                  setError('');
                }}
                placeholder="Enter 10-digit mobile number"
                maxLength="10"
                disabled={isLoading}
              />
            </div>
            
            {error && (
              <div className="mobile-error-container">
                <AlertCircle className="mobile-error-icon" size={16} />
                <p className="mobile-error-message">{error}</p>
              </div>
            )}
            
            <button 
              type="submit" 
              className={`mobile-login-button ${isValid ? 'valid' : ''} ${isLoading ? 'loading' : ''}`}
              disabled={!isValid || isLoading}
            >
              <span>{isLoading ? 'Please wait...' : 'Continue Securely'}</span>
              {!isLoading && <ArrowRight className="button-icon" size={18} />}
            </button>
          </form>
          
          <div className="mobile-info-section">
            <p className="mobile-info-text">
              <span className="info-icon">🔒</span>
              We'll send you a one-time password for verification
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileLogin;