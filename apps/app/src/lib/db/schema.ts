import { pgTable, text, integer, timestamp, jsonb, index } from 'drizzle-orm/pg-core';

export const sessions = pgTable(
  'sessions',
  {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull(),
    promptId: integer('prompt_id').notNull(),
    promptTitle: text('prompt_title').notNull(),
    score: integer('score').notNull(),
    fillerCount: integer('filler_count').notNull(),
    fillerWords: jsonb('filler_words').$type<{ word: string; count: number }[]>().notNull(),
    duration: integer('duration').notNull(),
    eyeContactPercent: integer('eye_contact_percent').notNull(),
    wordsPerMinute: integer('words_per_minute').notNull(),
    xpEarned: integer('xp_earned').notNull(),
    transcript: text('transcript').notNull().default(''),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('sessions_user_created_idx').on(t.userId, t.createdAt.desc())],
);

export const progress = pgTable('progress', {
  userId: text('user_id').primaryKey(),
  level: integer('level').notNull().default(1),
  xp: integer('xp').notNull().default(0),
  totalSessions: integer('total_sessions').notNull().default(0),
  streak: integer('streak').notNull().default(0),
  lastSessionDate: text('last_session_date'),
  badges: jsonb('badges').$type<string[]>().notNull().default([]),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export type SessionRow = typeof sessions.$inferSelect;
export type NewSessionRow = typeof sessions.$inferInsert;
export type ProgressRow = typeof progress.$inferSelect;
export type NewProgressRow = typeof progress.$inferInsert;
