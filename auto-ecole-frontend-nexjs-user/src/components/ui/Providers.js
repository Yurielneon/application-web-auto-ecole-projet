'use client';

import { useEffect } from 'react';
import axios from 'axios';

export default function Providers({ children }) {
  useEffect(() => {
    // Configuration globale d'Axios
    axios.defaults.baseURL = 'http://localhost:8000';
    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.withCredentials = true;
      return config;
    });
  }, []);

  return <>{children}</>;
}