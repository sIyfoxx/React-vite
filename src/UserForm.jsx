import './css/Timer.css'
import { useTimer } from './timer/TimerContext';
import PropTypes from 'prop-types';

export default function UserForm() {
  const { second, isRunning, setSecond, setIsRunning } = useTimer();


  const handleChange = e => {
    const raw = e.target.value.trim().replace(",", ".");
    const isNumeric = /^-?\d+(\.\d+)?$/.test(raw);
    if(!isNumeric) alert("Введи число"); 
    setSecond(Number(raw));
  }

  return (
    <div className="Timer">
      <div className="Timer__display">{second}</div>
      <div className="Timer_UI_items">
        <button onClick={() => setIsRunning(true)}>Старт</button>
        <button onClick={() => setIsRunning(false)}>Стоп</button>
        <button onClick={() => {setIsRunning(false); setSecond(60); }}>Обнулить</button>
      </div>
      <input type="text" onChange={handleChange}/>
    </div>
  );
}

UserForm.PropTypes = {
    second: PropTypes.number
}