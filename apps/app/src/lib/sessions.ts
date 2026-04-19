export {
  getXpForNextLevel,
  defaultProgress,
  applySessionToProgress,
  computeLevel,
} from './sessions-types';
export type {
  SessionRecord,
  LevelUpSummary,
  SaveSessionResult,
  UserProgress,
  NewSessionInput,
} from './sessions-types';

import type {
  NewSessionInput,
  SaveSessionResult,
  SessionRecord,
  UserProgress,
} from './sessions-types';

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Request failed (${res.status}): ${text || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchSessions(): Promise<SessionRecord[]> {
  const res = await fetch('/api/sessions', { cache: 'no-store' });
  const data = await handle<{ sessions: SessionRecord[] }>(res);
  return data.sessions;
}

export async function fetchProgress(): Promise<UserProgress> {
  const res = await fetch('/api/progress', { cache: 'no-store' });
  const data = await handle<{ progress: UserProgress }>(res);
  return data.progress;
}

export async function saveSession(input: NewSessionInput): Promise<SaveSessionResult> {
  const res = await fetch('/api/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const data = await handle<{ session: SaveSessionResult }>(res);
  return data.session;
}

export async function clearSessions(): Promise<void> {
  const res = await fetch('/api/sessions', { method: 'DELETE' });
  await handle<{ ok: true }>(res);
}
