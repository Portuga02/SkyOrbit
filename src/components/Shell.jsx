import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  DollarSign,
  BarChart3,
  Video,
  Settings as SettingsIcon,
  Menu,
  X,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import './Shell.css';

const NAV_ITEMS = [
  { tab: 'dashboard', to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { tab: 'agenda', to: '/agenda', icon: Calendar, label: 'Agenda' },
  { tab: 'patients', to: '/patients', icon: Users, label: 'Pacientes' },
  { tab: 'records', to: '/records', icon: FileText, label: 'Prontuários' },
  { tab: 'financeiro', to: '/financeiro', icon: DollarSign, label: 'Financeiro' },
  { tab: 'reports', to: '/reports', icon: BarChart3, label: 'Relatórios' },
  { tab: 'teleatendimento', to: '/teleatendimento', icon: Video, label: 'Teleatendimento' },
  { tab: 'settings', to: '/settings', icon: SettingsIcon, label: 'Configurações' },
];

export default function Shell({ children, activeTab }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenu = () => setMobileOpen(false);

  const NavContent = () => (
    <>
      <div className="sidebar-header">
        <div className="logo-icon">
          <Sparkles size={18} />
        </div>
        <div className="logo-text">
          <span className="logo-title">SkyOrbit</span>
          <span className="logo-sub">Psicologia &amp; Saúde</span>
        </div>
      </div>

      <div className="profile-row">
        <div className="profile-avatar">S</div>
        <div className="profile-text">
          <span className="profile-name">Sávio Gomes</span>
          <span className="profile-role">CRP 02/12345</span>
        </div>
        <div className="online-dot" title="Online" />
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.tab}
              to={item.to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `nav-item ${isActive || activeTab === item.tab ? 'active' : ''}`
              }
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <ShieldCheck size={16} />
        <span>Conformidade CFP &amp; LGPD Criptografada</span>
      </div>
    </>
  );

  return (
    <div className="orbit-shell">
      {/* Topbar visível apenas em Mobile */}
      <header className="mobile-topbar">
        <button
          type="button"
          className="menu-toggle-btn"
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir Menu"
        >
          <Menu size={22} />
        </button>
        <div className="mobile-brand">
          <Sparkles size={16} className="brand-icon" />
          <span>SkyOrbit</span>
        </div>
        <div className="mobile-avatar">S</div>
      </header>

      {/* Sidebar Desktop Fixa */}
      <aside className="sidebar desktop-only">
        <NavContent />
      </aside>

      {/* Drawer Mobile (Overlay) */}
      {mobileOpen && (
        <div className="mobile-drawer-overlay" onClick={closeMenu}>
          <aside className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-close-row">
              <button
                type="button"
                className="btn-close-drawer"
                onClick={closeMenu}
                aria-label="Fechar Menu"
              >
                <X size={20} />
              </button>
            </div>
            <NavContent />
          </aside>
        </div>
      )}

      {/* Área Principal de Conteúdo */}
      <main className="shell-content">{children}</main>
    </div>
  );
}