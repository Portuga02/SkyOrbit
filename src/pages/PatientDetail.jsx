import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, CheckCircle2 } from 'lucide-react';
import Shell from '../components/Shell.jsx';
import '../pages/shared.css';
import './PatientDetail.css';

// TODO: carregar dados reais do paciente pelo id da rota (API)
const patient = {
  name: 'Amanda Silva',
  age: 28,
  birthDate: '14/05/1997',
  phone: '(81) 99999-1234',
  email: 'amanda.silva@email.com',
  insurance: 'Não possui',
  professional: 'Sávio Gomes',
  lastSession: '08/07/2025 - 09:00 · Consulta Online',
};

// TODO: histórico real de evolução vindo do prontuário (dado sensível — exige LGPD/CFP)
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
          <button className="back-link" onClick={() => navigate('/patients')}>
            <ArrowLeft size={15} /> Voltar para Pacientes
          </button>

          <div className="patient-header">
            <div className="header-avatar">{patient.name.charAt(0)}</div>
            <div className="header-info">
              <h1>{patient.name}</h1>
              <p>{patient.age} anos · Paciente ativa</p>
            </div>
            <button className="ion-btn outline purple btn-record" onClick={() => setActiveTab('prontuario')}>
              <Plus size={15} /> Nova evolução
            </button>
          </div>

          <div className="tabs-row">
            {[
              ['resumo', 'Resumo'],
              ['prontuario', 'Prontuário'],
              ['sessoes', 'Sessões'],
              ['financeiro', 'Financeiro'],
            ].map(([key, label]) => (
              <button
                key={key}
                className={`tab-btn ${activeTab === key ? 'active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === 'resumo' && (
            <div className="tab-content">
              <div className="content-grid">
                <div className="panel">
                  <h2>Informações</h2>
                  <div className="info-row">
                    <span>Telefone</span>
                    <b>{patient.phone}</b>
                  </div>
                  <div className="info-row">
                    <span>E-mail</span>
                    <b>{patient.email}</b>
                  </div>
                  <div className="info-row">
                    <span>Convênio</span>
                    <b>{patient.insurance}</b>
                  </div>
                  <div className="info-row">
                    <span>Profissional</span>
                    <b>{patient.professional}</b>
                  </div>
                </div>
                <div className="panel">
                  <h2>Última sessão</h2>
                  <p className="last-session-text">{patient.lastSession}</p>
                  <button className="ion-btn outline block" onClick={() => setActiveTab('prontuario')}>
                    Ver prontuário
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'prontuario' && (
            <div className="tab-content">
              <div className="panel">
                <div className="panel-header">
                  <h2>Evoluções</h2>
                  <button className="ion-btn small btn-new-evo">+ Nova evolução</button>
                </div>

                {evolutions.map((e) => (
                  <div className="evolution-entry" key={e.id}>
                    <div className="evo-header">
                      <span className="evo-date">{e.date}</span>
                      <span className="evo-type">{e.type}</span>
                    </div>
                    <p className="evo-summary">{e.summary}</p>
                    <p className="evo-plan">{e.plan}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sessoes' && (
            <div className="tab-content">
              <div className="panel">
                <h2>Histórico de sessões</h2>
                {evolutions.map((e) => (
                  <div className="session-row" key={e.id}>
                    <CheckCircle2 className="session-icon" size={18} />
                    <div className="session-info">
                      <span className="session-date">{e.date}</span>
                      <span className="session-type">{e.type}</span>
                    </div>
                    <span className="session-status">Realizada</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'financeiro' && (
            <div className="tab-content">
              <div className="panel">
                <h2>Financeiro do paciente</h2>
                <div className="fin-row">
                  <span>Sessões pagas</span>
                  <b>8</b>
                </div>
                <div className="fin-row">
                  <span>Sessões pendentes</span>
                  <b>1</b>
                </div>
                <div className="fin-row">
                  <span>Valor por sessão</span>
                  <b>R$ 180,00</b>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Shell>
  );
}
