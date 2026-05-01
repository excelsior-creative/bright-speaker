import { getLevelDefinition, getLevelProgress } from "./progression";

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

export interface LevelUpSummary {
  previousLevel: number;
  newLevel: number;
}

export interface SaveSessionResult extends SessionRecord {
  newBadges: string[];
  levelUp: LevelUpSummary | null;
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

export function saveSession(session: Omit<SessionRecord, 'id' | 'date'>): SaveSessionResult {
  const record: SessionRecord = {
    ...session,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  };
  const sessions = getSessions();
  sessions.unshift(record);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions.slice(0, 100)));
  const rewards = updateProgress(record);
  return {
    ...record,
    ...rewards,
  };
}

function updateProgress(session: SessionRecord): { newBadges: string[]; levelUp: LevelUpSummary | null } {
  const progress = getProgress();
  const previousLevel = progress.level;
  const newBadges: string[] = [];
  progress.totalSessions += 1;
  progress.xp += session.xpEarned;

  const levelProgress = getLevelProgress(progress.xp);
  progress.level = levelProgress.currentLevel.level;

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
  const unlockBadge = (badge: string, condition: boolean) => {
    if (!condition || progress.badges.indexOf(badge) !== -1) return;
    progress.badges.push(badge);
    newBadges.push(badge);
  };

  unlockBadge('First Speech', progress.totalSessions >= 1);
  unlockBadge('Streak 3', progress.streak >= 3);
  unlockBadge('Streak 7', progress.streak >= 7);
  unlockBadge('Level 2', progress.level >= 2);
  unlockBadge('10 Sessions', progress.totalSessions >= 10);
  unlockBadge('Low Filler', session.fillerCount <= 2);
  unlockBadge('Eye Contact Pro', session.eyeContactPercent >= 80);

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));

  return {
    newBadges,
    levelUp: progress.level > previousLevel
      ? { previousLevel, newLevel: progress.level }
      : null,
  };
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
  return getLevelDefinition(level + 1).minXp;
}
