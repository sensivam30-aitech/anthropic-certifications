'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { verifyAdminPassword, getAllUsers, getGlobalStats } from '@/lib/admin';

export default function AdminPage() {
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);

  const login = () => {
    if (verifyAdminPassword(password)) {
      setVerified(true);
      setUsers(getAllUsers());
      setStats(getGlobalStats());
    } else {
      setError('Invalid password');
    }
  };

  if (!verified) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <Card>
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Access</h1>
          <div className="space-y-4">
            <Input type="password" placeholder="Admin Password" value={password} onChange={setPassword} />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button className="w-full" onClick={login}>Access Dashboard</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      {stats && (
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <Card className="text-center"><div className="text-3xl font-bold text-accent">{stats.totalUsers}</div><div className="text-sm text-text-secondary">Total Users</div></Card>
          <Card className="text-center"><div className="text-3xl font-bold text-accent">{stats.totalTests}</div><div className="text-sm text-text-secondary">Tests Taken</div></Card>
          <Card className="text-center"><div className="text-3xl font-bold text-accent">{stats.avgScore}%</div><div className="text-sm text-text-secondary">Avg Score</div></Card>
        </div>
      )}
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-background text-text-secondary uppercase text-xs">
            <tr><th className="px-6 py-3">Name</th><th className="px-6 py-3">Email</th><th className="px-6 py-3">Tier</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-t border-border">
                <td className="px-6 py-4 text-text-primary">{u.name}</td>
                <td className="px-6 py-4 text-text-secondary">{u.email}</td>
                <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs ${u.tier === 'paid' ? 'bg-accent/10 text-accent' : 'bg-text-secondary/10 text-text-secondary'}`}>{u.tier}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
