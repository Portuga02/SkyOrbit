import { Moon, Calendar, Users, Banknote, TrendingUp } from 'lucide-react';
import Shell from '../components/Shell.jsx';
import './Dashboard.css';

const fmt2 = (n) => n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmt0 = (n) => n.toLocaleString('pt-BR', { maximumFractionDigits: 0 });

// TODO: substituir por dados reais da API (agregações do backend)
const stats = {
  consultasHoje: 5,
  consultasConcluidas: 3,
  pacientesAtivos: 28,
  pacientesNovos: 2,
  faturamentoMes: 4890,
  faturamentoVariacao: 12,
  sessoesMes: 42,
  sessoesVariacao: 8,
};

const financeiro = { recebido: 4890, pendente: 1250, cancelado: 320 };

const appointments = [
  { id: '1', patientName: 'Amanda Silva', time: '09:00', type: 'Online', status: 'Em andamento', avatarColor: '#e786c9' },
  { id: '2', patientName: 'Carlos Eduardo', time: '10:30', type: 'Presencial', status: 'Confirmado', avatarColor: '#38bdf8' },
  { id: '3', patientName: 'Beatriz Lima', time: '14:00', type: 'Online', status: 'Confirmado', avatarColor: '#f2c879' },
  { id: '4', patientName: 'Lucas Pereira', time: '15:30', type: 'Presencial', status: 'Confirmado', avatarColor: '#4ade80' },
  { id: '5', patientName: 'Juliana Martins', time: '17:00', type: 'Online', status: 'Confirmado', avatarColor: '#6c5ce7' },
];

export default function Dashboard() {
  const professionalName = 'Sávio';
  const financeiroTotal = financeiro.recebido + financeiro.pendente + financeiro.cancelado;
  const recebidoPct = (financeiro.recebido / financeiroTotal) * 100;
  const pendentePct = (financeiro.pendente / financeiroTotal) * 100;
  const donutStyle = {
    background: `conic-gradient(var(--orb-green) 0% ${recebidoPct}%, var(--orb-amber) ${recebidoPct}% ${
      recebidoPct + pendentePct
    }%, var(--orb-red) ${recebidoPct + pendentePct}% 100%)`,
  };

  return (
    <Shell activeTab="dashboard">
      <div className="dashboard-page">
        <div className="dashboard-wrap">
          <div className="page-header">
            <div>
              <h1>
                Bom dia, {professionalName}! <Moon size={18} />
              </h1>
              <p>Aqui está o resumo do seu dia.</p>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-top">
                <span className="stat-label">Consultas hoje</span>
                <div className="stat-icon">
                  <Calendar size={17} />
                </div>
              </div>
              <div className="stat-value">{stats.consultasHoje}</div>
              <div className="stat-foot">{stats.consultasConcluidas} concluídas</div>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span className="stat-label">Pacientes ativos</span>
                <div className="stat-icon green">
                  <Users size={17} />
                </div>
              </div>
              <div className="stat-value">{stats.pacientesAtivos}</div>
              <div className="stat-foot">+{stats.pacientesNovos} novos esta semana</div>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span className="stat-label">Faturamento (mês)</span>
                <div className="stat-icon amber">
                  <Banknote size={17} />
                </div>
              </div>
              <div className="stat-value">R$ {fmt2(stats.faturamentoMes)}</div>
              <div className="stat-foot up">+{stats.faturamentoVariacao}% em relação ao mês anterior</div>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span className="stat-label">Sessões (mês)</span>
                <div className="stat-icon blue">
                  <TrendingUp size={17} />
                </div>
              </div>
              <div className="stat-value">{stats.sessoesMes}</div>
              <div className="stat-foot up">+{stats.sessoesVariacao}% em relação ao mês anterior</div>
            </div>
          </div>

          <div className="content-grid">
            <div className="panel">
              <div className="panel-header">
                <h2>Próximas consultas</h2>
                <a>Ver agenda completa →</a>
              </div>
              {appointments.map((a) => (
                <div className="appt-row" key={a.id}>
                  <div className="appt-avatar" style={{ background: a.avatarColor }}>
                    {a.patientName.charAt(0)}
                  </div>
                  <div className="appt-info">
                    <span className="appt-name">{a.patientName}</span>
                    <span className="appt-type">{a.type}</span>
                  </div>
                  <span className="appt-time">{a.time}</span>
                  <span className={`appt-status ${a.status === 'Em andamento' ? 'progress' : ''}`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="panel">
              <div className="panel-header">
                <h2>Resumo financeiro</h2>
              </div>
              <div className="donut-wrap">
                <div className="donut" style={donutStyle}>
                  <div className="donut-hole">
                    <span className="donut-value">R$ {fmt0(financeiroTotal)}</span>
                    <span className="donut-label">Total</span>
                  </div>
                </div>
                <div className="donut-legend">
                  <div className="legend-row">
                    <span className="dot green"></span> Recebido <b>R$ {fmt2(financeiro.recebido)}</b>
                  </div>
                  <div className="legend-row">
                    <span className="dot amber"></span> Pendente <b>R$ {fmt2(financeiro.pendente)}</b>
                  </div>
                  <div className="legend-row">
                    <span className="dot red"></span> Cancelado <b>R$ {fmt2(financeiro.cancelado)}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
