import { PageHeader } from "@/components/page-header";
import { PrayerCard } from "@/components/prayer-card";

export default function JadwalSholatPage() {
  return (
    <div className="mx-auto max-w-xl px-5 py-10">
      <PageHeader
        title="Jadwal Sholat Real-time"
        description="Hitung mundur otomatis ke waktu sholat berikutnya lengkap dengan notifikasi azan untuk wilayah Masjid Al Barokah, Jl. Perumahan Inkopad No.Blok D, Sasak Panjang, Kec. Tajur Halang, Kabupaten Bogor, Jawa Barat."
      />
      <PrayerCard />
    </div>
  );
}