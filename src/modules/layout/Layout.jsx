import { memo } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import './Layout.css';

const links = [
  { to: '/',          label: 'Лента' },
  { to: '/dashboard', label: 'Сводка' },
  { to: '/user',      label: 'Таймер' },
  { to: '/login',     label: 'Вход' },
];

function navClassName({ isActive }) {
  return `Layout__link ${isActive ? 'is-active' : ''}`;
}

const Layout = memo(function Layout() {
  return (
    <div className="Layout">
      <header className="Layout__header">
        <div className="Layout__hero">
          <span className="starburst Layout__star Layout__star--tl" aria-hidden="true" />
          <span className="starburst Layout__star Layout__star--br" aria-hidden="true" />
          <p className="Layout__eyebrow">EST 2026 · TIME SOCIAL</p>
          <Link className="Layout__logo" to="/">
            Дело времени
          </Link>
          <p className="Layout__tagline">
            Ретро-бар для часов, постов и коротких обсуждений
          </p>
        </div>

        <nav className="Layout__nav" aria-label="Основная навигация">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={navClassName}
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
        <span>© 2026 Дело времени</span>
        <span className="Layout__footer-dot" />
        <span>retro social kit</span>
      </footer>
    </div>
  );
});

export default Layout;
