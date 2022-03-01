import React from 'react'
import './Start.css'
import logo from '../../images/logo-name-game.svg'
import Button from '../../components/Button/Button'

const Start = ({ handleStartGameClick }) => {
  return (
    <div className="start">
      <img src={logo} className="start__logo" alt="Name Game" />
      <p className="start__intro">Try matching the WillowTree employee to their photo.</p>
      <Button text="Practice Mode" onClick={() => handleStartGameClick("practice")} />
      <Button text="Timed Mode" onClick={() => handleStartGameClick("timed")} />
    </div>
  )
}

export default Start