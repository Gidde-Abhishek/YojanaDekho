import React, { useState } from 'react';
import './UserForm.css';

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    caste:'',
    occupation: '',
    annualIncome: '',
    age: '',
    hasPanCard: false,
    hasBankAccount: false,
    hasAadhaarCard: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="gender">Gender:</label>
        <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="caste">Caste:</label>
        <select id="caste" name="caste" value={formData.caste}  onChange={handleChange} required>
        <option value="">Select Caste</option>
          <option value="open">Open / General - No Special Reservation</option>
          <option value="sc">SC</option>
          <option value="st">ST</option>
          <option value="obc">OBC</option>
          <option value="vjnt">VJNT</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="occupation">Occupation:</label>
        <input type="text" id="occupation" name="occupation" value={formData.occupation} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="annualIncome">Annual Income (₹):</label>
        <input type="number" id="annualIncome" name="annualIncome" value={formData.annualIncome} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
      </div>
     
      {/* <div className="form-group checkbox">
        <input type="checkbox" id="hasPanCard" name="hasPanCard" checked={formData.hasPanCard} onChange={handleChange} />
        <label htmlFor="hasPanCard">Do you have a PAN card?</label>
      </div> */}
      <div className="form-group checkbox">
        <input type="checkbox" id="hasBankAccount" name="hasBankAccount" checked={formData.hasBankAccount} onChange={handleChange} />
        <label htmlFor="hasBankAccount">Do you have a bank account?</label>
      </div>
      <div className="form-group checkbox">
        <input type="checkbox" id="hasAadhaarCard" name="hasAadhaarCard" checked={formData.hasAadhaarCard} onChange={handleChange} />
        <label htmlFor="hasAadhaarCard">Do you have an Aadhaar card?</label>
      </div>
      <button type="submit" className="submit-button">Find Schemes</button>
    </form>
  );
};

export default UserForm;