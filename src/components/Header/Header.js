import React from 'react'
import './Header.css'
import logo from '../../images/logo-header.svg'
import leftCaret from '../../images/icon-left-caret.svg'

const Header = ({ playing, handleReturnToHome }) => {
  return (
    <header className="header">
      {playing && (
        <img
          src={leftCaret}
          className="header__button--back"
          onClick={handleReturnToHome}
          alt="Back" 
        />
      )}
      <img src={logo} className="header__logo" alt="The Name Game" />
    </header>
  )
}

export default Header