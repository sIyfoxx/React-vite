import { memo, useMemo } from 'react';
import { Link, Navigate } from 'react-router';
import './Dashboard.css';
import { useAuth } from '../auth';
import { useTimer } from '../timer';
import StatCard from './StatCard.jsx';
import ActivityRow from './ActivityRow.jsx';

const DashboardPage = memo(function DashboardPage() {
  const { user } = useAuth();
  const { stats, activity, second, isRunning, formatDuration } = useTimer();

  const subtitle = useMemo(() => {
    if (!user) return '';
    return `${user.email} · сейчас ${formatDuration(second)}${isRunning ? ' · идёт' : ''}`;
  }, [user, second, isRunning, formatDuration]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="Dashboard">
      <header className="Dashboard__head">
        <div>
          <h1 className="Dashboard__title">Сводка</h1>
          <p className="Dashboard__subtitle">{subtitle}</p>
        </div>
        <Link className="Dashboard__cta" to="/user">
          Открыть таймер
        </Link>
      </header>

      <section className="Dashboard__stats">
        {stats.map(({ label, value, trend }) => (
          <StatCard key={label} label={label} value={value} trend={trend} />
        ))}
      </section>

      <section className="Dashboard__panel">
        <h2 className="Dashboard__panel-title">Последние события</h2>
        {activity.length === 0 ? (
          <p className="Dashboard__empty">Пока нет событий — запустите таймер</p>
        ) : (
          <ul className="Activity">
            {activity.map(({ time, text, tag }, index) => (
              <ActivityRow
                key={`${time}-${text}-${index}`}
                time={time}
                text={text}
                tag={tag}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
});

export default DashboardPage;
