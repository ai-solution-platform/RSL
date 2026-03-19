'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { useAppStore } from '@/store';
import { users } from '@/data/users';
import {
  Camera,
  ChevronRight,
  Globe,
  Bell,
  FileText,
  Handshake,
  HelpCircle,
  Info,
  LogOut,
  Shield,
  Mail,
  Phone,
  Building2,
  User,
  Moon,
  Smartphone,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';

const currentUser = users[0]; // Somchai for demo

export default function ProfilePage() {
  const { t, language } = useTranslation();
  const { userRole, setLanguage, language: appLang } = useAppStore();

  const [notifications, setNotifications] = useState({
    newListings: true,
    priceChanges: true,
    messages: true,
    dealUpdates: true,
    marketing: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationItems = [
    { key: 'newListings' as const, en: 'New listings nearby', th: 'ประกาศใหม่ใกล้เคียง', icon: Building2 },
    { key: 'priceChanges' as const, en: 'Price changes', th: 'การเปลี่ยนแปลงราคา', icon: Smartphone },
    { key: 'messages' as const, en: 'New messages', th: 'ข้อความใหม่', icon: MessageSquare },
    { key: 'dealUpdates' as const, en: 'Deal updates', th: 'อัพเดทดีล', icon: Handshake },
    { key: 'marketing' as const, en: 'Promotions & tips', th: 'โปรโมชั่นและเคล็ดลับ', icon: Bell },
  ];

  const documents = [
    { en: 'Business Registration', th: 'ทะเบียนการค้า', status: 'verified' },
    { en: 'ID Verification', th: 'ยืนยันตัวตน', status: 'verified' },
    { en: 'Financial Statement', th: 'งบการเงิน', status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Profile Header */}
      <div className="bg-white px-4 pt-6 pb-5">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-full bg-gray-100"
            />
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              <Camera size={12} className="text-white" />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900">
              {language === 'th' ? currentUser.nameTh : currentUser.name}
            </h1>
            <p className="text-sm text-gray-500">
              {language === 'th' ? currentUser.companyTh : currentUser.company}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                  userRole === 'tenant'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-orange-100 text-orange-700'
                }`}
              >
                {userRole === 'tenant'
                  ? language === 'th' ? 'ผู้เช่า' : 'Tenant'
                  : language === 'th' ? 'เจ้าของ' : 'Landlord'}
              </span>
              {currentUser.verified && (
                <span className="flex items-center gap-0.5 text-[10px] text-green-600">
                  <CheckCircle2 size={10} />
                  {language === 'th' ? 'ยืนยันแล้ว' : 'Verified'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-4 grid grid-cols-1 gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail size={14} className="text-gray-400" />
            {currentUser.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone size={14} className="text-gray-400" />
            {currentUser.phone}
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="mt-2 space-y-2">
        {/* Language Toggle */}
        <div className="bg-white">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <Globe size={16} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {language === 'th' ? 'ภาษา' : 'Language'}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {language === 'th' ? 'เลือกภาษาที่ต้องการ' : 'Choose your language'}
                  </p>
                </div>
              </div>
              <div className="flex bg-gray-100 rounded-xl p-0.5">
                <button
                  onClick={() => setLanguage('th')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    appLang === 'th'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500'
                  }`}
                >
                  TH
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    appLang === 'en'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white">
          <div className="px-4 py-3 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                <Bell size={16} className="text-red-500" />
              </div>
              <p className="text-sm font-medium text-gray-900">
                {language === 'th' ? 'การแจ้งเตือน' : 'Notifications'}
              </p>
            </div>
          </div>
          {notificationItems.map((item) => {
            const Icon = item.icon;
            const isOn = notifications[item.key];
            return (
              <div key={item.key} className="px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-700">
                    {language === 'th' ? item.th : item.en}
                  </span>
                </div>
                <button
                  onClick={() => toggleNotification(item.key)}
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors ${
                    isOn ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                      isOn ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* My Documents */}
        <div className="bg-white">
          <div className="px-4 py-3 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <FileText size={16} className="text-amber-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">
                {language === 'th' ? 'เอกสารของฉัน' : 'My Documents'}
              </p>
            </div>
          </div>
          {documents.map((doc, i) => (
            <div key={i} className="px-4 py-2.5 flex items-center justify-between">
              <span className="text-sm text-gray-700">
                {language === 'th' ? doc.th : doc.en}
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    doc.status === 'verified'
                      ? 'bg-green-50 text-green-600'
                      : 'bg-yellow-50 text-yellow-600'
                  }`}
                >
                  {doc.status === 'verified'
                    ? language === 'th' ? 'ยืนยันแล้ว' : 'Verified'
                    : language === 'th' ? 'รอดำเนินการ' : 'Pending'}
                </span>
                <ChevronRight size={14} className="text-gray-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="bg-white divide-y divide-gray-50">
          {[
            {
              icon: Handshake,
              color: 'bg-green-50',
              iconColor: 'text-green-600',
              en: 'My Deals',
              th: 'ดีลของฉัน',
              href: '/deals',
            },
            {
              icon: HelpCircle,
              color: 'bg-cyan-50',
              iconColor: 'text-cyan-600',
              en: 'Help & Support',
              th: 'ช่วยเหลือและสนับสนุน',
              href: '/help',
            },
            {
              icon: Shield,
              color: 'bg-violet-50',
              iconColor: 'text-violet-600',
              en: 'Privacy Policy',
              th: 'นโยบายความเป็นส่วนตัว',
              href: '/privacy',
            },
            {
              icon: Info,
              color: 'bg-blue-50',
              iconColor: 'text-blue-600',
              en: 'About RSL Platform',
              th: 'เกี่ยวกับ RSL Platform',
              href: '/about',
            },
          ].map((link, i) => {
            const Icon = link.icon;
            return (
              <Link
                key={i}
                href={link.href}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${link.color} flex items-center justify-center`}>
                    <Icon size={16} className={link.iconColor} />
                  </div>
                  <span className="text-sm text-gray-700">
                    {language === 'th' ? link.th : link.en}
                  </span>
                </div>
                <ChevronRight size={16} className="text-gray-300" />
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <div className="bg-white">
          <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
              <LogOut size={16} className="text-red-500" />
            </div>
            <span className="text-sm font-medium text-red-500">
              {language === 'th' ? 'ออกจากระบบ' : 'Log Out'}
            </span>
          </button>
        </div>

        {/* Version */}
        <div className="text-center py-4">
          <p className="text-[10px] text-gray-400">RSL Platform v1.0.0</p>
          <p className="text-[10px] text-gray-300 mt-0.5">
            {language === 'th' ? 'สร้างด้วยใจ ใน กรุงเทพฯ' : 'Made with love in Bangkok'}
          </p>
        </div>
      </div>
    </div>
  );
}
