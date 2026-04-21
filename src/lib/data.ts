// ─── DATA AKTUAL DOWN SYNDROME ───────────────────────────────────────────────
// Semua konten berdasarkan sumber: WHO, NDSS (National Down Syndrome Society),
// CDC, dan Ikatan Dokter Anak Indonesia (IDAI).

export const DS_FACTS = {
  prevalensi: "1 dari 700–1.000",
  prevalensiNote: "kelahiran hidup di seluruh dunia (WHO, 2023)",
  kasusPerTahun: "Sekitar 6.000",
  kasusPerTahunNote: "bayi lahir dengan DS setiap hari di dunia",
  harapanHidup: "60 tahun ke atas",
  harapanHidupNote: "dengan layanan kesehatan yang memadai",
  kromosom: "Kromosom 21",
  kromosomNote: "terdapat 3 salinan alih-alih 2 pada Trisomi 21",
};

export const DS_TYPES = [
  {
    id: "trisomi-21",
    nama: "Trisomi 21",
    persentase: "~95%",
    deskripsi:
      "Tipe paling umum. Terjadi ketika setiap sel tubuh memiliki tiga salinan kromosom 21, bukan dua. Disebabkan oleh kesalahan pembelahan sel (non-disjunction) selama pembentukan sel telur atau sperma.",
    penyebab: "Non-disjunction selama meiosis",
  },
  {
    id: "translokasi",
    nama: "Translokasi",
    persentase: "~3–4%",
    deskripsi:
      "Bagian dari kromosom 21 melekat (bertranslokasi) ke kromosom lain, biasanya kromosom 14. Total kromosom tetap 46, tetapi ada materi genetik kromosom 21 ekstra. Bisa diturunkan dari orang tua yang merupakan carrier.",
    penyebab: "Bisa diwariskan dari orang tua carrier",
  },
  {
    id: "mosaik",
    nama: "Mosaik (Mosaic DS)",
    persentase: "~1–2%",
    deskripsi:
      "Hanya sebagian sel tubuh yang memiliki kromosom 21 ekstra, sementara sel lainnya normal. Terjadi akibat kesalahan pembelahan sel setelah fertilisasi. Individu dengan DS mosaik umumnya menunjukkan karakteristik DS yang lebih ringan.",
    penyebab: "Non-disjunction pasca fertilisasi",
  },
];

export const DS_KARAKTERISTIK = {
  fisik: [
    "Wajah datar, terutama hidung",
    "Mata berbentuk almond dengan sudut naik ke atas (epicanthal fold)",
    "Leher pendek",
    "Telinga kecil dan posisi lebih rendah",
    "Tangan lebar dengan jari-jari pendek",
    "Satu garis horizontal di telapak tangan (simian crease)",
    "Tonus otot rendah (hipotonia) saat bayi",
    "Tinggi badan cenderung lebih pendek dari rata-rata",
  ],
  penting: [
    "Setiap individu dengan DS adalah unik — tidak semua ciri muncul pada satu orang",
    "Kemiripan dengan anggota keluarga tetap lebih kuat dari ciri DS secara umum",
    "DS bukan penyakit — ini adalah variasi kromosom yang dibawa sejak lahir",
  ],
  kesehatan: [
    { kondisi: "Kelainan jantung bawaan", persentase: "40–50%" },
    { kondisi: "Hipotiroidisme", persentase: "15–20%" },
    { kondisi: "Gangguan pendengaran", persentase: "75%" },
    { kondisi: "Gangguan penglihatan", persentase: "60%" },
    { kondisi: "Sleep apnea", persentase: "50–79%" },
  ],
};

export const MITOS_FAKTA = [
  {
    mitos: "Anak dengan Down Syndrome tidak bisa belajar atau berkembang.",
    fakta:
      "Dengan stimulasi dini, terapi, dan pendidikan yang tepat, anak dengan DS dapat belajar membaca, menulis, berhitung, dan mencapai kemandirian. Banyak individu DS dewasa yang bekerja dan hidup mandiri.",
  },
  {
    mitos: "Down Syndrome adalah penyakit yang bisa menular.",
    fakta:
      "DS sama sekali tidak menular. DS adalah kondisi kromosom yang terjadi saat pembuahan — tidak bisa ditularkan melalui kontak fisik, udara, maupun cara apapun.",
  },
  {
    mitos: "Hanya ibu berusia lanjut yang bisa melahirkan anak dengan DS.",
    fakta:
      "Usia ibu yang lebih tua meningkatkan risiko, namun DS bisa terjadi pada kehamilan di usia berapa pun. Sekitar 80% bayi DS lahir dari ibu berusia di bawah 35 tahun, karena kelompok usia ini memiliki jumlah kehamilan yang jauh lebih banyak.",
  },
  {
    mitos: "Individu dengan DS selalu sakit-sakitan dan perlu dirawat seumur hidup.",
    fakta:
      "Kondisi kesehatan terkait DS sangat bervariasi antar individu. Dengan pemantauan rutin dan penanganan medis yang tepat, banyak individu DS hidup sehat hingga usia lanjut.",
  },
  {
    mitos: "Anak dengan DS tidak bisa bergaul atau berteman.",
    fakta:
      "Individu dengan DS umumnya memiliki kepribadian sosial yang hangat. Mereka dapat membangun persahabatan, berpartisipasi dalam kegiatan komunitas, dan menikmati kehidupan sosial yang aktif.",
  },
  {
    mitos: "Down Syndrome bisa dicegah atau disembuhkan.",
    fakta:
      "DS tidak bisa dicegah maupun 'disembuhkan' karena bukan penyakit. DS adalah bagian dari variasi manusia. Yang bisa dilakukan adalah deteksi dini melalui screening prenatal dan memberikan dukungan optimal.",
  },
];

export const SCREENING_INFO = [
  {
    id: "nt-scan",
    nama: "USG Nuchal Translucency (NT Scan)",
    trimester: "Trimester Pertama",
    waktu: "Minggu ke-11 hingga ke-14",
    jenis: "Non-invasif",
    akurasi: "75–80% (lebih tinggi dikombinasikan dengan tes darah)",
    cara: "Mengukur ketebalan cairan di belakang leher janin melalui USG. Ketebalan >3mm bisa mengindikasikan risiko DS.",
    kelebihan: ["Aman, tidak ada risiko untuk bayi", "Bisa dikombinasikan dengan tes darah untuk akurasi lebih tinggi"],
    kekurangan: ["Hanya tes skrining, bukan diagnosis pasti", "Hasil dipengaruhi keahlian operator USG"],
  },
  {
    id: "nipt",
    nama: "Non-Invasive Prenatal Testing (NIPT)",
    trimester: "Trimester Pertama hingga Kedua",
    waktu: "Ab minggu ke-10 kehamilan",
    jenis: "Non-invasif",
    akurasi: "99% untuk Trisomi 21",
    cara: "Menganalisis DNA bebas sel janin (cell-free fetal DNA / cfDNA) yang beredar dalam darah ibu.",
    kelebihan: ["Akurasi sangat tinggi", "Aman, tidak ada risiko keguguran", "Bisa mendeteksi beberapa kondisi kromosom sekaligus"],
    kekurangan: ["Biaya relatif tinggi", "Tetap merupakan tes skrining — perlu konfirmasi diagnostik jika positif"],
  },
  {
    id: "amniosentesis",
    nama: "Amniosentesis",
    trimester: "Trimester Kedua",
    waktu: "Minggu ke-15 hingga ke-20",
    jenis: "Invasif (diagnostik)",
    akurasi: "99,9% — hasil definitif",
    cara: "Mengambil sampel cairan ketuban dengan jarum tipis di bawah panduan USG. Cairan mengandung sel janin yang kemudian dianalisis kromosomnya (kariotipe).",
    kelebihan: ["Hasil paling akurat dan definitif", "Memberikan kepastian diagnosis"],
    kekurangan: ["Risiko keguguran sekitar 0,1–0,3%", "Prosedur invasif, sedikit tidak nyaman", "Hanya dilakukan jika ada indikasi medis"],
  },
];

export const TERAPI_INFO = [
  {
    id: "terapi-wicara",
    nama: "Terapi Wicara & Bahasa",
    usia: "Dimulai sejak usia 0–3 tahun (idealnya sebelum 2 tahun)",
    deskripsi:
      "Anak dengan DS umumnya mengalami keterlambatan bicara karena kombinasi hipotonia otot mulut, perbedaan anatomi lidah dan langit-langit, serta perbedaan pemrosesan bahasa. Terapi wicara membantu melatih otot-otot wicara, memperluas kosakata, dan membangun kemampuan komunikasi.",
    manfaat: [
      "Meningkatkan kemampuan artikulasi dan kejelasan bicara",
      "Memperluas kosakata ekspresif dan reseptif",
      "Mengajarkan bahasa isyarat sebagai jembatan sebelum bicara",
      "Melatih kemampuan makan dan menelan (feeding therapy)",
      "Membangun kalimat dan kemampuan bercerita",
    ],
    tips: [
      "Mulai terapi sesegera mungkin — otak bayi sangat plastis di 3 tahun pertama",
      "Lanjutkan latihan di rumah sesuai panduan terapis",
      "Buku bergambar, nyanyian, dan bermain sambil bicara sangat efektif",
    ],
  },
  {
    id: "terapi-fisik",
    nama: "Terapi Fisik (Fisioterapi)",
    usia: "Dimulai sejak bayi, idealnya sebelum usia 6 bulan",
    deskripsi:
      "Hampir semua bayi DS lahir dengan hipotonia (tonus otot rendah) yang memengaruhi kemampuan motorik. Terapi fisik membantu memperkuat otot, melatih keseimbangan, dan membantu anak mencapai milestone motorik seperti duduk, merangkak, berdiri, dan berjalan.",
    manfaat: [
      "Meningkatkan kekuatan dan tonus otot",
      "Melatih keseimbangan dan koordinasi",
      "Membantu anak mencapai milestone motorik kasar",
      "Mencegah masalah postur dan ortopedi jangka panjang",
      "Mendukung pengembangan keterampilan atletik dan olahraga",
    ],
    tips: [
      "Tummy time sejak dini sangat penting untuk memperkuat otot leher dan punggung",
      "Renang adalah olahraga yang sangat dianjurkan untuk anak DS",
      "Konsultasikan ke dokter rehabilitasi medis untuk program yang terstruktur",
    ],
  },
  {
    id: "terapi-okupasi",
    nama: "Terapi Okupasi",
    usia: "Usia 2–6 tahun (bisa lebih awal jika ada indikasi)",
    deskripsi:
      "Terapi okupasi berfokus pada kemampuan motorik halus dan kemandirian dalam aktivitas kehidupan sehari-hari (activities of daily living / ADL). Terapis membantu anak DS belajar keterampilan seperti menggenggam, mengancingkan baju, makan sendiri, dan menulis.",
    manfaat: [
      "Meningkatkan koordinasi motorik halus (menggenggam, memotong, menulis)",
      "Melatih kemandirian berpakaian dan makan",
      "Membantu kepekaan sensorik dan pemrosesan sensoris",
      "Mempersiapkan kesiapan sekolah (pre-writing skills)",
      "Meningkatkan kemampuan fokus dan konsentrasi",
    ],
    tips: [
      "Aktivitas seperti mewarnai, bermain playdough, dan menyusun puzzle melatih motorik halus",
      "Berikan waktu ekstra untuk anak menyelesaikan tugas sendiri — jangan terburu membantu",
      "Lingkungan rumah yang mendukung kemandirian sangat penting",
    ],
  },
  {
    id: "pendidikan-inklusif",
    nama: "Pendidikan Inklusif",
    usia: "Usia sekolah (5 tahun ke atas), persiapan mulai usia 3 tahun",
    deskripsi:
      "Di Indonesia, anak dengan kebutuhan khusus termasuk DS memiliki hak untuk mendapat pendidikan di sekolah reguler (inklusif) maupun Sekolah Luar Biasa (SLB). Pendidikan inklusif mengintegrasikan anak DS dengan teman sebaya, yang terbukti meningkatkan kemampuan sosial dan akademik.",
    manfaat: [
      "Mengembangkan kemampuan sosial melalui interaksi dengan teman sebaya",
      "Meningkatkan motivasi belajar",
      "Membangun rasa percaya diri dan harga diri",
      "Mempersiapkan partisipasi dalam masyarakat umum",
    ],
    tips: [
      "Cari sekolah dengan guru pendamping khusus (GPK) yang terlatih",
      "Komunikasi aktif dengan guru kelas sangat penting",
      "Individual Education Plan (IEP) membantu menyesuaikan kurikulum",
      "Di Indonesia, bisa menghubungi Dinas Pendidikan setempat untuk informasi sekolah inklusif",
    ],
  },
];
