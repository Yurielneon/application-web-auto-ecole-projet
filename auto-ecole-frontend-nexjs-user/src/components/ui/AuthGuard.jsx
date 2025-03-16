'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function AuthGuard({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    api.get('/api/user')
      .then(res => setUser(res.data))
      .catch(() => router.push('/login-user'));
  }, []);

  if (!user) return <div className="text-center p-8">Chargement...</div>;
  
  return children;
}