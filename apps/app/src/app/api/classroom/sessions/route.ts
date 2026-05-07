import { NextRequest, NextResponse } from "next/server";
import { getClassroomRepository } from "@/lib/classroom/repository";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid session payload" }, { status: 400 });
  }

  const saved = await getClassroomRepository().recordPracticeSession({
    classCode: String(body.classCode ?? ""),
    joinToken: String(body.joinToken ?? ""),
    promptId: Number(body.promptId ?? 0),
    promptTitle: String(body.promptTitle ?? "Speaking practice"),
    score: Number(body.score ?? 0),
    fillerCount: Number(body.fillerCount ?? 0),
    durationSeconds: Number(body.durationSeconds ?? 0),
    eyeContactPercent: Number(body.eyeContactPercent ?? -1),
    wordsPerMinute: Number(body.wordsPerMinute ?? 0),
    xpEarned: Number(body.xpEarned ?? 0),
    transcriptExcerpt: typeof body.transcriptExcerpt === "string" ? body.transcriptExcerpt : null,
  });

  if (!saved) {
    return NextResponse.json({ error: "Class session could not be saved" }, { status: 403 });
  }

  return NextResponse.json({ sessionId: saved.id, createdAt: saved.createdAt });
}
