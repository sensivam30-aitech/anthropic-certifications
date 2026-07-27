'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    import('@/lib/auth').then(({ loginUser }) => {
      const user = loginUser(email, password);
      if (user) {
        router.push('/practice/');
      } else {
        setError('Invalid email or password. Try rahul@example.com / demo123');
      }
    });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <Card>
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back</h1>
        <div className="space-y-4">
          <Input placeholder="Email" value={email} onChange={setEmail} />
          <Input type="password" placeholder="Password" value={password} onChange={setPassword} />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <Button className="w-full" onClick={handleLogin}>Login</Button>
        </div>
        <p className="text-center text-sm text-text-secondary mt-6">
          Don&apos;t have an account? <Link href="/register/" className="text-accent hover:underline">Register</Link>
        </p>
        <p className="text-center text-xs text-text-secondary mt-4">
          Demo: rahul@example.com / demo123
        </p>
      </Card>
    </div>
  );
}
