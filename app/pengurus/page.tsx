import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Phone, User } from "lucide-react";
import { getPengurus } from "@/lib/data";

export default function PengurusPage() {
  const data = getPengurus();

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <PageHeader title="Profil Pengurus DKM" description="Struktur dan kontak takmir masjid." />
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
    </div>
  );
}
