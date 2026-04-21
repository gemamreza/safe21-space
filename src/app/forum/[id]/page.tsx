import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import CommentForm from "./CommentForm";

export default async function ThreadDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Ambil thread
  const { data: thread } = await supabase
    .from("threads")
    .select(`id, title, content, category, created_at, profiles(full_name)`)
    .eq("id", params.id)
    .single();

  if (!thread) notFound();

  // Ambil komentar
  const { data: comments } = await supabase
    .from("comments")
    .select(`id, content, created_at, profiles(full_name)`)
    .eq("thread_id", params.id)
    .order("created_at", { ascending: true });

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} menit lalu`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} jam lalu`;
    return `${Math.floor(hours / 24)} hari lalu`;
  }

  function getInitials(name: string | null) {
    if (!name) return "?";
    return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  }

  const threadAuthor = Array.isArray(thread.profiles) ? thread.profiles[0] : thread.profiles;
  const threadAuthorName = (threadAuthor as { full_name?: string } | null)?.full_name ?? "Anggota";

  return (
    <main>
      <Navbar />
      <div className="pt-16 min-h-screen bg-[var(--surface-2)]">
        <div className="max-w-3xl mx-auto px-6 py-10">

          {/* Back */}
          <Link href="/forum" className="flex items-center gap-2 text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)] mb-6 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Kembali ke forum
          </Link>

          {/* Thread */}
          <div className="bg-white border border-[var(--border)] rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[var(--brand-light)] text-[var(--brand-dark)]">
                {thread.category}
              </span>
              <span className="text-[12px] text-[var(--ink-muted)]">{timeAgo(thread.created_at)}</span>
            </div>
            <h1
              className="text-[26px] text-[var(--ink)] leading-snug mb-4"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
            >
              {thread.title}
            </h1>
            <p className="text-[15px] text-[var(--ink-muted)] leading-relaxed mb-5 whitespace-pre-wrap">
              {thread.content}
            </p>
            <div className="flex items-center gap-2 pt-4 border-t border-[var(--border)]">
              <div className="w-8 h-8 rounded-full bg-[var(--brand-light)] text-[var(--brand-dark)] flex items-center justify-center text-[12px] font-medium">
                {getInitials(threadAuthorName)}
              </div>
              <span className="text-[13px] font-medium text-[var(--ink)]">{threadAuthorName}</span>
            </div>
          </div>

          {/* Komentar */}
          <div className="mb-4">
            <h2 className="text-[15px] font-medium text-[var(--ink)] mb-4">
              {comments?.length ?? 0} komentar
            </h2>

            {comments && comments.length > 0 && (
              <div className="flex flex-col gap-3 mb-6">
                {comments.map((comment) => {
                  const cp = Array.isArray(comment.profiles) ? comment.profiles[0] : comment.profiles;
                  const cName = (cp as { full_name?: string } | null)?.full_name ?? "Anggota";
                  return (
                    <div key={comment.id} className="bg-white border border-[var(--border)] rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-full bg-[var(--sage-light)] text-[var(--sage)] flex items-center justify-center text-[11px] font-medium">
                          {getInitials(cName)}
                        </div>
                        <span className="text-[13px] font-medium text-[var(--ink)]">{cName}</span>
                        <span className="text-[12px] text-[var(--ink-muted)]">{timeAgo(comment.created_at)}</span>
                      </div>
                      <p className="text-[14px] text-[var(--ink-muted)] leading-relaxed pl-9 whitespace-pre-wrap">
                        {comment.content}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Form komentar */}
            {user ? (
              <CommentForm threadId={thread.id} />
            ) : (
              <div className="bg-[var(--brand-light)] border border-[#BEB8F8] rounded-xl px-5 py-4 text-center">
                <p className="text-[13px] text-[var(--brand-dark)] mb-2">Ingin ikut berdiskusi?</p>
                <Link href="/auth" className="text-[13px] font-medium text-white bg-[var(--brand)] px-5 py-2 rounded-lg">
                  Masuk atau daftar gratis
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}
