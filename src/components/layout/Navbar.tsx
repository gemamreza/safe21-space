"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import NotificationBell from "@/components/ui/NotificationBell";

const links = [
  { label: "Apa itu DS?", href: "/edukasi" },
  { label: "Screening", href: "/screening" },
  { label: "Panduan Ortu", href: "/panduan" },
  { label: "Forum", href: "/forum" },
  { label: "Tentang Kami", href: "/tentang" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<{ full_name: string | null; username: string | null } | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const supabase = createClient();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        supabase
          .from("profiles")
          .select("full_name, username")
          .eq("id", user.id)
          .single()
          .then(({ data }) => setProfile(data));
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    router.push("/");
    router.refresh();
  };

  function getInitials(name: string | null) {
    if (!name) return "?";
    return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  }

  const displayName = profile?.full_name ?? user?.email ?? null;
  const displayUsername = profile?.username ? `@${profile.username}` : null;

  const navBg = isHome
    ? scrolled ? "bg-white/90 backdrop-blur-md border-b border-[var(--border)]" : "bg-transparent"
    : "bg-white border-b border-[var(--border)]";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[var(--brand)] flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="5" stroke="white" strokeWidth="1.5" />
              <circle cx="8" cy="8" r="2" fill="white" />
            </svg>
          </div>
          <span className="font-medium text-[15px] text-[var(--ink)] tracking-tight">
            Safe21<span className="text-[var(--brand)]">.space</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={`text-[13px] px-3 py-2 rounded-lg transition-all duration-200 ${
                pathname === l.href
                  ? "bg-[var(--brand-light)] text-[var(--brand-dark)] font-medium"
                  : "text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--brand-light)]"
              }`}
            >{l.label}</Link>
          ))}
        </div>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <NotificationBell userId={user.id} />
              <Link href="/profil" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-[var(--brand-light)] text-[var(--brand-dark)] flex items-center justify-center text-[12px] font-medium">
                  {getInitials(displayName)}
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-[var(--ink)] font-medium max-w-[100px] truncate leading-tight">{displayName}</span>
                  {displayUsername && <span className="text-[11px] text-[var(--ink-muted)] leading-tight">{displayUsername}</span>}
                </div>
              </Link>
              <button onClick={handleLogout}
                className="text-[13px] text-[var(--ink-muted)] px-4 py-2 rounded-lg border border-[var(--border)] hover:border-red-300 hover:text-red-500 transition-all duration-200">
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link href="/auth" className="text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)] px-4 py-2 rounded-lg border border-[var(--border)] hover:border-[var(--brand)] transition-all duration-200">Masuk</Link>
              <Link href="/auth" className="text-[13px] font-medium text-white bg-[var(--brand)] hover:bg-[var(--brand-dark)] px-4 py-2 rounded-lg transition-all duration-200">Bergabung gratis</Link>
            </>
          )}
        </div>

        {/* Mobile — bell + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          {user && <NotificationBell userId={user.id} />}
          <button
            className="p-2 rounded-lg hover:bg-[var(--brand-light)]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-[var(--ink)] transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-[var(--ink)] transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-[var(--ink)] transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[var(--border)] px-6 py-4 flex flex-col gap-2">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className="text-[14px] text-[var(--ink-muted)] py-2 border-b border-[var(--border)] last:border-0"
              onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            {user ? (
              <>
                <Link href="/profil" onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-[var(--brand-light)] text-[var(--brand-dark)] flex items-center justify-center text-[12px] font-medium">
                    {getInitials(displayName)}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-[var(--ink)]">{displayName}</p>
                    {displayUsername && <p className="text-[11px] text-[var(--ink-muted)]">{displayUsername}</p>}
                  </div>
                </Link>
                <Link href="/profil" onClick={() => setMenuOpen(false)}
                  className="text-center text-[13px] py-2 border border-[var(--border)] rounded-lg text-[var(--ink-muted)]">
                  Edit profil
                </Link>
                <button onClick={handleLogout} className="text-center text-[13px] py-2 border border-red-200 text-red-500 rounded-lg">Keluar</button>
              </>
            ) : (
              <>
                <Link href="/auth" className="text-center text-[13px] py-2 border border-[var(--border)] rounded-lg" onClick={() => setMenuOpen(false)}>Masuk</Link>
                <Link href="/auth" className="text-center text-[13px] py-2 bg-[var(--brand)] text-white rounded-lg font-medium" onClick={() => setMenuOpen(false)}>Bergabung gratis</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
