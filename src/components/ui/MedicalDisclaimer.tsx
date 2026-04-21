export default function MedicalDisclaimer() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-4">
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
        <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1.5L1.5 13h13L8 1.5z" stroke="#92400E" strokeWidth="1.2" strokeLinejoin="round"/>
          <path d="M8 6v3.5M8 11v.5" stroke="#92400E" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        <p className="text-[12px] text-amber-800 leading-relaxed">
          <span className="font-medium">Catatan penting: </span>
          Informasi di halaman ini bersifat edukatif dan disusun berdasarkan sumber-sumber medis terpercaya. Konten ini tidak menggantikan konsultasi, diagnosis, atau saran dari dokter atau tenaga medis profesional. Selalu konsultasikan kondisi kesehatan anak dengan dokter yang menangani.
        </p>
      </div>
    </div>
  );
}
