import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ForumThreadList from "./ForumThreadList";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forum Komunitas",
  description: "Forum diskusi untuk orang tua anak Down Syndrome.",
};

export default async function ForumPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: threads, error } = await supabase
    .from("threads")
    .select(`
      id,
      title,
      content,
      category,
      created_at,
      profiles (
        full_name
      )
    `)
    .order("created_at", { ascending: false });

  const { data: commentCounts } = await supabase
    .from("comments")
    .select("thread_id");

  const countMap: Record<string, number> = {};
  commentCounts?.forEach((c) => {
    countMap[c.thread_id] = (countMap[c.thread_id] ?? 0) + 1;
  });

  return (
    <main>
      <Navbar />
      <div className="pt-16">

        {/* Header */}
        <div className="bg-[var(--brand-light)] border-b border-[var(--border)] py-12 px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-[12px] font-medium text-[var(--brand)] uppercase tracking-widest mb-2">Komunitas</p>
              <h1
                className="text-[34px] text-[var(--ink)] leading-tight"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
              >
                Forum orang tua
              </h1>
            </div>
            {user ? (
              <Link
                href="/forum/new"
                className="self-start md:self-auto flex items-center gap-2 text-[14px] font-medium text-white bg-[var(--brand)] hover:bg-[var(--brand-dark)] px-5 py-2.5 rounded-xl transition-all duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M3 8h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Buat thread baru
              </Link>
            ) : (
              <Link
                href="/auth"
                className="self-start md:self-auto text-[14px] font-medium text-[var(--brand)] border border-[#BEB8F8] hover:bg-white px-5 py-2.5 rounded-xl transition-all duration-200"
              >
                Masuk untuk ikut diskusi →
              </Link>
            )}
          </div>
        </div>

        {error && (
          <div className="max-w-4xl mx-auto px-6 pt-6">
            <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4">
              <p className="text-[13px] text-red-700">Gagal memuat thread: {error.message}</p>
            </div>
          </div>
        )}

        {/* Filter + Thread list — Client Component */}
        {!error && (
          <ForumThreadList
            threads={threads ?? []}
            commentCounts={countMap}
            user={user}
          />
        )}

      </div>
      <Footer />
    </main>
  );
}
