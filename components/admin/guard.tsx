'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Demo-level guard: menandai sesi via localStorage. Untuk produksi, ganti
// dengan autentikasi & middleware sungguhan (lihat README.md).
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const authed = typeof window !== 'undefined' && localStorage.getItem('masjid_admin_auth') === 'true';
    if (!authed) {
      router.replace('/admin/login');
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-sm text-foreground/40">
        Memeriksa sesi admin…
      </div>
    );
  }

  return <>{children}</>;
}
