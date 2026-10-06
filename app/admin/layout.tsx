'use client';

import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminGuard } from '@/components/admin/guard';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login';

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <AdminGuard>
      <div className="flex min-h-[70vh]">
        <AdminSidebar />
        <div className="min-w-0 flex-1 px-5 py-8 sm:px-8">{children}</div>
      </div>
    </AdminGuard>
  );
}
