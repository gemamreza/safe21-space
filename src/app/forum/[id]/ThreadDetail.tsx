"use client";

import { useState } from "react";
import Link from "next/link";
import CommentForm from "./CommentForm";
import { editThread, editComment, deleteComment } from "@/app/actions/forum";

type Profile = { full_name: string | null; username: string | null };
type Comment = {
  id: string;
  content: string;
  created_at: string;
  edited_at: string | null;
  author_id: string;
  parent_id: string | null;
  profiles: Profile | Profile[] | null;
};
type Thread = {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  edited_at: string | null;
  author_id: string;
  profiles: Profile | Profile[] | null;
};

type Props = {
  thread: Thread;
  comments: Comment[];
  currentUserId: string | null;
  currentUserProfile: { username: string | null; full_name: string | null } | null;
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

function getProfile(profiles: Profile | Profile[] | null): Profile {
  return (Array.isArray(profiles) ? profiles[0] : profiles) ?? { full_name: null, username: null };
}

function getInitials(name: string | null) {
  if (!name) return "?";
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

const avatarColors = [
  "bg-[var(--brand-light)] text-[var(--brand-dark)]",
  "bg-[var(--sage-light)] text-[var(--sage)]",
  "bg-[var(--peach-light)] text-[var(--peach)]",
  "bg-pink-50 text-pink-700",
];

function renderContent(content: string) {
  const parts = content.split(/(@\w+)/g);
  return parts.map((part, i) =>
    part.startsWith("@")
      ? <span key={i} className="text-[var(--brand)] font-medium">{part}</span>
      : <span key={i}>{part}</span>
  );
}

export default function ThreadDetail({ thread, comments, currentUserId, currentUserProfile }: Props) {
  const threadProfile = getProfile(thread.profiles);
  const isThreadAuthor = currentUserId === thread.author_id;

  const [editingThread, setEditingThread] = useState(false);
  const [threadEdit, setThreadEdit] = useState({ title: thread.title, content: thread.content });
  const [savingThread, setSavingThread] = useState(false);

  const [replyTo, setReplyTo] = useState<{ id: string; authorName: string; username: string | null } | null>(null);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [savingComment, setSavingComment] = useState(false);

  // Pisah top-level vs replies
  const topLevelComments = comments.filter((c) => !c.parent_id);
  const replies = comments.filter((c) => c.parent_id);

  const saveThreadEdit = async () => {
    if (!threadEdit.title.trim() || !threadEdit.content.trim()) return;
    setSavingThread(true);
    await editThread(thread.id, threadEdit.title, threadEdit.content);
    setSavingThread(false);
    setEditingThread(false);
  };

  const startEditComment = (comment: Comment) => {
    setEditingComment(comment.id);
    setEditContent(comment.content);
  };

  const saveCommentEdit = async (commentId: string) => {
    if (!editContent.trim()) return;
    setSavingComment(true);
    await editComment(commentId, editContent, thread.id);
    setSavingComment(false);
    setEditingComment(null);
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Hapus komentar ini?")) return;
    await deleteComment(commentId, thread.id);
  };

  return (
    <div>
      {/* ── THREAD ─────────────────────────────────── */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[var(--brand-light)] text-[var(--brand-dark)]">
            {thread.category}
          </span>
          <span className="text-[12px] text-[var(--ink-muted)]">{timeAgo(thread.created_at)}</span>
          {thread.edited_at && <span className="text-[11px] text-[var(--ink-muted)] italic">· diedit</span>}
        </div>

        {editingThread ? (
          <div className="flex flex-col gap-3 mb-4">
            <input
              value={threadEdit.title}
              onChange={(e) => setThreadEdit({ ...threadEdit, title: e.target.value })}
              className="text-[20px] font-medium px-0 border-b border-[var(--brand)] focus:outline-none text-[var(--ink)] bg-white w-full pb-1"
            />
            <textarea
              value={threadEdit.content}
              onChange={(e) => setThreadEdit({ ...threadEdit, content: e.target.value })}
              rows={6}
              className="text-[14px] text-[var(--ink-muted)] leading-relaxed resize-none border border-[var(--border)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--brand)] bg-white"
            />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setEditingThread(false)}
                className="text-[13px] text-[var(--ink-muted)] border border-[var(--border)] px-4 py-1.5 rounded-lg">
                Batal
              </button>
              <button onClick={saveThreadEdit} disabled={savingThread}
                className="text-[13px] font-medium text-white bg-[var(--brand)] px-4 py-1.5 rounded-lg disabled:opacity-50 flex items-center gap-2">
                {savingThread && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                Simpan
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-[24px] font-medium text-[var(--ink)] leading-snug mb-3"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              {thread.title}
            </h1>
            <p className="text-[15px] text-[var(--ink-muted)] leading-relaxed mb-5 whitespace-pre-wrap">
              {renderContent(thread.content)}
            </p>
          </>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-medium ${avatarColors[0]}`}>
              {getInitials(threadProfile.full_name)}
            </div>
            <div>
              <p className="text-[13px] font-medium text-[var(--ink)]">{threadProfile.full_name ?? "Anggota"}</p>
              {threadProfile.username && (
                <p className="text-[11px] text-[var(--ink-muted)]">@{threadProfile.username}</p>
              )}
            </div>
          </div>
          {isThreadAuthor && !editingThread && (
            <button onClick={() => setEditingThread(true)}
              className="flex items-center gap-1.5 text-[12px] text-[var(--ink-muted)] hover:text-[var(--brand)] transition-colors px-3 py-1.5 rounded-lg hover:bg-[var(--brand-light)]">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M8.5 1.5l3 3L4 12H1V9l7.5-7.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Edit post
            </button>
          )}
        </div>
      </div>

      {/* ── KOMENTAR ────────────────────────────────── */}
      <div className="mb-4">
        <h2 className="text-[14px] font-medium text-[var(--ink)] mb-4">
          {comments.length} komentar
        </h2>

        <div className="flex flex-col gap-3 mb-6">
          {topLevelComments.map((comment, i) => {
            const cp = getProfile(comment.profiles);
            const isOwn = currentUserId === comment.author_id;
            const commentReplies = replies.filter((r) => r.parent_id === comment.id);

            return (
              <div key={comment.id}>
                {/* Komentar utama */}
                <div className="flex gap-3 items-start">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-medium flex-shrink-0 mt-0.5 ${avatarColors[(i + 1) % avatarColors.length]}`}>
                    {getInitials(cp.full_name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    {editingComment === comment.id ? (
                      <div className="bg-white border border-[var(--brand)] rounded-2xl rounded-tl-none p-3 mb-1">
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          rows={3}
                          className="w-full text-[13px] text-[var(--ink)] bg-white resize-none focus:outline-none leading-relaxed mb-2"
                        />
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => setEditingComment(null)}
                            className="text-[12px] text-[var(--ink-muted)] border border-[var(--border)] px-3 py-1 rounded-lg">
                            Batal
                          </button>
                          <button onClick={() => saveCommentEdit(comment.id)} disabled={savingComment}
                            className="text-[12px] font-medium text-white bg-[var(--brand)] px-3 py-1 rounded-lg disabled:opacity-50">
                            Simpan
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className={`rounded-2xl rounded-tl-none p-3 mb-1 ${isOwn ? "bg-[var(--brand-light)]" : "bg-[var(--surface-2)]"}`}>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="text-[12px] font-medium text-[var(--ink)]">{cp.full_name ?? "Anggota"}</span>
                          {cp.username && <span className="text-[11px] text-[var(--ink-muted)]">@{cp.username}</span>}
                        </div>
                        <p className="text-[13px] text-[var(--ink)] leading-relaxed">{renderContent(comment.content)}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-1 pl-1">
                      <span className="text-[11px] text-[var(--ink-muted)]">{timeAgo(comment.created_at)}</span>
                      {comment.edited_at && <span className="text-[10px] text-[var(--ink-muted)] italic">· diedit</span>}
                      {currentUserId && (
                        <button
                          onClick={() => setReplyTo({ id: comment.id, authorName: cp.full_name ?? "Anggota", username: cp.username })}
                          className="flex items-center gap-1 text-[11px] text-[var(--ink-muted)] hover:text-[var(--brand)] px-2 py-0.5 rounded transition-colors ml-1"
                        >
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                            <path d="M9 2H2a.8.8 0 00-.8.8v4.4a.8.8 0 00.8.8h.8l1.6 1.6 1.6-1.6H9a.8.8 0 00.8-.8V2.8A.8.8 0 009 2z" stroke="currentColor" strokeWidth="1"/>
                          </svg>
                          Reply
                        </button>
                      )}
                      {isOwn && editingComment !== comment.id && (
                        <>
                          <button onClick={() => startEditComment(comment)}
                            className="flex items-center gap-1 text-[11px] text-[var(--ink-muted)] hover:text-[var(--brand)] px-2 py-0.5 rounded transition-colors">
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                              <path d="M7.5 1.5l2 2-5 5H3V7l4.5-5.5z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Edit
                          </button>
                          <button onClick={() => handleDeleteComment(comment.id)}
                            className="flex items-center gap-1 text-[11px] text-[var(--ink-muted)] hover:text-red-500 px-2 py-0.5 rounded transition-colors">
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                              <path d="M1.5 2.5h8M3.5 2.5V2a1 1 0 012 0v.5M4 4.5v3M6.5 4.5v3M2.5 2.5l.5 6h5l.5-6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Hapus
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Replies */}
                {commentReplies.length > 0 && (
                  <div className="ml-12 mt-2 flex flex-col gap-2">
                    <div className="w-0.5 h-2 bg-[var(--border)] ml-4 mb-1" />
                    {commentReplies.map((reply, ri) => {
                      const rp = getProfile(reply.profiles);
                      const isReplyOwn = currentUserId === reply.author_id;
                      return (
                        <div key={reply.id} className="flex gap-2.5 items-start">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0 mt-0.5 ${avatarColors[(ri + 2) % avatarColors.length]}`}>
                            {getInitials(rp.full_name)}
                          </div>
                          <div className="flex-1 min-w-0">
                            {editingComment === reply.id ? (
                              <div className="bg-white border border-[var(--brand)] rounded-xl p-3 mb-1">
                                <textarea
                                  value={editContent}
                                  onChange={(e) => setEditContent(e.target.value)}
                                  rows={2}
                                  className="w-full text-[13px] text-[var(--ink)] bg-white resize-none focus:outline-none leading-relaxed mb-2"
                                />
                                <div className="flex gap-2 justify-end">
                                  <button onClick={() => setEditingComment(null)} className="text-[11px] text-[var(--ink-muted)] border border-[var(--border)] px-2.5 py-1 rounded-lg">Batal</button>
                                  <button onClick={() => saveCommentEdit(reply.id)} disabled={savingComment} className="text-[11px] font-medium text-white bg-[var(--brand)] px-2.5 py-1 rounded-lg disabled:opacity-50">Simpan</button>
                                </div>
                              </div>
                            ) : (
                              <div className={`rounded-xl p-2.5 mb-1 ${isReplyOwn ? "bg-[var(--brand-light)]" : "bg-[var(--surface-2)]"}`}>
                                <div className="flex items-center gap-1.5 mb-1">
                                  <span className="text-[11px] font-medium text-[var(--ink)]">{rp.full_name ?? "Anggota"}</span>
                                  {rp.username && <span className="text-[10px] text-[var(--ink-muted)]">@{rp.username}</span>}
                                </div>
                                <p className="text-[12px] text-[var(--ink)] leading-relaxed">{renderContent(reply.content)}</p>
                              </div>
                            )}
                            <div className="flex items-center gap-1 pl-1">
                              <span className="text-[10px] text-[var(--ink-muted)]">{timeAgo(reply.created_at)}</span>
                              {reply.edited_at && <span className="text-[10px] text-[var(--ink-muted)] italic">· diedit</span>}
                              {isReplyOwn && editingComment !== reply.id && (
                                <>
                                  <button onClick={() => startEditComment(reply)} className="text-[10px] text-[var(--ink-muted)] hover:text-[var(--brand)] px-2 py-0.5 rounded transition-colors">Edit</button>
                                  <button onClick={() => handleDeleteComment(reply.id)} className="text-[10px] text-[var(--ink-muted)] hover:text-red-500 px-2 py-0.5 rounded transition-colors">Hapus</button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Inline reply form */}
                {replyTo?.id === comment.id && (
                  <div className="ml-12 mt-3">
                    <CommentForm
                      threadId={thread.id}
                      replyTo={replyTo}
                      onCancelReply={() => setReplyTo(null)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Main comment form */}
        {currentUserId ? (
          !replyTo && (
            <CommentForm
              threadId={thread.id}
              replyTo={null}
              onCancelReply={() => setReplyTo(null)}
            />
          )
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
  );
}
