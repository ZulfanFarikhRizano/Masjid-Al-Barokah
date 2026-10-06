import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getWarta } from "@/lib/data";

export default function WartaPage() {
  const data = getWarta();

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <PageHeader
        title="Warta Masjid"
        description="Pengumuman dan warta duka cita untuk seluruh jamaah."
      />
      <div className="grid gap-3">
        {data.map((w) => (
          <Card key={w.id} className="p-4">
            <div className="mb-1.5 flex items-center justify-between">
              <Badge tone={w.jenis === "Duka Cita" ? "neutral" : "yellow"}>{w.jenis}</Badge>
              <span className="text-xs text-foreground/40">{w.tanggal}</span>
            </div>
            <p className="font-semibold text-foreground">{w.judul}</p>
            <p className="mt-1 text-sm text-foreground/60">{w.isi}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
