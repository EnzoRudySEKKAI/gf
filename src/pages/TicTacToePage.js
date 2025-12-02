import React, { useCallback, useEffect, useState } from 'react';
import './TicTacToePage.css';
import { fetchGame, resetGame, makeMove } from '../services/ticTacToeApi';

const emptyBoard = Array(9).fill(null);

const TicTacToePage = () => {
  const [game, setGame] = useState(null);
  const [selectedSymbol, setSelectedSymbol] = useState('X');
  const [status, setStatus] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const [autoSyncError, setAutoSyncError] = useState('');

  const board = game?.board ?? emptyBoard;

  const updateFromServer = (data) => {
    setGame(data);
    setStatus('');
    setAutoSyncError('');
  };

  const loadGame = useCallback(async () => {
    setIsBusy(true);
    try {
      const remote = await fetchGame();
      updateFromServer(remote);
    } catch (err) {
      setStatus(err.message || 'Unable to reach the game right now.');
    } finally {
      setIsBusy(false);
    }
  }, []);

  useEffect(() => {
    loadGame();
  }, [loadGame]);

  useEffect(() => {
    if (!game) {
      return undefined;
    }

    const interval = setInterval(async () => {
      try {
        const latest = await fetchGame();
        setGame(latest);
        setAutoSyncError('');
      } catch (err) {
        setAutoSyncError(err.message || 'Lost sync with the server.');
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [game]);

  const handleMove = async (index) => {
    if (!game || board[index] || game.winner || game.is_draw) {
      return;
    }
    setIsBusy(true);
    try {
      const updated = await makeMove(selectedSymbol, index);
      updateFromServer(updated);
    } catch (err) {
      setStatus(err.message || 'Move rejected. Try again.');
    } finally {
      setIsBusy(false);
    }
  };

  const handleReset = async () => {
    setIsBusy(true);
    try {
      const fresh = await resetGame();
      updateFromServer(fresh);
      setStatus('Game reset. X begins!');
    } catch (err) {
      setStatus(err.message || 'Unable to reset the game.');
    } finally {
      setIsBusy(false);
    }
  };

  const gameStatus = () => {
    if (!game) return 'Loading the shared game...';
    if (game.winner) return `${game.winner} wins! 🎉`;
    if (game.is_draw) return 'It is a draw!';
    return `Next player: ${game.next_player}`;
  };

  return (
    <section className="tic-section section">
      <h2 className="section-title">Tic Tac Toe</h2>

      <div className="symbol-picker">
        <label>
          <input
            type="radio"
            name="symbol"
            value="X"
            checked={selectedSymbol === 'X'}
            onChange={(e) => setSelectedSymbol(e.target.value)}
          />
          <h2>Cross (X)</h2>
        </label>
        <label>
          <input
            type="radio"
            name="symbol"
            value="O"
            checked={selectedSymbol === 'O'}
            onChange={(e) => setSelectedSymbol(e.target.value)}
          />
          <h2>Circle (O)</h2>
        </label>
      </div>

      <div className="tic-board">
        {board.map((cell, idx) => (
          <button
            key={idx}
            className="tic-cell"
            onClick={() => handleMove(idx)}
            disabled={!game || !!cell || game.winner || game.is_draw || isBusy}
          >
            {cell ?? ''}
          </button>
        ))}
      </div>

      <h1 className="tic-status">{gameStatus()}</h1>
      {status && <p className="tic-message">{status}</p>}
      {autoSyncError && <p className="tic-message warning">{autoSyncError}</p>}

      <div className="tic-controls">
        <button className="cta-button secondary" onClick={handleReset} disabled={isBusy}>
          Reset Game
        </button>
        <button className="cta-button" onClick={loadGame} disabled={isBusy}>
          Refresh Now
        </button>
      </div>
    </section>
  );
};

export default TicTacToePage;

