import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Moon,
  LayoutGrid,
  Users,
  Calendar,
  FileText,
  Video,
  Banknote,
  Folder,
  BarChart3,
  Settings as SettingsIcon,
  Menu,
  X,
} from 'lucide-react';
import './Shell.css';

const NAV_ITEMS = [
  { tab: 'dashboard', to: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
  { tab: 'patients', to: '/patients', icon: Users, label: 'Pacientes' },
  { tab: 'agenda', to: '/agenda', icon: Calendar, label: 'Agenda' },
  { tab: 'records', to: null, icon: FileText, label: 'Prontuários' },
  { tab: 'teleatendimento', to: '/teleatendimento', icon: Video, label: 'Teleatendimento' },
  { tab: 'financeiro', to: '/financeiro', icon: Banknote, label: 'Financeiro' },
  { tab: 'documents', to: null, icon: Folder, label: 'Documentos' },
  { tab: 'reports', to: '/reports', icon: BarChart3, label: 'Relatórios' },
  { tab: 'settings', to: '/settings', icon: SettingsIcon, label: 'Configurações' },
];

export default function Shell({
  activeTab = 'dashboard',
  professionalName = 'Sávio Gomes',
  professionalRole = 'Psicólogo(a)',
  children,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navList = (
    <nav className="sidebar-nav">
      {NAV_ITEMS.map(({ tab, to, icon: Icon, label }) =>
        to ? (
          <NavLink
            key={tab}
            to={to}
            className={`nav-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            <Icon size={17} />
            <span>{label}</span>
          </NavLink>
        ) : (
          <a key={tab} className={`nav-item ${activeTab === tab ? 'active' : ''}`}>
            <Icon size={17} />
            <span>{label}</span>
          </a>
        )
      )}
    </nav>
  );

  return (
    <div className="orbit-shell">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Moon className="logo-icon" size={15} />
          <div className="logo-text">
            <span className="logo-title">SkyOrbit</span>
            <span className="logo-sub">Gestão &amp; Psicologia</span>
          </div>
        </div>

        <div className="profile-row">
          <div className="profile-avatar">{professionalName.charAt(0)}</div>
          <div className="profile-text">
            <span className="profile-name">{professionalName}</span>
            <span className="profile-role">{professionalRole}</span>
          </div>
          <span className="online-dot"></span>
        </div>

        {navList}

        <div className="sidebar-footer">
          <Moon size={16} />
          <span>
            Conecte-se. Cuide.
            <br />
            Transforme vidas.
          </span>
        </div>
      </aside>

      <div className="mobile-topbar">
        <Moon size={20} />
        <span>SkyOrbit</span>
        <button className="icon-btn" aria-label="Menu" onClick={() => setMenuOpen(true)}>
          <Menu size={20} />
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="sidebar-header" style={{ padding: 0 }}>
                <Moon className="logo-icon" size={15} />
                <div className="logo-text">
                  <span className="logo-title">SkyOrbit</span>
                  <span className="logo-sub">Gestão &amp; Psicologia</span>
                </div>
              </div>
              <button className="icon-btn" aria-label="Fechar menu" onClick={() => setMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>
            {navList}
          </div>
        </div>
      )}

      <div className="shell-content">{children}</div>
    </div>
  );
}
