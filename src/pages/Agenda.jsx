import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Shell from '../components/Shell.jsx';
import './Agenda.css';

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
const DAYS = ['Seg 7', 'Ter 8', 'Qua 9', 'Qui 10', 'Sex 11'];

// TODO: substituir por eventos reais da API (agenda do profissional)
const EVENTS = [
  { day: 0, startHour: 9, endHour: 10, patientName: 'Amanda Silva', type: 'Online', color: '#6c5ce7' },
  { day: 0, startHour: 10, endHour: 11, patientName: 'Bloqueado', type: 'Bloqueado', color: '#c4c6d8' },
  { day: 1, startHour: 10, endHour: 11, patientName: 'Carlos Eduardo', type: 'Presencial', color: '#38bdf8' },
  { day: 2, startHour: 14, endHour: 15, patientName: 'Beatriz Lima', type: 'Online', color: '#f2c879' },
  { day: 3, startHour: 15, endHour: 16, patientName: 'Lucas Pereira', type: 'Presencial', color: '#4ade80' },
  { day: 4, startHour: 17, endHour: 18, patientName: 'Juliana Martins', type: 'Online', color: '#6c5ce7' },
];

function eventStyle(e) {
  const top = (e.startHour - HOURS[0]) * 56;
  const height = (e.endHour - e.startHour) * 56 - 4;
  return {
    top: `${top}px`,
    height: `${height}px`,
    background: e.color + '22',
    borderLeft: `3px solid ${e.color}`,
  };
}

function eventsForDay(dayIndex) {
  return EVENTS.filter((e) => e.day === dayIndex);
}

export default function Agenda() {
  const navigate = useNavigate();

  return (
    <Shell activeTab="agenda">
      <div className="agenda-page">
        <div className="agenda-wrap">
          <div className="page-header">
            <div>
              <h1>Agenda</h1>
              <p>7 – 13 de julho de 2025</p>
            </div>
            <button className="ion-btn round btn-new" onClick={() => navigate('/agenda/new')}>
              <Plus size={16} />
              Nova consulta
            </button>
          </div>

          <div className="calendar-card">
            <div className="calendar-header">
              <div className="hour-col-header"></div>
              {DAYS.map((d) => (
                <div className="day-header" key={d}>
                  {d}
                </div>
              ))}
            </div>

            <div className="calendar-body">
              <div className="hour-col">
                {HOURS.map((h) => (
                  <div className="hour-cell" key={h}>
                    {h}:00
                  </div>
                ))}
              </div>

              {DAYS.map((d, dayIndex) => (
                <div className="day-col" key={d}>
                  {HOURS.map((h) => (
                    <div className="hour-cell-bg" key={h}></div>
                  ))}

                  {eventsForDay(dayIndex).map((e, i) => (
                    <div className="event-block" style={eventStyle(e)} key={i}>
                      <span className="event-name">{e.patientName}</span>
                      {e.type !== 'Bloqueado' && <span className="event-type">{e.type}</span>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
