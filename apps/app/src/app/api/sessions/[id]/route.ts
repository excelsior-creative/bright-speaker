import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { deleteSession } from '@/lib/db/sessions-server';
import { rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const DELETE_LIMIT = { limit: 30, windowMs: 60_000 };

export async function DELETE(
  _request: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const limit = rateLimit(`sessions:delete-one:${userId}`, DELETE_LIMIT);
  if (!limit.ok) {
    const retryAfterSec = Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000));
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'retry-after': String(retryAfterSec) } },
    );
  }

  const { id } = await ctx.params;
  if (!id || typeof id !== 'string' || id.length > 64) {
    return NextResponse.json({ error: 'Invalid session id' }, { status: 400 });
  }

  const removed = await deleteSession(userId, id);
  if (!removed) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({ ok: true });
}
