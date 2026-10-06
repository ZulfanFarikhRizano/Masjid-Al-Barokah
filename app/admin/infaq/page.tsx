import { Card } from "@/components/ui/card";

export default function AdminInfaqPage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-extrabold text-primary-900">Kelola Infaq Digital</h1>
      <Card className="p-5">
        <p className="text-sm text-foreground/60">
          Pengaturan nomor rekening, kode QRIS, dan pilihan nominal cepat untuk halaman{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">/infaq</code> saat ini didefinisikan langsung
          di komponen halaman tersebut. Untuk produksi, pindahkan nilai rekening dan gambar QRIS ke
          <code className="rounded bg-muted px-1.5 py-0.5">lib/data.ts</code> (atau tabel database) agar
          dapat diubah dari sini tanpa mengedit kode.
        </p>
      </Card>
    </div>
  );
}
