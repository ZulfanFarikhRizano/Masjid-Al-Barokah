'use client';

import { useEffect, useState } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { jadwalSholatHariIni, LOKASI_MASJID } from '@/lib/data';

type WaktuSholat = { nama: string; jam: string };

function menitKeDetik(jam: string) {
  const [h, m] = jam.split(':').map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(h, m, 0, 0);
  return Math.floor((target.getTime() - now.getTime()) / 1000);
}

function cariSholatBerikutnya(waktu: WaktuSholat[]) {
  for (const w of waktu) {
    const sisa = menitKeDetik(w.jam);
    if (sisa > 0) return { nama: w.nama, sisaDetik: sisa };
  }
  return { nama: waktu[0].nama, sisaDetik: menitKeDetik(waktu[0].jam) + 24 * 3600 };
}

function formatCountdown(totalDetik: number) {
  const jam = Math.floor(totalDetik / 3600);
  const menit = Math.floor((totalDetik % 3600) / 60);
  const detik = totalDetik % 60;
  return [jam, menit, detik].map((v) => String(v).padStart(2, '0')).join(':');
}

function formatTanggalHariIni() {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date());
}

// Ambil jadwal sholat ASLI hari ini dari Aladhan API — method=20 artinya
// metode perhitungan Kementerian Agama RI, dihitung dari koordinat masjid.
async function fetchJadwalSholat(): Promise<WaktuSholat[]> {
  const now = new Date();
  const tanggalUrl = [
    String(now.getDate()).padStart(2, '0'),
    String(now.getMonth() + 1).padStart(2, '0'),
    now.getFullYear(),
  ].join('-');

  const url = `https://api.aladhan.com/v1/timings/${tanggalUrl}?latitude=${LOKASI_MASJID.lat}&longitude=${LOKASI_MASJID.lng}&method=20`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Gagal mengambil jadwal sholat');
  const json = await res.json();
  const t = json?.data?.timings;
  if (!t) throw new Error('Format respons API tidak sesuai');

  // API kadang membalas "04:32 (WIB)" — ambil 5 karakter jam:menit saja.
  const bersihkan = (s: string) => s.slice(0, 5);

  return [
    { nama: 'Subuh', jam: bersihkan(t.Fajr) },
    { nama: 'Dzuhur', jam: bersihkan(t.Dhuhr) },
    { nama: 'Ashar', jam: bersihkan(t.Asr) },
    { nama: 'Maghrib', jam: bersihkan(t.Maghrib) },
    { nama: 'Isya', jam: bersihkan(t.Isha) },
  ];
}

export function PrayerCard() {
  const [azanAktif, setAzanAktif] = useState(true);
  const [waktu, setWaktu] = useState<WaktuSholat[] | null>(null);
  const [sumber, setSumber] = useState<'api' | 'cadangan' | null>(null);
  const [sisa, setSisa] = useState<{ nama: string; sisaDetik: number } | null>(null);
  const [tanggalHariIni, setTanggalHariIni] = useState<string | null>(null);

  // Ambil jadwal sholat asli sekali saat kartu dibuka — otomatis jatuh ke
  // jadwal cadangan statis kalau API gagal/tidak ada internet.
  useEffect(() => {
    let batal = false;
    fetchJadwalSholat()
      .then((hasil) => {
        if (!batal) {
          setWaktu(hasil);
          setSumber('api');
        }
      })
      .catch(() => {
        if (!batal) {
          setWaktu(jadwalSholatHariIni.waktuCadangan);
          setSumber('cadangan');
        }
      });
    return () => {
      batal = true;
    };
  }, []);

  // Countdown + tanggal jalan tiap detik, begitu jadwalnya sudah didapat.
  useEffect(() => {
    if (!waktu) return;
    setSisa(cariSholatBerikutnya(waktu));
    setTanggalHariIni(formatTanggalHariIni());

    const interval = setInterval(() => {
      setSisa((prev) => {
        if (!prev || prev.sisaDetik <= 1) return cariSholatBerikutnya(waktu);
        return { ...prev, sisaDetik: prev.sisaDetik - 1 };
      });
      setTanggalHariIni(formatTanggalHariIni());
    }, 1000);

    return () => clearInterval(interval);
  }, [waktu]);

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="font-bold text-primary-900">Jadwal Sholat</h2>
        <span className="text-xs text-foreground/50">
          {jadwalSholatHariIni.lokasi} · {tanggalHariIni ?? '...'}
        </span>
      </div>

      {!waktu ? (
        <div className="space-y-2">
          <div className="h-16 animate-pulse rounded-2xl bg-muted" />
          <div className="h-40 animate-pulse rounded-xl bg-muted" />
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between rounded-2xl bg-primary-600 px-4 py-3.5 text-white">
            <div>
              <p className="text-xs opacity-80">Sholat berikutnya</p>
              <p className="text-lg font-bold">{sisa?.nama ?? '—'}</p>
            </div>
            <div className="tabular text-xl font-bold" aria-live="polite">
              {sisa ? formatCountdown(sisa.sisaDetik) : '--:--:--'}
            </div>
          </div>

          <ul className="divide-y divide-dashed divide-border text-sm">
            {waktu.map((w) => (
              <li key={w.nama} className="flex items-center justify-between py-2">
                <span className={w.nama === sisa?.nama ? 'font-semibold text-primary-700' : 'text-foreground/70'}>
                  {w.nama}
                </span>
                <time className="tabular font-semibold">{w.jam}</time>
              </li>
            ))}
          </ul>

          {sumber === 'cadangan' && (
            <p className="mt-2 text-[11px] text-foreground/40">
              Tidak bisa menghubungi server jadwal sholat — menampilkan jadwal cadangan.
            </p>
          )}
        </>
      )}

      <button
        type="button"
        aria-pressed={azanAktif}
        onClick={() => setAzanAktif((v) => !v)}
        className="mt-4 flex w-full items-center justify-between rounded-xl border border-border bg-muted px-3.5 py-2.5 text-sm font-semibold"
      >
        <span className="flex items-center gap-2">
          {azanAktif ? <Bell size={15} className="text-primary-700" /> : <BellOff size={15} className="text-foreground/40" />}
          Notifikasi suara Azan
        </span>
        <span className={`relative h-5 w-9 rounded-full transition-colors ${azanAktif ? 'bg-primary-600' : 'bg-border'}`}>
          <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${azanAktif ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
        </span>
      </button>
    </Card>
  );
}