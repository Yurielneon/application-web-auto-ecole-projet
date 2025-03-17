'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Étape 1 : Récupération du cookie CSRF (nécessaire pour les sessions)
      await axios.get('http://localhost:8000/sanctum/csrf-cookie');
      
      // Étape 2 : Tentative de connexion
      const response = await axios.post(
        'http://localhost:8000/api/login',
        { email, password },
        { 
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
    
      // Étape 3 : Stockage du token Sanctum
      localStorage.setItem('auth_token', response.data.access_token);
      
      // Étape 4 : Redirection
      router.push('/espace/cours');
      
    }catch (err) {
      // Récupération du message d'erreur de l'API ou message générique
      const errorMessage = err.response?.data?.error || "Erreur de connexion";
      setError(errorMessage);
    
      // Log pour débogage
      console.error("Erreur lors de la connexion :", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl mb-4">Connexion Auto-École</h1>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}