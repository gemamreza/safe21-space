"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { createThread } from "@/app/actions/forum";

const CATEGORIES = ["Terapi", "Screening", "Pendidikan", "Cerita", "Umum"];

export default function NewThreadPage() {
  const [category, setCategory] = useState("Umum");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("category", category);

    const result = await createThread(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
    // Kalau sukses, createThread akan redirect otomatis
  };

  return (
    <main>
      <Navbar />
      <div className="pt-16 min-h-screen bg-[var(--surface-2)]">
        <div className="max-w-2xl mx-auto px-6 py-12">

          <Link href="/forum" className="flex items-center gap-2 text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)] mb-6 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Kembali ke forum
          </Link>

          <h1
            className="text-[30px] text-[var(--ink)] mb-8"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
          >
            Buat thread baru
          </h1>

          <form onSubmit={handleSubmit} className="bg-white border border-[var(--border)] rounded-2xl p-6 flex flex-col gap-5">
            {/* Judul */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[var(--ink)]">Judul</label>
              <input
                type="text"
                name="title"
                placeholder="Tulis judul yang jelas dan spesifik..."
                required
                maxLength={150}
                className="text-[14px] px-4 py-2.5 rounded-xl border border-[var(--border)] focus:outline-none focus:border-[var(--brand)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] bg-white transition-colors"
              />
            </div>

            {/* Kategori */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[var(--ink)]">Kategori</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`text-[12px] font-medium px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                      category === cat
                        ? "bg-[var(--brand)] text-white border-[var(--brand)]"
                        : "bg-white text-[var(--ink-muted)] border-[var(--border)] hover:border-[var(--brand)]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Isi */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[var(--ink)]">Isi thread</label>
              <textarea
                name="content"
                placeholder="Ceritakan lebih detail — apa yang ingin kamu tanyakan atau bagikan?"
                required
                rows={8}
                className="text-[14px] px-4 py-3 rounded-xl border border-[var(--border)] focus:outline-none focus:border-[var(--brand)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] bg-white transition-colors resize-none leading-relaxed"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <p className="text-[13px] text-red-700">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-1">
              <Link href="/forum" className="flex-1 text-center text-[14px] text-[var(--ink-muted)] border border-[var(--border)] py-2.5 rounded-xl hover:bg-[var(--surface-2)] transition-all">
                Batal
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 text-[14px] font-medium text-white bg-[var(--brand)] hover:bg-[var(--brand-dark)] py-2.5 rounded-xl transition-all duration-200 disabled:opacity-50"
              >
                {loading && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                {loading ? "Memposting..." : "Posting thread"}
              </button>
            </div>
          </form>

        </div>
      </div>
    </main>
  );
}
