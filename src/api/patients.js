import { api } from './client.js';

// Assume rotas REST padrão do CakePHP (baked com bin/cake bake): /patients, /patients/{id}
// Ajuste os nomes dos campos quando a tabela real estiver definida.

export function listPatients(params) {
  // params: { search, status, page }
  return api.get('/patients', params);
}

export function getPatient(id) {
  return api.get(`/patients/${id}`);
}

export function createPatient(payload) {
  // payload: { name, birth_date, cpf, phone, email, insurance, takes_medication, medication_details, dependents: [...] }
  return api.post('/patients', payload);
}

export function updatePatient(id, payload) {
  return api.put(`/patients/${id}`, payload);
}

export function deletePatient(id) {
  return api.delete(`/patients/${id}`);
}

// Prontuário / evoluções (dado sensível — endpoint deve exigir profissional autenticado e dono do paciente)
export function listEvolutions(patientId) {
  return api.get(`/patients/${patientId}/evolutions`);
}

export function createEvolution(patientId, payload) {
  // payload: { summary, plan, session_type }
  return api.post(`/patients/${patientId}/evolutions`, payload);
}
