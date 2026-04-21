"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";

export default function AuthPage() {
  const router = useRouter();
  const supabase = createClient();

  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setError("Gagal login dengan Google. Coba lagi.");
      setLoadingGoogle(false);
    }
    // Kalau sukses, browser redirect otomatis — tidak perlu setLoadingGoogle(false)
  };

  const handleForgotPassword = async () => {
    if (!form.email) {
      setError("Masukkan email kamu terlebih dahulu, lalu klik lupa password.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(form.email, {
      redirectTo: `${window.location.origin}/auth/reset`,
    });
    setLoading(false);
    if (error) {
      setError("Gagal mengirim email reset. Pastikan email sudah benar.");
    } else {
      setForgotSent(true);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (mode === "signup") {
      if (form.password !== form.confirmPassword) {
        setError("Password dan konfirmasi password tidak cocok.");
        return;
      }
      if (form.password.length < 8) {
        setError("Password minimal 8 karakter.");
        return;
      }
    }

    setLoading(true);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.fullName } },
      });
      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        setSuccess("Pendaftaran berhasil! Silakan login.");
        setMode("login");
        setForm({ fullName: "", email: form.email, password: "", confirmPassword: "" });
        setLoading(false);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) {
        setError("Email atau password salah. Coba lagi.");
        setLoading(false);
      } else {
        // Tampilkan redirecting loader, JANGAN setLoading(false)
        // biarkan loader tetap tampil sampai halaman benar-benar pindah
        setRedirecting(true);
        router.push("/forum");
      }
    }
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setError(null);
    setSuccess(null);
    setForm({ fullName: "", email: "", password: "", confirmPassword: "" });
  };

  // Tampilkan full-screen loader saat redirecting
  if (redirecting) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center gap-4 z-50">
        <div className="w-12 h-12 border-[3px] border-[var(--brand-light)] border-t-[var(--brand)] rounded-full animate-spin" />
        <p className="text-[15px] text-[var(--ink-muted)]">Masuk ke forum...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--surface-2)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-8 h-8 rounded-full bg-[var(--brand)] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="5" stroke="white" strokeWidth="1.5" />
              <circle cx="8" cy="8" r="2" fill="white" />
            </svg>
          </div>
          <span className="font-medium text-[15px] text-[var(--ink)]">
            Safe21<span className="text-[var(--brand)]">.space</span>
          </span>
        </Link>

        <div className="bg-white border border-[var(--border)] rounded-2xl p-8">

          {/* Toggle */}
          <div className="flex bg-[var(--surface-2)] rounded-xl p-1 mb-6">
            {(["login", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`flex-1 text-[13px] font-medium py-2 rounded-lg transition-all duration-200 ${
                  mode === m ? "bg-white text-[var(--ink)]" : "text-[var(--ink-muted)]"
                }`}
              >
                {m === "login" ? "Masuk" : "Daftar"}
              </button>
            ))}
          </div>

          <h1
            className="text-[24px] text-[var(--ink)] mb-1"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
          >
            {mode === "login" ? "Selamat datang kembali" : "Bergabung ke komunitas"}
          </h1>
          <p className="text-[13px] text-[var(--ink-muted)] mb-6">
            {mode === "login" ? "Masuk untuk lanjut ke forum." : "Gratis selamanya."}
          </p>

          {/* Google OAuth */}
          <button
            onClick={handleGoogleLogin}
            disabled={loadingGoogle}
            className="w-full flex items-center justify-center gap-3 border border-[var(--border)] hover:border-[var(--brand)] hover:bg-[var(--brand-light)] rounded-xl py-2.5 text-[14px] text-[var(--ink)] transition-all duration-200 mb-4 disabled:opacity-60"
          >
            {loadingGoogle ? (
              <div className="w-4 h-4 border-2 border-[var(--border)] border-t-[var(--brand)] rounded-full animate-spin" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                <path d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
            )}
            {loadingGoogle ? "Menghubungkan..." : `${mode === "login" ? "Masuk" : "Daftar"} dengan Google`}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-[var(--border)]" />
            <span className="text-[12px] text-[var(--ink-muted)]">atau dengan email</span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "signup" && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[var(--ink)]">Nama lengkap</label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Nama kamu"
                  required
                  className="text-[14px] px-4 py-2.5 rounded-xl border border-[var(--border)] focus:outline-none focus:border-[var(--brand)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] bg-white transition-colors"
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[var(--ink)]">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@contoh.com"
                required
                className="text-[14px] px-4 py-2.5 rounded-xl border border-[var(--border)] focus:outline-none focus:border-[var(--brand)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] bg-white transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[var(--ink)]">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimal 8 karakter"
                required
                minLength={8}
                className="text-[14px] px-4 py-2.5 rounded-xl border border-[var(--border)] focus:outline-none focus:border-[var(--brand)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] bg-white transition-colors"
              />
            </div>

            {mode === "signup" && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[var(--ink)]">Konfirmasi password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Ulangi password kamu"
                  required
                  className={`text-[14px] px-4 py-2.5 rounded-xl border focus:outline-none text-[var(--ink)] placeholder:text-[var(--ink-muted)] bg-white transition-colors ${
                    form.confirmPassword && form.confirmPassword !== form.password
                      ? "border-red-300 focus:border-red-400"
                      : form.confirmPassword && form.confirmPassword === form.password
                      ? "border-green-400 focus:border-green-500"
                      : "border-[var(--border)] focus:border-[var(--brand)]"
                  }`}
                />
                {form.confirmPassword && form.confirmPassword !== form.password && (
                  <p className="text-[12px] text-red-500">Password tidak cocok</p>
                )}
                {form.confirmPassword && form.confirmPassword === form.password && (
                  <p className="text-[12px] text-green-600">Password cocok ✓</p>
                )}
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <p className="text-[13px] text-red-700">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-[var(--sage-light)] border border-green-200 rounded-xl px-4 py-3">
                <p className="text-[13px] text-[var(--sage)]">{success}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || (mode === "signup" && form.password !== form.confirmPassword)}
              className="mt-1 text-[14px] font-medium text-white bg-[var(--brand)] hover:bg-[var(--brand-dark)] py-3 rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {loading ? "Memproses..." : mode === "login" ? "Masuk" : "Buat akun gratis"}
            </button>

            {/* Lupa password — hanya di mode login */}
            {mode === "login" && (
              <div className="text-center">
                {forgotSent ? (
                  <p className="text-[12px] text-[var(--sage)]">
                    Email reset sudah dikirim! Cek inbox kamu.
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[12px] text-[var(--ink-muted)] hover:text-[var(--brand)] transition-colors"
                  >
                    Lupa password?
                  </button>
                )}
              </div>
            )}
          </form>
        </div>

        <p className="text-center text-[12px] text-[var(--ink-muted)] mt-4">
          Dengan mendaftar, kamu menyetujui{" "}
          <Link href="#" className="text-[var(--brand)]">syarat penggunaan</Link> kami.
        </p>
      </div>
    </main>
  );
}
