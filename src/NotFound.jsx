import { Link, useNavigate } from 'react-router';
import './css/NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="NotFound">
      <div className="NotFound__card">
        <div className="NotFound__code">404</div>
        <h1 className="NotFound__title">Страница не найдена</h1>
        <p className="NotFound__subtitle">
          Похоже, этот маршрут потерялся во времени. Вернитесь на главную
          или откройте таймер.
        </p>

        <div className="NotFound__actions">
          <Link className="NotFound__btn NotFound__btn--primary" to="/">
            На главную
          </Link>
          <button
            type="button"
            className="NotFound__btn NotFound__btn--ghost"
            onClick={() => navigate(-1)}
          >
            Назад
          </button>
        </div>

        <div className="NotFound__hint">
          <span className="NotFound__dot" />
          Маршрут: <code>{window.location.pathname}</code>
        </div>
      </div>
    </div>
  );
}