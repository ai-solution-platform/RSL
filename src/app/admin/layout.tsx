'use client';

import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { useTranslation } from '@/lib/i18n';
import { useAppStore } from '@/store';
import { Globe } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = useTranslation();
  const setLanguage = useAppStore((s) => s.setLanguage);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />

      {/* Main content area */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 lg:px-8 py-3 flex items-center justify-end gap-3">
          <button
            onClick={() => setLanguage(language === 'th' ? 'en' : 'th')}
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>{language === 'th' ? 'EN' : 'TH'}</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
              A
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:inline">
              {language === 'th' ? 'ผู้ดูแลระบบ' : 'Admin'}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8 pl-14 lg:pl-8">{children}</main>
      </div>
    </div>
  );
}
