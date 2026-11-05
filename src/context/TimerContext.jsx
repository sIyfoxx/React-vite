import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const TimerContext = createContext(null);

function nowTime() {
  return new Date().toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDuration(totalSeconds) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function TimerProvider({ children }) {
  const [second, setSecond] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [activity, setActivity] = useState([]);

  const plannedRef = useRef(60);
  const startedAtRef = useRef(null);
  const sessionIdRef = useRef(0);
  const secondRef = useRef(second);
  const isRunningRef = useRef(isRunning);

  secondRef.current = second;
  isRunningRef.current = isRunning;

  const pushActivity = useCallback((text, tag) => {
    setActivity((prev) => [{ time: nowTime(), text, tag }, ...prev].slice(0, 20));
  }, []);

  const finishSession = useCallback(({ completed, remaining }) => {
    if (startedAtRef.current == null) return false;

    const planned = plannedRef.current;
    const elapsed = Math.max(0, planned - remaining);

    setSessions((prev) => [
      ...prev,
      {
        id: sessionIdRef.current,
        planned,
        elapsed,
        completed,
        finishedAt: Date.now(),
      },
    ]);

    startedAtRef.current = null;
    return true;
  }, []);

  const start = useCallback(() => {
    if (isRunningRef.current) return;
    if (secondRef.current <= 0) return;

    if (startedAtRef.current == null) {
      sessionIdRef.current += 1;
      plannedRef.current = secondRef.current;
      startedAtRef.current = Date.now();
      pushActivity('Таймер запущен', 'start');
    } else {
      pushActivity('Таймер продолжен', 'start');
    }

    setIsRunning(true);
  }, [pushActivity]);

  const stop = useCallback(() => {
    if (!isRunningRef.current) return;
    setIsRunning(false);
    pushActivity('Таймер остановлен', 'stop');
  }, [pushActivity]);

  const reset = useCallback(() => {
    if (isRunningRef.current || startedAtRef.current != null) {
      finishSession({ completed: false, remaining: secondRef.current });
      pushActivity('Таймер сброшен', 'edit');
    } else {
      pushActivity('Значение обнулено', 'edit');
    }

    setIsRunning(false);
    setSecond(60);
    plannedRef.current = 60;
  }, [finishSession, pushActivity]);

  const setDuration = useCallback((value) => {
    const next = Math.max(0, Math.floor(Number(value)) || 0);

    if (isRunningRef.current || startedAtRef.current != null) {
      finishSession({ completed: false, remaining: secondRef.current });
      setIsRunning(false);
    }

    setSecond(next);
    plannedRef.current = next;
    pushActivity(`Установлено ${formatDuration(next)}`, 'edit');
  }, [finishSession, pushActivity]);

  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => setSecond((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning || second !== 0) return;

    setIsRunning(false);
    if (finishSession({ completed: true, remaining: 0 })) {
      pushActivity('Таймер завершён', 'done');
    }
  }, [isRunning, second, finishSession, pushActivity]);

  const stats = useMemo(() => {
    const totalSessions = sessions.length;
    const completedSessions = sessions.filter((s) => s.completed).length;
    const avgSeconds =
      totalSessions === 0
        ? 0
        : Math.round(
            sessions.reduce((sum, s) => sum + s.elapsed, 0) / totalSessions
          );
    const completionRate =
      totalSessions === 0
        ? 0
        : Math.round((completedSessions / totalSessions) * 100);

    return [
      {
        label: 'Всего сессий',
        value: String(totalSessions),
        trend: totalSessions === 0 ? '—' : `готово ${completedSessions}`,
      },
      {
        label: 'Среднее время',
        value: formatDuration(avgSeconds),
        trend: totalSessions === 0 ? '—' : 'по сессиям',
      },
      {
        label: 'Активных',
        value: isRunning ? '1' : '0',
        trend: isRunning ? 'идёт' : '—',
      },
      {
        label: 'Завершено',
        value: `${completionRate}%`,
        trend:
          totalSessions === 0
            ? '—'
            : `${completedSessions}/${totalSessions}`,
      },
    ];
  }, [sessions, isRunning]);

  const value = useMemo(
    () => ({
      second,
      isRunning,
      start,
      stop,
      reset,
      setDuration,
      stats,
      activity,
      formatDuration,
    }),
    [second, isRunning, start, stop, reset, setDuration, stats, activity]
  );

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
}

export const useTimer = () => useContext(TimerContext);
