'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    import('@/lib/auth').then(({ registerUser }) => {
      try {
        registerUser(name, email, password);
        router.push('/practice/');
      } catch (e: any) {
        setError(e.message);
      }
    });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <Card>
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
        <div className="space-y-4">
          <Input placeholder="Full Name" value={name} onChange={setName} />
          <Input placeholder="Email" value={email} onChange={setEmail} />
          <Input type="password" placeholder="Password" value={password} onChange={setPassword} />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <Button className="w-full" onClick={handleRegister}>Register</Button>
        </div>
        <p className="text-center text-sm text-text-secondary mt-6">
          Already have an account? <Link href="/login/" className="text-accent hover:underline">Login</Link>
        </p>
      </Card>
    </div>
  );
}
