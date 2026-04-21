import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MedicalDisclaimer from "@/components/ui/MedicalDisclaimer";
import { DS_TYPES, DS_KARAKTERISTIK, MITOS_FAKTA } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apa itu Down Syndrome?",
  description: "Penjelasan lengkap tentang Down Syndrome: penyebab, tipe-tipe, ciri-ciri, dan mitos vs fakta.",
};

export default function EdukasiPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-16">

        {/* ── PAGE HEADER ─────────────────────────────────── */}
        <div className="bg-[var(--surface-2)] border-b border-[var(--border)] py-14 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-[12px] font-medium text-[var(--brand)] uppercase tracking-widest mb-3">Edukasi</p>
            <h1
              className="text-[38px] md:text-[46px] text-[var(--ink)] leading-tight mb-4"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
            >
              Apa itu Down Syndrome?
            </h1>
            <p className="text-[16px] text-[var(--ink-muted)] leading-relaxed">
              Down Syndrome (DS) adalah kondisi genetik yang terjadi ketika seseorang memiliki salinan kromosom 21 sebanyak tiga buah, alih-alih dua. Kondisi ini pertama kali dideskripsikan oleh dokter asal Inggris, John Langdon Down, pada tahun 1866.
            </p>
          </div>
        </div>

        <MedicalDisclaimer />

        {/* ── PENYEBAB ─────────────────────────────────────── */}
        <section className="py-14 px-6 border-b border-[var(--border)]">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-[26px] text-[var(--ink)] mb-4"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
            >
              Apa penyebabnya?
            </h2>
            <div className="prose text-[15px] text-[var(--ink-muted)] leading-relaxed space-y-4">
              <p>
                Pada manusia, setiap sel tubuh normalnya mengandung 46 kromosom yang tersusun dalam 23 pasang. Kromosom adalah struktur yang membawa gen — cetak biru untuk perkembangan dan fungsi tubuh.
              </p>
              <p>
                Down Syndrome terjadi ketika ada salinan ekstra kromosom 21. Kromosom ekstra ini mengubah perkembangan tubuh dan otak, menghasilkan karakteristik fisik dan kognitif yang terkait dengan DS.
              </p>
              <p>
                Penting untuk dipahami: <strong className="text-[var(--ink)] font-medium">DS tidak disebabkan oleh sesuatu yang dilakukan atau tidak dilakukan orang tua selama kehamilan.</strong> Ini adalah kejadian kromosom yang umumnya terjadi secara acak, bukan akibat gaya hidup atau lingkungan.
              </p>
            </div>
          </div>
        </section>

        {/* ── TIPE DS ──────────────────────────────────────── */}
        <section id="tipe" className="py-14 px-6 bg-[var(--surface-2)] border-b border-[var(--border)]">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-[26px] text-[var(--ink)] mb-2"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
            >
              Tipe-tipe Down Syndrome
            </h2>
            <p className="text-[14px] text-[var(--ink-muted)] mb-8">Ada tiga tipe DS, masing-masing dengan mekanisme kromosom yang berbeda.</p>

            <div className="flex flex-col gap-5">
              {DS_TYPES.map((tipe, i) => (
                <div key={tipe.id} className="bg-white border border-[var(--border)] rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[var(--brand-light)] rounded-full flex items-center justify-center text-[13px] font-medium text-[var(--brand-dark)] flex-shrink-0">
                        {i + 1}
                      </div>
                      <h3 className="text-[17px] font-medium text-[var(--ink)]">{tipe.nama}</h3>
                    </div>
                    <span className="flex-shrink-0 text-[12px] font-medium bg-[var(--brand-light)] text-[var(--brand-dark)] px-3 py-1 rounded-full">
                      {tipe.persentase} kasus
                    </span>
                  </div>
                  <p className="text-[14px] text-[var(--ink-muted)] leading-relaxed mb-3 pl-11">{tipe.deskripsi}</p>
                  <div className="pl-11">
                    <span className="text-[12px] text-[var(--ink-muted)]">Penyebab: </span>
                    <span className="text-[12px] text-[var(--ink)] font-medium">{tipe.penyebab}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CIRI FISIK ───────────────────────────────────── */}
        <section className="py-14 px-6 border-b border-[var(--border)]">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-[26px] text-[var(--ink)] mb-2"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
            >
              Ciri & karakteristik
            </h2>
            <p className="text-[14px] text-[var(--ink-muted)] mb-8">
              Tidak semua ciri berikut muncul pada setiap individu dengan DS. Setiap orang unik.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-[15px] font-medium text-[var(--ink)] mb-4">Ciri fisik umum</h3>
                <ul className="flex flex-col gap-2.5">
                  {DS_KARAKTERISTIK.fisik.map((ciri) => (
                    <li key={ciri} className="flex items-start gap-2.5 text-[14px] text-[var(--ink-muted)]">
                      <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="7" fill="#EEEDFE" />
                        <path d="M5 8l2 2 4-4" stroke="#6355D8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {ciri}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-[15px] font-medium text-[var(--ink)] mb-4">Kondisi kesehatan yang perlu dipantau</h3>
                <div className="flex flex-col gap-2.5">
                  {DS_KARAKTERISTIK.kesehatan.map((k) => (
                    <div key={k.kondisi} className="flex items-center justify-between bg-[var(--surface-2)] rounded-xl px-4 py-3">
                      <span className="text-[13px] text-[var(--ink-muted)]">{k.kondisi}</span>
                      <span className="text-[12px] font-medium text-[var(--brand)]">{k.persentase}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[var(--brand-light)] rounded-2xl p-5">
              <p className="text-[13px] font-medium text-[var(--brand-dark)] mb-2">Penting untuk diingat</p>
              <ul className="flex flex-col gap-2">
                {DS_KARAKTERISTIK.penting.map((p) => (
                  <li key={p} className="text-[13px] text-[var(--brand-dark)] leading-relaxed">• {p}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── MITOS VS FAKTA ───────────────────────────────── */}
        <section id="mitos" className="py-14 px-6 bg-[var(--surface-2)]">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-[26px] text-[var(--ink)] mb-2"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
            >
              Mitos vs fakta
            </h2>
            <p className="text-[14px] text-[var(--ink-muted)] mb-8">
              Masih banyak kesalahpahaman tentang DS yang beredar di masyarakat. Mari kita luruskan bersama.
            </p>

            <div className="flex flex-col gap-5">
              {MITOS_FAKTA.map((item, i) => (
                <div key={i} className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden">
                  <div className="flex items-start gap-3 px-5 py-4 border-b border-[var(--border)] bg-red-50">
                    <span className="flex-shrink-0 text-[11px] font-medium bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full mt-0.5">Mitos</span>
                    <p className="text-[14px] text-red-800 leading-relaxed">{item.mitos}</p>
                  </div>
                  <div className="flex items-start gap-3 px-5 py-4">
                    <span className="flex-shrink-0 text-[11px] font-medium bg-[var(--sage-light)] text-[var(--sage)] px-2.5 py-0.5 rounded-full mt-0.5">Fakta</span>
                    <p className="text-[14px] text-[var(--ink-muted)] leading-relaxed">{item.fakta}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[12px] text-[var(--ink-muted)] mt-6 text-center">
              Sumber: WHO, National Down Syndrome Society (NDSS), CDC, IDAI
            </p>
          </div>
        </section>

      </div>
      <Footer />
    </main>
  );
}
