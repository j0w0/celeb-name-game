import React, { useState, createContext } from 'react'

export const GameContext = createContext();

const GameProvider = ({ children }) => {
  // game mode / status
  const [mode, setMode] = useState(null);
  const [playing, setPlaying] = useState(false);

  // profiles
  const [profiles, setProfiles] = useState([]);
  const [profileMatch, setProfileMatch] = useState(null);

  // user selections / scores
  const [selectedProfile, setSelectedProfile] = useState(null);
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

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);

    if(profile === profileMatch) {
      setMatched(true);
      setCorrect(prev => prev + 1);
    }

    if(mode === "practice") {
      setTotal(prev => prev + 1);
    } else {
      if(profile === profileMatch) {
        setTotal(prev => prev + 1);
        setGuessTimes(prevTimes => [...prevTimes, timer]);
        setTimerRunning(false);
      }
    }
  }

  const handleNextTurnClick = () => {
    setProfiles([]);
    setProfileMatch(null);
    setSelectedProfile(null);
    setTimer(0);
    setMatched(false);
  }

  const handleReturnToHome = () => {
    setMode(null);
    setPlaying(false);
    setProfiles([]);
    setProfileMatch(null);
    setSelectedProfile(null);
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

  return (
    <GameContext.Provider value={{
      mode, setMode,
      playing, setPlaying,
      profiles, setProfiles,
      profileMatch, setProfileMatch,
      selectedProfile, setSelectedProfile,
      total, setTotal,
      correct, setCorrect,
      guessTimes, setGuessTimes,
      matched, setMatched,
      timer, setTimer,
      timerRunning, setTimerRunning,
      handleStartGameClick,
      handleProfileClick,
      handleNextTurnClick,
      handleReturnToHome,
      handleGameOverClick
    }}>
      {children}
    </GameContext.Provider>
  )
}

export default GameProvider