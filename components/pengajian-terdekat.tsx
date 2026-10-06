import Link from 'next/link';
import { CalendarDays, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { getPengajian } from '@/lib/data';

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function PengajianTerdekat() {
  // Simulasi latensi jaringan/database agar skeleton fallback terlihat.
  await delay(700);
  const data = getPengajian().slice(0, 2);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {data.map((p) => (
        <Card key={p.id} className="p-4">
          <p className="font-semibold text-foreground">{p.judul}</p>
          <p className="mt-0.5 text-sm text-foreground/50">{p.ustadz}</p>
          <div className="mt-3 flex flex-col gap-1.5 text-sm text-foreground/70">
            <span className="flex items-center gap-2">
              <CalendarDays size={14} /> {p.tanggal}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={14} /> {p.jam} WIB
            </span>
          </div>
        </Card>
      ))}
      <Link
        href="/pengajian"
        className="sm:col-span-2 text-sm font-semibold text-primary-700 hover:underline"
      >
        Lihat semua jadwal pengajian →
      </Link>
    </div>
  );
}
