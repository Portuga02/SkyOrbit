import Shell from '../components/Shell.jsx';
import './Financeiro.css';

const fmt2 = (n) => n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// TODO: substituir por dados reais da API financeira
const summary = { recebido: 4890, pendente: 1250, cancelado: 320 };

const transactions = [
  { id: '1', patientName: 'Amanda Silva', date: '08/07/2025', amount: 180, status: 'Pago' },
  { id: '2', patientName: 'Carlos Eduardo', date: '05/07/2025', amount: 180, status: 'Pago' },
  { id: '3', patientName: 'Beatriz Lima', date: '01/07/2025', amount: 200, status: 'Pendente' },
  { id: '4', patientName: 'Lucas Pereira', date: '28/06/2025', amount: 180, status: 'Pago' },
  { id: '5', patientName: 'Juliana Martins', date: '24/06/2025', amount: 320, status: 'Cancelado' },
];

const statusClass = { Pago: 'paid', Pendente: 'pending', Cancelado: 'cancelled' };

export default function Financeiro() {
  return (
    <Shell activeTab="financeiro">
      <div className="financeiro-page">
        <div className="fin-wrap">
          <div className="page-header">
            <h1>Financeiro</h1>
            <p>Controle de recebimentos e pendências</p>
          </div>

          <div className="summary-grid">
            <div className="summary-card">
              <span className="summary-label">Recebido</span>
              <span className="summary-value green">R$ {fmt2(summary.recebido)}</span>
            </div>
            <div className="summary-card">
              <span className="summary-label">Pendente</span>
              <span className="summary-value amber">R$ {fmt2(summary.pendente)}</span>
            </div>
            <div className="summary-card">
              <span className="summary-label">Cancelado</span>
              <span className="summary-value red">R$ {fmt2(summary.cancelado)}</span>
            </div>
          </div>

          <div className="panel">
            <h2>Transações recentes</h2>
            {transactions.map((t) => (
              <div className="tx-row" key={t.id}>
                <span className="tx-name">{t.patientName}</span>
                <span className="tx-date">{t.date}</span>
                <span className="tx-amount">R$ {fmt2(t.amount)}</span>
                <span className={`tx-status ${statusClass[t.status]}`}>{t.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}
