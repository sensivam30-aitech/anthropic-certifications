import { getItem, setItem } from './storage';
import { Question, User } from './types';

const ADMIN_PASSWORD = 'SenAdmin@3018';

export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function getAllUsers(): User[] {
  return getItem<User[]>('users') || [];
}

export function getGlobalStats() {
  const attempts = getItem<any[]>('set_attempts') || [];
  return {
    totalUsers: getAllUsers().length,
    totalTests: attempts.length,
    avgScore: attempts.length > 0 ? Math.round(attempts.reduce((a, b) => a + b.scorePercent, 0) / attempts.length) : 0,
  };
}

export function addQuestion(question: Omit<Question, 'id'>): Question {
  const newQ = { ...question, id: `custom_${Date.now()}` };
  const custom = getItem<Question[]>('custom_questions') || [];
  custom.push(newQ);
  setItem('custom_questions', custom);
  return newQ;
}
