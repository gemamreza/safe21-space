import Link from "next/link";

const cols = [
  { title: "Edukasi", links: [{ label: "Apa itu DS?", href: "/edukasi" }, { label: "Tipe-tipe DS", href: "/edukasi#tipe" }, { label: "Mitos vs fakta", href: "/edukasi#mitos" }] },
  { title: "Panduan", links: [{ label: "Screening kehamilan", href: "/screening" }, { label: "Panduan terapi", href: "/panduan" }, { label: "Pendidikan inklusif", href: "/panduan#pendidikan" }] },
  { title: "Komunitas", links: [{ label: "Forum orang tua", href: "/forum" }, { label: "Tentang kami", href: "/tentang" }, { label: "Kontak", href: "/tentang#kontak" }] },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1fr_1fr] gap-10">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-full bg-[var(--brand)] flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5" stroke="white" strokeWidth="1.5" /><circle cx="8" cy="8" r="2" fill="white" /></svg>
            </div>
            <span className="font-medium text-[15px]">Safe21<span className="text-[var(--brand)] opacity-80">.space</span></span>
          </div>
          <p className="text-[13px] text-white/50 leading-relaxed max-w-[220px]">
            Komunitas orang tua anak Down Syndrome — saling mendukung, saling menguatkan.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <p className="text-[11px] font-medium text-white/30 uppercase tracking-widest mb-4">{col.title}</p>
            <ul className="flex flex-col gap-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] text-white/60 hover:text-white transition-colors duration-200">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-[12px] text-white/30">© 2026 Safe21.space. Dibuat dengan cinta untuk seluruh keluarga DS.</p>
        <div className="flex gap-4">
          <Link href="#" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">Privasi</Link>
          <Link href="#" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">Kontak</Link>
        </div>
      </div>
    </footer>
  );
}
