import React, { useCallback, useEffect, useState } from 'react';
import './RockPaperScissorsPage.css';
import { fetchRpsGame, resetRpsGame, submitRpsChoice } from '../services/ticTacToeApi';

const choices = ['rock', 'paper', 'scissors'];

const RockPaperScissorsPage = () => {
  const [game, setGame] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState('player1');
  const [selectedChoice, setSelectedChoice] = useState('rock');
  const [status, setStatus] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const [autoSyncError, setAutoSyncError] = useState('');

  const updateFromServer = (data) => {
    setGame(data);
    setStatus('');
    setAutoSyncError('');
  };

  const loadGame = useCallback(async () => {
    setIsBusy(true);
    try {
      const data = await fetchRpsGame();
      updateFromServer(data);
    } catch (err) {
      setStatus(err.message || 'Unable to reach the server.');
    } finally {
      setIsBusy(false);
    }
  }, []);

  useEffect(() => {
    loadGame();
  }, [loadGame]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const latest = await fetchRpsGame();
        setGame(latest);
        setAutoSyncError('');
      } catch (err) {
        setAutoSyncError(err.message || 'Lost sync with the server.');
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {
    if (!selectedChoice) return;
    setIsBusy(true);
    try {
      const updated = await submitRpsChoice(selectedPlayer, selectedChoice);
      updateFromServer(updated);
      if (updated.winner || updated.is_draw) {
        setStatus('Round finished! Reset to play again.');
      } else {
        setStatus('Choice locked in.');
      }
    } catch (err) {
      setStatus(err.message || 'Unable to submit choice.');
    } finally {
      setIsBusy(false);
    }
  };

  const handleReset = async () => {
    setIsBusy(true);
    try {
      const fresh = await resetRpsGame();
      updateFromServer(fresh);
      setStatus('Round reset. Choose again!');
    } catch (err) {
      setStatus(err.message || 'Unable to reset the round.');
    } finally {
      setIsBusy(false);
    }
  };

  const renderChoiceStatus = (player) => {
    if (!game) return 'Waiting...';
    const choice = game.choices?.[player];
    if (!choice) return 'No choice yet';

    return 'Choice made ✅';
  };

  const resultMessage = () => {
    if (!game) return 'Loading shared round...';
    if (game.is_draw) return 'Draw! Both players picked the same.';
    if (game.winner === 'player1') return 'Player 1 wins this round! 🎉';
    if (game.winner === 'player2') return 'Player 2 wins this round! 🎉';
    return 'Awaiting both players.';
  };

  return (
    <section className="rps-section section">
      <h2 className="section-title">Rock Paper Scissors</h2>

      <div className="rps-controls">
        <div className="role-picker">
          <label>
            <input
              type="radio"
              name="player"
              value="player1"
              checked={selectedPlayer === 'player1'}
              onChange={(e) => setSelectedPlayer(e.target.value)}
            />
            Player 1
          </label>
          <label>
            <input
              type="radio"
              name="player"
              value="player2"
              checked={selectedPlayer === 'player2'}
              onChange={(e) => setSelectedPlayer(e.target.value)}
            />
            Player 2
          </label>
        </div>

        <div className="choice-picker">
          <div className="choice-buttons">
            {choices.map((choice) => (
              <button
                key={choice}
                className={`choice-button ${selectedChoice === choice ? 'active' : ''}`}
                onClick={() => setSelectedChoice(choice)}
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rps-status-card">
        <div>
          <h4>Player 1</h4>
          <p>{renderChoiceStatus('player1')}</p>
        </div>
        <div>
          <h4>Player 2</h4>
          <p>{renderChoiceStatus('player2')}</p>
        </div>
      </div>

      <p className="rps-result">{resultMessage()}</p>
      {status && <p className="tic-message">{status}</p>}
      {autoSyncError && <p className="tic-message warning">{autoSyncError}</p>}

      <div className="rps-actions">
        <button className="cta-button" onClick={handleSubmit} disabled={isBusy}>
          Lock In Choice
        </button>
        <button className="cta-button secondary" onClick={handleReset} disabled={isBusy}>
          Reset Round
        </button>
        <button className="cta-button ghost" onClick={loadGame} disabled={isBusy}>
          Refresh
        </button>
      </div>
    </section>
  );
};

export default RockPaperScissorsPage;

