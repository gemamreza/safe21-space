# DS Indonesia

Website komunitas Down Syndrome Indonesia. Dibangun dengan Next.js 14, TypeScript, dan Tailwind CSS.

## Struktur halaman

| Route | Deskripsi |
|-------|-----------|
| `/` | Landing page — intro umum + navigasi ke semua halaman |
| `/edukasi` | Apa itu DS, tipe-tipe, ciri-ciri, mitos vs fakta |
| `/screening` | Panduan tes prenatal: NT Scan, NIPT, Amniosentesis |
| `/panduan` | Terapi wicara, fisik, okupasi, pendidikan inklusif |
| `/forum` | Forum komunitas (siap implementasi Supabase) |
| `/tentang` | Tentang kami, sumber, kontak |

## Quick Start

```bash
npm install
npm run dev
# Buka http://localhost:3000
```

## Sumber data

Semua konten di `src/lib/data.ts` bersumber dari:
- **WHO** — prevalensi global
- **NDSS** (National Down Syndrome Society) — terapi & dukungan
- **CDC** — data epidemiologi
- **IDAI** — panduan klinis Indonesia
- **ACOG** — panduan screening prenatal

## Langkah berikutnya

### 1. Aktifkan Forum (Supabase)
```bash
npm install @supabase/supabase-js
```
Buat `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```
Tabel yang dibutuhkan: `users`, `threads`, `comments`

### 2. Aktifkan Form Kontak
Gunakan [Resend](https://resend.com) atau [Formspree](https://formspree.io) untuk form di halaman `/tentang`.

### 3. Auth (login/daftar)
Supabase Auth sudah include di paket Supabase — tidak perlu library tambahan.
