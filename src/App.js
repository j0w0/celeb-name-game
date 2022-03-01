import { useState } from 'react';
import './App.css';
import Start from './views/Start/Start';
import Game from './views/Game/Game';
import End from './views/End/End';

// use for state management and routes
function App() {
  // game mode / status
  const [mode, setMode] = useState(null);
  const [playing, setPlaying] = useState(false);

  // employee profiles
  const [employees, setEmployees] = useState([]);
  const [employeeMatch, setEmployeeMatch] = useState(null);

  // user selections / scores
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [total, setTotal] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [guessTimes, setGuessTimes] = useState([]);
  const [matched, setMatched] = useState(false);

  // timer
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const handleStartGameClick = (mode) => {
    setMode(mode);
    setPlaying(true);
  }

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);

    if(employee === employeeMatch) {
      setMatched(true);
      setCorrect(prev => prev + 1);
    }

    if(mode === "practice") {
      setTotal(prev => prev + 1);
    } else {
      if(employee === employeeMatch) {
        setTotal(prev => prev + 1);
        setGuessTimes(prevTimes => [...prevTimes, timer]);
        setTimerRunning(false);
      }
    }
  }

  const handleNextTurnClick = () => {
    setEmployees([]);
    setEmployeeMatch(null);
    setSelectedEmployee(null);
    setTimer(0);
    setMatched(false);
  }

  const handleReturnToHome = () => {
    setMode(null);
    setPlaying(false);
    setEmployees([]);
    setEmployeeMatch(null);
    setSelectedEmployee(null);
    setTotal(0);
    setCorrect(0);
    setGuessTimes([]);
    setTimer(0);
    setTimerRunning(false);
    setMatched(false);
  }

  const handleGameOverClick = () => {
    setPlaying(false);
  }
  
  if(!playing && !mode) return <Start
    handleStartGameClick={handleStartGameClick}
  />;

  if(!playing) return <End
    mode={mode}
    total={total}
    correct={correct}
    guessTimes={guessTimes}
    handleReturnToHome={handleReturnToHome}
  />;

  return <Game
    mode={mode}
    playing={playing}
    employees={employees}
    setEmployees={setEmployees}
    employeeMatch={employeeMatch}
    setEmployeeMatch={setEmployeeMatch}
    selectedEmployee={selectedEmployee}
    total={total}
    correct={correct}
    timer={timer}
    setTimer={setTimer}
    timerRunning={timerRunning}
    setTimerRunning={setTimerRunning}
    matched={matched}
    handleEmployeeClick={handleEmployeeClick}
    handleNextTurnClick={handleNextTurnClick}
    handleReturnToHome={handleReturnToHome}
    handleGameOverClick={handleGameOverClick}
  />;
}

export default App;