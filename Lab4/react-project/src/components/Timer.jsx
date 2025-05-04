// src/components/Timer.jsx
import { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [motivationMessage, setMotivationMessage] = useState('');
  const [nextMotivationTime, setNextMotivationTime] = useState(300);

  const motivationMessages = [
    "Ти можеш більше, ніж думаєш!",
    "Кожна хвилина наближає тебе до мети!",
    "Не зупиняйся на досягнутому!",
    "Сьогоднішні зусилля - завтрашній результат!",
    "Ти робиш велику роботу! Продовжуй!"
  ];

  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          const newSeconds = prevSeconds + 1;
          
          // Перевіряємо, чи настав час для мотивації
          if (newSeconds >= nextMotivationTime) {
            showRandomMotivation();
            setNextMotivationTime(prev => prev + 300);
          }
          
          return newSeconds;
        });
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, nextMotivationTime]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');
  };

  const showRandomMotivation = () => {
    const randomIndex = Math.floor(Math.random() * motivationMessages.length);
    setMotivationMessage(motivationMessages[randomIndex]);
    
    setTimeout(() => {
      setMotivationMessage('');
    }, 5000);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
    setNextMotivationTime(300);
  };

  return (
    <div className={`floating-timer-container ${isExpanded ? 'timer-expanded' : ''}`}>
      <div 
        className="floating-timer" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        ⏱️
      </div>
      
      <div className="timer-display">{formatTime(seconds)}</div>
      
      <div className="timer-controls">
        <button 
          className="timer-btn" 
          onClick={toggleTimer}
        >
          {isActive ? '⏸️' : '▶️'}
        </button>
        <button 
          className="timer-btn" 
          onClick={resetTimer}
        >
          ⏹️
        </button>
      </div>
      
      {motivationMessage && (
        <div className="motivation-message">
          {motivationMessage}
        </div>
      )}
    </div>
  );
};

export default Timer;