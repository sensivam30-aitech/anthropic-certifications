import { getItem, setItem, removeItem } from './storage';
import { TestSession, SessionQuestion, TestMode } from './types';
import { generateUUID, getTimeLimit } from './utils';

const ACTIVE_SESSION_KEY = 'active_session';

export function createSession(userId: string, mode: TestMode, setNumber: number, questions: SessionQuestion[]): TestSession {
  const now = Date.now();
  const session: TestSession = {
    sessionId: generateUUID(),
    userId,
    mode,
    setNumber,
    questions,
    startedAt: now,
    expiresAt: now + getTimeLimit(mode) * 60 * 1000,
    status: 'in_progress',
  };
  setItem(ACTIVE_SESSION_KEY, session);
  return session;
}

export function getActiveSession(): TestSession | null {
  return getItem<TestSession>(ACTIVE_SESSION_KEY);
}

export function updateSession(sessionId: string, updates: Partial<TestSession>): void {
  const session = getActiveSession();
  if (!session || session.sessionId !== sessionId) return;
  const updated = { ...session, ...updates };
  setItem(ACTIVE_SESSION_KEY, updated);
}

export function clearActiveSession(): void {
  removeItem(ACTIVE_SESSION_KEY);
}

export function expireSession(sessionId: string): void {
  const session = getActiveSession();
  if (session && session.sessionId === sessionId) {
    updateSession(sessionId, { status: 'expired' });
  }
}
