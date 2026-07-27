import { FinalResult, TestMode } from './types';
import { getPassingScore } from './utils';

export function calculateFinalResult(
  questions: { userAnswer: string | null; isCorrect?: boolean; domain: string }[],
  setNumber: number,
  remainingSets: number
): FinalResult {
  const answered = questions.filter(q => q.userAnswer !== null);
  const correct = questions.filter(q => q.isCorrect);
  const totalQuestions = questions.length;
  const scorePercent = totalQuestions > 0 ? Math.round((correct.length / totalQuestions) * 100) : 0;

  const domainBreakdown: Record<string, { total: number; correct: number }> = {};
  for (const q of questions) {
    if (!domainBreakdown[q.domain]) {
      domainBreakdown[q.domain] = { total: 0, correct: 0 };
    }
    domainBreakdown[q.domain].total++;
    if (q.isCorrect) domainBreakdown[q.domain].correct++;
  }

  return {
    scorePercent,
    correctCount: correct.length,
    totalQuestions,
    domainBreakdown,
    passed: scorePercent >= getPassingScore('sprint'),
    setNumber,
    remainingSets,
  };
}
