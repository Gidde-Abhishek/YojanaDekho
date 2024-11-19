import React, { useState, useEffect } from 'react';
import './SchemeList.css';

const SchemeCard = ({ scheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [secretSequence, setSecretSequence] = useState([]);
  const [showCredit, setShowCredit] = useState(false);

  // Secret sequence handler
  const handleKeyPress = (e) => {
    if (!isOpen) return; // Only work when card is open
    console.log('Key pressed:', e.key); // Debug log
    
    const newSequence = [...secretSequence, e.key].slice(-3);
    setSecretSequence(newSequence);
    
    // Check if sequence matches 'dev'
    if (newSequence.join('') === 'dev') {
      setShowCredit(true);
      setTimeout(() => setShowCredit(false), 3000);
      setSecretSequence([]); // Reset sequence after success
    }
  };

  // Reset sequence after inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      setSecretSequence([]);
    }, 2000);

    return () => clearTimeout(timer);
  }, [secretSequence]);

  // Add event listener for key presses
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keypress', handleKeyPress);
      return () => window.removeEventListener('keypress', handleKeyPress);
    }
  }, [isOpen, secretSequence]);

  return (
    <div className={`scheme-card ${isOpen ? 'open' : ''}`}>
      <h3 className="scheme-title">
        {scheme.name}
        {showCredit && (
          <div className="developer-credit" style={{
            fontSize: '0.6em',
            opacity: 0.7,
            marginTop: '5px',
            fontStyle: 'italic'
          }}>
            Developed by Abhishek Chandrakant Gidde
          </div>
        )}
      </h3>
      <button className="know-more-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close' : 'Know More'}
      </button>
      {isOpen && (
        <div className="scheme-details">
          <p><strong>Description:</strong> {scheme.description}</p>
          <p><strong>Benefit:</strong> {scheme.benefit}</p>
          <p><strong>Eligibility:</strong> {scheme.eligibility}</p>
          <a href="#" className="apply-button">Apply</a>
        </div>
      )}
    </div>
  );
};

const SchemeList = ({ schemes }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const schemesPerPage = 5;

  const indexOfLastScheme = currentPage * schemesPerPage;
  const indexOfFirstScheme = indexOfLastScheme - schemesPerPage;
  const currentSchemes = schemes.slice(indexOfFirstScheme, indexOfLastScheme);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="scheme-list">
      <h2>Available Schemes</h2>
      {currentSchemes.map((scheme, index) => (
        <SchemeCard key={index} scheme={scheme} />
      ))}
      <div className="pagination">
        {Array.from({ length: Math.ceil(schemes.length / schemesPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SchemeList;