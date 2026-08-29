// Camada única de acesso à API CakePHP.
// Pensada para ser reaproveitada quase sem mudanças no React Native
// (troque apenas a forma de guardar o token: localStorage -> AsyncStorage/SecureStore).

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8765/api';

const TOKEN_KEY = 'skyorbit_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

class ApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

/**
 * Wrapper único de fetch. Todas as funções em api/*.js passam por aqui.
 * @param {string} path - ex: '/patients' ou '/patients/5'
 * @param {object} options - { method, body, params }
 */
export async function request(path, { method = 'GET', body, params } = {}) {
  let url = `${BASE_URL}${path}`;

  if (params) {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ''))
    ).toString();
    if (query) url += `?${query}`;
  }

  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // CakePHP costuma devolver JSON mesmo em erro (via CRUD/Api plugin)
  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    if (res.status === 401) setToken(null); // token expirado/inválido: derruba sessão local
    throw new ApiError(data?.message || `Erro ${res.status}`, res.status, data);
  }

  return data;
}

export const api = {
  get: (path, params) => request(path, { method: 'GET', params }),
  post: (path, body) => request(path, { method: 'POST', body }),
  put: (path, body) => request(path, { method: 'PUT', body }),
  patch: (path, body) => request(path, { method: 'PATCH', body }),
  delete: (path) => request(path, { method: 'DELETE' }),
};

export { ApiError };
