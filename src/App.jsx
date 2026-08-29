import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Patients from './pages/Patients.jsx';
import PatientDetail from './pages/PatientDetail.jsx';
import PatientRegister from './pages/PatientRegister.jsx';
import Agenda from './pages/Agenda.jsx';
import NewAppointment from './pages/NewAppointment.jsx';
import Financeiro from './pages/Financeiro.jsx';
import Teleatendimento from './pages/Teleatendimento.jsx';
import Reports from './pages/Reports.jsx';
import Settings from './pages/Settings.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/patients/new" element={<PatientRegister />} />
      <Route path="/patients/:id" element={<PatientDetail />} />
      <Route path="/agenda" element={<Agenda />} />
      <Route path="/agenda/new" element={<NewAppointment />} />
      <Route path="/financeiro" element={<Financeiro />} />
      <Route path="/teleatendimento" element={<Teleatendimento />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
