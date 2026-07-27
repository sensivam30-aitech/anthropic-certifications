import { getItem, setItem } from './storage';
import { SetSelection, TestMode, SetAttempt } from './types';

export function getCompletedSets(userId: string, mode: TestMode): number[] {
  const attempts = getItem<SetAttempt[]>('set_attempts') || [];
  return attempts
    .filter(a => a.userId === userId && a.mode === mode && a.status === 'completed')
    .map(a => a.setNumber);
}

export function getNextSetForUser(userId: string, mode: TestMode): SetSelection {
  const completedSets = getCompletedSets(userId, mode);
  const totalSets = 10;
  const availableSets: number[] = [];
  for (let i = 1; i <= totalSets; i++) {
    if (!completedSets.includes(i)) {
      availableSets.push(i);
    }
  }
  if (availableSets.length === 0) {
    clearCompletedSets(userId, mode);
    return {
      setNumber: Math.floor(Math.random() * totalSets) + 1,
      isRepeat: true,
      message: 'All sets completed. Sets are now being recycled.',
      remainingSets: 9,
      totalSets,
    };
  }
  const selectedSet = availableSets[Math.floor(Math.random() * availableSets.length)];
  return {
    setNumber: selectedSet,
    isRepeat: false,
    remainingSets: availableSets.length - 1,
    totalSets,
  };
}

export function markSetCompleted(userId: string, mode: TestMode, setNumber: number, result: Omit<SetAttempt, 'userId' | 'mode' | 'setNumber'>): void {
  const attempts = getItem<SetAttempt[]>('set_attempts') || [];
  attempts.push({
    userId,
    mode,
    setNumber,
    ...result,
  });
  setItem('set_attempts', attempts);
}

export function clearCompletedSets(userId: string, mode: TestMode): void {
  const attempts = getItem<SetAttempt[]>('set_attempts') || [];
  const filtered = attempts.filter(a => !(a.userId === userId && a.mode === mode));
  setItem('set_attempts', filtered);
}

export function getRemainingSetCount(userId: string, mode: TestMode): number {
  const completed = getCompletedSets(userId, mode);
  return 10 - completed.length;
}
