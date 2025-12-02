import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import NextDatePage from './pages/NextDatePage';
import ReasonsPage from './pages/ReasonsPage';
import TimeTogetherPage from './pages/TimeTogetherPage';
import LoveLetterPage from './pages/LoveLetterPage';
import TicTacToePage from './pages/TicTacToePage';
import GameHubPage from './pages/GameHubPage';
import RockPaperScissorsPage from './pages/RockPaperScissorsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="page-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/next-date" element={<NextDatePage />} />
            <Route path="/reasons" element={<ReasonsPage />} />
            <Route path="/time-loving-you" element={<TimeTogetherPage />} />
            <Route path="/love-letter" element={<LoveLetterPage />} />
            <Route path="/tic-tac-toe" element={<TicTacToePage />} />
            <Route path="/games" element={<GameHubPage />} />
            <Route path="/rock-paper-scissors" element={<RockPaperScissorsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;