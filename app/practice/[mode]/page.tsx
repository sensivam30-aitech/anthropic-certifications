'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { startTest, submitAnswer, flagQuestion, finalizeTest, getTimeRemaining } from '@/lib/test';
import { useTimer } from '@/hooks/useTimer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Flag, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

export default function TestModePage() {
  const params = useParams();
  const router = useRouter();
  const mode = params.mode as string;
  const [session, setSession] = useState<any>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const { formatted, isExpired } = useTimer(session ? getTimeRemaining(session.sessionId) : 0, () => {
    if (session) handleSubmit();
  });

  useEffect(() => {
    if (!mode) return;
    startTest(mode as any).then(s => {
      setSession(s);
      setLoading(false);
    });
  }, [mode]);

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-20 text-center text-text-secondary">Loading test...</div>;

  if (result) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in">
        <Card className="text-center py-12">
          <div className={`text-6xl font-bold mb-4 ${result.passed ? 'text-accent' : 'text-red-400'}`}>{result.scorePercent}%</div>
          <p className="text-lg mb-2">{result.passed ? 'PASSED' : 'FAILED'}</p>
          <p className="text-text-secondary mb-8">{result.correctCount} / {result.totalQuestions} correct</p>
          <p className="text-sm text-text-secondary mb-6">Sets remaining: {result.remainingSets} of 10</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => router.push('/practice/')}>Back to Modes</Button>
            <Button variant="outline" onClick={() => router.push('/progress/')}>View Progress</Button>
          </div>
        </Card>
      </div>
    );
  }

  const question = session.questions[currentIdx];
  const total = session.questions.length;

  const handleAnswer = (opt: string) => {
    setSelected(opt);
    submitAnswer(session.sessionId, question.id, opt);
  };

  const handleSubmit = () => {
    const res = finalizeTest(session.sessionId);
    setResult(res);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-text-secondary">Question {currentIdx + 1} of {total}</div>
        <div className={`flex items-center gap-2 text-sm font-mono ${isExpired ? 'text-red-400' : 'text-text-secondary'}`}>
          <Clock size={16} /> {formatted}
        </div>
      </div>
      <div className="w-full bg-border h-2 rounded-full mb-8 overflow-hidden">
        <div className="bg-accent h-full rounded-full transition-all" style={{ width: `${((currentIdx + 1) / total) * 100}%` }} />
      </div>

      <Card className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">{question.domain}</span>
          <button onClick={() => flagQuestion(session.sessionId, question.id)} className="text-text-secondary hover:text-yellow-400">
            <Flag size={18} />
          </button>
        </div>
        <h2 className="text-lg font-medium text-text-primary mb-8 leading-relaxed">{question.question}</h2>
        <div className="space-y-3">
          {Object.entries(question.options).map(([key, val]) => (
            <button
              key={key}
              onClick={() => handleAnswer(key)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selected === key
                  ? 'border-accent bg-accent/10 text-text-primary'
                  : 'border-border bg-surface hover:border-text-secondary text-text-secondary'
              }`}
            >
              <span className="font-semibold mr-3">{key}.</span>
              {val as string}
            </button>
          ))}
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <Button variant="ghost" disabled={currentIdx === 0} onClick={() => { setCurrentIdx(i => i - 1); setSelected(null); }}>
          <ChevronLeft size={18} /> Previous
        </Button>
        {currentIdx < total - 1 ? (
          <Button onClick={() => { setCurrentIdx(i => i + 1); setSelected(null); }}>
            Next <ChevronRight size={18} />
          </Button>
        ) : (
          <Button onClick={handleSubmit}>Submit Exam</Button>
        )}
      </div>
    </div>
  );
}
