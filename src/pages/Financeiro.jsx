import { CheckCircle2, Clock, XCircle, DollarSign, Download } from 'lucide-react';
import Shell from '../components/Shell.jsx';
import './Financeiro.css';

const fmt2 = (n) => n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const summary = { recebido: 4890, pendente: 1250, cancelado: 320 };

const transactions = [
  { id: '1', patientName: 'Amanda Silva', date: '08/07/2025', method: 'Pix', amount: 180, status: 'Pago' },
  { id: '2', patientName: 'Carlos Eduardo', date: '05/07/2025', method: 'Cartão de Crédito', amount: 180, status: 'Pago' },
  { id: '3', patientName: 'Beatriz Lima', date: '01/07/2025', method: 'Boleto', amount: 200, status: 'Pendente' },
  { id: '4', patientName: 'Lucas Pereira', date: '28/06/2025', method: 'Pix', amount: 180, status: 'Pago' },
  { id: '5', patientName: 'Juliana Martins', date: '24/06/2025', method: 'Transferência', amount: 320, status: 'Cancelado' },
];

const statusClass = { Pago: 'paid', Pendente: 'pending', Cancelado: 'cancelled' };

export default function Financeiro() {
  return (
    <Shell activeTab="financeiro">
      <div className="financeiro-page">
        <div className="fin-wrap">
          <div className="page-header">
            <div>
              <h1>Financeiro</h1>
              <p>Controle de recebimentos, fluxo de caixa e pendências.</p>
            </div>
            <button className="ion-btn outline round btn-export">
              <Download size={15} />
              <span>Exportar relatório</span>
            </button>
          </div>

          <div className="summary-grid">
            <div className="summary-card">
              <div className="summary-top">
                <span className="summary-label">Recebido</span>
                <div className="summary-icon green">
                  <CheckCircle2 size={18} />
                </div>
              </div>
              <span className="summary-value green">R$ {fmt2(summary.recebido)}</span>
              <span className="summary-foot">Total liquidado no mês</span>
            </div>

            <div className="summary-card">
              <div className="summary-top">
                <span className="summary-label">Pendente</span>
                <div className="summary-icon amber">
                  <Clock size={18} />
                </div>
              </div>
              <span className="summary-value amber">R$ {fmt2(summary.pendente)}</span>
              <span className="summary-foot">Aguardando confirmação</span>
            </div>

            <div className="summary-card">
              <div className="summary-top">
                <span className="summary-label">Cancelado</span>
                <div className="summary-icon red">
                  <XCircle size={18} />
                </div>
              </div>
              <span className="summary-value red">R$ {fmt2(summary.cancelado)}</span>
              <span className="summary-foot">Sessões desmarcadas</span>
            </div>
          </div>

          <div className="panel fin-panel">
            <div className="panel-title-area">
              <h2>Transações recentes</h2>
              <span className="tx-count">{transactions.length} registros</span>
            </div>

            <div className="table-responsive">
              <div className="tx-table-header">
                <span>Paciente</span>
                <span>Data</span>
                <span>Forma</span>
                <span>Valor</span>
                <span style={{ textAlign: 'right' }}>Status</span>
              </div>

              {transactions.map((t) => (
                <div className="tx-row" key={t.id}>
                  <div className="tx-patient">
                    <div className="tx-avatar">{t.patientName.charAt(0)}</div>
                    <span className="tx-name">{t.patientName}</span>
                  </div>
                  <span className="tx-date">{t.date}</span>
                  <span className="tx-method">{t.method}</span>
                  <span className="tx-amount">R$ {fmt2(t.amount)}</span>
                  <div className="tx-status-col">
                    <span className={`tx-status ${statusClass[t.status]}`}>{t.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}