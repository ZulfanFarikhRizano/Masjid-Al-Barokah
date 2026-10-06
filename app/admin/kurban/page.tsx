import { Card } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getKurban } from "@/lib/data";
import { addKurbanAction, updateKurbanStatusAction } from "@/lib/actions";

const langkah = ["Terdaftar", "Sudah Disembelih", "Sudah Didistribusikan"] as const;

export default function AdminKurbanPage() {
  const data = getKurban();

  return (
    <div>
      <h1 className="mb-6 text-xl font-extrabold text-primary-900">Kelola Kurban</h1>

      <Card className="mb-6 p-5">
        <p className="mb-3 text-sm font-semibold text-foreground/80">Tambah Pendaftar</p>
        <form action={addKurbanAction} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Input name="namaPengurban" placeholder="Nama pengurban" required aria-label="Nama pengurban" />
          <Select name="jenisHewan" aria-label="Jenis hewan">
            <option value="Kambing">Kambing</option>
            <option value="Domba">Domba</option>
            <option value="Sapi">Sapi</option>
          </Select>
          <Input type="number" name="jumlahHewan" placeholder="Jumlah ekor" defaultValue={1} min={1} aria-label="Jumlah ekor" />
          <Input name="atasNama" placeholder="Atas nama" required aria-label="Atas nama" />
          <Button type="submit" className="justify-self-start lg:col-span-4">
            Simpan Pendaftar
          </Button>
        </form>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        {data.map((k) => (
          <Card key={k.id} className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold">{k.jenisHewan} · {k.jumlahHewan} ekor</p>
              <Badge tone={k.statusDistribusi === "Sudah Didistribusikan" ? "green" : "yellow"}>
                {k.statusDistribusi}
              </Badge>
            </div>
            <p className="text-sm text-foreground/60">Pengurban: {k.namaPengurban}</p>
            <p className="text-sm text-foreground/60">Atas nama: {k.atasNama}</p>
            <div className="mt-3 flex gap-2">
              {langkah
                .filter((s) => s !== k.statusDistribusi)
                .map((s) => (
                  <form key={s} action={updateKurbanStatusAction.bind(null, k.id, s)}>
                    <button type="submit" className="rounded-full border border-border px-2.5 py-1 text-xs font-semibold hover:bg-muted">
                      {s}
                    </button>
                  </form>
                ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
