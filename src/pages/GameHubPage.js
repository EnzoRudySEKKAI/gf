import React from 'react';
import { Link } from 'react-router-dom';
import './GameHubPage.css';

const games = [
  {
    id: 'tic-tac-toe',
    title: 'Tic Tac Toe',
    description: 'Take turns picking Cross or Circle and play together on a shared board.',
    to: '/tic-tac-toe',
  },
  {
    id: 'rock-paper-scissors',
    title: 'Rock Paper Scissors',
    description: 'Lock in rock, paper, or scissors as Player 1 or Player 2 to see who wins.',
    to: '/rock-paper-scissors',
  },
];

const GameHubPage = () => (
  <section className="games-section section">
    <h2 className="section-title">Games We Can Play</h2>
    <p className="games-subtitle">
      Choose a game below. Each one is online-ready so we can play together from anywhere.
    </p>
    <div className="games-grid">
      {games.map((game) => (
        <Link key={game.id} to={game.to} className="game-card">
          <h3>{game.title}</h3>
          <p>{game.description}</p>
          <span className="cta-link">Play now →</span>
        </Link>
      ))}
    </div>
  </section>
);

export default GameHubPage;


