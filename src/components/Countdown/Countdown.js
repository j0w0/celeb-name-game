import React from 'react'
import './Countdown.css'

const Countdown = ({ minutes, seconds }) => {
  return (
    <div className="countdown">
      <span>Game Timer: </span>
      {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  )
}

export default Countdown