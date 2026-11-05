import { memo, useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import './Login.css';
import { useAuth } from './AuthContext';
import PropTypes from 'prop-types';

const LoginForm = memo(function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      onLogin?.(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  }, [email, password, login, navigate, onLogin]);

  return (
    <div className="Login">
      <div className="Login__card">
        <span className="starburst starburst--sm" style={{ top: 18, left: 22 }} aria-hidden="true" />
        <span className="starburst starburst--sm" style={{ top: 18, right: 22, animationDelay: '0.4s' }} aria-hidden="true" />
        <h1 className="Login__title">Вход</h1>
        <p className="Login__subtitle">Добро пожаловать в бар времени</p>

        <form className="Login__form" onSubmit={handleSubmit} noValidate>
          <label className="Login__field">
            <span className="Login__label">Email</span>
            <input
              className="Login__input"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleEmailChange}
            />
          </label>

          <label className="Login__field">
            <span className="Login__label">Пароль</span>
            <input
              className="Login__input"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>

          {error && <div className="Login__error">{error}</div>}

          <input className="Login__submit" type="submit" value="Войти" />
        </form>

        <p className="Login__hint">
          Нет аккаунта?{' '}
          <Link className="Login__link" to="/">
            На главную
          </Link>
        </p>
      </div>
    </div>
  );
});

LoginForm.propTypes = {
  onLogin: PropTypes.func,
};

export default LoginForm;
