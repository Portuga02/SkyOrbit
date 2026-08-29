import { api } from './client.js';

export function listAppointments(params) {
  // params: { start_date, end_date, patient_id }
  return api.get('/appointments', params);
}

export function createAppointment(payload) {
  // payload: { patient_id, date, time, duration_minutes, type: 'online'|'presencial', notes }
  return api.post('/appointments', payload);
}

export function updateAppointment(id, payload) {
  return api.put(`/appointments/${id}`, payload);
}

export function cancelAppointment(id) {
  return api.delete(`/appointments/${id}`);
}
