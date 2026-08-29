import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Circle, Dot } from 'lucide-react';
import Shell from '../components/Shell.jsx';
import './shared.css';
import './NewAppointment.css';

function RadioIcon({ selected }) {
  return selected ? <Dot size={20} strokeWidth={5} /> : <Circle size={16} />;
}

// TODO: substituir por lista real de pacientes vinda da API
const PATIENTS = ['Amanda Silva', 'Carlos Eduardo', 'Beatriz Lima', 'Lucas Pereira', 'Juliana Martins'];

export default function NewAppointment() {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState(50);
  const [type, setType] = useState('Online');
  const [notes, setNotes] = useState('');

  // TODO: enviar pro backend real (POST /appointments)
  function save() {
    if (!selectedPatient || !date || !time) return;
    navigate('/agenda');
  }

  function cancel() {
    navigate('/agenda');
  }

  return (
    <Shell activeTab="agenda">
      <div className="new-appt-page">
        <div className="new-appt-wrap">
          <div className="page-header">
            <h1>Nova consulta</h1>
            <p>Agende um horário para um paciente</p>
          </div>

          <div className="panel">
            <div className="field">
              <label>Paciente *</label>
              <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
                <option value="" disabled>
                  Selecione o paciente
                </option>
                {PATIENTS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="field-grid">
              <div className="field">
                <label>Data *</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="field">
                <label>Horário *</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
              </div>
              <div className="field">
                <label>Duração (min)</label>
                <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
              </div>
            </div>

            <div className="field">
              <label>Tipo de consulta</label>
              <div className="radio-row">
                <button className={`radio-chip ${type === 'Online' ? 'selected' : ''}`} onClick={() => setType('Online')}>
                  <RadioIcon selected={type === 'Online'} /> Online
                </button>
                <button
                  className={`radio-chip ${type === 'Presencial' ? 'selected' : ''}`}
                  onClick={() => setType('Presencial')}
                >
                  <RadioIcon selected={type === 'Presencial'} /> Presencial
                </button>
              </div>
            </div>

            <div className="field">
              <label>Observações</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Observações sobre a consulta (opcional)"
                rows={3}
              />
            </div>
          </div>

          <div className="actions-row">
            <button className="ion-btn outline" onClick={cancel}>
              Cancelar
            </button>
            <button className="ion-btn btn-save" onClick={save}>
              Agendar consulta
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}
