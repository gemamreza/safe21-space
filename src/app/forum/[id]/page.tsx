import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import ThreadDetail from "./ThreadDetail";

export default async function ThreadDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: thread } = await supabase
    .from("threads")
    .select(`id, title, content, category, created_at, edited_at, author_id, profiles(full_name, username)`)
    .eq("id", params.id)
    .single();

  if (!thread) notFound();

  const { data: comments } = await supabase
    .from("comments")
    .select(`id, content, created_at, edited_at, author_id, parent_id, profiles(full_name, username)`)
    .eq("thread_id", params.id)
    .order("created_at", { ascending: true });

  // Ambil profil user yang login
  let userProfile = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("username, full_name")
      .eq("id", user.id)
      .single();
    userProfile = data;
  }

  return (
    <main>
      <Navbar />
      <div className="pt-16 min-h-screen bg-[var(--surface-2)]">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Link href="/forum" className="flex items-center gap-2 text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)] mb-6 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Kembali ke forum
          </Link>

          <ThreadDetail
            thread={thread as any}
            comments={comments ?? []}
            currentUserId={user?.id ?? null}
            currentUserProfile={userProfile}
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
