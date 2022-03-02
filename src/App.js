import { useContext } from 'react';
import { GameContext } from './context/GameContext';
import './App.css';
import Start from './views/Start/Start';
import Game from './views/Game/Game';
import End from './views/End/End';

function App() {
  const { playing, mode } = useContext(GameContext);
  if(!playing && !mode) return <Start />;
  if(!playing) return <End />;
  return <Game />;
}

export default App;