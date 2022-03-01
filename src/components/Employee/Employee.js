import React from 'react'
import './Employee.css';

const Employee = ({
  mode,
  headshot,
  index,
  matched,
  employeeMatch,
  selectedEmployee,
  handleEmployeeClick
}) => {
  
  let employeeClass = `employee`;
  let iconClass = `employee__icon`;

  if(selectedEmployee !== null) {
    if(selectedEmployee === index) {
      // the square clicked
      if(selectedEmployee === employeeMatch) {
        // correct click
        iconClass = `${iconClass} employee__icon--correct`;
      } else {
        // incorrect click
        iconClass = `${iconClass} employee__icon--incorrect`;
      }
    } else {
      // disable employee
      if(mode === "timed") {
        if(matched) employeeClass = `${employeeClass} employee__disabled`;
      } else {
        employeeClass = `${employeeClass} employee__disabled`;
      }
    }
  }

  return (
    <div
      style={{ backgroundImage: `url(${headshot})` }}
      className={employeeClass}
      onClick={() => {
        if(mode === "timed") {
          if(!matched) handleEmployeeClick(index);
        } else {
          if(selectedEmployee === null) handleEmployeeClick(index);
        }
      }}
    >
      <div className={iconClass}></div>
    </div>
  )
}

export default Employee