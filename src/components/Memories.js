import React from 'react';
import './Memories.css';

const Memories = () => {
  // Replace these with actual photos of you two
  const memories = [
    {
      id: 1,
      title: "Our First Vacation",
      description: "That amazing trip we took together"
    },
    {
      id: 2,
      title: "Date Nights",
      description: "All those wonderful evenings together"
    },
    {
      id: 3,
      title: "Special Moments",
      description: "Little moments that mean everything"
    },
    {
      id: 4,
      title: "Adventures",
      description: "Exploring the world together"
    }
  ];

  return (
    <section id="memories" className="memories section">
      <h2 className="section-title">Our Beautiful Memories</h2>
      <div className="memories-grid">
        {memories.map(memory => (
          <div key={memory.id} className="memory-card">
            <div className="memory-image">
              {/* Replace with actual image */}
              <div className="placeholder-image">
                📸 Photo of Us
              </div>
            </div>
            <div className="memory-content">
              <h3>{memory.title}</h3>
              <p>{memory.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Memories;