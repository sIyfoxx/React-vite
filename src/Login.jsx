import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import './css/Login.css';
import { useAuth } from './auth/AuthContext';
import PropTypes from 'prop-types';


export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    console.log(`Email: ${email}, Password: ${password}`);
    try {

      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <div className="Login">
      <div className="Login__card">
        <h1 className="Login__title">Вход</h1>
        <p className="Login__subtitle">Войдите, чтобы открыть dashboard</p>

        <form className="Login__form" onSubmit={handleSubmit} noValidate>
          <label className="Login__field">
            <span className="Login__label">Email</span>
            <input
              className="Login__input"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
}