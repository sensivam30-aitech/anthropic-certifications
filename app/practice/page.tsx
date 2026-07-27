'use client';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuthContext } from '@/contexts/AuthContext';
import { Zap, Target, Brain, Trophy, Lock, CheckCircle } from 'lucide-react';

export default function PracticePage() {
  const { user } = useAuthContext();
  const isPaid = user?.tier === 'paid';

  const modes = [
    { id: 'sprint', icon: Zap, name: 'Quick Sprint', desc: '10 questions · 20 minutes', locked: false },
    { id: 'focused', icon: Target, name: 'Focused Session', desc: '20 questions · 40 minutes · Domain-pure', locked: !isPaid },
    { id: 'deep_practice', icon: Brain, name: 'Deep Practice', desc: '30 questions · 60 minutes', locked: !isPaid },
    { id: 'full_exam', icon: Trophy, name: 'Full Exam', desc: '60 questions · 120 minutes · Exam simulation', locked: !isPaid },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Practice Tests</h1>
      <p className="text-text-secondary mb-10">Choose a test mode. Sets rotate automatically so you never see duplicates.</p>
      <div className="grid md:grid-cols-2 gap-6">
        {modes.map(mode => (
          <Card key={mode.id} className={`relative ${mode.locked ? 'opacity-75' : ''}`}>
            <div className="flex items-start justify-between mb-4">
              <mode.icon className="text-accent" size={28} />
              {mode.locked ? <Lock size={18} className="text-text-secondary" /> : <CheckCircle size={18} className="text-accent" />}
            </div>
            <h2 className="text-xl font-semibold mb-2">{mode.name}</h2>
            <p className="text-sm text-text-secondary mb-6">{mode.desc}</p>
            {mode.locked ? (
              <Button variant="outline" className="w-full" disabled>Upgrade to Unlock</Button>
            ) : (
              <Link href={`/practice/${mode.id}/`} className="block">
                <Button className="w-full">Start Test</Button>
              </Link>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
