import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getJadwalImam } from "@/lib/data";

export default function ImamPage() {
  const data = getJadwalImam();

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <PageHeader title="Jadwal Imam & Khatib" description="Jadwal imam sholat Jumat dan Tarawih." />
      <div className="grid gap-3">
        {data.map((i) => (
          <Card key={i.id} className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <Badge tone="green">{i.jenis}</Badge>
              <span className="text-sm text-foreground/50">{i.tanggal}</span>
            </div>
            <p className="font-semibold">Imam: {i.imam}</p>
            {i.khatib && <p className="text-sm text-foreground/60">Khatib: {i.khatib}</p>}
            {i.materi && <p className="text-sm text-foreground/60">Materi: {i.materi}</p>}
          </Card>
        ))}
      </div>
    </div>
  );
}
