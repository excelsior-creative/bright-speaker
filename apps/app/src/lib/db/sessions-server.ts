import 'server-only';
import { and, desc, eq } from 'drizzle-orm';
import { db } from './client';
import { progress as progressTable, sessions as sessionsTable } from './schema';
import {
  applySessionToProgress,
  defaultProgress,
  type NewSessionInput,
  type SaveSessionResult,
  type SessionRecord,
  type UserProgress,
} from '../sessions-types';

function rowToSession(row: typeof sessionsTable.$inferSelect): SessionRecord {
  return {
    id: row.id,
    promptId: row.promptId,
    promptTitle: row.promptTitle,
    date: row.createdAt.toISOString(),
    score: row.score,
    fillerCount: row.fillerCount,
    fillerWords: row.fillerWords,
    duration: row.duration,
    eyeContactPercent: row.eyeContactPercent,
    wordsPerMinute: row.wordsPerMinute,
    xpEarned: row.xpEarned,
    transcript: row.transcript,
  };
}

export async function listSessions(userId: string, limit = 100): Promise<SessionRecord[]> {
  const rows = await db
    .select()
    .from(sessionsTable)
    .where(eq(sessionsTable.userId, userId))
    .orderBy(desc(sessionsTable.createdAt))
    .limit(limit);
  return rows.map(rowToSession);
}

export async function clearSessions(userId: string): Promise<void> {
  await db.delete(sessionsTable).where(eq(sessionsTable.userId, userId));
  await db
    .update(progressTable)
    .set({
      level: 1,
      xp: 0,
      totalSessions: 0,
      streak: 0,
      lastSessionDate: null,
      badges: [],
      updatedAt: new Date(),
    })
    .where(eq(progressTable.userId, userId));
}

export async function deleteSession(userId: string, sessionId: string): Promise<boolean> {
  const result = await db
    .delete(sessionsTable)
    .where(and(eq(sessionsTable.userId, userId), eq(sessionsTable.id, sessionId)))
    .returning({ id: sessionsTable.id });
  return result.length > 0;
}

export async function getProgress(userId: string): Promise<UserProgress> {
  const [row] = await db
    .select()
    .from(progressTable)
    .where(eq(progressTable.userId, userId))
    .limit(1);
  if (!row) return defaultProgress();
  return {
    level: row.level,
    xp: row.xp,
    totalSessions: row.totalSessions,
    streak: row.streak,
    lastSessionDate: row.lastSessionDate,
    badges: row.badges,
  };
}

export async function saveSession(
  userId: string,
  input: NewSessionInput,
): Promise<SaveSessionResult> {
  const now = new Date();
  const today = now.toDateString();
  const yesterday = new Date(now.getTime() - 86400000).toDateString();

  const current = await getProgress(userId);
  const { progress: nextProgress, newBadges, levelUp } = applySessionToProgress({
    progress: current,
    session: input,
    today,
    yesterday,
  });

  const id = crypto.randomUUID();
  const [inserted] = await db
    .insert(sessionsTable)
    .values({
      id,
      userId,
      promptId: input.promptId,
      promptTitle: input.promptTitle,
      score: input.score,
      fillerCount: input.fillerCount,
      fillerWords: input.fillerWords,
      duration: input.duration,
      eyeContactPercent: input.eyeContactPercent,
      wordsPerMinute: input.wordsPerMinute,
      xpEarned: input.xpEarned,
      transcript: input.transcript,
      createdAt: now,
    })
    .returning();

  await db
    .insert(progressTable)
    .values({
      userId,
      level: nextProgress.level,
      xp: nextProgress.xp,
      totalSessions: nextProgress.totalSessions,
      streak: nextProgress.streak,
      lastSessionDate: nextProgress.lastSessionDate,
      badges: nextProgress.badges,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: progressTable.userId,
      set: {
        level: nextProgress.level,
        xp: nextProgress.xp,
        totalSessions: nextProgress.totalSessions,
        streak: nextProgress.streak,
        lastSessionDate: nextProgress.lastSessionDate,
        badges: nextProgress.badges,
        updatedAt: now,
      },
    });

  return {
    ...rowToSession(inserted),
    newBadges,
    levelUp,
  };
}
