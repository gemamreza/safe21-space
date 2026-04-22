"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Notif = {
  id: string;
  message: string;
  is_read: boolean;
  created_at: string;
  thread_id: string;
};

export default function NotificationBell({ userId }: { userId: string }) {
  const supabase = useRef(createClient()).current;
  const [notifs, setNotifs] = useState<Notif[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const unread = notifs.filter((n) => !n.is_read).length;

  const fetchNotifs = async () => {
    const { data } = await supabase
      .from("notifications")
      .select("id, message, is_read, created_at, thread_id")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(20);
    setNotifs(data ?? []);
  };

  useEffect(() => {
    fetchNotifs();

    // Poll setiap 30 detik — lebih reliable dari realtime subscription
    const interval = setInterval(fetchNotifs, 30000);

    return () => clearInterval(interval);
  }, [userId]);

  // Tutup saat klik di luar
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Tandai SATU notif dibaca — update state lokal dulu (optimistic), lalu sync ke DB
  const markOneRead = async (id: string) => {
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id);
  };

  // Tandai SEMUA dibaca
  const markAllRead = async () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, is_read: true })));
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", userId)
      .eq("is_read", false);
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

  return (
    <div className="relative" ref={ref}>
      {/* Bell button — TIDAK auto-mark-all saat dibuka */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[var(--brand-light)] transition-all duration-200"
        aria-label="Notifikasi"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 2a5 5 0 00-5 5v3l-1.5 2.5h13L14 10V7a5 5 0 00-5-5z" stroke="var(--ink-muted)" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M7.5 14.5a1.5 1.5 0 003 0" stroke="var(--ink-muted)" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        {unread > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-red-500 text-white text-[10px] font-medium rounded-full flex items-center justify-center px-1">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 w-80 bg-white border border-[var(--border)] rounded-2xl overflow-hidden z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <p className="text-[13px] font-medium text-[var(--ink)]">Notifikasi</p>
              {unread > 0 && (
                <span className="text-[11px] font-medium bg-red-50 text-red-500 px-2 py-0.5 rounded-full">
                  {unread} baru
                </span>
              )}
            </div>
            {unread > 0 && (
              <button
                onClick={markAllRead}
                className="text-[11px] text-[var(--brand)] hover:underline"
              >
                Tandai semua dibaca
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-72 overflow-y-auto divide-y divide-[var(--border)]">
            {notifs.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-[13px] text-[var(--ink-muted)]">Belum ada notifikasi</p>
              </div>
            ) : (
              notifs.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                    !n.is_read ? "bg-[var(--brand-light)]" : "hover:bg-[var(--surface-2)]"
                  }`}
                >
                  {/* Dot */}
                  <div className="w-2 flex-shrink-0 pt-1.5">
                    {!n.is_read && (
                      <span className="block w-2 h-2 rounded-full bg-[var(--brand)]" />
                    )}
                  </div>

                  {/* Content — klik untuk buka thread DAN tandai dibaca */}
                  <Link
                    href={`/forum/${n.thread_id}`}
                    className="flex-1 min-w-0"
                    onClick={() => {
                      if (!n.is_read) markOneRead(n.id);
                      setOpen(false);
                    }}
                  >
                    <p className="text-[13px] text-[var(--ink)] leading-snug">{n.message}</p>
                    <p className="text-[11px] text-[var(--ink-muted)] mt-1">{timeAgo(n.created_at)}</p>
                  </Link>

                  {/* Tombol tandai dibaca per item */}
                  {!n.is_read && (
                    <button
                      onClick={() => markOneRead(n.id)}
                      className="flex-shrink-0 text-[var(--brand)] hover:text-[var(--brand-dark)] mt-0.5"
                      title="Tandai dibaca"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
