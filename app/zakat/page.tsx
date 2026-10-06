import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/utils";
import { getZakat } from "@/lib/data";

export default function ZakatPage() {
  const data = getZakat();

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <PageHeader
        title="Zakat & BAZNAS"
        description="Pendataan zakat fitrah, zakat maal, dan status penyetoran ke BAZNAS."
      />

      <div className="grid gap-3">
        {data.map((z) => (
          <Card key={z.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-semibold text-foreground">{z.nama}</p>
              <p className="text-sm text-foreground/50">
                {z.jenis}
                {z.jumlahJiwa ? ` · ${z.jumlahJiwa} jiwa` : ""} · {z.tanggal}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="tabular font-bold text-primary-700">{formatRupiah(z.nominal)}</p>
              <Badge tone={z.statusSetor === "Sudah Disetor ke BAZNAS" ? "green" : "yellow"}>
                {z.statusSetor}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
