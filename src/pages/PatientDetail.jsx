import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  CheckCircle2, 
  Phone, 
  Mail, 
  ShieldCheck, 
  User, 
  Calendar,
  DollarSign,
  FileText
} from 'lucide-react';
import Shell from '../components/Shell.jsx';
import './PatientDetail.css';

const patient = {
  name: 'Amanda Silva',
  age: 28,
  birthDate: '14/05/1997',
  phone: '(81) 99999-1234',
  email: 'amanda.silva@email.com',
  insurance: 'Particular',
  professional: 'Sávio Gomes',
  lastSession: '08/07/2025 - 09:00 · Consulta Online',
  status: 'Ativa'
};

const evolutions = [
  {
    id: '1',
    date: '08/07/2025 - 09:00',
    type: 'Online',
    summary: 'Paciente relatou melhora significativa na ansiedade em situações sociais.',
    plan: 'Discutimos estratégias de enfrentamento e exposição gradual. Plano: continuar exercícios e registrar situações.',
  },
  {
    id: '2',
    date: '01/07/2025 - 09:00',
    type: 'Presencial',
    summary: 'Paciente apresentou preocupação com cobranças no trabalho.',
    plan: 'Exploramos pensamentos automáticos e reestruturação cognitiva. Plano: prática de mindfulness diária.',
  },
  {
    id: '3',
    date: '24/06/2025 - 09:00',
    type: 'Online',
    summary: 'Sessão de acolhimento e escuta inicial.',
    plan: 'Queixa principal: ansiedade e insônia.',
  },
];

export default function PatientDetail() {
  const [activeTab, setActiveTab] = useState('resumo');
  const navigate = useNavigate();

  return (
    <Shell activeTab="patients">
      <div className="patient-detail-page">
        <div className="detail-wrap">
          
          <button type="button" className="btn-back" onClick={() => navigate('/patients')}>
            <ArrowLeft size={16} />
            <span>Voltar para Pacientes</span>
          </button>

          {/* Header Principal do Paciente */}
          <div className="patient-header-card">
            <div className="header-avatar">{patient.name.charAt(0)}</div>
            
            <div className="header-info">
              <div className="patient-title-row">
                <h1>{patient.name}</h1>
                <span className="badge-active">{patient.status}</span>
              </div>
              <p>{patient.age} anos • Nasc: {patient.birthDate} • Psicólogo: {patient.professional}</p>
            </div>

            <button 
              type="button" 
              className="ion-btn round btn-new-record" 
              onClick={() => setActiveTab('prontuario')}
            >
              <Plus size={16} />
              <span>Nova evolução</span>
            </button>
          </div>

          {/* Abas de Navegação */}
          <div className="tabs-bar">
            {[
              ['resumo', 'Resumo Geral'],
              ['prontuario', 'Prontuário & Evoluções'],
              ['sessoes', 'Histórico de Sessões'],
              ['financeiro', 'Financeiro'],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`tab-btn ${activeTab === key ? 'active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Aba 1: Resumo */}
          {activeTab === 'resumo' && (
            <div className="tab-content">
              <div className="content-grid">
                
                <div className="panel info-panel">
                  <div className="panel-header">
                    <h2>Dados de Contato</h2>
                  </div>
                  <div className="info-list">
                    <div className="info-row">
                      <span className="info-label"><Phone size={15} /> Telefone</span>
                      <b className="info-val">{patient.phone}</b>
                    </div>
                    <div className="info-row">
                      <span className="info-label"><Mail size={15} /> E-mail</span>
                      <b className="info-val">{patient.email}</b>
                    </div>
                    <div className="info-row">
                      <span className="info-label"><ShieldCheck size={15} /> Modalidade</span>
                      <b className="info-val">{patient.insurance}</b>
                    </div>
                    <div className="info-row">
                      <span className="info-label"><User size={15} /> Responsável</span>
                      <b className="info-val">{patient.professional}</b>
                    </div>
                  </div>
                </div>

                <div className="panel session-highlight-panel">
                  <div className="panel-header">
                    <h2>Último Atendimento</h2>
                  </div>
                  <div className="last-session-card">
                    <Calendar size={20} className="icon-calendar" />
                    <div>
                      <span className="session-card-title">Sessão Concluída</span>
                      <p className="last-session-text">{patient.lastSession}</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className="ion-btn outline block round btn-view-records" 
                    onClick={() => setActiveTab('prontuario')}
                  >
                    <FileText size={15} />
                    Ver histórico de anotações
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* Aba 2: Prontuário / Evoluções */}
          {activeTab === 'prontuario' && (
            <div className="tab-content">
              <div className="panel evolutions-panel">
                <div className="panel-header-action">
                  <div>
                    <h2>Evoluções Clínicas</h2>
                    <p className="panel-sub">Registro cronológico confidencial de atendimentos</p>
                  </div>
                  <button type="button" className="ion-btn small round btn-create-evo">
                    <Plus size={14} /> Nova evolução
                  </button>
                </div>

                <div className="timeline-container">
                  {evolutions.map((e) => (
                    <div className="evolution-entry" key={e.id}>
                      <div className="timeline-dot" />
                      <div className="evo-header">
                        <span className="evo-date">{e.date}</span>
                        <span className="evo-type">{e.type}</span>
                      </div>
                      <div className="evo-body">
                        <p className="evo-summary"><b>Evolução:</b> {e.summary}</p>
                        <p className="evo-plan"><b>Conduta / Plano:</b> {e.plan}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Aba 3: Sessões */}
          {activeTab === 'sessoes' && (
            <div className="tab-content">
              <div className="panel">
                <div className="panel-header">
                  <h2>Sessões Agendadas &amp; Realizadas</h2>
                </div>
                <div className="sessions-list">
                  {evolutions.map((e) => (
                    <div className="session-row" key={e.id}>
                      <div className="session-icon-wrap">
                        <CheckCircle2 className="session-icon" size={18} />
                      </div>
                      <div className="session-info">
                        <span className="session-date">{e.date}</span>
                        <span className="session-type">{e.type}</span>
                      </div>
                      <span className="session-status">Realizada</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Aba 4: Financeiro */}
          {activeTab === 'financeiro' && (
            <div className="tab-content">
              <div className="panel finance-panel">
                <div className="panel-header">
                  <h2>Balanço Financeiro</h2>
                </div>
                <div className="fin-summary-grid">
                  <div className="fin-mini-card">
                    <span>Sessões pagas</span>
                    <b className="val-green">8</b>
                  </div>
                  <div className="fin-mini-card">
                    <span>Sessões pendentes</span>
                    <b className="val-amber">1</b>
                  </div>
                  <div className="fin-mini-card">
                    <span>Valor por sessão</span>
                    <b>R$ 180,00</b>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </Shell>
  );
}