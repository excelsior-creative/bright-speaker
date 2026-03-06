export interface SessionRecord {
  id: string;
  promptId: number;
  promptTitle: string;
  date: string;
  score: number;
  fillerCount: number;
  fillerWords: { word: string; count: number }[];
  duration: number;
  eyeContactPercent: number;
  wordsPerMinute: number;
  xpEarned: number;
  transcript: string;
}

export interface UserProgress {
  level: number;
  xp: number;
  totalSessions: number;
  streak: number;
  lastSessionDate: string | null;
  badges: string[];
}

const SESSIONS_KEY = 'bright_speaker_sessions';
const PROGRESS_KEY = 'bright_speaker_progress';

export function getSessions(): SessionRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(SESSIONS_KEY) || '[]');
  } catch { return []; }
}

export function saveSession(session: Omit<SessionRecord, 'id' | 'date'>): SessionRecord {
  const record: SessionRecord = {
    ...session,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  };
  const sessions = getSessions();
  sessions.unshift(record);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions.slice(0, 100)));
  updateProgress(record);
  return record;
}

function updateProgress(session: SessionRecord): void {
  const progress = getProgress();
  progress.totalSessions += 1;
  progress.xp += session.xpEarned;

  // Level thresholds: 100, 250, 500, 1000, 2000, 5000
  const thresholds = [0, 100, 250, 500, 1000, 2000, 5000];
  let level = 1;
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (progress.xp >= thresholds[i]) { level = i + 1; break; }
  }
  progress.level = Math.min(level, 7);

  // Streak
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (progress.lastSessionDate === today) {
    // already practiced today, no streak change
  } else if (progress.lastSessionDate === yesterday) {
    progress.streak += 1;
  } else {
    progress.streak = 1;
  }
  progress.lastSessionDate = today;

  // Badges
  if (!progress.badges.includes('First Speech') && progress.totalSessions >= 1) {
    progress.badges.push('First Speech');
  }
  if (!progress.badges.includes('Streak 3') && progress.streak >= 3) {
    progress.badges.push('Streak 3');
  }
  if (!progress.badges.includes('Streak 7') && progress.streak >= 7) {
    progress.badges.push('Streak 7');
  }
  if (!progress.badges.includes('Level 2') && progress.level >= 2) {
    progress.badges.push('Level 2');
  }
  if (!progress.badges.includes('10 Sessions') && progress.totalSessions >= 10) {
    progress.badges.push('10 Sessions');
  }
  if (!progress.badges.includes('Low Filler') && session.fillerCount <= 2) {
    progress.badges.push('Low Filler');
  }
  if (!progress.badges.includes('Eye Contact Pro') && session.eyeContactPercent >= 80) {
    progress.badges.push('Eye Contact Pro');
  }

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function getProgress(): UserProgress {
  if (typeof window === 'undefined') return getDefaultProgress();
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || JSON.stringify(getDefaultProgress()));
  } catch { return getDefaultProgress(); }
}

function getDefaultProgress(): UserProgress {
  return { level: 1, xp: 0, totalSessions: 0, streak: 0, lastSessionDate: null, badges: [] };
}

export function getXpForNextLevel(level: number): number {
  const thresholds = [100, 250, 500, 1000, 2000, 5000, 9999];
  return thresholds[Math.min(level - 1, thresholds.length - 1)];
}
