'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Kredensial demo. Ganti dengan autentikasi sungguhan sebelum produksi.
const DEMO_USER = 'admin';
const DEMO_PASS = 'admin123';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === DEMO_USER && password === DEMO_PASS) {
      localStorage.setItem('masjid_admin_auth', 'true');
      router.push('/admin');
    } else {
      setError('Username atau password salah.');
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm items-center px-5">
      <Card className="w-full p-6">
        <p className="mb-1 text-lg font-extrabold text-primary-900">Masuk Admin</p>
        <p className="mb-5 text-sm text-foreground/50">Panel pengelolaan Masjid Al-Barokah.</p>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <div>
            <label htmlFor="username" className="mb-1.5 block text-sm font-semibold text-foreground/80">
              Username
            </label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-foreground/80">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
          <Button type="submit" className="mt-1 justify-center">
            <LogIn size={16} /> Masuk
          </Button>
          <p className="text-center text-xs text-foreground/40">Demo: admin / admin123</p>
        </form>
      </Card>
    </div>
  );
}
