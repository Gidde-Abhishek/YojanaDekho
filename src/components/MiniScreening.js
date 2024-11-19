import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'react-feather';
import './MiniScreening.css';

const MiniScreening = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    occupation: '',
    annualIncome: '',
    category: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const questions = [
    {
      step: 1,
      field: 'name',
      question: 'What is your name?',
      type: 'text',
      placeholder: 'Enter your full name',
      validation: (value) => {
        if (!value) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        return null;
      }
    },
    {
      step: 2,
      field: 'age',
      question: 'What is your age?',
      type: 'number',
      placeholder: 'Enter your age',
      validation: (value) => {
        if (!value) return 'Age is required';
        if (value < 18 || value > 100) return 'Age must be between 18 and 100';
        return null;
      }
    },
    {
      step: 3,
      field: 'gender',
      question: 'What is your gender?',
      type: 'select',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' }
      ],
      validation: (value) => !value ? 'Please select your gender' : null
    },
    {
      step: 4,
      field: 'occupation',
      question: 'What is your occupation?',
      type: 'select',
      options: [
        { value: 'student', label: 'Student' },
        { value: 'employed', label: 'Employed' },
        { value: 'self-employed', label: 'Self Employed' },
        { value: 'unemployed', label: 'Unemployed' },
        { value: 'retired', label: 'Retired' }
      ],
      validation: (value) => !value ? 'Please select your occupation' : null
    },
    {
      step: 5,
      field: 'annualIncome',
      question: 'What is your annual income?',
      type: 'select',
      options: [
        { value: '50000', label: 'Below ₹1,00,000' },
        { value: '200000', label: '₹1,00,000 - ₹3,00,000' },
        { value: '400000', label: '₹3,00,000 - ₹5,00,000' },
        { value: '750000', label: '₹5,00,000 - ₹10,00,000' },
        { value: '1000000', label: 'Above ₹10,00,000' }
      ],
      validation: (value) => !value ? 'Please select your income range' : null
    },
    {
      step: 6,
      field: 'category',
      question: 'What is your category?',
      type: 'select',
      options: [
        { value: 'general', label: 'General' },
        { value: 'obc', label: 'OBC' },
        { value: 'sc', label: 'SC' },
        { value: 'st', label: 'ST' },
        { value: 'ews', label: 'EWS' }
      ],
      validation: (value) => !value ? 'Please select your category' : null
    }
  ];

  const currentQuestion = questions.find(q => q.step === currentStep);

  const handleInputChange = (field, value) => {
    const newValue = field === 'annualIncome' ? String(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [field]: newValue
    }));
    setErrors(prev => ({
      ...prev,
      [field]: null
    }));
  };

  const validateStep = () => {
    const error = currentQuestion.validation(formData[currentQuestion.field]);
    if (error) {
      setErrors(prev => ({
        ...prev,
        [currentQuestion.field]: error
      }));
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < questions.length) {
        setCurrentStep(prev => prev + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = () => {
    const apiFormData = {
      "details": {
        "caste": formData.category.toUpperCase(),
        "subCaste": "",
        "education": "Upper Primary (6-8)",
        "hasAadhaarCard": false,
        "hasRationCard": false,
        "hasBankAccount": true,
        "hasPanCard": true,
        "isAadhaarLinkedToMobile": false,
        "isAadhaarLinkedToPan": false,
        "ownLand": false,
        "name": formData.name,
        "gender": capitalizeFirst(formData.gender),
        "dateOfBirth": calculateDOBFromAge(formData.age),
        "occupation": capitalizeFirst(formData.occupation),
        "annualIncome": formData.annualIncome
      }
    };

    const requestBody = JSON.stringify(apiFormData);
    
    console.log('Form submitted:', requestBody);
    navigate('/full-screening', { state: { formData: apiFormData.details } });
  };

  const calculateDOBFromAge = (age) => {
    const today = new Date();
    const birthYear = today.getFullYear() - parseInt(age);
    return `${birthYear}-07-08`;
  };

  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="mini-screening fade-in">
      <div className="screening-container">
        <div className="screening-card">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(currentStep / questions.length) * 100}%` }}
            />
          </div>
          
          <div className="question-section">
            <h2>{currentQuestion.question}</h2>
            
            <div className="input-section">
              {currentQuestion.type === 'select' ? (
                <select
                  value={formData[currentQuestion.field]}
                  onChange={(e) => handleInputChange(currentQuestion.field, e.target.value)}
                  className={errors[currentQuestion.field] ? 'error' : ''}
                >
                  <option value="">Select an option</option>
                  {currentQuestion.options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={currentQuestion.type}
                  value={formData[currentQuestion.field]}
                  onChange={(e) => handleInputChange(currentQuestion.field, e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className={errors[currentQuestion.field] ? 'error' : ''}
                />
              )}
              
              {errors[currentQuestion.field] && (
                <p className="error-message">{errors[currentQuestion.field]}</p>
              )}
            </div>
          </div>

          <div className="button-group">
            <button onClick={handleBack} className="back-button">
              <ArrowLeft size={18} />
              Back
            </button>
            <button onClick={handleNext} className="next-button">
              {currentStep === questions.length ? 'Submit' : 'Next'}
              <ArrowRight size={18} />
            </button>
          </div>
          
          <div className="step-indicator">
            Step {currentStep} of {questions.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniScreening;