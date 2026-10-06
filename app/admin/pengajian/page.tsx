import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getPengajian } from "@/lib/data";
import { addPengajianAction, deletePengajianAction } from "@/lib/actions";
import { Trash2 } from "lucide-react";

export default function AdminPengajianPage() {
  const data = getPengajian();

  return (
    <div>
      <h1 className="mb-6 text-xl font-extrabold text-primary-900">Kelola Jadwal Pengajian</h1>

      <Card className="mb-6 p-5">
        <p className="mb-3 text-sm font-semibold text-foreground/80">Tambah Jadwal</p>
        <form action={addPengajianAction} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Input name="judul" placeholder="Judul kajian" required aria-label="Judul kajian" className="lg:col-span-2" />
          <Input name="ustadz" placeholder="Ustadz / pemateri" required aria-label="Ustadz" />
          <Input type="date" name="tanggal" required aria-label="Tanggal" />
          <Input type="time" name="jam" required aria-label="Jam" />
          <Input name="tempat" placeholder="Tempat" required aria-label="Tempat" />
          <Button type="submit" className="justify-self-start sm:col-span-2 lg:col-span-5">
            Simpan Jadwal
          </Button>
        </form>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        {data.map((p) => (
          <Card key={p.id} className="flex items-start justify-between gap-3 p-4">
            <div>
              <p className="font-semibold">{p.judul}</p>
              <p className="text-sm text-foreground/50">{p.ustadz}</p>
              <p className="mt-1 text-sm text-foreground/60">{p.tanggal} · {p.jam} WIB · {p.tempat}</p>
            </div>
            <form action={deletePengajianAction.bind(null, p.id)}>
              <button type="submit" aria-label={`Hapus jadwal ${p.judul}`} className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40">
                <Trash2 size={15} />
              </button>
            </form>
          </Card>
        ))}
      </div>
    </div>
  );
}
