import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { formatRupiah } from "@/lib/utils";
import { getKas } from "@/lib/data";

export default function KasPage() {
  const kas = getKas();
  const masuk = kas.filter((k) => k.kategori === "Pemasukan").reduce((a, b) => a + b.nominal, 0);
  const keluar = kas.filter((k) => k.kategori === "Pengeluaran").reduce((a, b) => a + b.nominal, 0);

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <PageHeader
        title="Transparansi Kas Masjid"
        description="Seluruh transaksi tercatat dan diperbarui langsung oleh bendahara."
      />

      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4">
          <p className="text-xs text-foreground/50">Saldo</p>
          <p className="tabular mt-1 text-lg font-bold text-primary-700">{formatRupiah(masuk - keluar)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-foreground/50">Pemasukan</p>
          <p className="tabular mt-1 text-lg font-bold">{formatRupiah(masuk)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-foreground/50">Pengeluaran</p>
          <p className="tabular mt-1 text-lg font-bold">{formatRupiah(keluar)}</p>
        </Card>
      </div>

      <Card className="mt-6 overflow-hidden p-0">
        <table className="w-full text-sm">
          <caption className="sr-only">Riwayat transaksi kas masjid</caption>
          <thead>
            <tr className="border-b border-border bg-muted/60 text-left text-foreground/50">
              <th scope="col" className="px-4 py-3 font-medium">Tanggal</th>
              <th scope="col" className="px-4 py-3 font-medium">Keterangan</th>
              <th scope="col" className="px-4 py-3 font-medium">Kategori</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Nominal</th>
            </tr>
          </thead>
          <tbody>
            {kas.map((k) => (
              <tr key={k.id} className="border-b border-border last:border-0">
                <td className="tabular px-4 py-3">{k.tanggal}</td>
                <td className="px-4 py-3">{k.keterangan}</td>
                <td className="px-4 py-3">{k.kategori}</td>
                <td
                  className={`tabular px-4 py-3 text-right font-semibold ${
                    k.kategori === "Pemasukan" ? "text-primary-700" : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {k.kategori === "Pemasukan" ? "+" : "-"}
                  {formatRupiah(k.nominal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
