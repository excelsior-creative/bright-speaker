"use server";

import { redirect } from "next/navigation";
import { getClassroomRepository } from "@/lib/classroom/repository";

export async function joinClassAction(formData: FormData) {
  const classCode = String(formData.get("classCode") ?? "");
  const displayName = String(formData.get("displayName") ?? "");

  const joined = await getClassroomRepository().joinClass({ classCode, displayName });
  if (!joined) {
    redirect(`/join?class=${encodeURIComponent(classCode)}&error=${encodeURIComponent("We couldn't find that class code. Check the code with your teacher and try again.")}`);
  }

  redirect(`/speak?prompt=1&class=${joined.classroom.code}&student=${joined.student.joinToken}`);
}
