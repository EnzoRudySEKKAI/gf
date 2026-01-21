import React, { useState, useEffect } from 'react';
import './NextMeetingCountdown.css';

const NextMeetingCountdown = () => {
  // Set your next meeting date here (format: YYYY-MM-DDTHH:MM:SS)
  const [nextMeetingDate, setNextMeetingDate] = useState('2026-02-07T06:00:00');
  const [isEditing, setIsEditing] = useState(false);
  const [tempDate, setTempDate] = useState('');

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const calculateTimeLeft = () => {
    const meetingTime = new Date(nextMeetingDate).getTime();
    const now = new Date().getTime();
    const difference = meetingTime - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    }
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  };

  const handleDateChange = (e) => {
    setTempDate(e.target.value);
  };

  const saveDate = () => {
    if (tempDate) {
      setNextMeetingDate(tempDate);
    }
    setIsEditing(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [nextMeetingDate]);

  const meetingDate = new Date(nextMeetingDate);
  const isToday = new Date().toDateString() === meetingDate.toDateString();
  const hasPassed = new Date() > meetingDate;

  return (
    <section id="next-meeting" className="next-meeting section">
      <div className="container">
        <h2 className="section-title">Time Until We See Each Others Again</h2>

        <div className="meeting-info">
          <div className="meeting-date">
            {isEditing ? (
              <div className="date-editor">
                <input
                  type="datetime-local"
                  value={tempDate}
                  onChange={handleDateChange}
                  className="date-input"
                />
                <button onClick={saveDate} className="cta-button small">Save</button>
                <button onClick={() => setIsEditing(false)} className="cta-button secondary small">Cancel</button>
              </div>
            ) : (
              <div className="date-display">
                <p className="display-date">
                  {meetingDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="display-time">
                  at {meetingDate.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            )}
          </div>
        </div>

        {hasPassed ? (
          <div className="countdown-finished">
            <div className="celebration">🎉</div>
            <h3>The wait is over! I can't wait to see you! 💕</h3>
            <p>This countdown has ended because our special time together has arrived!</p>
          </div>
        ) : (
          <>
            <div className="countdown-container">
              <div className="countdown-item">
                <span className="countdown-number">{timeLeft.days}</span>
                <span className="countdown-label">Days</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">{timeLeft.hours}</span>
                <span className="countdown-label">Hours</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">{timeLeft.minutes}</span>
                <span className="countdown-label">Minutes</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">{timeLeft.seconds}</span>
                <span className="countdown-label">Seconds</span>
              </div>
            </div>

            <div className="countdown-messages">
              <p className="general-message">
                Every second brings me closer to seeing your beautiful smile again 💜
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default NextMeetingCountdown;