'use client';

import { useState, useMemo } from 'react';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { properties as allProperties } from '@/data/properties';
import { users } from '@/data/users';
import {
  Search,
  Building2,
  Clock,
  CheckCircle,
  Star,
  XCircle,
  Eye,
  Trash2,
  Edit,
} from 'lucide-react';

type ListingStatus = 'active' | 'pending' | 'rejected' | 'featured';

interface AdminListing {
  id: string;
  title: string;
  titleTh: string;
  price: number;
  size: number;
  propertyType: string;
  images: string[];
  landlordId: string;
  status: string;
  adminStatus: ListingStatus;
  featured: boolean;
}

export default function AdminListingsPage() {
  const { language } = useTranslation();
  const isEn = language === 'en';

  const [listings, setListings] = useState<AdminListing[]>(
    allProperties.map((p, i) => ({
      id: p.id,
      title: p.title,
      titleTh: p.titleTh,
      price: p.price,
      size: p.size,
      propertyType: p.propertyType,
      images: p.images,
      landlordId: p.landlordId,
      status: p.status,
      adminStatus: (i % 5 === 3 ? 'pending' : 'active') as ListingStatus,
      featured: i < 3,
    }))
  );

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      const matchSearch =
        !search ||
        l.title.toLowerCase().includes(search.toLowerCase()) ||
        l.titleTh.includes(search);
      const matchStatus = statusFilter === 'all' || l.adminStatus === statusFilter;
      const matchType = typeFilter === 'all' || l.propertyType === typeFilter;
      return matchSearch && matchStatus && matchType;
    });
  }, [listings, search, statusFilter, typeFilter]);

  const getLandlordName = (id: string) => {
    const u = users.find((u) => u.id === id);
    return u ? (isEn ? u.name : u.nameTh) : id;
  };

  const propertyTypeLabel = (type: string) => {
    const labels: Record<string, { en: string; th: string }> = {
      mall: { en: 'Mall', th: 'ห้าง' },
      street_shop: { en: 'Street Shop', th: 'ตึกแถว' },
      community_mall: { en: 'Community Mall', th: 'คอมมูนิตี้มอลล์' },
      standalone: { en: 'Standalone', th: 'อาคารเดี่ยว' },
      market: { en: 'Market', th: 'ตลาด' },
      pop_up: { en: 'Pop-up', th: 'ป๊อปอัพ' },
    };
    return isEn ? labels[type]?.en || type : labels[type]?.th || type;
  };

  const approve = (id: string) => {
    setListings((prev) => prev.map((l) => (l.id === id ? { ...l, adminStatus: 'active' } : l)));
    alert(isEn ? 'Listing approved!' : 'อนุมัติประกาศแล้ว!');
  };

  const reject = (id: string) => {
    setListings((prev) => prev.map((l) => (l.id === id ? { ...l, adminStatus: 'rejected' } : l)));
    alert(isEn ? 'Listing rejected!' : 'ปฏิเสธประกาศแล้ว!');
  };

  const toggleFeatured = (id: string) => {
    setListings((prev) => prev.map((l) => (l.id === id ? { ...l, featured: !l.featured } : l)));
  };

  const deleteListing = (id: string) => {
    if (confirm(isEn ? 'Delete this listing?' : 'ลบประกาศนี้?')) {
      setListings((prev) => prev.filter((l) => l.id !== id));
      alert(isEn ? 'Listing deleted!' : 'ลบประกาศแล้ว!');
    }
  };

  // Stats
  const total = listings.length;
  const active = listings.filter((l) => l.adminStatus === 'active').length;
  const pending = listings.filter((l) => l.adminStatus === 'pending').length;
  const featuredCount = listings.filter((l) => l.featured).length;

  const statItems = [
    { labelEn: 'Total', labelTh: 'ทั้งหมด', value: total, icon: Building2, color: 'text-gray-600 bg-gray-100' },
    { labelEn: 'Active', labelTh: 'ใช้งาน', value: active, icon: CheckCircle, color: 'text-green-600 bg-green-100' },
    { labelEn: 'Pending Review', labelTh: 'รอตรวจสอบ', value: pending, icon: Clock, color: 'text-orange-600 bg-orange-100' },
    { labelEn: 'Featured', labelTh: 'แนะนำ', value: featuredCount, icon: Star, color: 'text-yellow-600 bg-yellow-100' },
  ];

  const statusOptions = [
    { value: 'all', en: 'All', th: 'ทั้งหมด' },
    { value: 'active', en: 'Active', th: 'ใช้งาน' },
    { value: 'pending', en: 'Pending', th: 'รอตรวจสอบ' },
    { value: 'rejected', en: 'Rejected', th: 'ปฏิเสธ' },
  ];

  const typeOptions = [
    { value: 'all', en: 'All Types', th: 'ทุกประเภท' },
    { value: 'mall', en: 'Mall', th: 'ห้าง' },
    { value: 'street_shop', en: 'Street Shop', th: 'ตึกแถว' },
    { value: 'community_mall', en: 'Community Mall', th: 'คอมมูนิตี้มอลล์' },
    { value: 'standalone', en: 'Standalone', th: 'อาคารเดี่ยว' },
    { value: 'market', en: 'Market', th: 'ตลาด' },
    { value: 'pop_up', en: 'Pop-up', th: 'ป๊อปอัพ' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEn ? 'Listing Management' : 'จัดการประกาศ'}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {isEn ? 'Review and manage property listings' : 'ตรวจสอบและจัดการประกาศพื้นที่'}
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statItems.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.labelEn} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${s.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-gray-500">{isEn ? s.labelEn : s.labelTh}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={isEn ? 'Search by property name...' : 'ค้นหาตามชื่อพื้นที่...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statusOptions.map((o) => (
            <option key={o.value} value={o.value}>{isEn ? o.en : o.th}</option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {typeOptions.map((o) => (
            <option key={o.value} value={o.value}>{isEn ? o.en : o.th}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">{isEn ? 'Property' : 'พื้นที่'}</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">{isEn ? 'Owner' : 'เจ้าของ'}</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">{isEn ? 'Price' : 'ราคา'}</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">{isEn ? 'Size' : 'ขนาด'}</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">{isEn ? 'Status' : 'สถานะ'}</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">{isEn ? 'Actions' : 'การดำเนินการ'}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    {isEn ? 'No listings found' : 'ไม่พบประกาศ'}
                  </td>
                </tr>
              ) : (
                filtered.map((l) => (
                  <tr key={l.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={l.images[0]}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover bg-gray-200 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 truncate max-w-[220px]">
                            {isEn ? l.title : l.titleTh}
                          </p>
                          <p className="text-xs text-gray-400">{propertyTypeLabel(l.propertyType)}</p>
                        </div>
                        {l.featured && (
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{getLandlordName(l.landlordId)}</td>
                    <td className="px-4 py-3 text-right text-gray-700 font-medium">{formatPrice(l.price)}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{l.size} {isEn ? 'sqm' : 'ตร.ม.'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          l.adminStatus === 'active'
                            ? 'bg-green-100 text-green-700'
                            : l.adminStatus === 'pending'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {l.adminStatus === 'active'
                          ? isEn ? 'Active' : 'ใช้งาน'
                          : l.adminStatus === 'pending'
                          ? isEn ? 'Pending' : 'รอตรวจสอบ'
                          : isEn ? 'Rejected' : 'ปฏิเสธ'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {l.adminStatus === 'pending' && (
                          <>
                            <button
                              onClick={() => approve(l.id)}
                              className="p-1.5 rounded-lg hover:bg-green-50 text-green-600"
                              title={isEn ? 'Approve' : 'อนุมัติ'}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => reject(l.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                              title={isEn ? 'Reject' : 'ปฏิเสธ'}
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => toggleFeatured(l.id)}
                          className={`p-1.5 rounded-lg hover:bg-yellow-50 ${l.featured ? 'text-yellow-500' : 'text-gray-400'}`}
                          title={isEn ? 'Toggle Featured' : 'สลับแนะนำ'}
                        >
                          <Star className={`w-4 h-4 ${l.featured ? 'fill-yellow-500' : ''}`} />
                        </button>
                        <button
                          onClick={() => alert(isEn ? 'Edit feature coming soon!' : 'ฟีเจอร์แก้ไขเร็วๆ นี้!')}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
                          title={isEn ? 'Edit' : 'แก้ไข'}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteListing(l.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                          title={isEn ? 'Delete' : 'ลบ'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
