'use client';

import { useEffect, useState, useRef } from 'react';
import { LocateFixed, Navigation, AlertCircle, Compass } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { LOKASI_MASJID } from '@/lib/data';

// Koordinat Ka'bah (Mekkah)
const KAABA = { lat: 21.4225, lng: 39.8262 };

function hitungArahKiblat(lat: number, lng: number) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;
  const φ1 = toRad(lat);
  const φ2 = toRad(KAABA.lat);
  const Δλ = toRad(KAABA.lng - lng);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

// Menghitung pergeseran sudut secara mulus tanpa melompat saat melewati 0°/360°
function normSudut(prev: number, next: number) {
  let diff = (next - prev) % 360;
  if (diff < -180) diff += 360;
  if (diff > 180) diff -= 360;
  return prev + diff;
}

type Status = 'idle' | 'butuh-izin' | 'aktif' | 'tidak-didukung' | 'ditolak';

export default function KiblatPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [arahKiblat, setArahKiblat] = useState<number>(295);
  const [headingPerangkat, setHeadingPerangkat] = useState<number>(0);
  const [pakaiLokasiMasjid, setPakaiLokasiMasjid] = useState(false);

  const headingRef = useRef<number>(0);

  useEffect(() => {
    setArahKiblat(hitungArahKiblat(LOKASI_MASJID.lat, LOKASI_MASJID.lng));

    if (typeof window === 'undefined') return;
    const needsPermission =
      typeof (DeviceOrientationEvent as any)?.requestPermission === 'function';
    setStatus(needsPermission ? 'butuh-izin' : 'idle');
  }, []);

  const handleOrientation = (e: any) => {
    let compassHeading: number | null = null;

    // 1. Perangkat iOS (Safari/WebKit)
    if (e.webkitCompassHeading != null) {
      compassHeading = e.webkitCompassHeading;
    } 
    // 2. Perangkat Android dengan sensor Absolute Orientation
    else if (e.absolute === true && e.alpha != null) {
      compassHeading = (360 - e.alpha) % 360;
    } 
    // 3. Fallback biasa
    else if (e.alpha != null) {
      compassHeading = (360 - e.alpha) % 360;
    }

    if (compassHeading != null) {
      // Terapkan Low-Pass Filter sederhana agar gerak jarum halus & tenang
      const target = normSudut(headingRef.current, compassHeading);
      const smoothed = headingRef.current + (target - headingRef.current) * 0.25;
      headingRef.current = smoothed;
      setHeadingPerangkat(smoothed);
    }
  };

  const mulaiKompas = async () => {
    // Ambil GPS lokasi pengguna real-time agar sudut kiblat presisi
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setArahKiblat(hitungArahKiblat(pos.coords.latitude, pos.coords.longitude));
          setPakaiLokasiMasjid(false);
        },
        () => {
          setArahKiblat(hitungArahKiblat(LOKASI_MASJID.lat, LOKASI_MASJID.lng));
          setPakaiLokasiMasjid(true);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }

    const DOE = DeviceOrientationEvent as any;

    if (typeof DOE?.requestPermission === 'function') {
      try {
        const result = await DOE.requestPermission();
        if (result === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation, true);
          setStatus('aktif');
        } else {
          setStatus('ditolak');
        }
      } catch {
        setStatus('ditolak');
      }
    } else {
      const win = window as any;
      if ('ondeviceorientationabsolute' in win) {
        win.addEventListener('deviceorientationabsolute', handleOrientation, true);
      } else {
        win.addEventListener('deviceorientation', handleOrientation, true);
      }
      setStatus('aktif');
    }
  };

  useEffect(() => {
    return () => {
      const win = window as any;
      if (win.removeEventListener) {
        win.removeEventListener('deviceorientationabsolute', handleOrientation, true);
        win.removeEventListener('deviceorientation', handleOrientation, true);
      }
    };
  }, []);

  // Perhitungan posisi relatif jarum kiblat terhadap kompas
  const rotasiPiringan = -headingPerangkat;
  const selisihKiblat = Math.abs((((headingPerangkat - arahKiblat) + 540) % 360) - 180);
  const isAligned = status === 'aktif' && selisihKiblat < 4;

  return (
    <div className="mx-auto max-w-md px-4 py-6 sm:py-10">
      <PageHeader
        title="Kompas Kiblat"
        description="Letakkan HP secara mendatar di telapak tangan atau meja."
      />

      <Card className="relative flex flex-col items-center overflow-hidden p-6 shadow-xl border-emerald-100 dark:border-emerald-950">
        {/* Indikator Tepat Kiblat */}
        {isAligned && (
          <div className="absolute top-3 rounded-full bg-emerald-500/15 px-3.5 py-1 text-xs font-extrabold text-emerald-600 dark:bg-emerald-500/25 dark:text-emerald-400">
            ✓ Anda Menghadap Kiblat
          </div>
        )}

        {/* Dial Utama Kompas */}
        <div className="relative my-6 flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
          
          {/* Garis Penunjuk Atas HP */}
          <div className="absolute -top-2 z-20 flex flex-col items-center">
            <div className="h-4 w-1 rounded-full bg-primary-600 dark:bg-primary-400" />
            <div className="h-2 w-2 rotate-45 border-b-2 border-r-2 border-primary-600 dark:border-primary-400" />
          </div>

          {/* Ring Kompas yang Berputar */}
          <div
            className={`relative flex h-full w-full items-center justify-center rounded-full border-4 transition-all duration-150 ease-out ${
              isAligned
                ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.35)]'
                : 'border-slate-200 dark:border-slate-800 bg-card'
            }`}
            style={{ transform: `rotate(${rotasiPiringan}deg)` }}
          >
            {/* Tanda Titik Derajat */}
            <div className="absolute inset-2.5 rounded-full border border-dashed border-border/70" />

            {/* Mata Angin Utama */}
            <span className="absolute top-2.5 text-xs font-black text-red-600">U</span>
            <span className="absolute right-3.5 text-xs font-bold text-foreground/40">T</span>
            <span className="absolute bottom-2.5 text-xs font-bold text-foreground/40">S</span>
            <span className="absolute left-3.5 text-xs font-bold text-foreground/40">B</span>

            {/* Jarum Indikator Ka'bah */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-150 ease-out"
              style={{ transform: `rotate(${arahKiblat}deg)` }}
            >
              <div className="absolute -top-3 flex flex-col items-center">
                <div className="flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-extrabold text-white shadow-md">
                  <Compass size={12} />
                  KA&apos;BAH
                </div>
                <div className="h-24 w-1.5 rounded-full bg-gradient-to-t from-transparent via-emerald-500 to-emerald-600" />
              </div>
            </div>
          </div>

          {/* Ikon Tengah */}
          <div
            className={`absolute z-10 flex h-12 w-12 items-center justify-center rounded-full shadow-md transition-colors ${
              isAligned ? 'bg-emerald-600 text-white' : 'bg-primary-600 text-white'
            }`}
          >
            <Navigation size={22} className="transform -rotate-45" />
          </div>
        </div>

        {/* Panel Informasi */}
        <div className="mt-2 flex w-full flex-col items-center text-center">
          {status === 'idle' || status === 'butuh-izin' ? (
            <div className="flex w-full flex-col items-center gap-3">
              <Button onClick={mulaiKompas} className="w-full gap-2 py-6 text-base font-semibold shadow-md">
                <LocateFixed size={18} /> Aktifkan Kompas Kiblat
              </Button>
              <p className="text-xs text-foreground/50">
                Pegang HP secara mendatar dan jauhkan dari benda berbahan logam/magnet.
              </p>
            </div>
          ) : status === 'aktif' ? (
            <div className="w-full space-y-2.5 rounded-2xl bg-muted/40 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground/60">Sudut Kiblat</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {arahKiblat.toFixed(1)}° dari Utara
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground/60">Arah HP Saat Ini</span>
                <span className="font-bold text-foreground">
                  {((headingPerangkat % 360 + 360) % 360).toFixed(0)}°
                </span>
              </div>
              {pakaiLokasiMasjid && (
                <p className="border-t border-border/50 pt-2 text-left text-[11px] text-foreground/50">
                  * Menggunakan koordinat default Masjid Al-Barokah
                </p>
              )}
            </div>
          ) : (
            <div className="flex items-start gap-2 rounded-xl bg-amber-50 p-4 text-left text-xs text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-600" />
              <span>
                Sensor arah ditolak/tidak didukung. Gunakan sudut kiblat{' '}
                <strong>{arahKiblat.toFixed(1)}° dari Utara</strong> pada kompas bawaan HP.
              </span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}