import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MedicalDisclaimer from "@/components/ui/MedicalDisclaimer";
import { TERAPI_INFO } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panduan Orang Tua",
  description: "Panduan terapi untuk anak Down Syndrome: terapi wicara, fisik, okupasi, dan pendidikan inklusif.",
};

const bgMap: Record<string, string> = {
  "terapi-wicara": "bg-[var(--brand-light)]",
  "terapi-fisik": "bg-[var(--sage-light)]",
  "terapi-okupasi": "bg-[var(--peach-light)]",
  "pendidikan-inklusif": "bg-pink-50",
};

export default async function PanduanPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <main>
      <Navbar />
      <div className="pt-16">

        {/* ── HEADER ───────────────────────────────────────── */}
        <div className="bg-[var(--peach-light)] border-b border-[var(--border)] py-14 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-[12px] font-medium text-[var(--peach)] uppercase tracking-widest mb-3">Panduan orang tua</p>
            <h1
              className="text-[38px] md:text-[46px] text-[var(--ink)] leading-tight mb-4"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
            >
              Terapi & dukungan untuk si kecil
            </h1>
            <p className="text-[16px] text-[var(--ink-muted)] leading-relaxed">
              Intervensi dini adalah kunci. Penelitian konsisten menunjukkan bahwa semakin awal terapi dimulai — idealnya sejak bayi — semakin besar dampak positifnya pada tumbuh kembang anak dengan Down Syndrome.
            </p>
          </div>
        </div>

        {/* ── PRINSIP DASAR ────────────────────────────────── */}
        <section className="py-12 px-6 border-b border-[var(--border)]">
          <div className="max-w-3xl mx-auto">
            <MedicalDisclaimer />
            <div className="bg-[var(--brand-light)] rounded-2xl p-6 mt-4">
              <h2 className="text-[17px] font-medium text-[var(--brand-dark)] mb-3">Prinsip intervensi dini</h2>
              <p className="text-[14px] text-[var(--brand-dark)] leading-relaxed mb-3">
                Otak bayi sangat plastis di tiga tahun pertama kehidupan — ini adalah jendela emas untuk perkembangan. Program intervensi dini (early intervention) memanfaatkan plastisitas otak ini untuk memaksimalkan potensi anak.
              </p>
              <p className="text-[14px] text-[var(--brand-dark)] leading-relaxed">
                Di Indonesia, orang tua dapat menghubungi <strong className="font-medium">Rumah Sakit terdekat dengan poli Rehabilitasi Medis</strong> atau poli Tumbuh Kembang Anak untuk mendapat rujukan ke terapis yang tepat.
              </p>
            </div>
          </div>
        </section>

        {/* ── TERAPI CARDS ─────────────────────────────────── */}
        <section className="py-14 px-6">
          <div className="max-w-3xl mx-auto flex flex-col gap-10">
            {TERAPI_INFO.map((terapi, i) => (
              <div key={terapi.id} id={terapi.id} className="border border-[var(--border)] rounded-2xl overflow-hidden">
                {/* Header */}
                <div className={`${bgMap[terapi.id] ?? "bg-[var(--surface-2)]"} px-6 py-5 border-b border-[var(--border)]`}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[13px] font-medium text-[var(--brand-dark)] flex-shrink-0 border border-[var(--border)]">
                      {i + 1}
                    </div>
                    <div>
                      <h2 className="text-[19px] font-medium text-[var(--ink)]">{terapi.nama}</h2>
                      <p className="text-[13px] text-[var(--ink-muted)] mt-0.5">{terapi.usia}</p>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="bg-white px-6 py-6 flex flex-col gap-6">
                  <p className="text-[14px] text-[var(--ink-muted)] leading-relaxed">{terapi.deskripsi}</p>

                  <div>
                    <h3 className="text-[13px] font-medium text-[var(--ink)] uppercase tracking-wider mb-3">Manfaat utama</h3>
                    <ul className="flex flex-col gap-2.5">
                      {terapi.manfaat.map((m) => (
                        <li key={m} className="flex items-start gap-2.5 text-[14px] text-[var(--ink-muted)]">
                          <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="7" fill="#EEEDFE" />
                            <path d="M5 8l2 2 4-4" stroke="#6355D8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[var(--surface-2)] rounded-xl p-4">
                    <h3 className="text-[13px] font-medium text-[var(--ink)] mb-3">Tips untuk orang tua</h3>
                    <ul className="flex flex-col gap-2">
                      {terapi.tips.map((t) => (
                        <li key={t} className="text-[13px] text-[var(--ink-muted)] leading-relaxed pl-3 border-l-2 border-[var(--brand-light)]">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SUMBER & REFERENSI ───────────────────────────── */}
        <section className="py-12 px-6 bg-[var(--surface-2)] border-t border-[var(--border)]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[20px] text-[var(--ink)] mb-3" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
              Butuh bantuan lebih lanjut?
            </h2>
            <p className="text-[14px] text-[var(--ink-muted)] mb-6 leading-relaxed">
              Bergabunglah ke forum komunitas kami untuk berbagi pengalaman dan mendapat rekomendasi langsung dari orang tua lain yang sudah menjalani perjalanan yang sama.
            </p>
            {user ? (
              <a href="/forum" className="inline-flex text-[14px] font-medium text-white bg-[var(--brand)] hover:bg-[var(--brand-dark)] px-6 py-3 rounded-xl transition-all duration-200">
                Buka forum komunitas →
              </a>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/forum" className="inline-flex text-[14px] font-medium text-white bg-[var(--brand)] hover:bg-[var(--brand-dark)] px-6 py-3 rounded-xl transition-all duration-200">
                  Buka forum komunitas →
                </a>
                <a href="/auth" className="inline-flex text-[14px] font-medium text-[var(--ink)] border border-[var(--border)] hover:border-[var(--brand)] hover:text-[var(--brand)] px-6 py-3 rounded-xl transition-all duration-200">
                  Daftar gratis
                </a>
              </div>
            )}
            <p className="text-[12px] text-[var(--ink-muted)] mt-6">
              Sumber: NDSS, CDC, NIH/NICHD, AAP, Kementerian Pendidikan RI (Permendiknas No. 70/2009)
            </p>
          </div>
        </section>

      </div>
      <Footer />
    </main>
  );
}
