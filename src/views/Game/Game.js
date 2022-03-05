import { useEffect, useCallback, useContext } from 'react';
import { GameContext } from '../../context/GameContext';
import './Game.css'
import Header from '../../components/Header/Header';
import Profile from '../../components/Profile/Profile';
import Button from '../../components/Button/Button';
import userIcon from '../../images/icon-user.png';
import { getCelebrities } from '../../services/celebrities';
import { useTimer } from 'react-timer-hook';
import Timer from '../../components/Timer/Timer';
import Countdown from '../../components/Countdown/Countdown';

const Game = () => {
  const {
    mode,
    profiles, setProfiles,
    profileMatch, setProfileMatch,
    selectedProfile,
    total,
    correct,
    setTimerRunning,
    matched,
    handleNextTurnClick,
    handleGameOverClick,
  } = useContext(GameContext);

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

  // recursively get new profiles
  const getRandomProfile = useCallback((response, randomProfiles) => {
    let rand = Math.floor(Math.random() * response.data.length);
    let profileExists = randomProfiles.find(profile => profile.id === response.data[rand].id)
    if(!profileExists) {
      randomProfiles.push(response.data[rand]);
    } else {
      getRandomProfile(response, randomProfiles);
    }
  }, []);

  // get profiles
  useEffect(() => {
    if(!profiles.length) {
      const randomProfileCount = 6;
      getCelebrities()
        .then(function (response) {
          // get random profiles
          const randomProfiles = [];
          for(let i = 0; i < randomProfileCount; i++) {
            getRandomProfile(response, randomProfiles);
          }
          setProfiles(randomProfiles);
          // randomly set one as the "real" match
          const match = Math.floor(Math.random() * randomProfiles.length);
          setProfileMatch(match);
          // start timer
          setTimerRunning(true);
          // start game countdown
          if(!isCountdownRunning) startCountdown();
        });
    }    
  }, [profiles]);

  return (
    <>
      <Header />

      <div className="game container">
        {mode === "timed" && (
          <div className="timer__group">
            <Countdown
              minutes={countdownMinutes}
              seconds={countdownSeconds}
            />
            <Timer />
          </div>
        )}
        
        <p className="game__intro">
          {profileMatch !== null ? `Which one of these photos is` : `Loading...`}
        </p>

        {profileMatch !== null && (
          <>
            <p className="game__profile-name">
              {profiles[profileMatch]?.name}
            </p>

            <div className="game__profiles">
              {profiles && profiles.map((profile, idx) => {
                return (
                  <Profile
                    headshot={profile.headshot ? profile.headshot : userIcon}
                    //headshot={userIcon}
                    index={idx}
                    key={profile.id}
                  />
                )
              })}
            </div>

            <Button
              disabled={
                mode === "timed" ?
                  (matched ? false : true) :
                  (selectedProfile !== null ? false : true)
              }
              onClick={() => {
                selectedProfile !== null && btnClickHandler();
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