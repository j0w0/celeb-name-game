import React, { useEffect, useCallback } from 'react';
import './Game.css'
import Header from '../../components/Header/Header';
import Employee from '../../components/Employee/Employee';
import Button from '../../components/Button/Button';
import userIcon from '../../images/icon-user.png';
import { getProfiles } from '../../services/profiles';
import { useTimer } from 'react-timer-hook';
import Timer from '../../components/Timer/Timer';
import Countdown from '../../components/Countdown/Countdown';
// const axios = require('axios');

const Game = ({
  mode,
  playing,
  employees, setEmployees,
  employeeMatch, setEmployeeMatch,
  selectedEmployee,
  total,
  correct,
  timer, setTimer,
  timerRunning, setTimerRunning,
  matched,
  handleEmployeeClick,
  handleNextTurnClick,
  handleReturnToHome,
  handleGameOverClick,
}) => {

  let btnText = `Continue`;
  let btnClickHandler = () => handleNextTurnClick();

  if((mode === "practice") && total !== correct) {
    btnText = `Game Over!`;
    btnClickHandler = () => handleGameOverClick();
  }

  // game countdown timer
  const date = new Date();
  date.setSeconds(date.getSeconds() + 15);

  const {
    seconds: countdownSeconds,
    minutes: countdownMinutes,
    isRunning: isCountdownRunning,
    start: startCountdown,
  } = useTimer({
    autoStart: false,
    expiryTimestamp: date,
    onExpire: () => {
      if(mode === "timed") handleGameOverClick();
    }
  });

  // recursively get new employees
  const getRandomEmployee = useCallback((response, randomEmployees) => {
    let rand = Math.floor(Math.random() * response.data.length);
    let profileExists = randomEmployees.find(emp => emp.id === response.data[rand].id)
    if(!profileExists) {
      randomEmployees.push(response.data[rand]);
    } else {
      getRandomEmployee(response, randomEmployees);
    }
  }, []);

  // get employee profiles
  useEffect(() => {
    if(!employees.length) {
      const randomEmpCount = 6;
      // axios.get('https://namegame.willowtreeapps.com/api/v1.0/profiles') // headshots url
      getProfiles()
        .then(function (response) {
          // get random employees
          const randomEmployees = [];
          for(let i = 0; i < randomEmpCount; i++) {
            getRandomEmployee(response, randomEmployees);
          }
          setEmployees(randomEmployees);
          // randomly set one as the "real" match
          const match = Math.floor(Math.random() * randomEmployees.length);
          setEmployeeMatch(match);
          // start timer
          setTimerRunning(true);
          // start game countdown
          if(!isCountdownRunning) startCountdown();
        });
    }    
  }, [employees,
    setEmployees,
    setEmployeeMatch,
    getRandomEmployee,
    setTimerRunning,
    isCountdownRunning,
    startCountdown
  ]);

  return (
    <>
      <Header
        playing={playing}
        handleReturnToHome={handleReturnToHome}
      />

      <div className="game container">
        {mode === "timed" && (
          <div className="timer__group">
            <Countdown
              minutes={countdownMinutes}
              seconds={countdownSeconds}
            />
            <Timer
              mode={mode}
              timerRunning={timerRunning}
              timer={timer}
              setTimer={setTimer}
            />
          </div>
        )}
        
        <p className="game__intro">
          {employeeMatch !== null ? `Which one of these good looking photos is the real` : `Loading...`}
        </p>

        {employeeMatch !== null && (
          <>
            <p className="game__employee-name">
              {employees[employeeMatch]?.firstName} {employees[employeeMatch]?.lastName}
            </p>

            <div className="game__employees">
              {employees && employees.map((emp, idx) => {
                return (
                  <Employee
                    mode={mode}
                    headshot={emp.headshot.url}
                    //headshot={userIcon}
                    index={idx}
                    matched={matched}
                    employeeMatch={employeeMatch}
                    selectedEmployee={selectedEmployee}
                    handleEmployeeClick={handleEmployeeClick}
                    key={emp.id}
                  />
                )
              })}
            </div>

            <Button
              disabled={
                mode === "timed" ?
                  (matched ? false : true) :
                  (selectedEmployee !== null ? false : true)
              }
              onClick={() => {
                selectedEmployee !== null && btnClickHandler();
              }}
            >
              {btnText}
            </Button>
          </>
        )}
      </div>
    </>
  )
}

export default Game