import { api } from './client.js';

export function getFinancialSummary(params) {
  // params: { start_date, end_date } -> { recebido, pendente, cancelado }
  return api.get('/financial/summary', params);
}

export function listTransactions(params) {
  // params: { patient_id, status, start_date, end_date, page }
  return api.get('/financial/transactions', params);
}

export function markTransactionPaid(id) {
  return api.patch(`/financial/transactions/${id}`, { status: 'paid' });
}
