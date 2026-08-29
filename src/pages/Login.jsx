import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function onLogin(e) {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 600);
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="brand">
          <div className="brand-moon">
            <Moon size={30} />
          </div>
          <h1>SkyOrbit</h1>
          <p className="tagline">Gestão &amp; Psicologia</p>
        </div>

        <form className="login-form" onSubmit={onLogin}>
          <div className="field">
            <Mail size={18} className="field-icon" />
            <input
              type="email"
              placeholder="E-mail profissional"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <Lock size={18} className="field-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha de acesso"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <button type="submit" className="ion-btn round block btn-primary" disabled={loading}>
            {loading ? <span className="spinner" /> : <span>Acessar Painel</span>}
          </button>

          <p className="hint">Acesso exclusivo para psicólogos e terapeutas</p>
        </form>
      </div>
    </div>
  );
}