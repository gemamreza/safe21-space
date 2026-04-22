"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { createComment } from "@/app/actions/forum";

type Profile = { id: string; username: string | null; full_name: string | null };

type Props = {
  threadId: string;
  replyTo?: { id: string; authorName: string; username: string | null } | null;
  onCancelReply?: () => void;
};

export default function CommentForm({ threadId, replyTo, onCancelReply }: Props) {
  const supabase = createClient();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Profile[]>([]);
  const [mentionQuery, setMentionQuery] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Set prefix @username saat reply
  useEffect(() => {
    if (replyTo?.username) {
      setContent(`@${replyTo.username} `);
      textareaRef.current?.focus();
    } else {
      setContent("");
    }
  }, [replyTo]);

  // Deteksi @mention untuk autocomplete
  const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setContent(val);

    const match = val.slice(0, e.target.selectionStart).match(/@(\w*)$/);
    if (match) {
      const query = match[1];
      setMentionQuery(query);
      if (query.length >= 1) {
        const { data } = await supabase
          .from("profiles")
          .select("id, username, full_name")
          .ilike("username", `${query}%`)
          .limit(5);
        setSuggestions(data ?? []);
      } else {
        setSuggestions([]);
      }
    } else {
      setMentionQuery(null);
      setSuggestions([]);
    }
  };

  const insertMention = (username: string) => {
    const cursorPos = textareaRef.current?.selectionStart ?? content.length;
    const before = content.slice(0, cursorPos).replace(/@\w*$/, `@${username} `);
    const after = content.slice(cursorPos);
    setContent(before + after);
    setSuggestions([]);
    setMentionQuery(null);
    textareaRef.current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    setError(null);

    const result = await createComment(threadId, content.trim(), replyTo?.id ?? null);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setContent("");
      setLoading(false);
      if (onCancelReply) onCancelReply();
    }
  };

  return (
    <div className="relative">
      {replyTo && (
        <div className="flex items-center gap-2 mb-2 text-[12px] text-[var(--ink-muted)]">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4-3v2h4v4H6v2L2 6z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" fill="none"/>
          </svg>
          Membalas <span className="text-[var(--brand)] font-medium">@{replyTo.username ?? replyTo.authorName}</span>
          <button onClick={onCancelReply} className="text-[var(--ink-muted)] hover:text-[var(--ink)] ml-1">· Batal</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-[var(--border)] rounded-xl p-4 flex flex-col gap-3 focus-within:border-[var(--brand)] transition-colors">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleChange}
            placeholder="Tulis komentar... Gunakan @username untuk menyebut seseorang"
            rows={3}
            required
            className="w-full text-[14px] px-0 py-0 focus:outline-none text-[var(--ink)] placeholder:text-[var(--ink-muted)] bg-white resize-none leading-relaxed"
          />

          {/* Mention suggestions */}
          {suggestions.length > 0 && (
            <div className="absolute bottom-full left-0 mb-1 w-56 bg-white border border-[var(--border)] rounded-xl overflow-hidden z-10">
              {suggestions.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => insertMention(s.username ?? "")}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[var(--brand-light)] text-left transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-[var(--brand-light)] text-[var(--brand-dark)] flex items-center justify-center text-[10px] font-medium flex-shrink-0">
                    {(s.full_name ?? "?")[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-[var(--ink)]">{s.full_name}</p>
                    <p className="text-[11px] text-[var(--ink-muted)]">@{s.username}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {error && <p className="text-[13px] text-red-600">{error}</p>}

        <div className="flex items-center justify-between border-t border-[var(--border)] pt-3">
          <p className="text-[11px] text-[var(--ink-muted)]">Ketik @ untuk menyebut pengguna</p>
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="flex items-center gap-2 text-[13px] font-medium text-white bg-[var(--brand)] hover:bg-[var(--brand-dark)] px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {loading ? "Mengirim..." : "Kirim"}
          </button>
        </div>
      </form>
    </div>
  );
}
