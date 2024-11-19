import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Shield, Zap, Users } from 'lucide-react';
import './Welcome.css';

const Welcome = () => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    setAnimationClass('fade-in');
  }, []);

  return (
    <div className={`welcome ${animationClass}`}>
      <main>
        <section className="hero">
          <h1>Discover Your Perfect Government Schemes</h1>
          <p>YojanaDekhо uses advanced AI to match you with the right government programs, maximizing your benefits and opportunities.</p>
          <Link to="/login" className="cta-button">
            Start Your Journey <ArrowRight size={20} />
          </Link>
        </section>

        <section id="features" className="features">
          <h2>Why Choose YojanaDekhо?</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <Search size={24} />
              <h3>Smart Matching</h3>
              <p>AI-powered profile analysis for relevant schemes</p>
            </div>
            <div className="feature-card">
              <Shield size={24} />
              <h3>Secure &amp; Private</h3>
              <p>State-of-the-art data protection measures</p>
            </div>
            <div className="feature-card">
              <Zap size={24} />
              <h3>Real-time Updates</h3>
              <p>Instant notifications on new schemes and deadlines</p>
            </div>
            <div className="feature-card">
              <Users size={24} />
              <h3>Community Support</h3>
              <p>Connect and share experiences with peers</p>
            </div>
          </div>
        </section>

        <section id="about" className="about">
          <h2>About YojanaDekhо</h2>
          <p>YojanaDekhо bridges the gap between citizens and government schemes, simplifying the process of finding and applying for life-improving programs.</p>
          <p className="credit">Powered by intelligent algorithms and engineered by Abhishek Gidde.</p>
        </section>
      </main>
    </div>
  );
};

export default Welcome;