'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { users } from '@/data/users';
import {
  Building2,
  TrendingUp,
  Users,
  BadgeDollarSign,
  Plus,
  UserSearch,
  Eye,
  ChevronRight,
  Coffee,
  UtensilsCrossed,
  ShoppingBag,
  BarChart3,
} from 'lucide-react';

const landlord = users.find((u) => u.id === 'user-006')!;

const stats = [
  { key: 'properties', icon: Building2, value: '5', color: '#2563EB' },
  { key: 'vacancy', icon: TrendingUp, value: '40%', color: '#F97316' },
  { key: 'leads', icon: Users, value: '12', color: '#22c55e' },
  { key: 'revenue', icon: BadgeDollarSign, value: '2.5M', color: '#8b5cf6' },
];

const monthlyViews = [
  { month: 'Oct', views: 120 },
  { month: 'Nov', views: 180 },
  { month: 'Dec', views: 150 },
  { month: 'Jan', views: 220 },
  { month: 'Feb', views: 280 },
  { month: 'Mar', views: 350 },
];

const inquiries = [
  {
    id: 1,
    name: 'Somchai Wongsakul',
    nameTh: 'สมชาย วงศ์สกุล',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=somchai',
    property: 'Siam Square One',
    propertyTh: 'สยามสแควร์วัน',
    time: '2 hours ago',
    timeTh: '2 ชั่วโมงที่แล้ว',
  },
  {
    id: 2,
    name: 'Ploy Rattanakorn',
    nameTh: 'พลอย รัตนากร',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ploy',
    property: 'Sathorn Business District',
    propertyTh: 'ย่านธุรกิจสาทร',
    time: '5 hours ago',
    timeTh: '5 ชั่วโมงที่แล้ว',
  },
  {
    id: 3,
    name: 'Tanakorn Sriprasert',
    nameTh: 'ธนกร ศรีประเสริฐ',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tanakorn',
    property: 'Ratchada Night Market',
    propertyTh: 'ตลาดนัดรัชดา',
    time: '1 day ago',
    timeTh: '1 วันที่แล้ว',
  },
  {
    id: 4,
    name: 'Kannika Thongperm',
    nameTh: 'กรรณิการ์ ทองเพิ่ม',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kannika',
    property: 'EmQuartier Ground Floor',
    propertyTh: 'ชั้น G เอ็มควอเทียร์',
    time: '2 days ago',
    timeTh: '2 วันที่แล้ว',
  },
];

const demandInsights = [
  { type: 'Cafe', typeTh: 'คาเฟ่', percent: 35, icon: Coffee, color: '#8b5cf6' },
  { type: 'Restaurant', typeTh: 'ร้านอาหาร', percent: 28, icon: UtensilsCrossed, color: '#F97316' },
  { type: 'Retail', typeTh: 'ค้าปลีก', percent: 20, icon: ShoppingBag, color: '#2563EB' },
];

export default function LandlordDashboard() {
  const { t, language } = useTranslation();
  const [activeChart] = useState('views');

  const maxViews = Math.max(...monthlyViews.map((m) => m.views));

  const statLabels: Record<string, { en: string; th: string }> = {
    properties: { en: 'Total Properties', th: 'พื้นที่ทั้งหมด' },
    vacancy: { en: 'Vacancy Rate', th: 'อัตราว่าง' },
    leads: { en: 'Active Leads', th: 'ลีดที่ใช้งาน' },
    revenue: { en: 'This Month', th: 'เดือนนี้' },
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 pt-6 pb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-200 text-sm">
              {language === 'th' ? 'ยินดีต้อนรับ' : 'Welcome back'}
            </p>
            <h1 className="text-white text-xl font-bold mt-1">
              {language === 'th' ? landlord.nameTh : landlord.name}
            </h1>
            <p className="text-blue-200 text-xs mt-0.5">
              {language === 'th' ? landlord.companyTh : landlord.company}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <img
              src={landlord.avatar}
              alt={landlord.name}
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 -mt-4">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.key}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <Icon size={16} style={{ color: stat.color }} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.key === 'revenue' ? `฿${stat.value}` : stat.value}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {language === 'th'
                    ? statLabels[stat.key].th
                    : statLabels[stat.key].en}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Views Chart */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-blue-600" />
              <h3 className="font-semibold text-gray-900 text-sm">
                {language === 'th' ? 'ยอดเข้าชมรายเดือน' : 'Monthly Views'}
              </h3>
            </div>
            <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
              +25%
            </span>
          </div>
          <div className="flex items-end gap-2 h-32">
            {monthlyViews.map((m, i) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-gray-500 font-medium">
                  {m.views}
                </span>
                <div
                  className="w-full rounded-t-md transition-all duration-500"
                  style={{
                    height: `${(m.views / maxViews) * 100}%`,
                    backgroundColor:
                      i === monthlyViews.length - 1 ? '#2563EB' : '#DBEAFE',
                    minHeight: 8,
                  }}
                />
                <span className="text-[10px] text-gray-400">{m.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-6">
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/landlord/add-listing"
            className="flex items-center gap-3 bg-orange-500 text-white rounded-xl p-4 shadow-sm hover:bg-orange-600 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <Plus size={20} />
            </div>
            <div>
              <p className="font-semibold text-sm">
                {language === 'th' ? 'เพิ่มประกาศ' : 'Add Listing'}
              </p>
              <p className="text-orange-100 text-[10px]">
                {language === 'th' ? 'ลงพื้นที่ใหม่' : 'Post new space'}
              </p>
            </div>
          </Link>
          <Link
            href="/landlord/matching"
            className="flex items-center gap-3 bg-blue-600 text-white rounded-xl p-4 shadow-sm hover:bg-blue-700 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <UserSearch size={20} />
            </div>
            <div>
              <p className="font-semibold text-sm">
                {language === 'th' ? 'ดูผู้เช่า' : 'View Tenants'}
              </p>
              <p className="text-blue-100 text-[10px]">
                {language === 'th' ? 'ที่ตรงกัน' : 'Matching profiles'}
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Inquiries */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">
            {language === 'th' ? 'การสอบถามล่าสุด' : 'Recent Inquiries'}
          </h3>
          <button className="text-xs text-blue-600 flex items-center gap-0.5">
            {t('common.seeAll')} <ChevronRight size={14} />
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-50">
          {inquiries.map((inq) => (
            <div key={inq.id} className="flex items-center gap-3 p-3">
              <img
                src={inq.avatar}
                alt={inq.name}
                className="w-10 h-10 rounded-full bg-gray-100"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {language === 'th' ? inq.nameTh : inq.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {language === 'th' ? inq.propertyTh : inq.property}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400">
                  {language === 'th' ? inq.timeTh : inq.time}
                </span>
                <div className="w-2 h-2 rounded-full bg-orange-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tenant Demand Insights */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 text-sm mb-3">
            {language === 'th' ? 'ความต้องการของผู้เช่า' : 'Tenant Demand Insights'}
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            {language === 'th'
              ? 'ประเภทธุรกิจที่มีความต้องการสูงสุด'
              : 'Top requested business types'}
          </p>
          <div className="space-y-3">
            {demandInsights.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.type} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${d.color}15` }}
                  >
                    <Icon size={14} style={{ color: d.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">
                        {language === 'th' ? d.typeTh : d.type}
                      </span>
                      <span className="text-sm font-semibold" style={{ color: d.color }}>
                        {d.percent}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${d.percent}%`,
                          backgroundColor: d.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
