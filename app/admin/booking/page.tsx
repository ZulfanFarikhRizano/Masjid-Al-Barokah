import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getBooking, getFasilitas } from "@/lib/data";
import { updateBookingStatusAction } from "@/lib/actions";

const toneFor = (s: string): "green" | "yellow" | "neutral" => (s === "Disetujui" ? "green" : s === "Ditolak" ? "neutral" : "yellow");

export default function AdminBookingPage() {
  const booking = getBooking();
  const fasilitas = getFasilitas();

  return (
    <div>
      <h1 className="mb-6 text-xl font-extrabold text-primary-900">Kelola Booking Fasilitas</h1>
      <div className="grid gap-3">
        {booking.map((b) => {
          const f = fasilitas.find((x) => x.id === b.fasilitasId);
          return (
            <Card key={b.id} className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-semibold">{f?.nama ?? "Fasilitas"}</p>
                <Badge tone={toneFor(b.status)}>{b.status}</Badge>
              </div>
              <p className="text-sm text-foreground/60">{b.namaPemesan} · {b.keperluan}</p>
              <p className="text-sm text-foreground/40">{b.tanggal}</p>
              {b.status === "Menunggu" && (
                <div className="mt-3 flex gap-2">
                  <form action={updateBookingStatusAction.bind(null, b.id, "Disetujui")}>
                    <button type="submit" className="rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white hover:brightness-110">
                      Setujui
                    </button>
                  </form>
                  <form action={updateBookingStatusAction.bind(null, b.id, "Ditolak")}>
                    <button type="submit" className="rounded-full border border-border px-3 py-1 text-xs font-semibold hover:bg-muted">
                      Tolak
                    </button>
                  </form>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
