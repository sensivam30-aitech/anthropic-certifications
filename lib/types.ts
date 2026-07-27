export type TestMode = "sprint" | "focused" | "deep_practice" | "full_exam";

export type Domain = "agentic" | "claude_code" | "prompting" | "tools_mcp" | "context";

export interface Question {
  id: string;
  mode: TestMode;
  setNumber: number;
  questionNumber: number;
  domain: Domain;
  domainName: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  tier: "free" | "paid";
  isAdmin: boolean;
  createdAt: number;
}

export interface SetAttempt {
  userId: string;
  mode: TestMode;
  setNumber: number;
  sessionId: string;
  scorePercent: number;
  status: "completed" | "expired" | "abandoned";
  completedAt: number;
}

export interface QuestionStat {
  userId: string;
  questionId: string;
  attemptCount: number;
  correctCount: number;
  isBookmarked: boolean;
  firstSeen: number;
  lastAttempted: number;
  lastAnswer: string | null;
  isCorrect: boolean | null;
}

export interface TestSession {
  sessionId: string;
  userId: string;
  mode: TestMode;
  setNumber: number;
  questions: SessionQuestion[];
  startedAt: number;
  expiresAt: number;
  completedAt?: number;
  status: "in_progress" | "completed" | "expired" | "abandoned";
  scorePercent?: number;
  domainBreakdown?: Record<string, { total: number; correct: number }>;
}

export interface SessionQuestion {
  id: string;
  displayNumber: number;
  domain: string;
  question: string;
  options: Record<string, string>;
  correctAnswer: string;
  explanation: string;
  userAnswer: string | null;
  isFlagged: boolean;
  timeSpent: number;
  isCorrect?: boolean;
}

export interface Lesson {
  id: string;
  domain: string;
  title: string;
  content: string;
  codeExamples: { title: string; code: string; language: string }[];
  miniQuiz: { question: string; options: string[]; correctIndex: number }[];
  order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: number;
  slug: string;
}

export interface StudyPlan {
  userId: string;
  weeksUntilExam: number;
  hoursPerDay: number;
  experienceLevel: "beginner" | "intermediate" | "advanced";
  weakDomains: string[];
  schedule: WeekSchedule[];
  generatedAt: number;
}

export interface WeekSchedule {
  week: number;
  focusDomains: string[];
  dailyTasks: string[];
  milestones: string[];
  practiceTests: string[];
}

export interface FinalResult {
  scorePercent: number;
  correctCount: number;
  totalQuestions: number;
  domainBreakdown: Record<string, { total: number; correct: number }>;
  passed: boolean;
  setNumber: number;
  remainingSets: number;
}

export interface AnswerResult {
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string;
}

export interface SetSelection {
  setNumber: number;
  isRepeat: boolean;
  message?: string;
  remainingSets: number;
  totalSets: number;
}
