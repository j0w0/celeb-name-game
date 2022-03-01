import React from 'react'
import './Header.css'
import logo from '../../images/logo-header.svg'
import leftCaret from '../../images/icon-left-caret.svg'
import Button from '../../components/Button/Button';

const Header = ({ playing, handleReturnToHome }) => {
  return (
    <header className="header">
      {playing && (
        <Button
          className="header__button--back"
          onClick={handleReturnToHome}
          aria-label='Go Back'
        >
          <img
            src={leftCaret}
            alt="Go Back" 
          />
        </Button>
      )}
      <img src={logo} className="header__logo" alt="The Name Game" />
    </header>
  )
}

export default Header