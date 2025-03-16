import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  },
});

// Solution de rechange pour le CSRF
let isCsrfRequestPending = false;

api.interceptors.request.use(async (config) => {
  if (!isCsrfRequestPending) {
    isCsrfRequestPending = true;
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true
    });
    isCsrfRequestPending = false;
  }
  return config;
});

export default api;