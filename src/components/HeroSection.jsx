import React from 'react';
import './HeroSection.css'; // Make sure to import CSS

const HeroSection = ({ onGetStarted }) => {
  return (
    <div className="hero-section">
      <div className="hero-text">
        <h1>Learn from the Best Tutors Online</h1>
        <button className="get-started" onClick={onGetStarted}>Get Started</button>
      </div>
    </div>
  );
};

export default HeroSection;
