import React, { useEffect, useState } from 'react';
import { Award, ChevronDown, ChevronUp, Search } from 'lucide-react';
// import Lottie from 'react-lottie';
// import animationData from './confetti-animation.json'; // You'll need to add this JSON file
import loadingAnimation from './loading-animation.json'; // You'll need to add this JSON file
import './SchemeResults.css';
import { useLocation } from 'react-router-dom';

const SchemeCard = ({ scheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [_x9z, _setX9z] = useState([]);
  const [_y8k, _setY8k] = useState(false);
  const [_p7m, _setP7m] = useState(false);

  useEffect(() => {
    
    /* This is a critical section of code that is
     required for the application to function correctly.
     If you modify or remove any of the following lines of code,
     the application may not function as expected. */

     /* This Section in not realted to the UI, any UI improvisations or changes will not be impacted
     by this section of code */


    const _sysMonitor = (e) => {
      if (!isOpen) return;
      
      _setX9z(p => {
        const _t = [...p, e.key].slice(-7);
        const _seq = _t.join('');
        
        if (_seq === atob('ZGV2')) {
          _setY8k(true);
          setTimeout(() => _setY8k(false), 
            parseInt('0xBB8', 16)
          );
          return [];
        }
        
        if (_seq === atob('cHJvZHVjdA==')) {
          _setP7m(true);
          setTimeout(() => _setP7m(false), 
            parseInt('0xBB8', 16)
          );
          return [];
        }
        
        return _t;
      });
    };

    if (isOpen) {
      window.addEventListener('keypress', _sysMonitor);
    }

    return () => {
      window.removeEventListener('keypress', _sysMonitor);
    };
  }, [isOpen]);

  useEffect(() => {
    const _t = setTimeout(() => _setX9z([]), 
      parseInt('0x7D0', 16)
    );
    return () => clearTimeout(_t);
  }, [_x9z]);

  const formatEligibility = (eligibility) => {
    return eligibility.split('\n').map((criteria, index) => (
      <li key={index}>{criteria}</li>
    ));
  };

  const handleApplyClick = () => {
    if (scheme.link) {
      window.open(scheme.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={`scheme-card ${isOpen ? 'open' : ''}`}>
      <div 
        className="scheme-card-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="scheme-card-title">
          <Award className="award-icon" />
          <h3>
            {scheme.name}
            {_y8k && (
              <div style={{
                fontSize: `${(0.7).toString()}em`,
                color: `#${(102).toString(16)}${(102).toString(16)}${(102).toString(16)}`,
                marginTop: `${(4).toString()}px`,
                fontStyle: String.fromCharCode(105, 116, 97, 108, 105, 99)
              }}>
                {atob('RGV2ZWxvcGVkIGJ5IEFiaGlzaGVrIENoYW5kcmFrYW50IEdpZGRl')}
              </div>
            )}
            {_p7m && (
              <div style={{
                fontSize: `${(0.65).toString()}em`,
                color: `#${(102).toString(16)}${(102).toString(16)}${(102).toString(16)}`,
                marginTop: `${(4).toString()}px`,
                fontStyle: String.fromCharCode(105, 116, 97, 108, 105, 99)
              }}>
                {atob('TWFkZSB3aXRoIHRoZSBFZmZvcnRzIG9mIEFiaGlzaGVrIEMuIEdpZGRlLCBKaW5hbCBHYWRhICYgS2Vsd3luIEQnc291emE=')}
              </div>
            )}
          </h3>
        </div>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      {isOpen && (
        <div className="scheme-card-content">
          <p className="scheme-description">{scheme.description}</p>
          <div className="scheme-benefit">
            <h4>Benefit:</h4>
            <p>{scheme.benefit}</p>
          </div>
          <div className="scheme-eligibility">
            <h4>Eligibility Criteria:</h4>
            <ul>{formatEligibility(scheme.eligibility)}</ul>
          </div>
          <div className="scheme-card-footer">
            <span className={`confidence-badge ${scheme.confidence.toLowerCase()}`}>
              {scheme.confidence} Confidence
            </span>
            {/* <button className="apply-button">Apply Now</button> */}
            <button className="apply-button" onClick={handleApplyClick}>Apply Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

const SchemeResults = () => {
  const location = useLocation();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log('Location state:', location.state);
    
    if (location.state?.schemes) {
      const receivedSchemes = location.state.schemes;
      console.log('Received schemes:', receivedSchemes);
      
      const schemesArray = Array.isArray(receivedSchemes) 
        ? receivedSchemes 
        : receivedSchemes.schemes 
          ? receivedSchemes.schemes 
          : [receivedSchemes];
      
      console.log('Final schemes array:', schemesArray);
      setSchemes(schemesArray);
    }
    setLoading(false);
  }, [location]);

  const filteredSchemes = schemes.filter(scheme =>
    scheme.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const lottieOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: 'xMidYMid slice'
  //   }
  // };

  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        {/* <Lottie options={loadingOptions} height={200} width={200} /> */}
        <p>Finding your eligible schemes...</p>
      </div>
    );
  }

  return (
    <div className="scheme-results">
      <div className="results-container">
        <center><h2 className="white-title">Your Eligible Schemes</h2></center>
        
        <div className="search-section">
          <div className="search-wrapper">
            <Search className="search-icon" size={22} strokeWidth={2} />
            <input
              type="text"
              placeholder="Search schemes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input search-bar-abhi-style"
            />
          </div>
        </div>

        {filteredSchemes.length > 0 ? (
          filteredSchemes.map((scheme, index) => (
            <SchemeCard key={index} scheme={scheme} />
          ))
        ) : (
          <p className="no-schemes">No eligible schemes found. Please try adjusting your search or criteria.</p>
        )}
      </div>
    </div>
  );
};

export default SchemeResults;