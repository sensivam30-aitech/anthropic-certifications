import { getItem, setItem } from './storage';

export function toggleBookmark(userId: string, questionId: string): boolean {
  const stats = getItem<any[]>('question_stats') || [];
  const s = stats.find((x: any) => x.userId === userId && x.questionId === questionId);
  if (s) {
    s.isBookmarked = !s.isBookmarked;
    setItem('question_stats', stats);
    return s.isBookmarked;
  }
  return false;
}

export function getBookmarkedQuestions(userId: string): string[] {
  const stats = getItem<any[]>('question_stats') || [];
  return stats.filter((s: any) => s.userId === userId && s.isBookmarked).map((s: any) => s.questionId);
}
