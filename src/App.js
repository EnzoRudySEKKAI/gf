import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
//import Memories from './components/Memories';
import Reasons from './components/Reasons';
import Countdown from './components/Countdown';
import NextMeetingCountdown from './components/NextMeetingCountdown';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Reasons />
      <NextMeetingCountdown />
      <Countdown />
      <Contact />
    </div>
  );
}

export default App;