import React, { useEffect, useContext } from 'react'
import { GameContext } from '../../context/GameContext';
import './Timer.css'

const Timer = () => {
  const { mode, timer, setTimer, timerRunning } = useContext(GameContext);

  useEffect(() => {
    if(mode === "timed") {
      let interval;
      if (timerRunning) {
        interval = setInterval(() => {
          setTimer((prevTime) => prevTime + 10);
        }, 10);
      } else if (!timerRunning) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }
  }, [mode, timerRunning, setTimer]);

  return (
    <div className="timer">
      <span>This Round: </span>
      {("0" + Math.floor((timer / 60000) % 60)).slice(-2)}:
      {("0" + Math.floor((timer / 1000) % 60)).slice(-2)}:
      {("0" + ((timer / 10) % 100)).slice(-2)}
    </div>
  )
}

export default Timer