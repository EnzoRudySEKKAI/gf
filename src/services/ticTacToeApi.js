const API_BASE_URL =
  process.env.REACT_APP_TTT_API ||
  process.env.REACT_APP_API_BASE_URL ||
  'https://gf-cx32.onrender.com';

const jsonHeaders = {
  'Content-Type': 'application/json',
};

async function handleResponse(response) {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const message = data.detail || response.statusText;
    throw new Error(message);
  }
  return response.json();
}

export async function fetchGame() {
  const res = await fetch(`${API_BASE_URL}/game`);
  return handleResponse(res);
}

export async function resetGame() {
  const res = await fetch(`${API_BASE_URL}/game/reset`, {
    method: 'POST',
    headers: jsonHeaders,
  });
  return handleResponse(res);
}

export async function makeMove(player, index) {
  const res = await fetch(`${API_BASE_URL}/game/move`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ player, index }),
  });
  return handleResponse(res);
}

