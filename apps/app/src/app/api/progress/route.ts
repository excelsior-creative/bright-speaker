import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getProgress } from '@/lib/db/sessions-server';

export const runtime = 'nodejs';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const progress = await getProgress(userId);
  return NextResponse.json({ progress });
}
