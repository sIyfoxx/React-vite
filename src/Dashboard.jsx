import { Link } from 'react-router';
import './css/Dashboard.css';
import { useAuth } from './auth/AuthContext';

export default function DashboardForm() {
  const {user} = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const { stats: dt = [], activity = [] } = user.content ?? {};
  
  return (
    <div className="Dashboard">
      <header className="Dashboard__head">
        <div>
          <h1 className="Dashboard__title">Dashboard</h1>
          <p className="Dashboard__subtitle">Обзор активности таймера</p>
        </div>
        <Link className="Dashboard__cta" to="/user">
          Открыть таймер
        </Link>
      </header>

      <section className="Dashboard__stats">
        {dt.map(({ label, value, trend }) => (
          <article className="Stat" key={label}>
            <span className="Stat__label">{label}</span>
            <span className="Stat__value">{value}</span>
            <span className="Stat__trend">{trend}</span>
          </article>
        ))}
      </section>

      <section className="Dashboard__panel">
        <h2 className="Dashboard__panel-title">Последние события</h2>
        <ul className="Activity">
          {activity.map(({ time, text, tag }) => (
            <li className="Activity__row" key={time + text}>
              <span className={`Activity__dot Activity__dot--${tag}`} />
              <span className="Activity__time">{time}</span>
              <span className="Activity__text">{text}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}