import { TestMode, AnswerResult, FinalResult, SessionQuestion } from './types';
import { getCurrentUser } from './auth';
import { getNextSetForUser, markSetCompleted, getRemainingSetCount } from './setRotation';
import { createSession, getActiveSession, updateSession, clearActiveSession, expireSession } from './sessionManager';
import { calculateFinalResult } from './scoring';
import { getItem, setItem } from './storage';
import { generateUUID } from './utils';

// Dynamic imports for question sets
async function loadQuestionSet(mode: string, setNumber: number): Promise<any[]> {
  try {
    const mod = await import(`./data/questions/${mode}/set_${setNumber.toString().padStart(2, '0')}.json`);
    return mod.default || mod;
  } catch {
    return [];
  }
}

function fisherYatesShuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function seededShuffle(indices: number[], seed: number): number[] {
  const a = [...indices];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function startTest(mode: TestMode): Promise<{ sessionId: string; mode: TestMode; setNumber: number; totalQuestions: number; timeLimitMinutes: number; questions: any[] }> {
  const user = getCurrentUser();
  const userId = user?.id || 'anonymous_' + generateUUID();
  const selection = getNextSetForUser(userId, mode);
  const questions = await loadQuestionSet(mode, selection.setNumber);

  const shuffledQuestions = fisherYatesShuffle(questions);
  const sessionSeed = Date.now();

  const sessionQuestions: SessionQuestion[] = shuffledQuestions.map((q, idx) => {
    const optionKeys = ['A', 'B', 'C', 'D'];
    const optionValues = [q.options.A, q.options.B, q.options.C, q.options.D];
    const shuffledIndices = seededShuffle([0, 1, 2, 3], sessionSeed + idx);
    const newOptions: Record<string, string> = {};
    const keyMap: Record<string, string> = {};
    shuffledIndices.forEach((origIdx, newIdx) => {
      newOptions[optionKeys[newIdx]] = optionValues[origIdx];
      keyMap[optionKeys[origIdx]] = optionKeys[newIdx];
    });
    return {
      id: q.id,
      displayNumber: idx + 1,
      domain: q.domain,
      question: q.question,
      options: newOptions,
      correctAnswer: keyMap[q.correctAnswer],
      explanation: q.explanation,
      userAnswer: null,
      isFlagged: false,
      timeSpent: 0,
    };
  });

  const session = createSession(userId, mode, selection.setNumber, sessionQuestions);

  return {
    sessionId: session.sessionId,
    mode,
    setNumber: selection.setNumber,
    totalQuestions: sessionQuestions.length,
    timeLimitMinutes: session.expiresAt - session.startedAt,
    questions: sessionQuestions.map(q => ({
      id: q.id,
      displayNumber: q.displayNumber,
      domain: q.domain,
      question: q.question,
      options: q.options,
    })),
  };
}

export function submitAnswer(sessionId: string, questionId: string, selectedOption: string): AnswerResult {
  const session = getActiveSession();
  if (!session || session.sessionId !== sessionId || session.status !== 'in_progress') {
    throw new Error('SESSION_INVALID');
  }
  if (Date.now() > session.expiresAt) {
    expireSession(sessionId);
    throw new Error('SESSION_EXPIRED');
  }
  const question = session.questions.find(q => q.id === questionId);
  if (!question) throw new Error('QUESTION_NOT_FOUND');

  const isCorrect = selectedOption === question.correctAnswer;
  question.userAnswer = selectedOption;
  question.isCorrect = isCorrect;
  updateSession(sessionId, { questions: session.questions });

  return {
    isCorrect,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
  };
}

export function flagQuestion(sessionId: string, questionId: string): void {
  const session = getActiveSession();
  if (!session || session.sessionId !== sessionId) return;
  const question = session.questions.find(q => q.id === questionId);
  if (question) {
    question.isFlagged = !question.isFlagged;
    updateSession(sessionId, { questions: session.questions });
  }
}

export function finalizeTest(sessionId: string): FinalResult {
  const session = getActiveSession();
  if (!session || session.sessionId !== sessionId) {
    throw new Error('SESSION_NOT_FOUND');
  }
  const result = calculateFinalResult(session.questions, session.setNumber, getRemainingSetCount(session.userId, session.mode));
  markSetCompleted(session.userId, session.mode, session.setNumber, {
    sessionId,
    scorePercent: result.scorePercent,
    status: 'completed',
    completedAt: Date.now(),
  });

  // Update question stats
  const stats = getItem<any[]>('question_stats') || [];
  for (const q of session.questions) {
    const existing = stats.find(s => s.userId === session.userId && s.questionId === q.id);
    if (existing) {
      existing.attemptCount++;
      if (q.isCorrect) existing.correctCount++;
      existing.lastAttempted = Date.now();
      existing.lastAnswer = q.userAnswer;
      existing.isCorrect = q.isCorrect ?? null;
    } else {
      stats.push({
        userId: session.userId,
        questionId: q.id,
        attemptCount: 1,
        correctCount: q.isCorrect ? 1 : 0,
        isBookmarked: false,
        firstSeen: Date.now(),
        lastAttempted: Date.now(),
        lastAnswer: q.userAnswer,
        isCorrect: q.isCorrect ?? null,
      });
    }
  }
  setItem('question_stats', stats);

  clearActiveSession();
  return result;
}

export function abandonTest(sessionId: string): void {
  const session = getActiveSession();
  if (session && session.sessionId === sessionId) {
    updateSession(sessionId, { status: 'abandoned' });
    clearActiveSession();
  }
}

export function getTimeRemaining(sessionId: string): number {
  const session = getActiveSession();
  if (!session || session.sessionId !== sessionId) return 0;
  return Math.max(0, Math.floor((session.expiresAt - Date.now()) / 1000));
}
