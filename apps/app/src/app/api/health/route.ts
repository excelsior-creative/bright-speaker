import { NextResponse } from 'next/server';
import { sql } from 'drizzle-orm';
import { db } from '@/lib/db/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const startedAt = Date.now();
  try {
    await db.execute(sql`select 1`);
    return NextResponse.json(
      {
        status: 'ok',
        db: 'ok',
        latencyMs: Date.now() - startedAt,
        timestamp: new Date().toISOString(),
      },
      { headers: { 'cache-control': 'no-store' } },
    );
  } catch (err) {
    return NextResponse.json(
      {
        status: 'degraded',
        db: 'error',
        error: err instanceof Error ? err.message : 'unknown',
        latencyMs: Date.now() - startedAt,
        timestamp: new Date().toISOString(),
      },
      { status: 503, headers: { 'cache-control': 'no-store' } },
    );
  }
}
