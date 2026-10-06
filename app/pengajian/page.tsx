import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { getPengajian } from "@/lib/data";

export default function PengajianPage() {
  const data = getPengajian();

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <PageHeader
        title="Jadwal Pengajian"
        description="Kajian rutin masjid. Jadwal ini juga tersedia untuk disinkronkan ke Google Calendar pribadi jamaah."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {data.map((p) => (
          <Card key={p.id} className="p-4">
            <p className="font-semibold text-foreground">{p.judul}</p>
            <p className="mt-0.5 text-sm text-foreground/50">{p.ustadz}</p>
            <div className="mt-3 flex flex-col gap-1.5 text-sm text-foreground/70">
              <span className="flex items-center gap-2"><CalendarDays size={14} /> {p.tanggal}</span>
              <span className="flex items-center gap-2"><Clock size={14} /> {p.jam} WIB</span>
              <span className="flex items-center gap-2"><MapPin size={14} /> {p.tempat}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
