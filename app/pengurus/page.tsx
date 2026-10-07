import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Phone, User, History } from "lucide-react";
import { getPengurus } from "@/lib/data";

const sejarahKetuaDKM = [
  { periode: "2003", nama: "Bpk. Catur Hidayat" },
  { periode: "2003 - 2008", nama: "Bpk. Suwarno, SH." },
  { periode: "2008 - 2019", nama: "Bpk. H. Buchori Muslim" },
  { periode: "2019 - 2025", nama: "Bpk. Suwarno, SH." },
  { periode: "2025 - Sekarang", nama: "Bpk. Suganda" },
];

export default function PengurusPage() {
  const data = getPengurus();

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <PageHeader title="Profil Pengurus DKM" description="Struktur dan kontak takmir masjid." />
      
      {/* Pengurus Aktif */}
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {data.map((p) => (
          <Card key={p.id} className="p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-50 text-primary-700">
              <User size={18} />
            </span>
            <p className="mt-3 font-semibold">{p.nama}</p>
            <p className="text-sm text-foreground/50">{p.jabatan}</p>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-foreground/60">
              <Phone size={13} /> {p.telepon}
            </p>
          </Card>
        ))}
      </div>

      {/* Sejarah Kepemimpinan Ketua DKM */}
      <Card className="mt-8 p-5">
        <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
          <History className="h-5 w-5 text-primary-700" />
          <div>
            <h2 className="font-bold text-primary-900">Sejarah Kepemimpinan DKM</h2>
            <p className="text-xs text-foreground/50">Masjid Al Barokah Komp. Inkopad Blok D</p>
          </div>
        </div>

        <div className="divide-y divide-border/60">
          {sejarahKetuaDKM.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2.5 text-sm">
              <span className="font-semibold text-primary-700">{item.periode}</span>
              <span className="font-medium text-foreground">{item.nama}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}