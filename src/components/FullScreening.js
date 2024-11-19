import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import './FullScreening.css';

const FullScreening = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const miniScreeningData = location.state?.formData?.details || {};

  const [formData, setFormData] = useState({
    name: miniScreeningData.name || '',
    gender: miniScreeningData.gender || '',
    dateOfBirth: miniScreeningData.dateOfBirth || '',
    occupation: miniScreeningData.occupation || '',
    annualIncome: miniScreeningData.annualIncome || '',
    caste: miniScreeningData.caste || '',
    subCaste: '',
    education: '',
    hasAadhaarCard: '',
    hasRationCard: '',
    hasBankAccount: '',
    hasPanCard: '',
    isAadhaarLinkedToMobile: '',
    isAadhaarLinkedToPan: '',
    ownLand: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const apiData = {
      details: {
        name: formData.name,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        occupation: formData.occupation,
        annualIncome: formData.annualIncome,
        caste: formData.caste,
        subCaste: formData.subCaste,
        education: formData.education,
        hasAadhaarCard: formData.hasAadhaarCard === 'true',
        hasRationCard: formData.hasRationCard === 'true',
        hasBankAccount: formData.hasBankAccount === 'true',
        hasPanCard: formData.hasPanCard === 'true',
        isAadhaarLinkedToMobile: formData.isAadhaarLinkedToMobile === 'true',
        isAadhaarLinkedToPan: formData.isAadhaarLinkedToPan === 'true',
        ownLand: formData.ownLand === 'true'
      }
    };

    try {
      const response = await fetch('https://api-schemefinder.arthnirmiti.com/eligibility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          'Origin': 'https://api-schemefinder.arthnirmiti.com',
          'Connection': 'keep-alive',
          'Referer': 'https://api-schemefinder.arthnirmiti.com', // 
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-site'
        },
        body: JSON.stringify(apiData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      navigate('/results', { 
        state: { schemes: data } 
      });
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch eligible schemes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fs-container">
      <div className="fs-header">
        <button className="fs-back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          Back
        </button>
        <h1>Additional Details</h1>
      </div>

      <div className="fs-content">
        <form onSubmit={handleSubmit} className="fs-form">
          <div className="fs-form-section">
            <h2>Education Details</h2>
            <div className="fs-form-group">
              <label>Education Level</label>
              <select
                value={formData.education}
                onChange={(e) => handleInputChange('education', e.target.value)}
                required
              >
                <option value="">Select Education Level</option>
                <option value="Illiterate">Illiterate</option>
                <option value="Primary (1-5)">Primary (1-5)</option>
                <option value="Upper Primary (6-8)">Upper Primary (6-8)</option>
                <option value="Secondary (9-10)">Secondary (9-10)</option>
                <option value="Higher Secondary (11-12)">Higher Secondary (11-12)</option>
                <option value="Graduate">Graduate</option>
                <option value="Post Graduate">Post Graduate</option>
              </select>
            </div>
          </div>

          <div className="fs-form-section">
            <h2>Document Information</h2>
            <div className="fs-form-grid">
              <div className="fs-form-group">
                <label>Aadhaar Card</label>
                <select
                  value={formData.hasAadhaarCard}
                  onChange={(e) => handleInputChange('hasAadhaarCard', e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="fs-form-group">
                <label>Ration Card</label>
                <select
                  value={formData.hasRationCard}
                  onChange={(e) => handleInputChange('hasRationCard', e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="fs-form-group">
                <label>Bank Account</label>
                <select
                  value={formData.hasBankAccount}
                  onChange={(e) => handleInputChange('hasBankAccount', e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="fs-form-group">
                <label>PAN Card</label>
                <select
                  value={formData.hasPanCard}
                  onChange={(e) => handleInputChange('hasPanCard', e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
          </div>

          <div className="fs-form-section">
            <h2>Additional Information</h2>
            <div className="fs-form-grid">
              <div className="fs-form-group">
                <label>Aadhaar-Mobile Linked</label>
                <select
                  value={formData.isAadhaarLinkedToMobile}
                  onChange={(e) => handleInputChange('isAadhaarLinkedToMobile', e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="fs-form-group">
                <label>Aadhaar-PAN Linked</label>
                <select
                  value={formData.isAadhaarLinkedToPan}
                  onChange={(e) => handleInputChange('isAadhaarLinkedToPan', e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="fs-form-group">
                <label>Own Land</label>
                <select
                  value={formData.ownLand}
                  onChange={(e) => handleInputChange('ownLand', e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="fs-form-group">
                <label>Sub Caste</label>
                <input
                  type="text"
                  value={formData.subCaste}
                  onChange={(e) => handleInputChange('subCaste', e.target.value)}
                  placeholder="Enter sub caste (optional)"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="fs-error-message">
              {error}
            </div>
          )}

          <div className="fs-form-actions">
            <button 
              type="submit" 
              className="fs-submit-button"
              disabled={isLoading}
            >
              {isLoading ? 'Finding Schemes...' : 'Find Eligible Schemes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FullScreening;