import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { formatRupiah } from '@/lib/utils';
import {
  getKas,
  getZakat,
  getKurban,
  getSaran,
  getBooking,
  getWarta,
  getPengajian,
} from '@/lib/data';

export default function AdminDashboard() {
  const kas = getKas();
  const saldo = kas.reduce((a, k) => a + (k.kategori === 'Pemasukan' ? k.nominal : -k.nominal), 0);
  const saranBaru = getSaran().filter((s) => s.status === 'Baru').length;
  const bookingMenunggu = getBooking().filter((b) => b.status === 'Menunggu').length;

  const stats = [
    { label: 'Saldo Kas', value: formatRupiah(saldo), href: '/admin/kas' },
    { label: 'Entri Zakat', value: getZakat().length, href: '/admin/zakat' },
    { label: 'Pendaftar Kurban', value: getKurban().length, href: '/admin/kurban' },
    { label: 'Pengajian Terjadwal', value: getPengajian().length, href: '/admin/pengajian' },
    { label: 'Saran Baru', value: saranBaru, href: '/admin/saran' },
    { label: 'Booking Menunggu', value: bookingMenunggu, href: '/admin/booking' },
    { label: 'Warta Aktif', value: getWarta().length, href: '/admin/warta' },
  ];

  return (
    <div>
      <h1 className="mb-6 text-xl font-extrabold text-primary-900">Dashboard</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Card className="p-4 transition-colors hover:border-primary-400">
              <p className="text-xs text-foreground/50">{s.label}</p>
              <p className="tabular mt-1 text-lg font-bold text-primary-800">{s.value}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
