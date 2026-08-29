import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Mail, Lock } from 'lucide-react';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // TODO: substituir por chamada real ao backend do SkyOrbit (Spring Security + JWT)
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
      <div className="login-wrap">
        <div className="brand">
          <div className="brand-moon">
            <Moon size={34} />
          </div>
          <h1>SkyOrbit</h1>
          <p className="tagline">Gestão para psicólogos. Conecte-se. Cuide. Transforme vidas.</p>
        </div>

        <form className="login-form" onSubmit={onLogin}>
          <div className="field">
            <Mail size={18} />
            <input
              type="email"
              placeholder="E-mail profissional"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <Lock size={18} />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="ion-btn round block btn-primary" disabled={loading}>
            {loading ? <span className="spinner" /> : <span>Entrar</span>}
          </button>

          <p className="hint">Acesso restrito a profissionais cadastrados</p>
        </form>
      </div>
    </div>
  );
}
