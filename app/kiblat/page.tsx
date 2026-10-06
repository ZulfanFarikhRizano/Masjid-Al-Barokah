'use client';

import { useEffect, useState } from 'react';
import { Compass, LocateFixed } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { LOKASI_MASJID } from '@/lib/data';

// Koordinat Ka'bah
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

type Status = 'idle' | 'butuh-izin' | 'aktif' | 'tidak-didukung' | 'ditolak';

export default function KiblatPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [arahKiblat, setArahKiblat] = useState<number | null>(null);
  const [headingPerangkat, setHeadingPerangkat] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.DeviceOrientationEvent) {
      setStatus('tidak-didukung');
      return;
    }
    const needsPermission =
      typeof (DeviceOrientationEvent as any).requestPermission === 'function';
    setStatus(needsPermission ? 'butuh-izin' : 'idle');
  }, []);

  const handleOrientation = (e: DeviceOrientationEvent) => {
    const heading = (e as any).webkitCompassHeading ?? (e.alpha != null ? 360 - e.alpha : null);
    if (heading != null) setHeadingPerangkat(heading);
  };

  const mulaiKompas = async () => {
    // Ambil lokasi pengguna untuk menghitung arah kiblat dari koordinatnya
         if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setArahKiblat(hitungArahKiblat(pos.coords.latitude, pos.coords.longitude)),
        () => setArahKiblat(hitungArahKiblat(LOKASI_MASJID.lat, LOKASI_MASJID.lng))
      );
    } else {
      setArahKiblat(hitungArahKiblat(LOKASI_MASJID.lat, LOKASI_MASJID.lng));
    }

    const DOE = DeviceOrientationEvent as any;
    if (typeof DOE.requestPermission === 'function') {
      try {
        const result = await DOE.requestPermission();
        if (result === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
          setStatus('aktif');
        } else {
          setStatus('ditolak');
        }
      } catch {
        setStatus('ditolak');
      }
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
      setStatus('aktif');
    }
  };

  useEffect(() => {
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  const rotasiJarum =
    arahKiblat != null ? arahKiblat - (headingPerangkat ?? 0) : arahKiblat ?? 0;

  return (
    <div className="mx-auto max-w-xl px-5 py-10">
      <PageHeader
        title="Kompas Arah Kiblat"
        description="Arahkan perangkat Anda — jarum akan menunjuk ke arah Ka'bah secara otomatis."
      />

      <Card className="flex flex-col items-center gap-6 p-8">
        <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-4 border-primary-100 bg-background">
          <div className="absolute inset-4 rounded-full border border-dashed border-border" />
          <div
            className="absolute flex h-full w-full items-center justify-center transition-transform duration-300 ease-out"
            style={{ transform: `rotate(${rotasiJarum}deg)` }}
          >
            <Compass size={40} className="-mt-24 text-primary-600" strokeWidth={2.2} aria-hidden="true" />
          </div>
          <span className="absolute -top-3 rounded-full bg-accent-400 px-2 py-0.5 text-[10px] font-bold text-onAccent">
            KA&apos;BAH
          </span>
          <span className="text-xs font-semibold text-foreground/40">N</span>
        </div>

        {status === 'idle' || status === 'butuh-izin' ? (
          <Button onClick={mulaiKompas}>
            <LocateFixed size={16} /> Aktifkan Kompas
          </Button>
        ) : status === 'aktif' ? (
          <p className="tabular text-sm text-foreground/60">
            Arah kiblat: <span className="font-bold text-primary-700">{arahKiblat?.toFixed(0)}°</span> dari Utara
          </p>
        ) : status === 'ditolak' ? (
          <p className="max-w-[36ch] text-center text-sm text-foreground/60">
            Izin sensor arah ditolak. Aktifkan lewat pengaturan browser, atau gunakan sudut{' '}
            <strong>{arahKiblat != null ? `${arahKiblat.toFixed(0)}°` : '—'}</strong> dari Utara secara manual.
          </p>
        ) : (
          <p className="max-w-[36ch] text-center text-sm text-foreground/60">
            Perangkat ini tidak mendukung sensor arah. Sudut kiblat dari lokasi Anda tetap dapat dihitung dan
            ditampilkan secara manual.
          </p>
        )}
      </Card>
    </div>
  );
}
