"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = ["Semua", "Terapi", "Screening", "Pendidikan", "Cerita", "Umum"];

type Thread = {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  profiles: { full_name?: string } | { full_name?: string }[] | null;
};

type Props = {
  threads: Thread[];
  commentCounts: Record<string, number>;
  user: { id: string } | null;
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "baru saja";
  if (mins < 60) return `${mins} menit lalu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} jam lalu`;
  return `${Math.floor(hours / 24)} hari lalu`;
}

function getInitials(name: string | null) {
  if (!name) return "?";
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

const avatarColors = [
  "bg-[var(--brand-light)] text-[var(--brand-dark)]",
  "bg-[var(--sage-light)] text-[var(--sage)]",
  "bg-[var(--peach-light)] text-[var(--peach)]",
  "bg-purple-50 text-purple-700",
];

export default function ForumThreadList({ threads, commentCounts, user }: Props) {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filtered = activeCategory === "Semua"
    ? threads
    : threads.filter((t) => t.category === activeCategory);

  return (
    <>
      {/* Filter kategori */}
      <div className="border-b border-[var(--border)] bg-white px-6 sticky top-16 z-10">
        <div className="max-w-4xl mx-auto flex gap-1 overflow-x-auto py-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 text-[12px] font-medium px-3 py-1.5 rounded-lg transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[var(--brand)] text-white"
                  : "text-[var(--ink-muted)] hover:bg-[var(--brand-light)] hover:text-[var(--brand-dark)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Thread list */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Kosong — tidak ada thread sama sekali */}
          {threads.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-[var(--brand-light)] rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M24 18a2.5 2.5 0 01-2.5 2.5H7L3 24V7a2.5 2.5 0 012.5-2.5h16A2.5 2.5 0 0124 7v11z" stroke="#6355D8" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="text-[18px] font-medium text-[var(--ink)] mb-2">Belum ada thread</h2>
              <p className="text-[14px] text-[var(--ink-muted)] mb-6">Jadilah yang pertama memulai diskusi!</p>
              {user ? (
                <Link href="/forum/new" className="text-[14px] font-medium text-white bg-[var(--brand)] px-6 py-2.5 rounded-xl">
                  Buat thread pertama
                </Link>
              ) : (
                <Link href="/auth" className="text-[14px] font-medium text-white bg-[var(--brand)] px-6 py-2.5 rounded-xl">
                  Daftar & mulai diskusi
                </Link>
              )}
            </div>
          )}

          {/* Kosong — ada thread tapi tidak ada di kategori ini */}
          {threads.length > 0 && filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[15px] font-medium text-[var(--ink)] mb-2">
                Belum ada thread di kategori "{activeCategory}"
              </p>
              <p className="text-[13px] text-[var(--ink-muted)] mb-5">
                Jadilah yang pertama membahas topik ini!
              </p>
              {user ? (
                <Link href="/forum/new" className="text-[13px] font-medium text-white bg-[var(--brand)] px-5 py-2 rounded-xl">
                  Buat thread di kategori ini
                </Link>
              ) : (
                <button
                  onClick={() => setActiveCategory("Semua")}
                  className="text-[13px] font-medium text-[var(--brand)] border border-[#BEB8F8] px-5 py-2 rounded-xl"
                >
                  Lihat semua thread
                </button>
              )}
            </div>
          )}

          {/* Thread list */}
          {filtered.length > 0 && (
            <div className="flex flex-col gap-3">
              {/* Jumlah hasil */}
              {activeCategory !== "Semua" && (
                <p className="text-[12px] text-[var(--ink-muted)] mb-1">
                  {filtered.length} thread di kategori <span className="font-medium text-[var(--ink)]">{activeCategory}</span>
                </p>
              )}

              {filtered.map((thread, i) => {
                const profile = Array.isArray(thread.profiles) ? thread.profiles[0] : thread.profiles;
                const authorName = (profile as { full_name?: string } | null)?.full_name ?? "Anggota";
                const commentCount = commentCounts[thread.id] ?? 0;

                return (
                  <Link
                    key={thread.id}
                    href={`/forum/${thread.id}`}
                    className="group bg-white border border-[var(--border)] rounded-2xl p-5 hover:border-[var(--brand)] transition-all duration-200 flex gap-4 items-start"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-medium flex-shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                      {getInitials(authorName)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[13px] font-medium text-[var(--ink)]">{authorName}</span>
                        <span className="text-[12px] text-[var(--ink-muted)] flex-shrink-0 ml-2">{timeAgo(thread.created_at)}</span>
                      </div>
                      <h3 className="text-[15px] font-medium text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors mb-1 leading-snug">
                        {thread.title}
                      </h3>
                      <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed line-clamp-2 mb-3">
                        {thread.content}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-[12px] text-[var(--ink-muted)]">
                          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                            <path d="M6.5 1.5C3.7 1.5 1.5 3.5 1.5 6c0 .9.3 1.7.8 2.4L1.5 11l2.5-.9C4.7 10.7 5.6 11 6.5 11c2.8 0 5-2 5-4.5s-2.2-5-5-5z" stroke="currentColor" strokeWidth="1" />
                          </svg>
                          {commentCount} komentar
                        </span>
                        <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[var(--brand-light)] text-[var(--brand-dark)]">
                          {thread.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
