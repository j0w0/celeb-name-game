import React, { useEffect } from 'react'
import './Timer.css'

const Timer = ({ mode, timerRunning, timer, setTimer }) => {

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