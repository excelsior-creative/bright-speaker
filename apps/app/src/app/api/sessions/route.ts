import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import {
  clearSessions,
  listSessions,
  saveSession,
} from '@/lib/db/sessions-server';
import type { NewSessionInput } from '@/lib/sessions-types';

export const runtime = 'nodejs';

function validate(body: unknown): NewSessionInput | null {
  if (!body || typeof body !== 'object') return null;
  const b = body as Record<string, unknown>;
  const fillerWords = Array.isArray(b.fillerWords) ? b.fillerWords : null;
  if (!fillerWords) return null;
  const validFillers = fillerWords.every(
    (f) =>
      f &&
      typeof f === 'object' &&
      typeof (f as { word?: unknown }).word === 'string' &&
      typeof (f as { count?: unknown }).count === 'number',
  );
  if (!validFillers) return null;

  const req = [
    'promptId',
    'score',
    'fillerCount',
    'duration',
    'eyeContactPercent',
    'wordsPerMinute',
    'xpEarned',
  ] as const;
  for (const k of req) {
    if (typeof b[k] !== 'number' || !Number.isFinite(b[k] as number)) return null;
  }
  if (typeof b.promptTitle !== 'string' || b.promptTitle.length > 200) return null;
  if (typeof b.transcript !== 'string' || b.transcript.length > 20000) return null;

  return {
    promptId: b.promptId as number,
    promptTitle: b.promptTitle,
    score: b.score as number,
    fillerCount: b.fillerCount as number,
    fillerWords: fillerWords as { word: string; count: number }[],
    duration: b.duration as number,
    eyeContactPercent: b.eyeContactPercent as number,
    wordsPerMinute: b.wordsPerMinute as number,
    xpEarned: b.xpEarned as number,
    transcript: b.transcript,
  };
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const sessions = await listSessions(userId);
  return NextResponse.json({ sessions });
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const input = validate(body);
  if (!input) return NextResponse.json({ error: 'Invalid session payload' }, { status: 400 });

  const saved = await saveSession(userId, input);
  return NextResponse.json({ session: saved }, { status: 201 });
}

export async function DELETE() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await clearSessions(userId);
  return NextResponse.json({ ok: true });
}
