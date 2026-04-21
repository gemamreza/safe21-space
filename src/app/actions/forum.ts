"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createThread(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;

  const { data, error } = await supabase
    .from("threads")
    .insert({ title, content, category, author_id: user.id })
    .select("id")
    .single();

  if (error) {
    return { error: "Gagal membuat thread. Coba lagi." };
  }

  revalidatePath("/forum");
  redirect(`/forum/${data.id}`);
}

export async function createComment(threadId: string, content: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  const { error } = await supabase
    .from("comments")
    .insert({ content, thread_id: threadId, author_id: user.id });

  if (error) {
    return { error: "Gagal mengirim komentar." };
  }

  revalidatePath(`/forum/${threadId}`);
}
