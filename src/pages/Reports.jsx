import { useState } from 'react';
import { 
  FileText, 
  ClipboardList, 
  Banknote, 
  Calendar, 
  Download, 
  ShieldCheck, 
  Check, 
  Filter, 
  Loader2 
} from 'lucide-react';
import Shell from '../components/Shell.jsx';
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
    title: 'Declaração de Comparecimento',
    description: 'Documento simples confirmando presença em sessão, sem revelar diagnósticos ou dados clínicos.',
    tag: 'Fins Justificativos',
    color: '#6c5ce7',
  },
  {
    id: 'relatorio',
    title: 'Relatório Psicológico Completo',
    description: 'Documento técnico e circunstanciado com histórico, objetivos, evolução clínica e parecer técnico.',
    tag: 'Técnico / Sigiloso',
    color: '#38bdf8',
  },
  {
    id: 'financeiro',
    title: 'Extrato & Relatório Financeiro',
    description: 'Balanço consolidado de consultas pagas, pendentes e recibos para declaração de imposto de renda.',
    tag: 'Administrativo',
    color: '#22c55e',
  },
  {
    id: 'sessoes',
    title: 'Frequência & Faltas',
    description: 'Histórico detalhado de assiduidade com taxa de presença, reagendamentos e ausências justificadas.',
    tag: 'Controle de Fluxo',
    color: '#f5a524',
  },
];

const PATIENTS = ['Amanda Silva', 'Carlos Eduardo', 'Beatriz Lima', 'Lucas Pereira', 'Juliana Martins'];

export default function Reports() {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [generatingId, setGeneratingId] = useState(null);
  const [completedId, setCompletedId] = useState(null);

  function handleGenerate(reportId) {
    setGeneratingId(reportId);
    setCompletedId(null);

    // Simulação do tempo de renderização do PDF
    setTimeout(() => {
      setGeneratingId(null);
      setCompletedId(reportId);
      setTimeout(() => setCompletedId(null), 3000);
    }, 1200);
  }

  return (
    <Shell activeTab="reports">
      <div className="reports-page">
        <div className="reports-wrap">
          
          <div className="page-header">
            <div>
              <h1>Emissão de Relatórios &amp; Declarações</h1>
              <p>Gere documentos oficiais e exportações estruturadas em PDF com conformidade técnica.</p>
            </div>
          </div>

          {/* Painel de Filtros */}
          <div className="panel filters-panel">
            <div className="filter-header">
              <Filter size={16} className="filter-icon" />
              <span>Filtros do Documento</span>
            </div>

            <div className="filter-grid">
              <div className="form-group">
                <label>Paciente Alvo</label>
                <select
                  className="form-control"
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                >
                  <option value="">Todos os pacientes da clínica</option>
                  {PATIENTS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Período Inicial</label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Período Final</label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Grid de Modelos de Relatórios */}
          <div className="reports-grid">
            {REPORT_TYPES.map((r) => {
              const Icon = REPORT_ICONS[r.id];
              const isGenerating = generatingId === r.id;
              const isDone = completedId === r.id;

              return (
                <div className="panel report-card" key={r.id}>
                  <div className="report-card-top">
                    <div className="report-icon" style={{ color: r.color, backgroundColor: `${r.color}15` }}>
                      <Icon size={22} />
                    </div>
                    <span className="report-badge" style={{ color: r.color, backgroundColor: `${r.color}12` }}>
                      {r.tag}
                    </span>
                  </div>

                  <div className="report-info">
                    <h2 className="report-title">{r.title}</h2>
                    <p className="report-desc">{r.description}</p>
                  </div>

                  <div className="report-card-footer">
                    <button
                      type="button"
                      className={`ion-btn round btn-generate ${isDone ? 'success' : ''}`}
                      disabled={isGenerating}
                      onClick={() => handleGenerate(r.id)}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 size={16} className="spin-icon" />
                          <span>Gerando documento...</span>
                        </>
                      ) : isDone ? (
                        <>
                          <Check size={16} />
                          <span>PDF Gerado com Sucesso!</span>
                        </>
                      ) : (
                        <>
                          <Download size={15} />
                          <span>Emitir em PDF</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Nota Ética / CFP */}
          <div className="legal-note">
            <ShieldCheck size={22} />
            <div>
              <h3>Resolução CFP &amp; Conformidade de Sigilo</h3>
              <p>
                Os documentos são gerados de acordo com os padrões técnicos do Conselho Federal de Psicologia. 
                A <b>Declaração de Comparecimento</b> limita-se a atestar a data/horário sem expor a queixa, 
                enquanto o <b>Relatório Psicológico</b> deve ser guardado sob sigilo profissional estrito.
              </p>
            </div>
          </div>

        </div>
      </div>
    </Shell>
  );
}