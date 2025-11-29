import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero section">
      <div className="hero-content">
        <h1 className="hero-title">
          To My Beautiful <span className="highlight">Girlfriend</span>
        </h1>
        <p className="hero-subtitle">
          If I can't tell you I love you, I'll show you by holding your hand.
          My love for you is not just in my words, but in my promise to hold your hand when I have no words left.
        </p>
        <div className="hero-buttons">
          <a href="#reasons" className="cta-button">Why I Love You</a>
        </div>
      </div>
      <div className="floating-hearts">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="heart">❤</div>
        ))}
      </div>
    </section>
  );
};

export default Hero;