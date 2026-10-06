import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getKurban } from "@/lib/data";

const toneFor = (s: string): "green" | "yellow" | "neutral" => (s === "Sudah Didistribusikan" ? "green" : s === "Sudah Disembelih" ? "yellow" : "neutral");

export default function KurbanPage() {
  const data = getKurban();

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <PageHeader
        title="Data Kurban"
        description="Pendaftaran, jenis hewan, dan status distribusi kurban Idul Adha."
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {data.map((k) => (
          <Card key={k.id} className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold">{k.jenisHewan} · {k.jumlahHewan} ekor</p>
              <Badge tone={toneFor(k.statusDistribusi)}>{k.statusDistribusi}</Badge>
            </div>
            <p className="text-sm text-foreground/60">Pengurban: {k.namaPengurban}</p>
            <p className="text-sm text-foreground/60">Atas nama: {k.atasNama}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
