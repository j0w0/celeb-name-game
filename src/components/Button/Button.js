import React from 'react'
import './Button.css'

const Button = ({ children, className = "button", ...restOfProps }) => {
  return (
    <button className={className} {...restOfProps}>
      {children}
    </button>
  )
}

export default Button