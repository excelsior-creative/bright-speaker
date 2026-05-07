"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getClassroomRepository } from "@/lib/classroom/repository";
import type { ClassroomGradeBand } from "@/lib/classroom/types";

export async function createClassAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/dashboard/classes");

  const name = String(formData.get("name") ?? "").trim();
  const gradeBand = String(formData.get("gradeBand") ?? "mixed") as ClassroomGradeBand;

  if (!name || name.length < 3) {
    redirect("/dashboard/classes?error=Class%20name%20needs%20at%20least%203%20characters");
  }

  await getClassroomRepository().createClass({ teacherUserId: userId, name, gradeBand });
  revalidatePath("/dashboard/classes");
  redirect("/dashboard/classes?created=1");
}
