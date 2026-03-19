'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/i18n';
import {
  LayoutDashboard,
  Users,
  Building2,
  Handshake,
  BarChart3,
  Settings,
  ArrowLeft,
  Menu,
  X,
  Shield,
} from 'lucide-react';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, labelEn: 'Dashboard', labelTh: 'แดชบอร์ด' },
  { href: '/admin/users', icon: Users, labelEn: 'Users', labelTh: 'ผู้ใช้' },
  { href: '/admin/listings', icon: Building2, labelEn: 'Listings', labelTh: 'ประกาศ' },
  { href: '/admin/deals', icon: Handshake, labelEn: 'Deals', labelTh: 'ดีล' },
  { href: '/admin/reports', icon: BarChart3, labelEn: 'Reports', labelTh: 'รายงาน' },
  { href: '/admin/settings', icon: Settings, labelEn: 'Settings', labelTh: 'ตั้งค่า' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { language } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-700">
        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="font-bold text-lg">RSL</span>
          <span className="ml-2 text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-medium">
            Admin
          </span>
        </div>
        {/* Mobile close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="ml-auto lg:hidden p-1 rounded hover:bg-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{language === 'th' ? item.labelTh : item.labelEn}</span>
            </Link>
          );
        })}
      </nav>

      {/* Back to App */}
      <div className="px-3 pb-4 border-t border-gray-700 pt-4">
        <Link
          href="/discover"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 flex-shrink-0" />
          <span>{language === 'th' ? 'กลับสู่แอป' : 'Back to App'}</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0">
        {sidebarContent}
      </aside>
    </>
  );
}
