"use client";

import { useState } from "react";
import { createComment } from "@/app/actions/forum";

export default function CommentForm({ threadId }: { threadId: string }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    setError(null);

    const result = await createComment(threadId, content.trim());

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      // createComment memanggil revalidatePath di server
      // halaman otomatis refresh dengan komentar terbaru
      setContent("");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[var(--border)] rounded-xl p-4 flex flex-col gap-3">
      <label className="text-[13px] font-medium text-[var(--ink)]">Tulis komentar</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Bagikan pengalaman atau pendapatmu..."
        rows={4}
        required
        className="text-[14px] px-4 py-3 rounded-xl border border-[var(--border)] focus:outline-none focus:border-[var(--brand)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] bg-white resize-none leading-relaxed transition-colors"
      />
      {error && <p className="text-[13px] text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading || !content.trim()}
        className="self-end flex items-center gap-2 text-[13px] font-medium text-white bg-[var(--brand)] hover:bg-[var(--brand-dark)] px-5 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading && (
          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        )}
        {loading ? "Mengirim..." : "Kirim komentar"}
      </button>
    </form>
  );
}
