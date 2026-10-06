import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input, Select, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addBookingAction } from "@/lib/actions";
import { getFasilitas, getBooking } from "@/lib/data";

const toneFor = (s: string): "green" | "yellow" | "neutral" => (s === "Disetujui" ? "green" : s === "Ditolak" ? "neutral" : "yellow");

export default function BookingPage() {
  const fasilitas = getFasilitas();
  const booking = getBooking();

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <PageHeader
        title="Booking Fasilitas"
        description="Ajukan penggunaan aula atau lapangan masjid untuk kegiatan serbaguna, seperti akad nikah."
      />

      <div className="grid gap-6 md:grid-cols-[1fr_1.1fr]">
        <Card className="p-5">
          <p className="mb-3 text-sm font-semibold text-foreground/80">Ajukan Booking</p>
          <form action={addBookingAction} className="grid gap-3">
            <Select name="fasilitasId" required aria-label="Pilih fasilitas">
              {fasilitas.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nama}
                </option>
              ))}
            </Select>
            <Input name="namaPemesan" placeholder="Nama pemesan" required aria-label="Nama pemesan" />
            <Textarea name="keperluan" placeholder="Keperluan acara" rows={3} required aria-label="Keperluan acara" />
            <Input type="date" name="tanggal" required aria-label="Tanggal penggunaan" />
            <Button type="submit" className="justify-self-start">
              Ajukan
            </Button>
          </form>
        </Card>

        <div>
          <p className="mb-3 text-sm font-semibold text-foreground/80">Status Booking Real-time</p>
          <div className="grid gap-3">
            {booking.map((b) => {
              const f = fasilitas.find((x) => x.id === b.fasilitasId);
              return (
                <Card key={b.id} className="p-4">
                  <div className="mb-1 flex items-center justify-between">
                    <p className="font-semibold">{f?.nama ?? "Fasilitas"}</p>
                    <Badge tone={toneFor(b.status)}>{b.status}</Badge>
                  </div>
                  <p className="text-sm text-foreground/60">{b.namaPemesan} · {b.keperluan}</p>
                  <p className="text-sm text-foreground/40">{b.tanggal}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
