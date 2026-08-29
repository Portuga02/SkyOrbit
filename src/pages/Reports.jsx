import { useState } from 'react';
import { FileText, ClipboardList, Banknote, Calendar, Download, ShieldCheck } from 'lucide-react';
import Shell from '../components/Shell.jsx';
import './shared.css';
import './Reports.css';

const REPORT_ICONS = {
  declaracao: FileText,
  relatorio: ClipboardList,
  financeiro: Banknote,
  sessoes: Calendar,
};

const REPORT_TYPES = [
  {
    id: 'declaracao',
    title: 'Declaração de comparecimento',
    description: 'Documento simples confirmando presença, sem detalhes clínicos',
  },
  {
    id: 'relatorio',
    title: 'Relatório psicológico',
    description: 'Documento completo com evolução e conclusão técnica',
  },
  {
    id: 'financeiro',
    title: 'Relatório financeiro',
    description: 'Resumo de recebimentos e pendências por período',
  },
  {
    id: 'sessoes',
    title: 'Frequência de sessões',
    description: 'Histórico de sessões realizadas, canceladas e faltas',
  },
];

// TODO: substituir por lista real de pacientes vinda da API
const PATIENTS = ['Amanda Silva', 'Carlos Eduardo', 'Beatriz Lima', 'Lucas Pereira', 'Juliana Martins'];

export default function Reports() {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [generating, setGenerating] = useState(null);

  // TODO: chamar endpoint real de geração de PDF (respeitando as regras do CFP por tipo de documento)
  function generate(reportId) {
    setGenerating(reportId);
    setTimeout(() => setGenerating(null), 1200);
  }

  return (
    <Shell activeTab="reports">
      <div className="reports-page">
        <div className="reports-wrap">
          <div className="page-header">
            <h1>Relatórios</h1>
            <p>Emita declarações e relatórios em PDF</p>
          </div>

          <div className="filters-panel">
            <div className="field">
              <label>Paciente (opcional)</label>
              <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
                <option value="">Todos os pacientes</option>
                {PATIENTS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>De</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="field">
              <label>Até</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>

          <div className="reports-grid">
            {REPORT_TYPES.map((r) => {
              const Icon = REPORT_ICONS[r.id];
              const isGenerating = generating === r.id;
              return (
                <div className="report-card" key={r.id}>
                  <div className="report-icon">
                    <Icon size={20} />
                  </div>
                  <div className="report-info">
                    <span className="report-title">{r.title}</span>
                    <span className="report-desc">{r.description}</span>
                  </div>
                  <button className="ion-btn btn-generate" disabled={isGenerating} onClick={() => generate(r.id)}>
                    {isGenerating ? (
                      <span className="spinner" />
                    ) : (
                      <span>
                        <Download size={15} /> Gerar PDF
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="legal-note">
            <ShieldCheck size={18} />
            <p>
              Cada tipo de documento segue as regras do CFP quanto ao nível de detalhe permitido — a declaração
              de comparecimento nunca revela conteúdo clínico, diferente do relatório psicológico completo.
            </p>
          </div>
        </div>
      </div>
    </Shell>
  );
}
