import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DS_FACTS } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";

const navCards = [
  {
    href: "/edukasi",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="18" rx="2" fill="#6355D8" />
        <rect x="13" y="3" width="8" height="18" rx="2" fill="#BEB8F8" />
      </svg>
    ),
    bg: "bg-[var(--brand-light)]",
    label: "Edukasi",
    title: "Apa itu Down Syndrome?",
    desc: "Penyebab, tipe-tipe DS, ciri-ciri, dan mitos vs fakta yang perlu diluruskan.",
    cta: "Pelajari DS →",
  },
  {
    href: "/screening",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#2D8A6A" strokeWidth="1.5" />
        <path d="M8 12l3 3 5-5" stroke="#2D8A6A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    bg: "bg-[var(--sage-light)]",
    label: "Screening",
    title: "Deteksi dini kehamilan",
    desc: "Panduan tes screening prenatal: NT Scan, NIPT, dan amniosentesis.",
    cta: "Lihat panduan →",
  },
  {
    href: "/panduan",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" stroke="#C45830" strokeWidth="1.5" />
        <path d="M12 8v5l3 3" stroke="#C45830" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    bg: "bg-[var(--peach-light)]",
    label: "Panduan Orang Tua",
    title: "Terapi & dukungan",
    desc: "Terapi wicara, fisik, okupasi, dan panduan pendidikan inklusif untuk si kecil.",
    cta: "Lihat panduan →",
  },
  {
    href: "/forum",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#6355D8" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    bg: "bg-[var(--brand-light)]",
    label: "Komunitas",
    title: "Forum orang tua",
    desc: "Bagikan cerita, tanya, dan saling mendukung bersama orang tua lain.",
    cta: "Buka forum →",
  },
];

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main>
      <Navbar />

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--surface-2)] pt-16">
        <div className="absolute top-[-80px] right-[-100px] w-[480px] h-[480px] blob opacity-[0.07]" style={{ background: "var(--brand)" }} />
        <div className="absolute bottom-[-60px] left-[-60px] w-[320px] h-[320px] blob opacity-[0.05]" style={{ background: "var(--sage)" }} />

        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="max-w-[680px]">
            <div className="inline-flex items-center gap-2 bg-[var(--brand-light)] text-[var(--brand-dark)] text-[12px] font-medium px-4 py-1.5 rounded-full mb-6 animate-fade-up">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] animate-pulse-soft" />
              Untuk keluarga, oleh keluarga
            </div>

            <h1
              className="text-[44px] md:text-[58px] leading-[1.12] text-[var(--ink)] mb-6 animate-fade-up delay-100"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
            >
              Memahami &{" "}
              <em className="not-italic text-[var(--brand)]">merayakan</em>
              <br />
              Down Syndrome
            </h1>

            <p className="text-[16px] text-[var(--ink-muted)] leading-relaxed mb-8 max-w-[500px] animate-fade-up delay-200">
              Safe21.space hadir sebagai ruang informasi dan komunitas yang hangat bagi keluarga, pendidik, dan siapa saja yang ingin memahami Down Syndrome lebih dalam.
            </p>

            <div className="flex flex-wrap gap-3 mb-12 animate-fade-up delay-300">
              <Link href="/edukasi" className="text-[14px] font-medium text-white bg-[var(--brand)] hover:bg-[var(--brand-dark)] px-6 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                Mulai belajar tentang DS
              </Link>
              {user ? (
                <Link href="/forum" className="text-[14px] font-medium text-[var(--ink)] bg-white border border-[var(--border)] hover:border-[var(--brand)] hover:text-[var(--brand)] px-6 py-3 rounded-xl transition-all duration-200">
                  Buka forum komunitas →
                </Link>
              ) : (
                <Link href="/forum" className="text-[14px] font-medium text-[var(--ink)] bg-white border border-[var(--border)] hover:border-[var(--brand)] hover:text-[var(--brand)] px-6 py-3 rounded-xl transition-all duration-200">
                  Bergabung ke komunitas →
                </Link>
              )}
            </div>

            <div className="flex flex-wrap gap-3 animate-fade-up delay-400">
              <div className="bg-white border border-[var(--border)] rounded-xl px-5 py-3">
                <p className="text-[11px] text-[var(--ink-muted)] mb-0.5">Prevalensi global</p>
                <p className="text-[18px] font-medium text-[var(--ink)]" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                  {DS_FACTS.prevalensi}
                </p>
                <p className="text-[11px] text-[var(--ink-muted)]">{DS_FACTS.prevalensiNote}</p>
              </div>
              <div className="bg-white border border-[var(--border)] rounded-xl px-5 py-3">
                <p className="text-[11px] text-[var(--ink-muted)] mb-0.5">Harapan hidup</p>
                <p className="text-[18px] font-medium text-[var(--ink)]" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                  {DS_FACTS.harapanHidup}
                </p>
                <p className="text-[11px] text-[var(--ink-muted)]">{DS_FACTS.harapanHidupNote}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 48V24C240 0 480 48 720 32C960 16 1200 40 1440 24V48H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── NAV CARDS ────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-[12px] font-medium text-[var(--brand)] uppercase tracking-widest mb-3">Jelajahi</p>
            <h2 className="text-[28px] text-[var(--ink)]" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
              Ada apa di Safe21.space?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {navCards.map((card) => (
              <Link key={card.href} href={card.href} className="group bg-white border border-[var(--border)] rounded-2xl p-6 hover:border-[var(--brand)] hover:shadow-sm transition-all duration-300 flex flex-col">
                <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center mb-5`}>{card.icon}</div>
                <span className="text-[11px] font-medium text-[var(--ink-muted)] uppercase tracking-wider mb-2">{card.label}</span>
                <h3 className="text-[15px] font-medium text-[var(--ink)] mb-2 group-hover:text-[var(--brand)] transition-colors leading-snug">{card.title}</h3>
                <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed flex-1 mb-4">{card.desc}</p>
                <span className="text-[13px] text-[var(--brand)] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">{card.cta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TENTANG SINGKAT ──────────────────────────────── */}
      <section className="py-16 bg-[var(--surface-2)] border-y border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[12px] font-medium text-[var(--brand)] uppercase tracking-widest mb-3">Mengapa Safe21.space?</p>
            <h2 className="text-[28px] text-[var(--ink)] mb-5 leading-snug" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
              Informasi yang hangat,<br />akurat, dan bisa dipercaya
            </h2>
            <p className="text-[14px] text-[var(--ink-muted)] leading-relaxed mb-4">
              Semua konten di website ini disusun berdasarkan panduan dari WHO, CDC, National Down Syndrome Society (NDSS), NIH/NICHD, dan American Academy of Pediatrics (AAP).
            </p>
            <p className="text-[14px] text-[var(--ink-muted)] leading-relaxed mb-6">
              Kami percaya bahwa setiap keluarga berhak mendapat informasi yang jelas dan mendukung, tanpa stigma, tanpa rasa takut.
            </p>
            <Link href="/tentang" className="text-[13px] font-medium text-[var(--brand)] border border-[#BEB8F8] hover:bg-[var(--brand-light)] px-5 py-2.5 rounded-xl transition-all duration-200 inline-flex">
              Baca lebih lanjut tentang kami →
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { n: "1:1.000", d: "Setiap 1 dari 1.000–1.100 kelahiran di seluruh dunia — DS lebih umum dari yang banyak orang kira", src: "WHO" },
              { n: "3 tipe", d: "Trisomi 21, Translokasi, dan Mosaik — masing-masing dengan karakteristik berbeda", src: "Genetika" },
              { n: "Intervensi dini", d: "Semakin awal terapi dimulai, semakin besar dampaknya bagi tumbuh kembang anak", src: "NDSS" },
            ].map((item) => (
              <div key={item.n} className="bg-white border border-[var(--border)] rounded-xl px-5 py-4 flex items-start gap-4">
                <p className="text-[20px] text-[var(--brand)] flex-shrink-0" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{item.n}</p>
                <div>
                  <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">{item.d}</p>
                  <span className="text-[11px] text-[var(--brand)] font-medium">{item.src}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA AKHIR — beda konten kalau sudah login ─────── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-[var(--brand)] rounded-3xl px-10 py-14 text-center relative overflow-hidden">
            <div className="absolute top-[-40px] right-[-40px] w-56 h-56 blob opacity-10" style={{ background: "white" }} />
            <div className="absolute bottom-[-30px] left-[15%] w-40 h-40 blob opacity-10" style={{ background: "white" }} />
            <div className="relative z-10">
              {user ? (
                <>
                  <h2 className="text-[32px] md:text-[38px] text-white mb-4" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
                    Selamat datang kembali
                  </h2>
                  <p className="text-[15px] text-white/70 leading-relaxed max-w-[440px] mx-auto mb-8">
                    Forum komunitas siap mendengar ceritamu hari ini.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/forum" className="text-[14px] font-medium text-[var(--brand)] bg-white hover:bg-[var(--brand-light)] px-8 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02]">
                      Buka forum komunitas
                    </Link>
                    <Link href="/edukasi" className="text-[14px] font-medium text-white border border-white/30 hover:bg-white/10 px-8 py-3.5 rounded-xl transition-all duration-200">
                      Pelajari DS lebih lanjut
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-[32px] md:text-[38px] text-white mb-4" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
                    Bergabung dengan komunitas kami
                  </h2>
                  <p className="text-[15px] text-white/70 leading-relaxed max-w-[440px] mx-auto mb-8">
                    Daftar gratis, bagikan ceritamu, dan temukan dukungan dari sesama orang tua di seluruh Indonesia.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/auth" className="text-[14px] font-medium text-[var(--brand)] bg-white hover:bg-[var(--brand-light)] px-8 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02]">
                      Daftar gratis sekarang
                    </Link>
                    <Link href="/forum" className="text-[14px] font-medium text-white border border-white/30 hover:bg-white/10 px-8 py-3.5 rounded-xl transition-all duration-200">
                      Lihat forum dulu
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
