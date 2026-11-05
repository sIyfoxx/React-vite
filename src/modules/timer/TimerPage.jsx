import { memo, useCallback } from 'react';
import './Timer.css';
import { useTimer } from './TimerContext';

const TimerPage = memo(function TimerPage() {
  const { second, isRunning, start, stop, reset, setDuration } = useTimer();

  const handleChange = useCallback((e) => {
    const raw = e.target.value.trim().replace(',', '.');
    const isNumeric = /^-?\d+(\.\d+)?$/.test(raw);
    if (!isNumeric) {
      alert('Введи число');
      return;
    }
    setDuration(Number(raw));
  }, [setDuration]);

  return (
    <div className="Timer">
      <span className="starburst starburst--sm" style={{ top: 18, left: 22 }} aria-hidden="true" />
      <span className="starburst starburst--sm" style={{ top: 18, right: 22, animationDelay: '0.5s' }} aria-hidden="true" />
      <p className="Timer__label">Specialty Timer</p>
      <div className="Timer__display">{second}</div>
      <div className="Timer_UI_items">
        <button type="button" onClick={start} disabled={isRunning || second <= 0}>
          Старт
        </button>
        <button type="button" onClick={stop} disabled={!isRunning}>
          Стоп
        </button>
        <button type="button" onClick={reset}>
          Сброс
        </button>
      </div>
      <input
        type="text"
        placeholder="Секунды"
        onChange={handleChange}
        disabled={isRunning}
      />
    </div>
  );
});

export default TimerPage;
