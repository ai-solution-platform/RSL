'use client';

import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { users } from '@/data/users';
import { properties } from '@/data/properties';
import { deals } from '@/data/deals';
import Link from 'next/link';
import {
  Users as UsersIcon,
  Building2,
  Handshake,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  UserPlus,
  FileText,
  BarChart3,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { language } = useTranslation();
  const isEn = language === 'en';

  // Stats
  const totalUsers = users.length;
  const activeListings = properties.filter((p) => p.status === 'available').length;
  const openDeals = deals.filter((d) => !['completed', 'cancelled', 'expired'].includes(d.status)).length;
  const totalRevenue = deals
    .filter((d) => d.status === 'active')
    .reduce((sum, d) => sum + (d.offers.find((o) => o.status === 'accepted')?.amount || 0), 0);

  // Mock deal chart data (last 6 months)
  const chartData = [
    { month: isEn ? 'Oct' : 'ต.ค.', value: 3 },
    { month: isEn ? 'Nov' : 'พ.ย.', value: 5 },
    { month: isEn ? 'Dec' : 'ธ.ค.', value: 2 },
    { month: isEn ? 'Jan' : 'ม.ค.', value: 7 },
    { month: isEn ? 'Feb' : 'ก.พ.', value: 4 },
    { month: isEn ? 'Mar' : 'มี.ค.', value: 6 },
  ];
  const maxVal = Math.max(...chartData.map((d) => d.value));

  // Recent activity
  const recentActivity = [
    { type: 'deal', textEn: 'New deal started for Ari Cafe Space', textTh: 'เริ่มดีลใหม่สำหรับพื้นที่คาเฟ่อารีย์', time: '2 hrs ago', timeTh: '2 ชม. ที่แล้ว' },
    { type: 'listing', textEn: 'New listing: Ladprao Pop-Up Container', textTh: 'ประกาศใหม่: ป๊อปอัพคอนเทนเนอร์ลาดพร้าว', time: '3 hrs ago', timeTh: '3 ชม. ที่แล้ว' },
    { type: 'user', textEn: 'New user registered: Warawut J.', textTh: 'ผู้ใช้ใหม่ลงทะเบียน: วราวุฒิ จ.', time: '5 hrs ago', timeTh: '5 ชม. ที่แล้ว' },
    { type: 'deal', textEn: 'Deal signed: J Avenue Thonglor', textTh: 'เซ็นสัญญาดีล: เจ อเวนิว ทองหล่อ', time: '1 day ago', timeTh: '1 วันที่แล้ว' },
    { type: 'listing', textEn: 'Listing updated: EmQuartier Boutique', textTh: 'อัปเดตประกาศ: บูติก เอ็มควอเทียร์', time: '1 day ago', timeTh: '1 วันที่แล้ว' },
    { type: 'user', textEn: 'User verified: Kannika T.', textTh: 'ยืนยันผู้ใช้: กรรณิการ์ ท.', time: '2 days ago', timeTh: '2 วันที่แล้ว' },
    { type: 'deal', textEn: 'Offer countered on Silom Complex', textTh: 'เสนอราคาสวนสีลมคอมเพล็กซ์', time: '2 days ago', timeTh: '2 วันที่แล้ว' },
    { type: 'listing', textEn: 'New listing: CentralWorld Kiosk', textTh: 'ประกาศใหม่: คีออส เซ็นทรัลเวิลด์', time: '3 days ago', timeTh: '3 วันที่แล้ว' },
    { type: 'user', textEn: 'New landlord: Kittisak P.', textTh: 'เจ้าของใหม่: กิตติศักดิ์ พ.', time: '4 days ago', timeTh: '4 วันที่แล้ว' },
    { type: 'deal', textEn: 'Contract drafted for Ratchada Market', textTh: 'ร่างสัญญาตลาดรัชดา', time: '5 days ago', timeTh: '5 วันที่แล้ว' },
  ];

  // Top performing properties
  const topProperties = [...properties]
    .sort((a, b) => b.trafficScore - a.trafficScore)
    .slice(0, 5);

  const stats = [
    {
      labelEn: 'Total Users',
      labelTh: 'ผู้ใช้ทั้งหมด',
      value: totalUsers,
      change: '+12%',
      up: true,
      icon: UsersIcon,
      color: 'bg-blue-500',
    },
    {
      labelEn: 'Active Listings',
      labelTh: 'ประกาศที่ใช้งาน',
      value: activeListings,
      change: '+8%',
      up: true,
      icon: Building2,
      color: 'bg-green-500',
    },
    {
      labelEn: 'Open Deals',
      labelTh: 'ดีลที่เปิดอยู่',
      value: openDeals,
      change: '+23%',
      up: true,
      icon: Handshake,
      color: 'bg-orange-500',
    },
    {
      labelEn: 'Revenue',
      labelTh: 'รายได้',
      value: formatPrice(totalRevenue),
      change: '-3%',
      up: false,
      icon: DollarSign,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEn ? 'Admin Dashboard' : 'แดชบอร์ดผู้ดูแลระบบ'}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {isEn ? 'Overview of your platform performance' : 'ภาพรวมผลการดำเนินงานแพลตฟอร์ม'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.labelEn} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{isEn ? stat.labelEn : stat.labelTh}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-2.5 rounded-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className={`flex items-center gap-1 mt-3 text-sm ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                {stat.up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{stat.change}</span>
                <span className="text-gray-400 ml-1">{isEn ? 'vs last month' : 'เทียบเดือนก่อน'}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deals Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-4">
            {isEn ? 'Deals Over Time' : 'ดีลตามช่วงเวลา'}
          </h2>
          <div className="flex items-end gap-4 h-48">
            {chartData.map((d) => {
              const barHeight = Math.round((d.value / maxVal) * 140);
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center justify-end h-full">
                  <span className="text-xs font-medium text-gray-600 mb-1">{d.value}</span>
                  <div
                    className="w-full bg-blue-500 rounded-t-md transition-all min-h-[8px]"
                    style={{ height: `${barHeight}px` }}
                  />
                  <span className="text-xs text-gray-500 mt-2">{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-4">
            {isEn ? 'Quick Actions' : 'การดำเนินการด่วน'}
          </h2>
          <div className="space-y-3">
            <Link
              href="/admin/users"
              className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
            >
              <UserPlus className="w-5 h-5" />
              <span className="text-sm font-medium">{isEn ? 'Manage Users' : 'จัดการผู้ใช้'}</span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Link>
            <Link
              href="/admin/listings"
              className="flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 transition-colors"
            >
              <Building2 className="w-5 h-5" />
              <span className="text-sm font-medium">{isEn ? 'Review Listings' : 'ตรวจสอบประกาศ'}</span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Link>
            <Link
              href="/admin/reports"
              className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors"
            >
              <BarChart3 className="w-5 h-5" />
              <span className="text-sm font-medium">{isEn ? 'View Reports' : 'ดูรายงาน'}</span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-4">
            {isEn ? 'Recent Activity' : 'กิจกรรมล่าสุด'}
          </h2>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0">
                <div
                  className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    a.type === 'deal' ? 'bg-orange-500' : a.type === 'listing' ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">{isEn ? a.textEn : a.textTh}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{isEn ? a.time : a.timeTh}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Properties */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-4">
            {isEn ? 'Top Performing Properties' : 'พื้นที่ยอดนิยม'}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2 font-medium">{isEn ? 'Property' : 'พื้นที่'}</th>
                  <th className="pb-2 font-medium text-right">{isEn ? 'Traffic' : 'ทราฟฟิก'}</th>
                  <th className="pb-2 font-medium text-right">{isEn ? 'Price' : 'ราคา'}</th>
                </tr>
              </thead>
              <tbody>
                {topProperties.map((p) => (
                  <tr key={p.id} className="border-b border-gray-50 last:border-0">
                    <td className="py-2.5">
                      <p className="font-medium text-gray-800 truncate max-w-[200px]">
                        {isEn ? p.title : p.titleTh}
                      </p>
                      <p className="text-xs text-gray-400">{isEn ? p.location.district : p.location.districtTh}</p>
                    </td>
                    <td className="py-2.5 text-right">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        {p.trafficScore}
                      </span>
                    </td>
                    <td className="py-2.5 text-right text-gray-600">{formatPrice(p.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
