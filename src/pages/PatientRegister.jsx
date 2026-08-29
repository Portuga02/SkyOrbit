import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Circle, Dot, Trash2, Plus } from 'lucide-react';
import Shell from '../components/Shell.jsx';
import './shared.css';
import './PatientRegister.css';

function RadioIcon({ selected }) {
  return selected ? <Dot size={20} strokeWidth={5} /> : <Circle size={16} />;
}

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

  // TODO: enviar pro backend real (POST /patients), incluindo upload de fotos
  function save() {
    if (!name || !birthDate) return;
    navigate('/patients');
  }

  function cancel() {
    navigate('/patients');
  }

  return (
    <Shell activeTab="patients">
      <div className="register-page">
        <div className="register-wrap">
          <div className="page-header">
            <div>
              <h1>Novo paciente</h1>
              <p>Preencha os dados abaixo para cadastrar</p>
            </div>
          </div>

          {/* FOTO + DADOS BÁSICOS */}
          <div className="panel">
            <h2>Dados pessoais</h2>

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
              <span className="photo-hint">Adicionar foto</span>
            </div>

            <div className="field-grid">
              <div className="field">
                <label>Nome completo *</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do paciente" />
              </div>
              <div className="field">
                <label>Data de nascimento *</label>
                <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
              </div>
              <div className="field">
                <label>CPF</label>
                <input value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="000.000.000-00" />
              </div>
              <div className="field">
                <label>Telefone</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(81) 99999-0000" />
              </div>
              <div className="field">
                <label>E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="paciente@email.com"
                />
              </div>
              <div className="field">
                <label>Convênio</label>
                <input
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                  placeholder="Não possui"
                />
              </div>
            </div>
          </div>

          {/* MEDICAÇÃO — CONDICIONAL */}
          <div className="panel">
            <h2>Uso de medicação</h2>
            <div className="radio-row">
              <button
                className={`radio-chip ${takesMedication === 'sim' ? 'selected' : ''}`}
                onClick={() => onMedicationChange('sim')}
              >
                <RadioIcon selected={takesMedication === 'sim'} /> Sim
              </button>
              <button
                className={`radio-chip ${takesMedication === 'nao' ? 'selected' : ''}`}
                onClick={() => onMedicationChange('nao')}
              >
                <RadioIcon selected={takesMedication === 'nao'} /> Não
              </button>
            </div>

            {takesMedication === 'sim' && (
              <div className="conditional-box">
                <label>Quais medicamentos? (nome, dosagem, frequência)</label>
                <textarea
                  value={medicationDetails}
                  onChange={(e) => setMedicationDetails(e.target.value)}
                  placeholder="Ex: Sertralina 50mg, 1x ao dia pela manhã"
                  rows={3}
                />
              </div>
            )}
          </div>

          {/* DEPENDENTES — CONDICIONAL COM LISTA DINÂMICA */}
          <div className="panel">
            <h2>Possui dependentes?</h2>
            <div className="radio-row">
              <button
                className={`radio-chip ${hasDependents === 'sim' ? 'selected' : ''}`}
                onClick={() => onDependentsChange('sim')}
              >
                <RadioIcon selected={hasDependents === 'sim'} /> Sim
              </button>
              <button
                className={`radio-chip ${hasDependents === 'nao' ? 'selected' : ''}`}
                onClick={() => onDependentsChange('nao')}
              >
                <RadioIcon selected={hasDependents === 'nao'} /> Não
              </button>
            </div>

            {hasDependents === 'sim' && (
              <div className="conditional-box">
                {dependents.map((dep, i) => (
                  <div className="dependent-card" key={dep.id}>
                    <div className="dependent-header">
                      <span>Dependente {i + 1}</span>
                      <button
                        className="remove-btn"
                        aria-label="Remover dependente"
                        onClick={() => removeDependent(dep.id)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>

                    <div className="dependent-body">
                      <label className="photo-upload small" htmlFor={`dep-photo-${dep.id}`}>
                        {dep.photoPreview ? (
                          <img src={dep.photoPreview} alt="Foto do dependente" />
                        ) : (
                          <Camera size={22} />
                        )}
                      </label>
                      <input
                        id={`dep-photo-${dep.id}`}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => onDependentPhotoSelected(e, dep.id)}
                      />

                      <div className="field-grid dependent-grid">
                        <div className="field">
                          <label>Nome</label>
                          <input
                            value={dep.name}
                            onChange={(e) => updateDependent(dep.id, 'name', e.target.value)}
                            placeholder="Nome do dependente"
                          />
                        </div>
                        <div className="field">
                          <label>CPF</label>
                          <input
                            value={dep.cpf}
                            onChange={(e) => updateDependent(dep.id, 'cpf', e.target.value)}
                            placeholder="000.000.000-00"
                          />
                        </div>
                        <div className="field">
                          <label>Idade</label>
                          <input
                            type="number"
                            value={dep.age}
                            onChange={(e) => updateDependent(dep.id, 'age', e.target.value)}
                            placeholder="0"
                          />
                        </div>
                        <div className="field">
                          <label>Parentesco</label>
                          <input
                            value={dep.relationship}
                            onChange={(e) => updateDependent(dep.id, 'relationship', e.target.value)}
                            placeholder="Filho(a), cônjuge..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button className="ion-btn outline purple block btn-add-dependent" onClick={addDependent}>
                  <Plus size={16} /> Adicionar dependente
                </button>
              </div>
            )}
          </div>

          {/* ANAMNESE */}
          <div className="panel">
            <h2>Anamnese</h2>
            <div className="field">
              <label>Queixa principal</label>
              <textarea
                value={mainComplaint}
                onChange={(e) => setMainComplaint(e.target.value)}
                placeholder="Motivo da procura por atendimento"
                rows={2}
              />
            </div>
            <div className="field">
              <label>Histórico</label>
              <textarea
                value={history}
                onChange={(e) => setHistory(e.target.value)}
                placeholder="Histórico relevante (saúde, familiar, social)"
                rows={4}
              />
            </div>
          </div>

          <div className="actions-row">
            <button className="ion-btn outline" onClick={cancel}>
              Cancelar
            </button>
            <button className="ion-btn btn-save" onClick={save}>
              Salvar paciente
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}
