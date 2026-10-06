'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Wallet,
  HandCoins,
  Beef,
  CalendarDays,
  Mic2,
  Users,
  Megaphone,
  MessageSquareHeart,
  CalendarRange,
  Landmark,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const items = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Kas', href: '/admin/kas', icon: Wallet },
  { label: 'Zakat', href: '/admin/zakat', icon: HandCoins },
  { label: 'Kurban', href: '/admin/kurban', icon: Beef },
  { label: 'Pengajian', href: '/admin/pengajian', icon: CalendarDays },
  { label: 'Imam & Khatib', href: '/admin/imam', icon: Mic2 },
  { label: 'Pengurus', href: '/admin/pengurus', icon: Users },
  { label: 'Warta', href: '/admin/warta', icon: Megaphone },
  { label: 'Kotak Saran', href: '/admin/saran', icon: MessageSquareHeart },
  { label: 'Booking', href: '/admin/booking', icon: CalendarRange },
  { label: 'Infaq', href: '/admin/infaq', icon: Landmark },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('masjid_admin_auth');
    router.push('/admin/login');
  };

  return (
    <aside className="hidden w-60 shrink-0 border-r border-border bg-background md:block">
      <div className="flex h-16 items-center px-5 font-extrabold text-primary-900">Panel Admin</div>
      <nav className="flex flex-col gap-0.5 px-3 pb-4" aria-label="Navigasi admin">
        {items.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                active ? 'bg-primary-50 text-primary-700' : 'text-foreground/60 hover:bg-muted'
              )}
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={logout}
          className="mt-3 flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-foreground/50 hover:bg-muted"
        >
          <LogOut size={16} /> Keluar
        </button>
      </nav>
    </aside>
  );
}
