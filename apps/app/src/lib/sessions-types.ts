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

export type NewSessionInput = Omit<SessionRecord, 'id' | 'date'>;

const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 5000];
const NEXT_LEVEL_XP = [100, 250, 500, 1000, 2000, 5000, 9999];
const MAX_LEVEL = 7;

export function computeLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return Math.min(i + 1, MAX_LEVEL);
  }
  return 1;
}

export function getXpForNextLevel(level: number): number {
  return NEXT_LEVEL_XP[Math.min(level - 1, NEXT_LEVEL_XP.length - 1)];
}

export function defaultProgress(): UserProgress {
  return { level: 1, xp: 0, totalSessions: 0, streak: 0, lastSessionDate: null, badges: [] };
}

export interface ApplySessionArgs {
  progress: UserProgress;
  session: NewSessionInput;
  today: string;
  yesterday: string;
}

export interface ApplySessionResult {
  progress: UserProgress;
  newBadges: string[];
  levelUp: LevelUpSummary | null;
}

export function applySessionToProgress({
  progress,
  session,
  today,
  yesterday,
}: ApplySessionArgs): ApplySessionResult {
  const previousLevel = progress.level;
  const next: UserProgress = {
    ...progress,
    badges: [...progress.badges],
    totalSessions: progress.totalSessions + 1,
    xp: progress.xp + session.xpEarned,
  };
  next.level = computeLevel(next.xp);

  if (next.lastSessionDate === today) {
    // already practiced today, no streak change
  } else if (next.lastSessionDate === yesterday) {
    next.streak += 1;
  } else {
    next.streak = 1;
  }
  next.lastSessionDate = today;

  const newBadges: string[] = [];
  const unlock = (badge: string, condition: boolean) => {
    if (!condition || next.badges.includes(badge)) return;
    next.badges.push(badge);
    newBadges.push(badge);
  };

  unlock('First Speech', next.totalSessions >= 1);
  unlock('Streak 3', next.streak >= 3);
  unlock('Streak 7', next.streak >= 7);
  unlock('Level 2', next.level >= 2);
  unlock('10 Sessions', next.totalSessions >= 10);
  unlock('Low Filler', session.fillerCount <= 2);
  unlock('Eye Contact Pro', session.eyeContactPercent >= 80);

  return {
    progress: next,
    newBadges,
    levelUp: next.level > previousLevel ? { previousLevel, newLevel: next.level } : null,
  };
}
