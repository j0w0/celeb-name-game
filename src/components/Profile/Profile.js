import { useContext } from 'react'
import { GameContext } from '../../context/GameContext';
import './Profile.css';

const Profile = ({ headshot, index }) => {
  const {
    mode,
    matched,
    profileMatch,
    selectedProfile,
    handleProfileClick
  } = useContext(GameContext);
  
  let profileClass = `profile`;
  let iconClass = `profile__icon`;

  if(selectedProfile !== null) {
    if(selectedProfile === index) {
      // the square clicked
      if(selectedProfile === profileMatch) {
        // correct click
        iconClass = `${iconClass} profile__icon--correct`;
      } else {
        // incorrect click
        iconClass = `${iconClass} profile__icon--incorrect`;
      }
    } else {
      // disable profile
      if(mode === "timed") {
        if(matched) profileClass = `${profileClass} profile__disabled`;
      } else {
        profileClass = `${profileClass} profile__disabled`;
      }
    }
  }

  return (
    <div
      style={{ backgroundImage: `url(${headshot})` }}
      className={profileClass}
      onClick={() => {
        if(mode === "timed") {
          if(!matched) handleProfileClick(index);
        } else {
          if(selectedProfile === null) handleProfileClick(index);
        }
      }}
    >
      <div className={iconClass}></div>
    </div>
  )
}

export default Profile