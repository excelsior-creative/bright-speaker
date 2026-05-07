export type ClassroomGradeBand = "K-2" | "3-5" | "6-8" | "mixed";

export interface Classroom {
  id: string;
  teacherUserId: string;
  name: string;
  code: string;
  gradeBand: ClassroomGradeBand | null;
  createdAt: string;
  archivedAt: string | null;
}

export interface ClassStudent {
  id: string;
  classId: string;
  displayName: string;
  joinToken: string;
  createdAt: string;
  deletedAt: string | null;
}

export interface PracticeSession {
  id: string;
  classId: string;
  studentId: string;
  promptId: number;
  promptTitle: string;
  score: number;
  fillerCount: number;
  durationSeconds: number;
  eyeContactPercent: number;
  wordsPerMinute: number;
  xpEarned: number;
  transcriptExcerpt: string | null;
  createdAt: string;
}

export interface CreateClassInput {
  teacherUserId: string;
  name: string;
  gradeBand?: ClassroomGradeBand | null;
}

export interface JoinClassInput {
  classCode: string;
  displayName: string;
}

export interface RecordPracticeSessionInput {
  classCode: string;
  joinToken: string;
  promptId: number;
  promptTitle: string;
  score: number;
  fillerCount: number;
  durationSeconds: number;
  eyeContactPercent: number;
  wordsPerMinute: number;
  xpEarned: number;
  transcriptExcerpt?: string | null;
}

export interface JoinedClassroom {
  classroom: Classroom;
  student: ClassStudent;
}

export interface StudentProgressRow {
  student: ClassStudent;
  latestSession: PracticeSession | null;
  totalSessions: number;
  averageScore: number | null;
  bestScore: number | null;
  lastPromptTitle: string | null;
}

export interface ClassProgressTotals {
  studentCount: number;
  sessionCount: number;
  averageScore: number | null;
  averageSessionsPerStudent: number;
  dateRange: string;
  topPrompts: string[];
}

export interface ClassProgress {
  classroom: Classroom;
  students: StudentProgressRow[];
  totals: ClassProgressTotals;
}
