import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Search, ChevronRight, Users, X } from 'lucide-react';
import Shell from '../components/Shell.jsx';
import './Patients.css';

const PATIENTS = [
  { id: '1', name: 'Amanda Silva', age: 28, status: 'Ativa', lastSession: '08/07/2025', avatarColor: '#6c5ce7' },
  { id: '2', name: 'Carlos Eduardo', age: 34, status: 'Ativa', lastSession: '05/07/2025', avatarColor: '#38bdf8' },
  { id: '3', name: 'Beatriz Lima', age: 22, status: 'Ativa', lastSession: '01/07/2025', avatarColor: '#f5a524' },
  { id: '4', name: 'Lucas Pereira', age: 41, status: 'Ativa', lastSession: '28/06/2025', avatarColor: '#22c55e' },
  { id: '5', name: 'Juliana Martins', age: 30, status: 'Ativa', lastSession: '24/06/2025', avatarColor: '#a855f7' },
  { id: '6', name: 'Rafael Nogueira', age: 26, status: 'Inativa', lastSession: '02/05/2025', avatarColor: '#9aa0c9' },
];

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return PATIENTS;
    const term = searchTerm.toLowerCase();
    return PATIENTS.filter((p) => p.name.toLowerCase().includes(term));
  }, [searchTerm]);

  return (
    <Shell activeTab="patients">
      <div className="patients-page">
        <div className="patients-wrap">
          
          <div className="page-header">
            <div>
              <h1>Pacientes</h1>
              <p>{PATIENTS.length} pacientes cadastrados na clínica</p>
            </div>
            <button type="button" className="ion-btn round btn-new" onClick={() => navigate('/patients/new')}>
              <UserPlus size={16} />
              <span>Novo paciente</span>
            </button>
          </div>

          <div className="toolbar-row">
            <div className="orbit-search">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Buscar por nome do paciente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button type="button" className="clear-btn" onClick={() => setSearchTerm('')}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="patients-card">
            <div className="table-responsive">
              <div className="table-head">
                <span>Paciente</span>
                <span>Status</span>
                <span>Última sessão</span>
                <span style={{ textAlign: 'right' }}>Ação</span>
              </div>

              {filtered.length > 0 ? (
                filtered.map((p) => (
                  <div className="table-row" key={p.id} onClick={() => navigate(`/patients/${p.id}`)}>
                    <div className="patient-cell">
                      <div className="avatar" style={{ background: p.avatarColor }}>
                        {p.name.charAt(0)}
                      </div>
                      <div className="patient-name-block">
                        <span className="patient-name">{p.name}</span>
                        <span className="patient-age">{p.age} anos</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className={`status-badge ${p.status === 'Inativa' ? 'inactive' : 'active'}`}>
                        {p.status}
                      </span>
                    </div>

                    <span className="last-session">{p.lastSession}</span>
                    
                    <div className="action-cell">
                      <ChevronRight className="row-arrow" size={18} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <Users size={32} />
                  <p>Nenhum paciente encontrado para "{searchTerm}".</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </Shell>
  );
}