const BASE_URL = (import.meta.env.VITE_API_URL ||'https://backend-server-ham1.onrender.com').replace(/\/$/, '');
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('auth_token');

  const headers = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  } as Record<string, string>;

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Handle logout/unauthorized
    if (response.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.dispatchEvent(new Event('auth-status-changed'));
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || data.error || 'API request failed');
    }

    return data;
  } catch (error: any) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

export const authApi = {
  signUp: (data: any) => {
    return apiFetch('/api/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  signIn: (data: any) => apiFetch('/api/auth/sign-in', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  signOut: () => apiFetch('/api/auth/sign-out', {
    method: 'POST',
  }),
  // Mock function to check session if needed, or we can just rely on the stored user
  getProfile: () => apiFetch('/api/students/profile').catch(() => null),
};
