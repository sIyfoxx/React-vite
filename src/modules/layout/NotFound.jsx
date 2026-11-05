import { memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router';
import './NotFound.css';

const NotFound = memo(function NotFound() {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="NotFound">
      <div className="NotFound__card">
        <div className="NotFound__code">404</div>
        <h1 className="NotFound__title">Не найдено</h1>
        <p className="NotFound__subtitle">
          Этот маршрут потерялся между коктейлями. Вернитесь в ленту или к таймеру.
        </p>

        <div className="NotFound__actions">
          <Link className="NotFound__btn NotFound__btn--primary" to="/">
            На главную
          </Link>
          <button
            type="button"
            className="NotFound__btn NotFound__btn--ghost"
            onClick={handleBack}
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
});

export default NotFound;
