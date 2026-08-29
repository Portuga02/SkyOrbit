import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, UserCheck, Calendar, Clock, Timer, ArrowLeft } from 'lucide-react';
import Shell from '../components/Shell.jsx';
import './NewAppointment.css';

const PATIENTS = ['Amanda Silva', 'Carlos Eduardo', 'Beatriz Lima', 'Lucas Pereira', 'Juliana Martins'];

export default function NewAppointment() {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState(50);
  const [type, setType] = useState('Online');
  const [notes, setNotes] = useState('');

  function save(e) {
    e.preventDefault();
    if (!selectedPatient || !date || !time) return;
    navigate('/agenda');
  }

  return (
    <Shell activeTab="agenda">
      <div className="new-appt-page">
        <div className="new-appt-wrap">
          <button type="button" className="btn-back" onClick={() => navigate('/agenda')}>
            <ArrowLeft size={16} />
            <span>Voltar para Agenda</span>
          </button>

          <div className="page-header">
            <h1>Nova Consulta</h1>
            <p>Preencha os detalhes para reservar o horário do paciente.</p>
          </div>

          <form className="panel form-panel" onSubmit={save}>
            <div className="form-group">
              <label htmlFor="patient-select">Paciente *</label>
              <div className="select-wrapper">
                <select
                  id="patient-select"
                  className="form-control"
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Selecione o paciente cadastrado
                  </option>
                  {PATIENTS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field-grid">
              <div className="form-group">
                <label>Data *</label>
                <div className="input-icon-wrap">
                  <Calendar size={16} className="input-icon" />
                  <input
                    type="date"
                    className="form-control with-icon"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Horário *</label>
                <div className="input-icon-wrap">
                  <Clock size={16} className="input-icon" />
                  <input
                    type="time"
                    className="form-control with-icon"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Duração (min)</label>
                <div className="input-icon-wrap">
                  <Timer size={16} className="input-icon" />
                  <input
                    type="number"
                    min="15"
                    step="5"
                    className="form-control with-icon"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Modalidade de Atendimento</label>
              <div className="radio-row">
                <button
                  type="button"
                  className={`radio-chip ${type === 'Online' ? 'selected' : ''}`}
                  onClick={() => setType('Online')}
                >
                  <Globe size={16} />
                  <span>Online</span>
                </button>
                <button
                  type="button"
                  className={`radio-chip ${type === 'Presencial' ? 'selected' : ''}`}
                  onClick={() => setType('Presencial')}
                >
                  <UserCheck size={16} />
                  <span>Presencial</span>
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Observações Clínicas (Opcional)</label>
              <textarea
                className="form-control"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Foco na devolutiva do teste ou queixa pontual..."
                rows={3}
              />
            </div>

            <div className="actions-row">
              <button type="button" className="ion-btn outline round btn-cancel" onClick={() => navigate('/agenda')}>
                Cancelar
              </button>
              <button type="submit" className="ion-btn round btn-save">
                Confirmar Agendamento
              </button>
            </div>
          </form>
        </div>
      </div>
    </Shell>
  );
}