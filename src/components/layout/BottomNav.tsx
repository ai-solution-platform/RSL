'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, MapPin, Flame, MessageCircle, User, LayoutDashboard } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { useAppStore } from '@/store';
import { useMemo } from 'react';

interface NavItem {
  key: string;
  labelKey: string;
  href: string;
  icon: typeof Search;
}

const tenantNavItems: NavItem[] = [
  { key: 'discover', labelKey: 'nav.discover', href: '/discover', icon: Search },
  { key: 'map', labelKey: 'nav.map', href: '/map', icon: MapPin },
  { key: 'feed', labelKey: 'nav.feed', href: '/feed', icon: Flame },
  { key: 'chat', labelKey: 'nav.chat', href: '/chat', icon: MessageCircle },
  { key: 'profile', labelKey: 'nav.profile', href: '/profile', icon: User },
];

const landlordNavItems: NavItem[] = [
  { key: 'dashboard', labelKey: 'nav.dashboard', href: '/landlord', icon: LayoutDashboard },
  { key: 'map', labelKey: 'nav.map', href: '/map', icon: MapPin },
  { key: 'feed', labelKey: 'nav.feed', href: '/feed', icon: Flame },
  { key: 'chat', labelKey: 'nav.chat', href: '/chat', icon: MessageCircle },
  { key: 'profile', labelKey: 'nav.profile', href: '/profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const notifications = useAppStore((s) => s.notifications);
  const userRole = useAppStore((s) => s.userRole);

  const navItems = useMemo(
    () => (userRole === 'landlord' ? landlordNavItems : tenantNavItems),
    [userRole]
  );

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200">
      <div className="flex items-center justify-around h-16 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;

          return (
            <Link
              key={item.key}
              href={item.href}
              className="relative flex flex-col items-center justify-center flex-1 h-full gap-0.5"
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={isActive ? 'text-[#2563EB]' : 'text-gray-400'}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                {item.key === 'chat' && notifications > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-red-500 rounded-full">
                    {notifications > 99 ? '99+' : notifications}
                  </span>
                )}
              </div>
              <span
                className={[
                  'text-[10px] leading-tight font-medium',
                  isActive ? 'text-[#2563EB]' : 'text-gray-400',
                ].join(' ')}
              >
                {t(item.labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
