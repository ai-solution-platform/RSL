'use client';

import { Bell } from 'lucide-react';
import { useAppStore } from '@/store';
import { useTranslation } from '@/lib/i18n';

export function Header() {
  const { t, language } = useTranslation();
  const setLanguage = useAppStore((s) => s.setLanguage);
  const userRole = useAppStore((s) => s.userRole);
  const setUserRole = useAppStore((s) => s.setUserRole);
  const notifications = useAppStore((s) => s.notifications);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between h-14 px-4 pt-[env(safe-area-inset-top)]">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#2563EB]">
            <span className="text-sm font-bold text-white tracking-tight">R</span>
          </div>
          <span className="text-lg font-bold text-gray-900 tracking-tight">
            {t('header.appName')}
          </span>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Role switcher pill */}
          <div className="flex items-center bg-gray-100 rounded-full p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setUserRole('tenant')}
              className={[
                'px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer',
                userRole === 'tenant'
                  ? 'bg-[#2563EB] text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700',
              ].join(' ')}
            >
              {t('header.tenant')}
            </button>
            <button
              type="button"
              onClick={() => setUserRole('landlord')}
              className={[
                'px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer',
                userRole === 'landlord'
                  ? 'bg-[#F97316] text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700',
              ].join(' ')}
            >
              {t('header.landlord')}
            </button>
          </div>

          {/* Language toggle */}
          <button
            type="button"
            onClick={() => setLanguage(language === 'th' ? 'en' : 'th')}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-xs font-semibold text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            {language === 'th' ? 'EN' : 'TH'}
          </button>

          {/* Notification bell */}
          <button
            type="button"
            className="relative flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <Bell size={20} className="text-gray-600" />
            {notifications > 0 && (
              <span className="absolute top-0.5 right-0.5 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-bold text-white bg-red-500 rounded-full">
                {notifications > 99 ? '99+' : notifications}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
