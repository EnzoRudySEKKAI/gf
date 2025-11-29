import React from 'react';
import './OurStory.css';

const OurStory = () => {
  return (
    <section id="story" className="our-story section">
      <h2 className="section-title">Our Love Story</h2>
      <div className="story-timeline">
        <div className="timeline-item">
          <div className="timeline-content">
            <h3>When We First Met</h3>
            <p>That amazing day when our eyes met and my world changed forever...</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-content">
            <h3>First Date</h3>
            <p>I was so nervous but you made everything feel perfect and natural.</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-content">
            <h3>When I Knew</h3>
            <p>That moment I realized you were the one I wanted to spend my life with.</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-content">
            <h3>Today</h3>
            <p>Every day with you is better than the last, and I fall more in love with you.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;