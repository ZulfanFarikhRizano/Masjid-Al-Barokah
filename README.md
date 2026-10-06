# Masjid Modern

Website masjid modern-minimalist (Next.js 14 App Router + TypeScript + Tailwind CSS)
dengan 12 fitur jamaah dan panel admin terstruktur.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Buka http://localhost:3000 untuk situs publik, dan http://localhost:3000/admin
untuk panel admin (login demo: **admin** / **admin123** — lihat `lib/data.ts`).

## Catatan penting

- Data disimpan **in-memory** (`lib/data.ts`) sebagai contoh struktur & alur CRUD.
  Untuk produksi, ganti fungsi-fungsi di `lib/data.ts` dengan pemanggilan ke
  database sungguhan (disarankan Supabase — sudah cocok dengan struktur tipe
  yang ada) agar perubahan admin benar-benar tersimpan permanen dan konsisten
  antar pengguna.
- Notifikasi azan & kompas kiblat memerlukan izin browser (Notification API,
  DeviceOrientationEvent) — sudah ditangani dengan fallback yang aman.
- Login admin di sini hanya contoh (cek string di client). Untuk produksi,
  ganti dengan autentikasi sungguhan (mis. NextAuth / Supabase Auth) + middleware
  proteksi rute `/admin`.
- Navigasi memakai menu full-screen "curved" (`components/ui/curved-menu.tsx`) —
  tombol bundar kecil di navbar membuka panel dari kanan dengan tepi melengkung.
  Menu radial (circle) versi sebelumnya sudah dihapus sepenuhnya. Panel sengaja
  tidak menutupi seluruh layar di HP (lebar 78vw, maks 380px di layar lebar) —
  selalu ada celah gelap (scrim) di kiri yang bisa ditap untuk menutup, plus
  tombol X di dalam panel dan tombol togglenya sendiri (z-index di atas panel)
  juga tetap berfungsi sebagai penutup.
- Dark mode: tombol matahari/bulan di navbar (`components/theme-toggle.tsx`)
  menyimpan preferensi ke `localStorage`, dengan skrip anti-flicker di
  `app/layout.tsx` yang menerapkan tema sebelum halaman ter-render (mencegah
  kedipan tema salah saat reload). Seluruh warna didefinisikan sebagai CSS
  variable di `app/globals.css` dan dipetakan lewat `tailwind.config.ts`,
  jadi menambah dark-mode style baru cukup lewat token warna yang sudah ada
  (`bg-background`, `text-foreground`, `bg-primary-600`, dst) — tidak perlu
  menulis `dark:` di setiap komponen baru.
- Proyek ini sudah divalidasi dengan `tsc --noEmit` dan `next build` (28 rute,
  0 error) sebelum di-zip.
