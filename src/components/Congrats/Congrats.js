import React from 'react'
import './Congrats.css';
import face from '../../images/congrats-face.svg';
import square from '../../images/congrats-square.svg';
import star from '../../images/congrats-star.svg';
import triangle from '../../images/congrats-triangle.svg';

const Congrats = ({ total, correct }) => {
  return (
    <div className="congrats">
      <div className="congrats__face">
        <img src={face} alt="" className="congrats__face--face" />
        <img src={square} alt="" className="congrats__face--square" />
        <img src={star} alt="" className="congrats__face--star" />
        <img src={triangle} alt="" className="congrats__face--triangle" />
      </div>
      
      <h2 className="congrats__message">Congratulations, you scored {correct}/{total}!</h2>
    </div>
  )
}

export default Congrats