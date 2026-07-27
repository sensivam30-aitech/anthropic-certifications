'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuthContext } from '@/contexts/AuthContext';
import { Zap, Target, Brain, Trophy, CheckCircle, Lock } from 'lucide-react';

export default function HomePage() {
  const { user } = useAuthContext();

  const modes = [
    { icon: Zap, name: 'Quick Sprint', desc: '10 questions · 20 min · FREE Set 1', free: true, qs: 10 },
    { icon: Target, name: 'Focused Session', desc: '20 questions · 40 min · Domain-pure', free: false, qs: 20 },
    { icon: Brain, name: 'Deep Practice', desc: '30 questions · 60 min · Mixed domains', free: false, qs: 30 },
    { icon: Trophy, name: 'Full Exam', desc: '60 questions · 120 min · Exam simulation', free: false, qs: 60 },
  ];

  return (
    <div className="animate-fade-in">
      <section className="relative overflow-hidden bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm mb-8">
            Independent exam-preparation resource — not affiliated with Anthropic
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-text-primary tracking-tight mb-6">
            Independent <span className="text-accent">CCA-F</span> Practice Tests
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10">
            1,200 scenario-based questions across 4 test modes. Never see the same question twice until you master every set.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/practice/"><Button size="lg">Start Free Test</Button></Link>
            <Link href="#pricing"><Button size="lg" variant="outline">View Pricing</Button></Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Practice Questions', value: '1,200' },
            { label: 'Exam Domains', value: '5' },
            { label: 'Test Modes', value: '4' },
            { label: 'Unique Sets', value: '40' },
          ].map(stat => (
            <Card key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">{stat.value}</div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Start a Test', desc: 'Choose mode, get a fresh set never seen before.' },
            { step: '2', title: 'Answer Questions', desc: 'Shuffled options, timed sessions, scenario-based.' },
            { step: '3', title: 'Track Progress', desc: 'Sets marked complete. Visual completion matrix.' },
            { step: '4', title: 'Master Domains', desc: 'Review, bookmark, and retry weak areas.' },
          ].map(item => (
            <Card key={item.step} className="text-center">
              <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold mx-auto mb-4">{item.step}</div>
              <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-text-secondary">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-16 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Practice Test Modes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modes.map(mode => (
              <Card key={mode.name} hover className="relative">
                {!mode.free && <div className="absolute top-4 right-4"><Lock size={16} className="text-text-secondary" /></div>}
                <mode.icon className="text-accent mb-4" size={32} />
                <h3 className="font-semibold text-text-primary mb-2">{mode.name}</h3>
                <p className="text-sm text-text-secondary mb-4">{mode.desc}</p>
                <Link href="/practice/">
                  <Button variant={mode.free ? 'primary' : 'outline'} size="sm" className="w-full">
                    {mode.free ? 'Start Free Set' : 'Unlock'}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 max-w-7xl mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="border-accent/30">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-text-secondary mb-2">COMPLETE COURSE + PRACTICE TESTS</h3>
              <div className="text-5xl font-bold text-accent mb-2">₹4,999</div>
              <p className="text-sm text-text-secondary mb-6">One-time payment · Lifetime access · 1,200 questions</p>
              <ul className="text-left text-sm text-text-secondary space-y-3 mb-8">
                {[
                  'All 40 unique question sets',
                  '1,200 scenario-based questions',
                  '34 structured lessons',
                  'Personalized study plan',
                  'Progress dashboard & analytics',
                  'Question bank with filters',
                  'Diagnostic assessment',
                  'Exam simulation mode',
                ].map(f => (
                  <li key={f} className="flex items-center gap-2"><CheckCircle size={16} className="text-accent" /> {f}</li>
                ))}
              </ul>
              <Button size="lg" className="w-full">Buy Now — ₹4,999</Button>
              <p className="text-xs text-text-secondary mt-4">Powered by Razorpay · Secure checkout</p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
