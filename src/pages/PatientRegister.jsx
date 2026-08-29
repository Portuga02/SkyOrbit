import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Trash2, Plus, ArrowLeft, User, Pill, Users, ClipboardList } from 'lucide-react';
import Shell from '../components/Shell.jsx';
import './PatientRegister.css';

export default function PatientRegister() {
  const navigate = useNavigate();

  const [photoPreview, setPhotoPreview] = useState(null);
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [insurance, setInsurance] = useState('');

  const [takesMedication, setTakesMedication] = useState(null);
  const [medicationDetails, setMedicationDetails] = useState('');

  const [hasDependents, setHasDependents] = useState(null);
  const [dependents, setDependents] = useState([]);

  const [mainComplaint, setMainComplaint] = useState('');
  const [history, setHistory] = useState('');

  function readAsDataUrl(file, cb) {
    const reader = new FileReader();
    reader.onload = () => cb(reader.result);
    reader.readAsDataURL(file);
  }

  function onPatientPhotoSelected(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    readAsDataUrl(file, setPhotoPreview);
  }

  function onDependentPhotoSelected(e, depId) {
    const file = e.target.files?.[0];
    if (!file) return;
    readAsDataUrl(file, (result) => {
      setDependents((prev) => prev.map((d) => (d.id === depId ? { ...d, photoPreview: result } : d)));
    });
  }

  function addDependent() {
    setDependents((prev) => [
      ...prev,
      { id: Date.now().toString(), name: '', cpf: '', age: '', relationship: '', photoPreview: null },
    ]);
  }

  function removeDependent(id) {
    setDependents((prev) => prev.filter((d) => d.id !== id));
  }

  function updateDependent(id, field, value) {
    setDependents((prev) => prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  }

  function onMedicationChange(value) {
    setTakesMedication(value);
    if (value === 'nao') setMedicationDetails('');
  }

  function onDependentsChange(value) {
    setHasDependents(value);
    if (value === 'nao') setDependents([]);
    if (value === 'sim' && dependents.length === 0) addDependent();
  }

  function cancel() {
    navigate('/patients');
  }

  function save(e) {
    e.preventDefault();
    if (!name || !birthDate) return;
    navigate('/patients');
  }

  return (
    <Shell activeTab="patients">
      <div className="register-page">
        <div className="register-wrap">
          <button type="button" className="btn-back" onClick={cancel}>
            <ArrowLeft size={16} />
            <span>Voltar para Pacientes</span>
          </button>

          <div className="page-header">
            <div>
              <h1>Novo Paciente</h1>
              <p>Cadastre os dados pessoais, clínicos e anamnese inicial.</p>
            </div>
          </div>

          <form className="register-form" onSubmit={save}>
            
            {/* DADOS PESSOAIS */}
            <div className="panel form-panel">
              <div className="panel-title-with-icon">
                <User size={18} className="panel-icon" />
                <h2>Dados Pessoais</h2>
              </div>

              <div className="photo-row">
                <label className="photo-upload" htmlFor="patient-photo">
                  {photoPreview ? <img src={photoPreview} alt="Foto do paciente" /> : <Camera size={26} />}
                </label>
                <input
                  id="patient-photo"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={onPatientPhotoSelected}
                />
                <span className="photo-hint">Adicionar foto do paciente</span>
              </div>

              <div className="field-grid two-cols">
                <div className="form-group full-width">
                  <label>Nome completo *</label>
                  <input
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome completo do paciente"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Data de nascimento *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>CPF</label>
                  <input
                    className="form-control"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="000.000.000-00"
                  />
                </div>

                <div className="form-group">
                  <label>Telefone / WhatsApp</label>
                  <input
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(81) 99999-0000"
                  />
                </div>

                <div className="form-group">
                  <label>E-mail</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="paciente@email.com"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Convênio / Plano de Saúde</label>
                  <input
                    className="form-control"
                    value={insurance}
                    onChange={(e) => setInsurance(e.target.value)}
                    placeholder="Particular ou nome do convênio"
                  />
                </div>
              </div>
            </div>

            {/* USO DE MEDICAÇÃO */}
            <div className="panel form-panel">
              <div className="panel-title-with-icon">
                <Pill size={18} className="panel-icon" />
                <h2>Uso de Medicação</h2>
              </div>
              <p className="panel-sub">O paciente faz uso contínuo de medicação psiquiátrica ou controlada?</p>

              <div className="radio-row">
                <button
                  type="button"
                  className={`radio-chip ${takesMedication === 'sim' ? 'selected' : ''}`}
                  onClick={() => onMedicationChange('sim')}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={`radio-chip ${takesMedication === 'nao' ? 'selected' : ''}`}
                  onClick={() => onMedicationChange('nao')}
                >
                  Não
                </button>
              </div>

              {takesMedication === 'sim' && (
                <div className="conditional-box">
                  <label>Quais medicamentos? (nome, dosagem e posologia)</label>
                  <textarea
                    className="form-control"
                    value={medicationDetails}
                    onChange={(e) => setMedicationDetails(e.target.value)}
                    placeholder="Ex: Escitalopram 10mg - 1 comprimido pela manhã..."
                    rows={3}
                  />
                </div>
              )}
            </div>

            {/* DEPENDENTES */}
            <div className="panel form-panel">
              <div className="panel-title-with-icon">
                <Users size={18} className="panel-icon" />
                <h2>Possui Dependentes?</h2>
              </div>
              <p className="panel-sub">Cadastre filhos ou familiares acompanhados neste prontuário.</p>

              <div className="radio-row">
                <button
                  type="button"
                  className={`radio-chip ${hasDependents === 'sim' ? 'selected' : ''}`}
                  onClick={() => onDependentsChange('sim')}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={`radio-chip ${hasDependents === 'nao' ? 'selected' : ''}`}
                  onClick={() => onDependentsChange('nao')}
                >
                  Não
                </button>
              </div>

              {hasDependents === 'sim' && (
                <div className="conditional-box">
                  {dependents.map((dep, i) => (
                    <div className="dependent-card" key={dep.id}>
                      <div className="dependent-header">
                        <span>Dependente {i + 1}</span>
                        <button
                          type="button"
                          className="remove-btn"
                          aria-label="Remover dependente"
                          onClick={() => removeDependent(dep.id)}
                        >
                          <Trash2 size={16} />
                          <span>Remover</span>
                        </button>
                      </div>

                      <div className="dependent-body">
                        <div className="dep-photo-col">
                          <label className="photo-upload small" htmlFor={`dep-photo-${dep.id}`}>
                            {dep.photoPreview ? (
                              <img src={dep.photoPreview} alt="Foto do dependente" />
                            ) : (
                              <Camera size={18} />
                            )}
                          </label>
                          <input
                            id={`dep-photo-${dep.id}`}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => onDependentPhotoSelected(e, dep.id)}
                          />
                        </div>

                        <div className="dependent-fields-grid">
                          <div className="form-group full-width">
                            <label>Nome do dependente</label>
                            <input
                              className="form-control"
                              value={dep.name}
                              onChange={(e) => updateDependent(dep.id, 'name', e.target.value)}
                              placeholder="Nome completo"
                            />
                          </div>
                          <div className="form-group">
                            <label>CPF</label>
                            <input
                              className="form-control"
                              value={dep.cpf}
                              onChange={(e) => updateDependent(dep.id, 'cpf', e.target.value)}
                              placeholder="000.000.000-00"
                            />
                          </div>
                          <div className="form-group">
                            <label>Idade</label>
                            <input
                              type="number"
                              className="form-control"
                              value={dep.age}
                              onChange={(e) => updateDependent(dep.id, 'age', e.target.value)}
                              placeholder="Ex: 8"
                            />
                          </div>
                          <div className="form-group full-width">
                            <label>Grau de parentesco</label>
                            <input
                              className="form-control"
                              value={dep.relationship}
                              onChange={(e) => updateDependent(dep.id, 'relationship', e.target.value)}
                              placeholder="Filho(a), Cônjuge, Irmão(ã)..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="ion-btn outline purple block round btn-add-dependent"
                    onClick={addDependent}
                  >
                    <Plus size={16} /> Adicionar outro dependente
                  </button>
                </div>
              )}
            </div>

            {/* ANAMNESE */}
            <div className="panel form-panel">
              <div className="panel-title-with-icon">
                <ClipboardList size={18} className="panel-icon" />
                <h2>Anamnese Inicial</h2>
              </div>

              <div className="form-group">
                <label>Queixa principal</label>
                <textarea
                  className="form-control"
                  value={mainComplaint}
                  onChange={(e) => setMainComplaint(e.target.value)}
                  placeholder="Motivo principal da procura pelo atendimento psicológico..."
                  rows={2}
                />
              </div>

              <div className="form-group">
                <label>Histórico relevante</label>
                <textarea
                  className="form-control"
                  value={history}
                  onChange={(e) => setHistory(e.target.value)}
                  placeholder="Histórico clínico, dinâmicas familiares, tratamentos anteriores e contexto social..."
                  rows={4}
                />
              </div>
            </div>

            {/* AÇÕES FINAIS */}
            <div className="actions-row">
              <button type="button" className="ion-btn outline round btn-cancel" onClick={cancel}>
                Cancelar
              </button>
              <button type="submit" className="ion-btn round btn-save">
                Salvar Paciente
              </button>
            </div>

          </form>
        </div>
      </div>
    </Shell>
  );
}