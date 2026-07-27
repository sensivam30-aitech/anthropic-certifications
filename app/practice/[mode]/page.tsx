'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { startTest, submitAnswer, flagQuestion, finalizeTest } from '@/lib/test';
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
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  // Load test
  useEffect(() => {
    if (!mode) {
      setError('No test mode specified');
      setLoading(false);
      return;
    }
    let cancelled = false;
    startTest(mode as any)
      .then(s => {
        if (cancelled) return;
        if (!s || !s.questions || s.questions.length === 0) {
          setError('No questions found for this test set');
        } else {
          setSession(s);
          setTimeLeft(s.timeLimitMinutes * 60);
        }
        setLoading(false);
      })
      .catch(err => {
        if (cancelled) return;
        setError(err?.message || 'Failed to load test questions');
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, [mode]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setTimeout(() => {
            try {
              if (session && session.sessionId) {
                const res = finalizeTest(session.sessionId);
                setResult(res);
              }
            } catch (e) { console.error(e); }
          }, 0);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [timeLeft, session]);

  const formattedTime = () => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    if (!session || !session.sessionId) return;
    try {
      const res = finalizeTest(session.sessionId);
      setResult(res);
    } catch (err: any) {
      setError(err?.message || 'Failed to finalize test');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-text-secondary">
        <div className="animate-pulse">Loading test...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <Card className="py-12">
          <h2 className="text-xl font-bold text-red-400 mb-4">Error</h2>
          <p className="text-text-secondary mb-6">{error}</p>
          <Button onClick={() => router.push('/practice/')}>Back to Practice</Button>
        </Card>
      </div>
    );
  }

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

  if (!session || !session.questions || session.questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-text-secondary">
        <Card className="py-12">
          <p className="mb-4">No questions available for this test.</p>
          <Button onClick={() => router.push('/practice/')}>Back to Practice</Button>
        </Card>
      </div>
    );
  }

  const question = session.questions[currentIdx];
  const total = session.questions.length;

  if (!question) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-text-secondary">
        <p>Question not found.</p>
      </div>
    );
  }

  const handleAnswer = (opt: string) => {
    setSelected(opt);
    submitAnswer(session.sessionId, question.id, opt);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-text-secondary">Question {currentIdx + 1} of {total}</div>
        <div className={`flex items-center gap-2 text-sm font-mono ${timeLeft <= 0 ? 'text-red-400' : 'text-text-secondary'}`}>
          <Clock size={16} /> {formattedTime()}
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
