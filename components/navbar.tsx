import Link from 'next/link';
import Header from '@/components/ui/curved-menu';
import { ThemeToggle } from '@/components/theme-toggle';

const navItems = [
  { heading: 'Beranda', href: '/', subheading: 'Kembali ke halaman utama' },
  { heading: 'Kas', href: '/kas', subheading: 'Transparansi kas masjid' },
  { heading: 'Zakat', href: '/zakat', subheading: 'Zakat & BAZNAS' },
  { heading: 'Kurban', href: '/kurban', subheading: 'Pendaftaran & distribusi kurban' },
  { heading: 'Pengajian', href: '/pengajian', subheading: 'Jadwal kajian rutin' },
  { heading: 'Imam & Khatib', href: '/imam', subheading: 'Jadwal Jumat & Tarawih' },
  { heading: 'Pengurus', href: '/pengurus', subheading: 'Profil pengurus DKM' },
  { heading: 'Warta', href: '/warta', subheading: 'Pengumuman & duka cita' },
  { heading: 'Saran', href: '/saran', subheading: 'Kotak saran anonim' },
  { heading: 'Booking Fasilitas', href: '/booking', subheading: 'Aula & lapangan serbaguna' },
  { heading: 'Infaq', href: '/infaq', subheading: 'Infaq digital via QRIS' },
  { heading: 'Jadwal Sholat', href: '/jadwal-sholat', subheading: 'Real-time & notifikasi azan' },
  { heading: 'Kiblat', href: '/kiblat', subheading: 'Kompas arah kiblat' },
];

export function Navbar() {
  return (
    <header className="relative z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-primary-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 3l7 6v11a1 1 0 0 1-1 1h-4v-7H10v7H6a1 1 0 0 1-1-1V9l7-6z" />
            </svg>
          </span>
          <span className="text-[15px]">Masjid Al-Barokah</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Header navItems={navItems} />
        </div>
      </div>
    </header>
  );
}
