import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { CheckCircle, Home, User, FileSearch, ClipboardList, Award } from 'lucide-react';
import Welcome from './components/Welcome';
import MobileLogin from './components/MobileLogin';
import MiniScreening from './components/MiniScreening';
import FullScreening from './components/FullScreening';
import SchemeResults from './components/SchemeResults';
import './App.css';

const Navigation = () => {
  const location = useLocation();
  const steps = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/login', label: 'Login', icon: User },
    { path: '/mini-screening', label: 'Quick Check', icon: FileSearch },
    { path: '/full-screening', label: 'Full Screening', icon: ClipboardList },
    { path: '/results', label: 'Results', icon: Award }
  ];

  const currentStepIndex = steps.findIndex(step => step.pathname === location.pathname);

  return (
    <nav className="app-nav">
      <div className="nav-steps">
        {steps.map((step, index) => (
          <React.Fragment key={step.path}>
            <div className={`nav-step ${index <= currentStepIndex ? 'active' : ''}`}>
              {index === 0 ? (
                <Link to="/" className="home-link">
                  <step.icon size={16} />
                  <span>{step.label}</span>
                </Link>
              ) : (
                <>
                  <step.icon size={16} />
                  <span>{step.label}</span>
                </>
              )}
              {index < currentStepIndex && (
                <CheckCircle className="check-icon" size={16} />
              )}
            </div>
            {index < steps.length - 1 && <span className="step-divider"></span>}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>YojanaDekhо - Your Friendly Govt Scheme Finder</h1>
          <Navigation />
        </header>
        <main className="app-main fade-in">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<MobileLogin />} />
            <Route path="/mini-screening" element={<MiniScreening />} />
            <Route path="/full-screening" element={<FullScreening />} />
            <Route path="/results" element={<SchemeResults />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>&copy; 2024 YojanaDekhо. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;