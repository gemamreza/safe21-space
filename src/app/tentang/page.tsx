import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Safe21.space dibuat oleh seorang ayah dari anak Down Syndrome — untuk semua keluarga yang berjalan di jalan yang sama.",
};

export default async function TentangPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <main>
      <Navbar />
      <div className="pt-16">

        {/* ── HERO PERSONAL ───────────────────────────────── */}
        <div className="bg-[var(--surface-2)] border-b border-[var(--border)] py-16 px-6">
          <div className="max-w-2xl mx-auto">
            <p className="text-[12px] font-medium text-[var(--brand)] uppercase tracking-widest mb-4">Tentang</p>
            <h1
              className="text-[38px] md:text-[46px] text-[var(--ink)] leading-tight mb-6"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
            >
              Dibuat dari hati,<br />untuk sesama keluarga
            </h1>
            <p className="text-[16px] text-[var(--ink-muted)] leading-relaxed">
              Safe21.space bukan dibuat oleh organisasi besar atau tim dokter. Website ini lahir dari satu kebutuhan sederhana — seorang ayah yang baru saja tahu anaknya memiliki Down Syndrome, dan tidak tahu harus mencari informasi dan dukungan ke mana.
            </p>
          </div>
        </div>

        {/* ── CERITA PERSONAL ─────────────────────────────── */}
        <section className="py-14 px-6 border-b border-[var(--border)]">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-[var(--brand-light)] flex items-center justify-center flex-shrink-0 text-[16px] font-medium text-[var(--brand-dark)]"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                A
              </div>
              <div>
                <p className="text-[14px] font-medium text-[var(--ink)]">Dari pendiri Safe21.space</p>
                <p className="text-[13px] text-[var(--ink-muted)]">Ayah dari anak dengan Down Syndrome</p>
              </div>
            </div>

            <div className="space-y-5 text-[15px] text-[var(--ink-muted)] leading-[1.85]"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontStyle: "italic" }}>
              <p>
                "Saat pertama kali mendengar diagnosis Down Syndrome untuk anak saya, jujur saya tidak siap. Bukan karena saya tidak mencintai anak saya — tapi karena saya tidak tahu apa-apa. Apa itu Down Syndrome sebenarnya? Terapi apa yang harus segera dimulai? Ke mana saya harus pergi? Siapa yang bisa saya ajak bicara?
              </p>
              <p>
                Saya cari di internet — sebagian besar dalam bahasa Inggris, penuh istilah medis yang asing. Saya cari komunitas — ada, tapi tersebar dan sulit ditemukan. Saya ingin bicara dengan orang tua lain yang merasakan hal yang sama, tapi tidak tahu harus mulai dari mana.
              </p>
              <p>
                Dari situlah Safe21.space lahir."
              </p>
            </div>
          </div>
        </section>

        {/* ── TUJUAN ──────────────────────────────────────── */}
        <section className="py-14 px-6 border-b border-[var(--border)] bg-[var(--surface-2)]">
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-[26px] text-[var(--ink)] mb-8"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
            >
              Untuk apa Safe21.space ada?
            </h2>
            <div className="flex flex-col gap-5">
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2a8 8 0 100 16A8 8 0 0010 2z" stroke="#6355D8" strokeWidth="1.3"/>
                      <path d="M10 6v5l3 3" stroke="#6355D8" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ),
                  bg: "bg-[var(--brand-light)]",
                  title: "Informasi yang mudah dipahami",
                  desc: "Tidak semua orang tua berlatar belakang medis. Semua konten di sini ditulis dengan bahasa yang hangat dan sederhana, berdasarkan sumber-sumber terpercaya.",
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M17 12a2 2 0 01-2 2H5l-3 3V5a2 2 0 012-2h11a2 2 0 012 2v7z" stroke="#2D8A6A" strokeWidth="1.3" strokeLinejoin="round"/>
                    </svg>
                  ),
                  bg: "bg-[var(--sage-light)]",
                  title: "Forum untuk saling berbagi",
                  desc: "Ini yang paling penting. Ada banyak hal yang hanya bisa dipahami oleh sesama orang tua — pengalaman, rasa takut, kebanggaan kecil sehari-hari. Forum ini adalah ruang untuk itu semua.",
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2C5.6 2 2 5.6 2 10s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z" stroke="#C45830" strokeWidth="1.3"/>
                      <path d="M7 10l2 2 4-4" stroke="#C45830" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  bg: "bg-[var(--peach-light)]",
                  title: "Tidak ada yang sendirian",
                  desc: "Harapan terbesar dari website ini sederhana: tidak ada orang tua yang harus merasa sendirian dalam perjalanan mendampingi anak Down Syndrome.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start bg-white border border-[var(--border)] rounded-2xl p-5">
                  <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-[15px] font-medium text-[var(--ink)] mb-1">{item.title}</h3>
                    <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SUMBER INFORMASI ────────────────────────────── */}
        <section className="py-14 px-6 border-b border-[var(--border)]">
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-[26px] text-[var(--ink)] mb-3"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
            >
              Dari mana konten ini bersumber?
            </h2>
            <p className="text-[14px] text-[var(--ink-muted)] leading-relaxed mb-6">
              Semua informasi medis di website ini disusun berdasarkan sumber-sumber terpercaya. Meski begitu, konten ini bersifat edukatif dan tidak menggantikan konsultasi langsung dengan dokter.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: "WHO", full: "World Health Organization" },
                { name: "NDSS", full: "National Down Syndrome Society" },
                { name: "CDC", full: "Centers for Disease Control" },
                { name: "AAP", full: "American Academy of Pediatrics" },
                { name: "ACOG", full: "American College of OB-GYN" },
                { name: "Kemenkes RI", full: "Kementerian Kesehatan RI" },
              ].map((s) => (
                <div key={s.name} className="bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-4 py-3">
                  <p className="text-[13px] font-medium text-[var(--brand)]">{s.name}</p>
                  <p className="text-[11px] text-[var(--ink-muted)] mt-0.5 leading-snug">{s.full}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FORUM ───────────────────────────────────── */}
        <section className="py-14 px-6 border-b border-[var(--border)] bg-[var(--surface-2)]">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-[26px] text-[var(--ink)] mb-3"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
            >
              Mari bergabung di forum
            </h2>
            <p className="text-[14px] text-[var(--ink-muted)] leading-relaxed mb-6 max-w-md mx-auto">
              Forum adalah jantung dari Safe21.space. Bagikan cerita, tanyakan pengalaman, atau sekadar membaca — semuanya sambil tahu bahwa kamu tidak sendirian.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/forum"
                className="text-[14px] font-medium text-white bg-[var(--brand)] hover:bg-[var(--brand-dark)] px-6 py-3 rounded-xl transition-all duration-200"
              >
                Buka forum komunitas
              </Link>
              {!user && (
                <Link
                  href="/auth"
                  className="text-[14px] font-medium text-[var(--ink)] border border-[var(--border)] hover:border-[var(--brand)] hover:text-[var(--brand)] px-6 py-3 rounded-xl transition-all duration-200"
                >
                  Daftar gratis
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* ── KONTAK ──────────────────────────────────────── */}
        <section id="kontak" className="py-14 px-6">
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-[26px] text-[var(--ink)] mb-2"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
            >
              Ada yang ingin disampaikan?
            </h2>
            <p className="text-[14px] text-[var(--ink-muted)] leading-relaxed mb-6">
              Masukan, koreksi konten, atau sekadar ingin menyapa — tulis di form ini atau langsung bergabung ke forum.
            </p>
            <form
              action="https://formspree.io/f/mvzdkqar"
              method="POST"
              className="bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[var(--ink)]">Nama</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nama kamu"
                    required
                    className="text-[14px] px-4 py-2.5 rounded-xl border border-[var(--border)] bg-white focus:outline-none focus:border-[var(--brand)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[var(--ink)]">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email@contoh.com"
                    required
                    className="text-[14px] px-4 py-2.5 rounded-xl border border-[var(--border)] bg-white focus:outline-none focus:border-[var(--brand)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[var(--ink)]">Pesan</label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tulis pesanmu di sini..."
                  required
                  className="text-[14px] px-4 py-3 rounded-xl border border-[var(--border)] bg-white focus:outline-none focus:border-[var(--brand)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] resize-none transition-colors leading-relaxed"
                />
              </div>
              <button
                type="submit"
                className="self-start text-[14px] font-medium text-white bg-[var(--brand)] hover:bg-[var(--brand-dark)] px-6 py-2.5 rounded-xl transition-all duration-200"
              >
                Kirim pesan
              </button>
            </form>
          </div>
        </section>

        {/* ── PRIVACY POLICY ──────────────────────────────── */}
        <section id="privasi" className="py-14 px-6 border-t border-[var(--border)] bg-[var(--surface-2)]">
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-[26px] text-[var(--ink)] mb-2"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
            >
              Kebijakan Privasi
            </h2>
            <p className="text-[13px] text-[var(--ink-muted)] mb-8">Terakhir diperbarui: April 2025</p>

            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-[15px] font-medium text-[var(--ink)] mb-2">Data yang kami kumpulkan</h3>
                <p className="text-[14px] text-[var(--ink-muted)] leading-relaxed">
                  Saat kamu mendaftar, kami menyimpan nama, username, dan alamat email. Jika mendaftar via Google, kami menerima nama dan email dari akun Google kamu. Kami tidak mengumpulkan data finansial, alamat fisik, nomor telepon, atau informasi sensitif lainnya.
                </p>
              </div>

              <div>
                <h3 className="text-[15px] font-medium text-[var(--ink)] mb-2">Bagaimana data digunakan</h3>
                <p className="text-[14px] text-[var(--ink-muted)] leading-relaxed">
                  Data digunakan hanya untuk mengelola akun kamu di Safe21.space — menampilkan nama di forum, mengirim notifikasi yang relevan, dan memungkinkan kamu berinteraksi dengan komunitas. Kami tidak menggunakan data untuk iklan atau profiling.
                </p>
              </div>

              <div>
                <h3 className="text-[15px] font-medium text-[var(--ink)] mb-2">Data tidak dijual</h3>
                <p className="text-[14px] text-[var(--ink-muted)] leading-relaxed">
                  Kami tidak menjual, menyewakan, atau membagikan data pribadi kamu ke pihak ketiga untuk tujuan komersial. Data disimpan secara aman di Supabase dengan enkripsi standar industri.
                </p>
              </div>

              <div>
                <h3 className="text-[15px] font-medium text-[var(--ink)] mb-2">Hapus akun</h3>
                <p className="text-[14px] text-[var(--ink-muted)] leading-relaxed">
                  Kamu dapat meminta penghapusan akun dan seluruh data kamu kapan saja dengan menghubungi kami melalui form di atas. Kami akan memproses permintaan dalam 7 hari kerja.
                </p>
              </div>

              <div>
                <h3 className="text-[15px] font-medium text-[var(--ink)] mb-2">Pertanyaan</h3>
                <p className="text-[14px] text-[var(--ink-muted)] leading-relaxed">
                  Jika ada pertanyaan tentang privasi, hubungi kami melalui form kontak di atas atau email langsung ke pengelola Safe21.space.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </main>
  );
}
