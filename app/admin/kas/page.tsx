import { Card } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/utils";
import { getKas } from "@/lib/data";
import { addKasAction, deleteKasAction } from "@/lib/actions";
import { Trash2 } from "lucide-react";

export default function AdminKasPage() {
  const kas = getKas();

  return (
    <div>
      <h1 className="mb-6 text-xl font-extrabold text-primary-900">Kelola Kas</h1>

      <Card className="mb-6 p-5">
        <p className="mb-3 text-sm font-semibold text-foreground/80">Tambah Transaksi</p>
        <form action={addKasAction} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Input type="date" name="tanggal" required aria-label="Tanggal" />
          <Input name="keterangan" placeholder="Keterangan" required aria-label="Keterangan" className="lg:col-span-2" />
          <Select name="kategori" aria-label="Kategori">
            <option value="Pemasukan">Pemasukan</option>
            <option value="Pengeluaran">Pengeluaran</option>
          </Select>
          <Input type="number" name="nominal" placeholder="Nominal" required aria-label="Nominal" min={0} />
          <Button type="submit" className="sm:col-span-2 lg:col-span-5 justify-self-start">
            Simpan Transaksi
          </Button>
        </form>
      </Card>

      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/60 text-left text-foreground/50">
              <th scope="col" className="px-4 py-3 font-medium">Tanggal</th>
              <th scope="col" className="px-4 py-3 font-medium">Keterangan</th>
              <th scope="col" className="px-4 py-3 font-medium">Kategori</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Nominal</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kas.map((k) => (
              <tr key={k.id} className="border-b border-border last:border-0">
                <td className="tabular px-4 py-3">{k.tanggal}</td>
                <td className="px-4 py-3">{k.keterangan}</td>
                <td className="px-4 py-3">{k.kategori}</td>
                <td className="tabular px-4 py-3 text-right font-semibold">{formatRupiah(k.nominal)}</td>
                <td className="px-4 py-3 text-right">
                  <form action={deleteKasAction.bind(null, k.id)}>
                    <button
                      type="submit"
                      aria-label={`Hapus transaksi ${k.keterangan}`}
                      className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                    >
                      <Trash2 size={15} />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
