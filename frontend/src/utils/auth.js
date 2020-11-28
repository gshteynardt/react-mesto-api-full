export const BASE_URL = 'http://localhost:3000';

const handleResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
}

export const register = (email, password) => fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
  .then(res => handleResponse(res));


export const login = (email, password) => fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
  .then(res => handleResponse(res));


export const checkToken = (token) => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then(res => handleResponse(res));

