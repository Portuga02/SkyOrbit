import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, ArrowUpRight, Lock, Plus } from 'lucide-react';
import Shell from '../components/Shell.jsx';
import './Records.css';

// Mock de prontuários / evoluções recentes
const CLINICAL_RECORDS = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Amanda Silva',
    lastSession: '28/08/2026',
    sessionCount: 12,
    latestNote: 'Paciente relata redução significativa nos episódios de ansiedade no ambiente de trabalho...',
    status: 'Em acompanhamento',
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Carlos Eduardo',
    lastSession: '25/08/2026',
    sessionCount: 8,
    latestNote: 'Realizada revisão do plano de metas comportamentais. Demonstrou boa adesão às tarefas...',
    status: 'Em acompanhamento',
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Beatriz Lima',
    lastSession: '18/08/2026',
    sessionCount: 4,
    latestNote: 'Primeira devolutiva sobre histórico familiar e gatilhos de sobrecarga emocional...',
    status: 'Em avaliação',
  },
];

export default function Records() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredRecords = CLINICAL_RECORDS.filter((r) =>
    r.patientName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Shell activeTab="records">
      <div className="records-page">
        <div className="records-wrap">
          <div className="page-header">
            <div>
              <h1>Prontuários Clínicos</h1>
              <p>Histórico de sessões, evoluções e anotações confidenciais.</p>
            </div>
          </div>

          <div className="records-toolbar">
            <div className="search-field">
              <Search size={16} />
              <input
                type="text"
                placeholder="Buscar prontuário por paciente..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="privacy-badge">
              <Lock size={14} />
              <span>Ambiente Criptografado &amp; Sigiloso</span>
            </div>
          </div>

          <div className="records-grid">
            {filteredRecords.map((item) => (
              <div
                className="record-card"
                key={item.id}
                onClick={() => navigate(`/patients/${item.patientId}`)}
              >
                <div className="record-top">
                  <div className="record-patient-info">
                    <div className="patient-avatar">{item.patientName.charAt(0)}</div>
                    <div>
                      <h3>{item.patientName}</h3>
                      <span className="record-meta">
                        {item.sessionCount} sessões registradas • Última em {item.lastSession}
                      </span>
                    </div>
                  </div>
                  <span className="record-tag">{item.status}</span>
                </div>

                <div className="record-preview">
                  <span className="preview-label">Última evolução:</span>
                  <p>{item.latestNote}</p>
                </div>

                <div className="record-footer">
                  <span className="open-link">
                    Acessar prontuário completo <ArrowUpRight size={15} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}