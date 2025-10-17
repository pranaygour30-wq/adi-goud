export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

console.log('[api] Using API_BASE:', API_BASE);

async function request(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('memberToken');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  return res.json();
}

export const api = {
  authLogin: (email: string, phone: string) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, phone })
    }),

  members: () => request('/members'),
  member: (id: string) => request(`/members/${id}`),
  officebearers: () => request('/officebearers'),
  events: () => request('/events'),
  gallery: () => request('/gallery'),
  redClub: () => request('/members?bloodGroup=O%2B'),
  birthdays: () => request('/members/birthdays'),
  anniversaries: () => request('/members/anniversaries')
};