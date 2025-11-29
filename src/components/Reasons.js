import React from 'react';
import './Reasons.css';

const Reasons = () => {
  const reasons = [
    "Your beautiful smile that lights up my world",
    "Your kindness and compassion for others",
    "Your intelligence and the way you see the world",
    "The comfort I feel when I'm with you",
    "Your strength and resilience inspire me",
    "The little things you do that show you care",
    "Your passion and enthusiasm for life",
    "Simply because you're you",
    "Your voice that comforts me instantly",
    "Your incredible sense of humor",
    "The way you care about the people you love",
    "Your beautiful heart and soul",
    "Your beauty and your cuteness",
    "So many reasons, but here are just a few..."

  ];

  return (
    <section id="reasons" className="reasons section">
      <h2 className="section-title">Why I Love You</h2>
      <div className="reasons-container">
        {reasons.map((reason, index) => (
          <div key={index} className="reason-card">
            <span className="heart-icon">💜</span>
            <p>{reason}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reasons;