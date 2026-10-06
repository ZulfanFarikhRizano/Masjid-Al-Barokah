import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getPengurus } from "@/lib/data";
import { addPengurusAction, deletePengurusAction } from "@/lib/actions";
import { Trash2, User } from "lucide-react";

export default function AdminPengurusPage() {
  const data = getPengurus();

  return (
    <div>
      <h1 className="mb-6 text-xl font-extrabold text-primary-900">Kelola Pengurus DKM</h1>

      <Card className="mb-6 p-5">
        <p className="mb-3 text-sm font-semibold text-foreground/80">Tambah Pengurus</p>
        <form action={addPengurusAction} className="grid gap-3 sm:grid-cols-3">
          <Input name="nama" placeholder="Nama lengkap" required aria-label="Nama" />
          <Input name="jabatan" placeholder="Jabatan" required aria-label="Jabatan" />
          <Input name="telepon" placeholder="Nomor telepon" required aria-label="Telepon" />
          <Button type="submit" className="justify-self-start sm:col-span-3">
            Simpan Pengurus
          </Button>
        </form>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {data.map((p) => (
          <Card key={p.id} className="p-4">
            <div className="flex items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                <User size={16} />
              </span>
              <form action={deletePengurusAction.bind(null, p.id)}>
                <button type="submit" aria-label={`Hapus ${p.nama}`} className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40">
                  <Trash2 size={15} />
                </button>
              </form>
            </div>
            <p className="mt-2 font-semibold">{p.nama}</p>
            <p className="text-sm text-foreground/50">{p.jabatan}</p>
            <p className="mt-1 text-sm text-foreground/60">{p.telepon}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
