import { Link, NavLink, Outlet } from 'react-router';
import './css/Layout.css';
import { useAuth } from './auth/AuthContext'

const links = [
  { to: '/',          label: 'Главная' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/user',      label: 'Таймер' },
  { to: '/login',     label: 'Войти' },
];

export default function Layout() {
  return (
    <div className="Layout">
      <header className="Layout__header">
        <Link className="Layout__logo" to="/">
          Дело времени
        </Link>

        <nav className="Layout__nav">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}              /* "/" активен только на главной */
              className={({ isActive }) =>
                `Layout__link ${isActive ? 'is-active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="Layout__main">
        <Outlet />
      </main>

      <footer className="Layout__footer">
        <span>© 2026 Timer</span>
        <span className="Layout__footer-dot" />
        <span>React + Router</span>
      </footer>
    </div>
  );
}