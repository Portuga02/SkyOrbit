import { api } from './client.js';

// Relatórios: o backend gera o PDF e devolve uma URL de download (ou o binário, dependendo da rota)
export function generateReport(reportType, params) {
  // reportType: 'declaracao' | 'relatorio' | 'financeiro' | 'sessoes'
  // params: { patient_id, start_date, end_date }
  return api.post(`/reports/${reportType}`, params);
  // Esperado: { url: 'https://.../arquivo.pdf' } para abrir/baixar
}

export function getProfile() {
  return api.get('/professionals/me');
}

export function updateProfile(payload) {
  // payload: { name, crp, notify_email, notify_sms }
  return api.put('/professionals/me', payload);
}
