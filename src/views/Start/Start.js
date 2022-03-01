import React from 'react'
import './Start.css'
import logo from '../../images/logo-name-game.svg'
import Button from '../../components/Button/Button'

const Start = ({ handleStartGameClick }) => {
  return (
    <div className="start">
      <img src={logo} className="start__logo" alt="Name Game" />
      <p className="start__intro">Try matching the WillowTree employee to their photo.</p>
      <Button onClick={() => handleStartGameClick("practice")}>
        Practice Mode
      </Button>
      <Button onClick={() => handleStartGameClick("timed")}>
        Timed Mode
      </Button>
    </div>
  )
}

export default Start