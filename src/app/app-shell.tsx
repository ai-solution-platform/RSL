'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';

/** Routes where bottom nav and header should be hidden */
const HIDE_SHELL_ROUTES = ['/login', '/register', '/onboarding', '/admin'];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideShell = HIDE_SHELL_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );

  if (hideShell) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1 pt-14 pb-16">{children}</main>
      <BottomNav />
    </>
  );
}
