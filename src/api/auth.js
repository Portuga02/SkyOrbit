import { api, setToken } from './client.js';

// Espelha o que um endpoint padrão de auth em CakePHP (ex: via plugin Authentication + JWT) devolve.
// POST /api/auth/login -> { token, user: { id, name, role, ... } }

export async function login(email, password) {
  const data = await api.post('/auth/login', { email, password });
  if (data?.token) setToken(data.token);
  return data;
}

export function logout() {
  setToken(null);
  // TODO: se o backend tiver blacklist de token, chamar api.post('/auth/logout')
}

export function me() {
  return api.get('/auth/me');
}
