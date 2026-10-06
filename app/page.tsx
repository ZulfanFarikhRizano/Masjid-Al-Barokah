import Link from "next/link";
import { Suspense } from "react";
import { PengajianTerdekat } from "@/components/pengajian-terdekat";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Wallet,
  HandCoins,
  Beef,
  CalendarDays,
  Mic2,
  Users,
  MessageSquareHeart,
  CalendarRange,
  Landmark,
  Clock,
  Compass,
  Megaphone,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PrayerCard } from "@/components/prayer-card";
import { formatRupiah } from "@/lib/utils";
import { getKas, getWarta } from "@/lib/data";

const fitur = [
  { label: "Transparansi Kas", href: "/kas", icon: Wallet },
  { label: "Zakat & BAZNAS", href: "/zakat", icon: HandCoins },
  { label: "Data Kurban", href: "/kurban", icon: Beef },
  { label: "Jadwal Pengajian", href: "/pengajian", icon: CalendarDays },
  { label: "Imam & Khatib", href: "/imam", icon: Mic2 },
  { label: "Profil Pengurus", href: "/pengurus", icon: Users },
  { label: "Kotak Saran", href: "/saran", icon: MessageSquareHeart },
  { label: "Booking Fasilitas", href: "/booking", icon: CalendarRange },
  { label: "Infaq Digital", href: "/infaq", icon: Landmark },
  { label: "Jadwal Sholat", href: "/jadwal-sholat", icon: Clock },
  { label: "Arah Kiblat", href: "/kiblat", icon: Compass },
  { label: "Warta Masjid", href: "/warta", icon: Megaphone },
];

export default function HomePage() {
  const kas = getKas();
  const saldo = kas.reduce(
    (acc, k) => acc + (k.kategori === "Pemasukan" ? k.nominal : -k.nominal),
    0
  );
  const warta = getWarta().slice(0, 2);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      {/* Hero */}
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <p className="font-arabic text-2xl text-primary-600">بيت الله</p>
          <h1 className="mt-3 max-w-[18ch] text-3xl font-extrabold leading-tight text-primary-900 sm:text-4xl">
            Satu tempat untuk seluruh layanan jamaah
          </h1>
          <p className="mt-3 max-w-[48ch] text-foreground/60">
            Kas, zakat, jadwal ibadah, hingga booking fasilitas — semuanya
            transparan dan mudah diakses jamaah dari segala usia.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/infaq" variant="primary">
              <HandCoins size={16} /> Infaq Sekarang
            </Button>
            <Button href="/booking" variant="outline">
              Booking Fasilitas
            </Button>
          </div>

          {/* Ringkasan kas — ringkas, tanpa tabel besar di beranda */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            <Card className="p-4">
              <p className="text-xs text-foreground/50">Saldo Kas</p>
              <p className="tabular mt-1 text-lg font-bold text-primary-700">
                {formatRupiah(saldo)}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-foreground/50">Pemasukan</p>
              <p className="tabular mt-1 text-lg font-bold text-foreground">
                {formatRupiah(
                  kas.filter((k) => k.kategori === "Pemasukan").reduce((a, b) => a + b.nominal, 0)
                )}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-foreground/50">Pengeluaran</p>
              <p className="tabular mt-1 text-lg font-bold text-foreground">
                {formatRupiah(
                  kas.filter((k) => k.kategori === "Pengeluaran").reduce((a, b) => a + b.nominal, 0)
                )}
              </p>
            </Card>
          </div>
        </div>

        <PrayerCard />
      </section>

      {/* Akses layanan */}
      <section className="mt-16">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-lg font-bold text-primary-900">Layanan Masjid</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {fitur.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-background p-4 transition-colors hover:border-primary-400"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700 group-hover:bg-primary-100">
                <Icon size={18} />
              </span>
              <span className="text-sm font-semibold text-foreground">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Pengajian terdekat — dimuat async, contoh skeleton loading state */}
      <section className="mt-16">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-lg font-bold text-primary-900">Pengajian Terdekat</h2>
        </div>
        <Suspense
          fallback={
            <div className="grid gap-3 sm:grid-cols-2">
              <Skeleton className="h-[104px]" />
              <Skeleton className="h-[104px]" />
            </div>
          }
        >
          <PengajianTerdekat />
        </Suspense>
      </section>

      {/* Info terbaru — pengganti banner berjalan: daftar tenang, tidak mencolok */}
      <section className="mt-16">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-lg font-bold text-primary-900">Info Terbaru</h2>
          <Link href="/warta" className="flex items-center gap-1 text-sm font-semibold text-primary-700 hover:underline">
            Lihat semua <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {warta.map((w) => (
            <Card key={w.id} className="p-4">
              <Badge tone={w.jenis === "Duka Cita" ? "neutral" : "yellow"}>{w.jenis}</Badge>
              <p className="mt-2 font-semibold text-foreground">{w.judul}</p>
              <p className="mt-1 line-clamp-2 text-sm text-foreground/60">{w.isi}</p>
              <p className="mt-2 text-xs text-foreground/40">{w.tanggal}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
