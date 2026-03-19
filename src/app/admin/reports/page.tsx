'use client';

import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { properties } from '@/data/properties';
import { users } from '@/data/users';
import { deals } from '@/data/deals';
import { Download, TrendingUp } from 'lucide-react';

export default function AdminReportsPage() {
  const { language } = useTranslation();
  const isEn = language === 'en';

  // Monthly revenue mock data
  const revenueData = [
    { month: isEn ? 'Oct' : 'ต.ค.', value: 180000 },
    { month: isEn ? 'Nov' : 'พ.ย.', value: 220000 },
    { month: isEn ? 'Dec' : 'ธ.ค.', value: 195000 },
    { month: isEn ? 'Jan' : 'ม.ค.', value: 310000 },
    { month: isEn ? 'Feb' : 'ก.พ.', value: 275000 },
    { month: isEn ? 'Mar' : 'มี.ค.', value: 350000 },
  ];
  const maxRevenue = Math.max(...revenueData.map((d) => d.value));
  const totalRevenue = revenueData.reduce((s, d) => s + d.value, 0);

  // District demand
  const districtCounts: Record<string, number> = {};
  properties.forEach((p) => {
    const key = isEn ? p.location.district : p.location.districtTh;
    districtCounts[key] = (districtCounts[key] || 0) + 1;
  });
  const districtData = Object.entries(districtCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  const maxDistrict = Math.max(...districtData.map((d) => d[1]));

  // Business type distribution (from property types)
  const typeCounts: Record<string, number> = {};
  properties.forEach((p) => {
    typeCounts[p.propertyType] = (typeCounts[p.propertyType] || 0) + 1;
  });
  const typeLabels: Record<string, { en: string; th: string; color: string }> = {
    mall: { en: 'Mall', th: 'ห้าง', color: '#2563EB' },
    street_shop: { en: 'Street Shop', th: 'ตึกแถว', color: '#F97316' },
    community_mall: { en: 'Community Mall', th: 'คอมมูนิตี้มอลล์', color: '#10B981' },
    standalone: { en: 'Standalone', th: 'อาคารเดี่ยว', color: '#8B5CF6' },
    market: { en: 'Market', th: 'ตลาด', color: '#EF4444' },
    pop_up: { en: 'Pop-up', th: 'ป๊อปอัพ', color: '#EC4899' },
  };
  const totalProps = properties.length;
  const typeData = Object.entries(typeCounts).map(([key, count]) => ({
    key,
    label: isEn ? typeLabels[key]?.en || key : typeLabels[key]?.th || key,
    count,
    pct: Math.round((count / totalProps) * 100),
    color: typeLabels[key]?.color || '#6B7280',
  }));

  // Build conic-gradient
  let cumPct = 0;
  const conicParts = typeData.map((t) => {
    const start = cumPct;
    cumPct += t.pct;
    return `${t.color} ${start}% ${cumPct}%`;
  });
  const conicGradient = `conic-gradient(${conicParts.join(', ')})`;

  // User growth mock
  const userGrowth = [
    { month: isEn ? 'Oct' : 'ต.ค.', value: 5 },
    { month: isEn ? 'Nov' : 'พ.ย.', value: 7 },
    { month: isEn ? 'Dec' : 'ธ.ค.', value: 6 },
    { month: isEn ? 'Jan' : 'ม.ค.', value: 9 },
    { month: isEn ? 'Feb' : 'ก.พ.', value: 8 },
    { month: isEn ? 'Mar' : 'มี.ค.', value: 11 },
  ];
  const maxGrowth = Math.max(...userGrowth.map((d) => d.value));

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEn ? 'Reports & Analytics' : 'รายงานและการวิเคราะห์'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {isEn ? 'Platform performance insights' : 'ข้อมูลเชิงลึกผลการดำเนินงาน'}
          </p>
        </div>
        <button
          onClick={() => alert(isEn ? 'Export feature coming soon!' : 'ฟีเจอร์ส่งออกเร็วๆ นี้!')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          {isEn ? 'Export Data' : 'ส่งออกข้อมูล'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-semibold text-gray-900">
              {isEn ? 'Revenue Overview' : 'ภาพรวมรายได้'}
            </h2>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+18%</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            {isEn ? 'Total' : 'รวม'}: {formatPrice(totalRevenue)}
          </p>
          <div className="flex items-end gap-3 h-44">
            {revenueData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-medium text-gray-500">{formatPrice(d.value).replace('฿', '')}</span>
                <div
                  className="w-full bg-blue-500 rounded-t-md"
                  style={{ height: `${(d.value / maxRevenue) * 100}%` }}
                />
                <span className="text-xs text-gray-400">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* District Demand */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-4">
            {isEn ? 'Top Districts by Demand' : 'เขตยอดนิยมตามความต้องการ'}
          </h2>
          <div className="space-y-3">
            {districtData.map(([name, count]) => (
              <div key={name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-700">{name}</span>
                  <span className="text-gray-500">{count} {isEn ? 'listings' : 'ประกาศ'}</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full transition-all"
                    style={{ width: `${(count / maxDistrict) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Type Distribution (Pie chart via conic-gradient) */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-4">
            {isEn ? 'Property Type Distribution' : 'การกระจายประเภทพื้นที่'}
          </h2>
          <div className="flex items-center gap-6">
            <div
              className="w-36 h-36 rounded-full flex-shrink-0"
              style={{ background: conicGradient }}
            />
            <div className="space-y-2 flex-1">
              {typeData.map((t) => (
                <div key={t.key} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: t.color }} />
                  <span className="text-gray-700 flex-1">{t.label}</span>
                  <span className="text-gray-400">{t.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Growth */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-1">
            {isEn ? 'User Growth Trend' : 'แนวโน้มการเติบโตผู้ใช้'}
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            {isEn ? 'New registrations per month' : 'การลงทะเบียนใหม่ต่อเดือน'}
          </p>
          <div className="flex items-end gap-3 h-44">
            {userGrowth.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-medium text-gray-500">{d.value}</span>
                <div
                  className="w-full bg-green-500 rounded-t-md"
                  style={{ height: `${(d.value / maxGrowth) * 100}%` }}
                />
                <span className="text-xs text-gray-400">{d.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-3xl font-bold text-blue-600">{users.length}</p>
          <p className="text-sm text-gray-500 mt-1">{isEn ? 'Total Users' : 'ผู้ใช้ทั้งหมด'}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-3xl font-bold text-green-600">{properties.length}</p>
          <p className="text-sm text-gray-500 mt-1">{isEn ? 'Total Listings' : 'ประกาศทั้งหมด'}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-3xl font-bold text-orange-600">{deals.length}</p>
          <p className="text-sm text-gray-500 mt-1">{isEn ? 'Total Deals' : 'ดีลทั้งหมด'}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-3xl font-bold text-purple-600">
            {Math.round((deals.filter((d) => d.status === 'active').length / deals.length) * 100)}%
          </p>
          <p className="text-sm text-gray-500 mt-1">{isEn ? 'Conversion Rate' : 'อัตราการปิดดีล'}</p>
        </div>
      </div>
    </div>
  );
}
