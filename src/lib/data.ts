// ─── DATA DOWN SYNDROME ───────────────────────────────────────────────────────
// Sumber: WHO, NDSS (National Down Syndrome Society), CDC, NIH/NICHD,
// AAP (American Academy of Pediatrics), ACOG, NDSS.
// Terakhir diverifikasi: 2025

export const DS_FACTS = {
  prevalensi: "1 dari 1.000–1.100",
  prevalensiNote: "kelahiran hidup di seluruh dunia (WHO)",
  prevalensiAS: "1 dari 640",
  prevalensiASNote: "kelahiran hidup di Amerika Serikat (CDC, 2024)",
  kasusPerTahun: "Sekitar 6.000",
  kasusPerTahunNote: "bayi lahir dengan DS per tahun di Amerika Serikat (CDC)",
  harapanHidup: "Sekitar 60 tahun",
  harapanHidupNote: "meningkat dari rata-rata 25 tahun pada 1983 (NICHD)",
  kromosom: "Kromosom 21",
  kromosomNote: "terdapat 3 salinan alih-alih 2 pada Trisomi 21",
};

export const DS_TYPES = [
  {
    id: "trisomi-21",
    nama: "Trisomi 21",
    persentase: "~95%",
    deskripsi:
      "Tipe paling umum. Terjadi ketika setiap sel tubuh memiliki tiga salinan kromosom 21, bukan dua. Disebabkan oleh kesalahan pembelahan sel (non-disjunction) selama pembentukan sel telur atau sperma. Tidak diwariskan — terjadi secara acak.",
    penyebab: "Non-disjunction selama meiosis (acak, tidak diwariskan)",
  },
  {
    id: "translokasi",
    nama: "Translokasi",
    persentase: "~3–4%",
    deskripsi:
      "Bagian dari kromosom 21 melekat (bertranslokasi) ke kromosom lain, biasanya kromosom 14. Total kromosom tetap 46, tetapi ada materi genetik kromosom 21 ekstra. Sekitar 25% kasus translokasi diwariskan dari orang tua yang merupakan carrier — konseling genetik dianjurkan.",
    penyebab: "Sekitar 75% terjadi spontan, 25% diwariskan dari carrier",
  },
  {
    id: "mosaik",
    nama: "Mosaik (Mosaic DS)",
    persentase: "~1–2%",
    deskripsi:
      "Hanya sebagian sel tubuh yang memiliki kromosom 21 ekstra, sementara sel lainnya normal. Terjadi akibat kesalahan pembelahan sel setelah fertilisasi. Individu dengan DS mosaik mungkin menunjukkan karakteristik DS yang lebih ringan, namun variasi antar individu sangat luas.",
    penyebab: "Non-disjunction pasca fertilisasi (tidak diwariskan)",
  },
];

export const DS_KARAKTERISTIK = {
  fisik: [
    "Wajah datar, terutama di area hidung",
    "Mata berbentuk almond dengan sudut naik ke atas (epicanthal fold)",
    "Leher pendek",
    "Telinga kecil dan posisi lebih rendah",
    "Tangan lebar dengan jari-jari pendek",
    "Satu garis horizontal di telapak tangan (simian crease)",
    "Tonus otot rendah (hipotonia) terutama saat bayi",
    "Tinggi badan cenderung lebih pendek dari rata-rata",
  ],
  penting: [
    "Tidak semua ciri di atas muncul pada setiap individu dengan DS — setiap orang unik",
    "Kemiripan dengan anggota keluarga tetap lebih kuat dari ciri DS secara umum",
    "DS bukan penyakit — ini adalah kondisi kromosom yang dibawa sejak lahir",
    "Tingkat kecerdasan dan kemampuan sangat bervariasi antar individu",
  ],
  kesehatan: [
    { kondisi: "Kelainan jantung bawaan", persentase: "50–65%", sumber: "CDC, AAP 2022" },
    { kondisi: "Gangguan pendengaran", persentase: "75%", sumber: "AAP 2022" },
    { kondisi: "Gangguan penglihatan", persentase: "60–80%", sumber: "AAP 2022" },
    { kondisi: "Sleep apnea", persentase: "50–79%", sumber: "AAP 2022" },
    { kondisi: "Gangguan tiroid", persentase: "24–50%", sumber: "AAP 2022" },
  ],
};

export const MITOS_FAKTA = [
  {
    mitos: "Anak dengan Down Syndrome tidak bisa belajar atau berkembang.",
    fakta:
      "Dengan stimulasi dini, terapi, dan pendidikan yang tepat, anak dengan DS dapat belajar membaca, menulis, berhitung, dan mencapai kemandirian. Tingkat kemampuan sangat bervariasi — banyak individu DS dewasa yang bekerja dan hidup mandiri.",
  },
  {
    mitos: "Down Syndrome adalah penyakit yang bisa menular.",
    fakta:
      "DS sama sekali tidak menular. DS adalah kondisi kromosom yang terjadi saat pembuahan — tidak bisa ditularkan melalui kontak fisik, udara, maupun cara apapun.",
  },
  {
    mitos: "Hanya ibu berusia lanjut yang bisa melahirkan anak dengan DS.",
    fakta:
      "Usia ibu yang lebih tua meningkatkan risiko, namun DS bisa terjadi pada kehamilan di usia berapa pun. Menurut NDSS, sekitar 51% anak DS lahir dari ibu berusia di bawah 35 tahun, karena kelompok usia ini memiliki jumlah kehamilan yang jauh lebih banyak.",
  },
  {
    mitos: "Individu dengan DS selalu sakit-sakitan dan perlu dirawat seumur hidup.",
    fakta:
      "Kondisi kesehatan terkait DS sangat bervariasi antar individu. Dengan pemantauan rutin dan penanganan medis yang tepat, banyak individu DS hidup sehat dan produktif hingga usia lanjut.",
  },
  {
    mitos: "Anak dengan DS tidak bisa bergaul atau berteman.",
    fakta:
      "Individu dengan DS umumnya memiliki kemampuan sosial yang baik. Mereka dapat membangun persahabatan, berpartisipasi dalam kegiatan komunitas, dan menikmati kehidupan sosial yang aktif.",
  },
  {
    mitos: "Down Syndrome bisa dicegah atau disembuhkan.",
    fakta:
      "DS tidak bisa dicegah maupun disembuhkan karena bukan penyakit. DS adalah bagian dari variasi manusia. Yang bisa dilakukan adalah deteksi dini melalui screening prenatal dan memberikan dukungan optimal untuk tumbuh kembang.",
  },
  {
    mitos: "DS pasti diwariskan dari orang tua.",
    fakta:
      "Sekitar 99% kasus DS (Trisomi 21 dan Mosaik) terjadi secara acak, bukan karena faktor keturunan. Hanya sekitar 1% kasus DS yang memiliki komponen herediter, yaitu pada sebagian kasus Translokasi.",
  },
];

export const SCREENING_INFO = [
  {
    id: "nt-scan",
    nama: "USG Nuchal Translucency (NT Scan)",
    trimester: "Trimester Pertama",
    waktu: "Minggu ke-11 hingga ke-14",
    jenis: "Non-invasif",
    akurasi: "75–80% bila dilakukan sendiri; lebih tinggi bila dikombinasikan dengan tes darah (first trimester combined screening)",
    cara: "Mengukur ketebalan cairan di belakang leher janin melalui USG. Ketebalan yang lebih besar dari normal dapat mengindikasikan peningkatan risiko DS dan kondisi kromosom lainnya.",
    kelebihan: ["Aman, tidak ada risiko untuk ibu maupun janin", "Bisa dikombinasikan dengan tes darah untuk akurasi lebih tinggi", "Tersedia di banyak fasilitas kesehatan"],
    kekurangan: ["Hanya tes skrining, bukan diagnosis pasti", "Hasil dipengaruhi keahlian operator USG", "Tidak mendeteksi semua kasus DS"],
  },
  {
    id: "nipt",
    nama: "Non-Invasive Prenatal Testing (NIPT)",
    trimester: "Trimester Pertama hingga Kedua",
    waktu: "Ab minggu ke-10 kehamilan",
    jenis: "Non-invasif",
    akurasi: "Lebih dari 99% untuk Trisomi 21 (berdasarkan studi klinis, ACOG)",
    cara: "Menganalisis DNA bebas sel janin (cell-free fetal DNA / cfDNA) yang beredar dalam darah ibu. Tidak mengambil sampel dari janin langsung.",
    kelebihan: ["Akurasi sangat tinggi untuk Trisomi 21", "Aman, tidak ada risiko keguguran", "Bisa mendeteksi beberapa kondisi kromosom sekaligus"],
    kekurangan: ["Biaya relatif tinggi", "Tetap merupakan tes skrining — hasil positif perlu dikonfirmasi dengan tes diagnostik", "Tidak tersedia merata di semua fasilitas"],
  },
  {
    id: "amniosentesis",
    nama: "Amniosentesis",
    trimester: "Trimester Kedua",
    waktu: "Minggu ke-15 hingga ke-20",
    jenis: "Invasif (diagnostik)",
    akurasi: "Lebih dari 99% — hasil definitif (bukan skrining)",
    cara: "Mengambil sampel cairan ketuban dengan jarum tipis di bawah panduan USG. Cairan mengandung sel janin yang kemudian dianalisis kromosomnya (kariotipe). Ini adalah tes diagnostik, bukan tes skrining.",
    kelebihan: ["Hasil paling akurat dan definitif", "Memberikan kepastian diagnosis kromosom"],
    kekurangan: ["Risiko keguguran sekitar 0,1–0,3% (ACOG)", "Prosedur invasif", "Umumnya hanya dilakukan bila ada indikasi medis atau hasil skrining berisiko tinggi"],
  },
];

export const TERAPI_INFO = [
  {
    id: "terapi-wicara",
    nama: "Terapi Wicara & Bahasa",
    usia: "Dapat dimulai sejak lahir, berlanjut sepanjang masa tumbuh kembang",
    deskripsi:
      "Anak dengan DS umumnya mengalami keterlambatan bicara karena kombinasi hipotonia otot mulut, perbedaan anatomi lidah dan langit-langit, gangguan pendengaran, serta perbedaan pemrosesan bahasa. Terapi wicara dimulai sejak bayi — bahkan menyusui menggunakan otot yang sama dengan bicara, sehingga feeding therapy sejak awal sangat bermanfaat.",
    manfaat: [
      "Membantu kemampuan menyusu dan makan (feeding therapy) sejak bayi",
      "Meningkatkan kemampuan artikulasi dan kejelasan bicara",
      "Memperluas kosakata ekspresif dan reseptif",
      "Mengajarkan bahasa isyarat sebagai jembatan komunikasi sebelum bicara verbal",
      "Membangun kemampuan percakapan dan bercerita",
    ],
    tips: [
      "Mulai terapi sesegera mungkin — otak bayi sangat plastis di 3 tahun pertama kehidupan",
      "Lanjutkan latihan di rumah sesuai panduan terapis — konsistensi sangat menentukan hasil",
      "Buku bergambar, nyanyian, dan bermain sambil bicara mendukung perkembangan bahasa sehari-hari",
    ],
    sumber: "NDSS, NICHD",
  },
  {
    id: "terapi-fisik",
    nama: "Terapi Fisik (Fisioterapi)",
    usia: "Dimulai sejak bayi baru lahir, berlanjut sesuai kebutuhan",
    deskripsi:
      "Hampir semua bayi DS lahir dengan hipotonia (tonus otot rendah) yang memengaruhi kemampuan motorik dan perkembangan. Terapi fisik membantu memperkuat otot, melatih keseimbangan, dan membantu anak mencapai milestone motorik seperti mengontrol kepala, duduk, merangkak, berdiri, dan berjalan. Semakin dini dimulai, semakin baik hasilnya.",
    manfaat: [
      "Membantu bayi mencapai kontrol kepala dan milestone motorik awal",
      "Meningkatkan kekuatan dan tonus otot secara progresif",
      "Melatih keseimbangan dan koordinasi tubuh",
      "Mencegah pola gerak kompensasi yang bisa menyebabkan masalah postur jangka panjang",
      "Mendukung partisipasi dalam aktivitas fisik dan olahraga",
    ],
    tips: [
      "Tummy time (tengkurap terbimbing) sejak dini sangat penting untuk memperkuat otot leher dan punggung",
      "Renang adalah aktivitas yang sangat dianjurkan karena melatih seluruh otot tanpa beban berlebih",
      "Minta rujukan ke dokter rehabilitasi medis (SpKFR) untuk program yang terstruktur dan aman",
    ],
    sumber: "NDSS, American Physical Therapy Association (APTA)",
  },
  {
    id: "terapi-okupasi",
    nama: "Terapi Okupasi",
    usia: "Dapat dimulai sejak masa bayi, dengan fokus yang berkembang sesuai usia",
    deskripsi:
      "Terapi okupasi (OT) membantu individu DS berpartisipasi dalam aktivitas sehari-hari secara mandiri sepanjang hidupnya. Pada bayi, OT membantu masalah makan dan milestone motorik bersama fisioterapis. Pada anak, OT fokus pada motorik halus dan kesiapan sekolah. Pada remaja dan dewasa, OT membantu keterampilan kerja dan kemandirian.",
    manfaat: [
      "Membantu masalah makan dan menyusu pada bayi (bersama terapi wicara)",
      "Meningkatkan koordinasi motorik halus (menggenggam, memotong, menulis)",
      "Melatih kemandirian dalam berpakaian, makan, dan merawat diri",
      "Membantu pemrosesan sensoris dan kepekaan indera",
      "Mempersiapkan kesiapan sekolah dan keterampilan kerja",
    ],
    tips: [
      "Aktivitas seperti mewarnai, bermain playdough, dan menyusun puzzle melatih motorik halus secara menyenangkan",
      "Berikan waktu ekstra untuk anak menyelesaikan tugas sendiri — kemandirian dibangun dari latihan, bukan dari bantuan berlebih",
      "Terapi okupasi tidak berhenti di usia 21 tahun — orang dewasa dengan DS pun masih bisa mendapat manfaat",
    ],
    sumber: "NDSS, American Occupational Therapy Association (AOTA)",
  },
  {
    id: "pendidikan-inklusif",
    nama: "Pendidikan Inklusif",
    usia: "Persiapan sejak usia 3 tahun, pelaksanaan usia sekolah ke atas",
    deskripsi:
      "Di Indonesia, anak dengan kebutuhan khusus termasuk DS memiliki hak untuk mendapat pendidikan di sekolah reguler (inklusif) maupun Sekolah Luar Biasa (SLB), dijamin oleh Permendiknas No. 70 Tahun 2009. Penelitian menunjukkan bahwa pendidikan inklusif yang didukung dengan baik meningkatkan kemampuan sosial, komunikasi, dan akademik anak DS.",
    manfaat: [
      "Mengembangkan kemampuan sosial melalui interaksi langsung dengan teman sebaya",
      "Meningkatkan motivasi belajar melalui lingkungan yang beragam",
      "Membangun rasa percaya diri dan harga diri",
      "Mempersiapkan partisipasi aktif dalam masyarakat",
    ],
    tips: [
      "Cari sekolah yang memiliki Guru Pendamping Khusus (GPK) yang terlatih dan berpengalaman",
      "Komunikasi aktif dan berkala dengan guru kelas sangat penting",
      "Individual Education Plan (IEP) atau Program Pembelajaran Individual (PPI) membantu menyesuaikan kurikulum dengan kebutuhan anak",
      "Hubungi Dinas Pendidikan setempat atau Pusat Sumber (resource center) di kota kamu untuk informasi sekolah inklusif terdekat",
    ],
    sumber: "Permendiknas No. 70 Tahun 2009, Kemdikbud RI",
  },
];
