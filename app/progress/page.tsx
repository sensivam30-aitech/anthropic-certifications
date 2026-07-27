'use client';
import { useAuthContext } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/Card';
import { getSetCompletionMatrix, getDomainAccuracy, getScoreTrend, getStudyStreak, getTotalTimeSpent } from '@/lib/progress';
import { useEffect, useState } from 'react';

export default function ProgressPage() {
  const { user } = useAuthContext();
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [domains, setDomains] = useState<any[]>([]);
  const [trend, setTrend] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    setMatrix(getSetCompletionMatrix(user.id));
    setDomains(getDomainAccuracy(user.id));
    setTrend(getScoreTrend(user.id));
  }, [user]);

  if (!user) return <div className="max-w-7xl mx-auto px-4 py-20 text-center text-text-secondary">Please login to view progress.</div>;

  const modes = ['Sprint', 'Focused', 'Deep Practice', 'Full Exam'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">My Progress</h1>
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <Card className="text-center"><div className="text-3xl font-bold text-accent">{getStudyStreak(user.id)}</div><div className="text-sm text-text-secondary">Day Streak</div></Card>
        <Card className="text-center"><div className="text-3xl font-bold text-accent">{getTotalTimeSpent(user.id)}h</div><div className="text-sm text-text-secondary">Time Spent</div></Card>
        <Card className="text-center"><div className="text-3xl font-bold text-accent">{trend.length}</div><div className="text-sm text-text-secondary">Tests Taken</div></Card>
        <Card className="text-center"><div className="text-3xl font-bold text-accent">{trend.length > 0 ? Math.round(trend.reduce((a,b) => a + b.score, 0) / trend.length) : 0}%</div><div className="text-sm text-text-secondary">Avg Score</div></Card>
      </div>

      <h2 className="text-xl font-semibold mb-4">Set Completion Matrix</h2>
      <Card className="mb-10 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-text-secondary text-xs uppercase">
              <th className="px-4 py-3 text-left">Mode</th>
              {Array.from({ length: 10 }, (_, i) => <th key={i} className="px-2 py-3 text-center">S{i+1}</th>)}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, ri) => (
              <tr key={ri} className="border-t border-border">
                <td className="px-4 py-3 font-medium text-text-primary">{modes[ri]}</td>
                {row.map((cell, ci) => (
                  <td key={ci} className="px-2 py-3 text-center">
                    <div className={`w-6 h-6 rounded-full mx-auto ${cell ? 'bg-accent' : 'bg-border'}`} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <h2 className="text-xl font-semibold mb-4">Domain Accuracy</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {domains.map(d => (
          <Card key={d.domain} className="flex items-center justify-between">
            <span className="text-sm font-medium capitalize text-text-primary">{d.domain.replace('_', ' ')}</span>
            <span className="text-lg font-bold text-accent">{d.accuracy}%</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
