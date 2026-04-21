import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MedicalDisclaimer from "@/components/ui/MedicalDisclaimer";
import { SCREENING_INFO } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Screening Kehamilan",
  description: "Panduan tes screening prenatal untuk deteksi Down Syndrome: NT Scan, NIPT, dan amniosentesis.",
};

export default function ScreeningPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-16">

        {/* ── HEADER ───────────────────────────────────────── */}
        <div className="bg-[var(--sage-light)] border-b border-[var(--border)] py-14 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-[12px] font-medium text-[var(--sage)] uppercase tracking-widest mb-3">Screening kehamilan</p>
            <h1
              className="text-[38px] md:text-[46px] text-[var(--ink)] leading-tight mb-4"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
            >
              Deteksi dini selama kehamilan
            </h1>
            <p className="text-[16px] text-[var(--ink-muted)] leading-relaxed">
              Tes screening prenatal tidak mendiagnosis DS secara pasti, tetapi membantu mengevaluasi risiko dan memberikan informasi yang diperlukan untuk langkah selanjutnya. Selalu diskusikan pilihan tes dengan dokter kandungan Anda.
            </p>
          </div>
        </div>

        {/* ── PENGANTAR ────────────────────────────────────── */}
        <section className="py-12 px-6 border-b border-[var(--border)]">
          <div className="max-w-3xl mx-auto">
            <MedicalDisclaimer />
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mt-4">
              <p className="text-[13px] font-medium text-amber-800 mb-1">Catatan penting</p>
              <p className="text-[13px] text-amber-700 leading-relaxed">
                Tes screening hanya mengindikasikan risiko, bukan diagnosis. Hasil positif pada tes screening tidak berarti bayi pasti memiliki DS. Diperlukan tes diagnostik (seperti amniosentesis) untuk konfirmasi. Apapun hasilnya, konsultasikan dengan dokter atau konselor genetik.
              </p>
            </div>
          </div>
        </section>

        {/* ── TES DETAIL ───────────────────────────────────── */}
        <section className="py-14 px-6">
          <div className="max-w-3xl mx-auto flex flex-col gap-8">
            {SCREENING_INFO.map((tes, i) => (
              <div key={tes.id} className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-[var(--border)] bg-[var(--surface-2)]">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-7 h-7 bg-[var(--sage-light)] rounded-full flex items-center justify-center text-[12px] font-medium text-[var(--sage)] flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h2 className="text-[17px] font-medium text-[var(--ink)]">{tes.nama}</h2>
                    </div>
                    <div className="flex flex-wrap gap-2 pl-10">
                      <span className="text-[11px] font-medium bg-[var(--sage-light)] text-[var(--sage)] px-2.5 py-0.5 rounded-full">{tes.trimester}</span>
                      <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${tes.jenis === "Non-invasif" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                        {tes.jenis}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="px-6 py-5 flex flex-col gap-5">
                  <div>
                    <p className="text-[12px] text-[var(--ink-muted)] uppercase tracking-wider font-medium mb-1">Waktu terbaik</p>
                    <p className="text-[14px] text-[var(--ink)]">{tes.waktu}</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-[var(--ink-muted)] uppercase tracking-wider font-medium mb-1">Akurasi</p>
                    <p className="text-[14px] text-[var(--ink)] font-medium text-[var(--sage)]">{tes.akurasi}</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-[var(--ink-muted)] uppercase tracking-wider font-medium mb-1">Cara kerja</p>
                    <p className="text-[14px] text-[var(--ink-muted)] leading-relaxed">{tes.cara}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[12px] text-[var(--ink-muted)] uppercase tracking-wider font-medium mb-2">Kelebihan</p>
                      <ul className="flex flex-col gap-1.5">
                        {tes.kelebihan.map((k) => (
                          <li key={k} className="flex items-start gap-2 text-[13px] text-[var(--ink-muted)]">
                            <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <circle cx="7" cy="7" r="6" fill="#F0F7F4" />
                              <path d="M4.5 7l2 2 3-3" stroke="#2D8A6A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {k}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[12px] text-[var(--ink-muted)] uppercase tracking-wider font-medium mb-2">Keterbatasan</p>
                      <ul className="flex flex-col gap-1.5">
                        {tes.kekurangan.map((k) => (
                          <li key={k} className="flex items-start gap-2 text-[13px] text-[var(--ink-muted)]">
                            <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <circle cx="7" cy="7" r="6" fill="#FEF3ED" />
                              <path d="M5 9l4-4M9 9L5 5" stroke="#C45830" strokeWidth="1.3" strokeLinecap="round" />
                            </svg>
                            {k}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PANDUAN KONSULTASI ───────────────────────────── */}
        <section className="py-12 px-6 bg-[var(--surface-2)] border-t border-[var(--border)]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[22px] text-[var(--ink)] mb-4" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
              Langkah selanjutnya setelah tes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { step: "01", title: "Diskusi dengan dokter", desc: "Apapun hasilnya, selalu diskusikan dengan dokter kandungan Anda sebelum mengambil kesimpulan." },
                { step: "02", title: "Konselor genetik", desc: "Jika hasil screening menunjukkan risiko tinggi, konsultan genetik bisa membantu memahami pilihan Anda." },
                { step: "03", title: "Dukungan keluarga", desc: "Bergabung dengan komunitas orang tua DS untuk mendapat perspektif nyata dari sesama keluarga." },
              ].map((s) => (
                <div key={s.step} className="bg-white border border-[var(--border)] rounded-xl p-5">
                  <p className="text-[12px] font-medium text-[var(--sage)] mb-2">{s.step}</p>
                  <h3 className="text-[14px] font-medium text-[var(--ink)] mb-2">{s.title}</h3>
                  <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-[var(--ink-muted)] mt-6 text-center">
              Sumber: WHO, American College of Obstetricians and Gynecologists (ACOG), IDAI
            </p>
          </div>
        </section>

      </div>
      <Footer />
    </main>
  );
}
