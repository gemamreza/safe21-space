"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { createClient } from "@/lib/supabase/client";

export default function ProfilPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    username: "",
    bio: "",
  });

  const [originalUsername, setOriginalUsername] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth"); return; }

      const { data } = await supabase
        .from("profiles")
        .select("full_name, username, bio")
        .eq("id", user.id)
        .single();

      if (data) {
        setForm({
          full_name: data.full_name ?? "",
          username: data.username ?? "",
          bio: data.bio ?? "",
        });
        setOriginalUsername(data.username ?? "");
      }
      setLoading(false);
    };
    loadProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    // Validasi username
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(form.username)) {
      setError("Username hanya boleh huruf, angka, dan underscore. Minimal 3, maksimal 20 karakter.");
      setSaving(false);
      return;
    }

    // Cek username unik (kalau berubah)
    if (form.username !== originalUsername) {
      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", form.username)
        .single();

      if (existing) {
        setError("Username sudah dipakai. Coba username lain.");
        setSaving(false);
        return;
      }
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth"); return; }

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: form.full_name,
        username: form.username,
        bio: form.bio,
      })
      .eq("id", user.id);

    if (error) {
      setError("Gagal menyimpan profil. Coba lagi.");
    } else {
      setSuccess(true);
      setOriginalUsername(form.username);
    }
    setSaving(false);
  };

  function getInitials(name: string) {
    if (!name) return "?";
    return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  }

  if (loading) {
    return (
      <main>
        <Navbar />
        <div className="pt-16 min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[var(--brand-light)] border-t-[var(--brand)] rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <div className="pt-16 min-h-screen bg-[var(--surface-2)]">
        <div className="max-w-lg mx-auto px-6 py-12">

          <Link href="/forum" className="flex items-center gap-2 text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)] mb-6 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Kembali ke forum
          </Link>

          <h1
            className="text-[28px] text-[var(--ink)] mb-8"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
          >
            Edit profil
          </h1>

          {/* Avatar preview */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-[var(--brand-light)] text-[var(--brand-dark)] flex items-center justify-center text-[20px] font-medium">
              {getInitials(form.full_name)}
            </div>
            <div>
              <p className="text-[14px] font-medium text-[var(--ink)]">{form.full_name || "Nama belum diisi"}</p>
              <p className="text-[13px] text-[var(--ink-muted)]">@{form.username || "username"}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-[var(--border)] rounded-2xl p-6 flex flex-col gap-5">

            {/* Nama lengkap */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[var(--ink)]">Nama lengkap</label>
              <input
                type="text"
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                placeholder="Nama kamu"
                required
                className="text-[14px] px-4 py-2.5 rounded-xl border border-[var(--border)] focus:outline-none focus:border-[var(--brand)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] bg-white transition-colors"
              />
            </div>

            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[var(--ink)]">Username</label>
              <div className="flex items-center border border-[var(--border)] rounded-xl focus-within:border-[var(--brand)] transition-colors overflow-hidden">
                <span className="px-3 py-2.5 text-[14px] text-[var(--ink-muted)] bg-[var(--surface-2)] border-r border-[var(--border)]">@</span>
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "") })}
                  placeholder="username_kamu"
                  required
                  maxLength={20}
                  className="flex-1 text-[14px] px-3 py-2.5 focus:outline-none text-[var(--ink)] placeholder:text-[var(--ink-muted)] bg-white"
                />
              </div>
              <p className="text-[11px] text-[var(--ink-muted)]">Hanya huruf kecil, angka, dan underscore. 3–20 karakter.</p>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[var(--ink)]">Bio <span className="text-[var(--ink-muted)] font-normal">(opsional)</span></label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="Cerita singkat tentang kamu..."
                rows={3}
                maxLength={150}
                className="text-[14px] px-4 py-3 rounded-xl border border-[var(--border)] focus:outline-none focus:border-[var(--brand)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] bg-white resize-none transition-colors leading-relaxed"
              />
              <p className="text-[11px] text-[var(--ink-muted)] text-right">{form.bio.length}/150</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <p className="text-[13px] text-red-700">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-[var(--sage-light)] border border-green-200 rounded-xl px-4 py-3">
                <p className="text-[13px] text-[var(--sage)]">Profil berhasil disimpan!</p>
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="text-[14px] font-medium text-white bg-[var(--brand)] hover:bg-[var(--brand-dark)] py-2.5 rounded-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {saving ? "Menyimpan..." : "Simpan profil"}
            </button>
          </form>

          {/* Info email */}
          <div className="mt-4 bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-5 py-4">
            <p className="text-[12px] text-[var(--ink-muted)]">
              Email tidak bisa diubah dari sini. Jika perlu mengubah email, hubungi kami melalui halaman{" "}
              <Link href="/tentang#kontak" className="text-[var(--brand)]">Tentang</Link>.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
