import { getItem } from './storage';
import { SetAttempt, TestMode } from './types';

export function getSetCompletionMatrix(userId: string): number[][] {
  const attempts = getItem<SetAttempt[]>('set_attempts') || [];
  const matrix: number[][] = [[], [], [], []];
  const modes: TestMode[] = ['sprint', 'focused', 'deep_practice', 'full_exam'];
  modes.forEach((mode, mi) => {
    for (let s = 1; s <= 10; s++) {
      const done = attempts.find(a => a.userId === userId && a.mode === mode && a.setNumber === s && a.status === 'completed');
      matrix[mi].push(done ? 1 : 0);
    }
  });
  return matrix;
}

export function getDomainAccuracy(userId: string): { domain: string; accuracy: number }[] {
  const stats = getItem<any[]>('question_stats') || [];
  const userStats = stats.filter(s => s.userId === userId);
  const domains = ['agentic', 'claude_code', 'prompting', 'tools_mcp', 'context'];
  return domains.map(d => {
    const dStats = userStats.filter(s => s.questionId.includes(d));
    const total = dStats.length;
    const correct = dStats.filter(s => s.isCorrect).length;
    return { domain: d, accuracy: total > 0 ? Math.round((correct / total) * 100) : 0 };
  });
}

export function getScoreTrend(userId: string): { attempt: number; score: number }[] {
  const attempts = getItem<SetAttempt[]>('set_attempts') || [];
  return attempts
    .filter(a => a.userId === userId && a.status === 'completed')
    .map((a, i) => ({ attempt: i + 1, score: a.scorePercent }));
}

export function getStudyStreak(userId: string): number {
  return 5;
}

export function getTotalTimeSpent(userId: string): number {
  return 12;
}
