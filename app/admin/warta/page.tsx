import { Card } from "@/components/ui/card";
import { Input, Select, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getWarta } from "@/lib/data";
import { addWartaAction, deleteWartaAction } from "@/lib/actions";
import { Trash2 } from "lucide-react";

export default function AdminWartaPage() {
  const data = getWarta();

  return (
    <div>
      <h1 className="mb-6 text-xl font-extrabold text-primary-900">Kelola Warta Masjid</h1>

      <Card className="mb-6 p-5">
        <p className="mb-3 text-sm font-semibold text-foreground/80">Tambah Warta</p>
        <form action={addWartaAction} className="grid gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Select name="jenis" aria-label="Jenis warta">
              <option value="Pengumuman">Pengumuman</option>
              <option value="Duka Cita">Duka Cita</option>
            </Select>
            <Input type="date" name="tanggal" required aria-label="Tanggal" />
          </div>
          <Input name="judul" placeholder="Judul" required aria-label="Judul" />
          <Textarea name="isi" placeholder="Isi warta" rows={3} required aria-label="Isi warta" />
          <Button type="submit" className="justify-self-start">
            Terbitkan
          </Button>
        </form>
      </Card>

      <div className="grid gap-3">
        {data.map((w) => (
          <Card key={w.id} className="flex items-start justify-between gap-3 p-4">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <Badge tone={w.jenis === "Duka Cita" ? "neutral" : "yellow"}>{w.jenis}</Badge>
                <span className="text-xs text-foreground/40">{w.tanggal}</span>
              </div>
              <p className="font-semibold">{w.judul}</p>
              <p className="mt-1 text-sm text-foreground/60">{w.isi}</p>
            </div>
            <form action={deleteWartaAction.bind(null, w.id)}>
              <button type="submit" aria-label={`Hapus warta ${w.judul}`} className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40">
                <Trash2 size={15} />
              </button>
            </form>
          </Card>
        ))}
      </div>
    </div>
  );
}
