const API_URL = import.meta.env.VITE_API_URL;

export async function api(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Erro ${response.status} em ${path}`);
  }

  return response.json();
}q