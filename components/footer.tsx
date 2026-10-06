import Link from "next/link";

const groups = [
  {
    title: "Layanan",
    links: [
      { label: "Transparansi Kas", href: "/kas" },
      { label: "Zakat & BAZNAS", href: "/zakat" },
      { label: "Data Kurban", href: "/kurban" },
      { label: "Infaq Digital", href: "/infaq" },
    ],
  },
  {
    title: "Jadwal",
    links: [
      { label: "Jadwal Sholat", href: "/jadwal-sholat" },
      { label: "Jadwal Pengajian", href: "/pengajian" },
      { label: "Imam & Khatib", href: "/imam" },
      { label: "Arah Kiblat", href: "/kiblat" },
    ],
  },
  {
    title: "Jamaah",
    links: [
      { label: "Warta Masjid", href: "/warta" },
      { label: "Kotak Saran", href: "/saran" },
      { label: "Booking Fasilitas", href: "/booking" },
      { label: "Profil Pengurus", href: "/pengurus" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/60">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="font-extrabold text-primary-900">Masjid Al-Barokah</p>
            <p className="mt-2 max-w-[26ch] text-sm text-foreground/60">
              Jl. Perumahan Inkopad No.Blok D, Sasak Panjang, Kec. Tajur Halang, Kabupaten Bogor, Jawa Barat Melayani jamaah dengan transparansi dan keterbukaan informasi.
            </p>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <p className="text-sm font-semibold text-foreground/80">{g.title}</p>
              <ul className="mt-3 space-y-2 text-sm text-foreground/60">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-primary-700">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-6 text-xs text-foreground/50">
          <span>© 2026 Masjid Al-Barokah</span>
          <Link href="/admin" className="hover:text-primary-700">
            Masuk sebagai Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
