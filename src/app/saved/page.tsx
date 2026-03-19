'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { useAppStore } from '@/store';
import { formatPrice } from '@/lib/utils';
import { properties } from '@/data/properties';
import {
  Heart,
  MapPin,
  Search,
  ArrowUpDown,
  Maximize2,
  Trash2,
} from 'lucide-react';

type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'size';

export default function SavedPage() {
  const { t, language } = useTranslation();
  const { savedProperties, toggleSavedProperty } = useAppStore();
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');

  const savedItems = useMemo(() => {
    let items = properties.filter((p) => savedProperties.includes(p.id));

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.titleTh.includes(q) ||
          p.location.district.toLowerCase().includes(q) ||
          p.location.districtTh.includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price_asc':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'size':
        items.sort((a, b) => b.size - a.size);
        break;
      default:
        items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return items;
  }, [savedProperties, sortBy, searchQuery]);

  // Empty state
  if (savedProperties.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 pb-24">
        <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center mb-4">
          <Heart size={36} className="text-pink-400" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          {language === 'th' ? 'ยังไม่มีพื้นที่ที่บันทึก' : 'No saved properties yet'}
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          {language === 'th'
            ? 'กดไอคอนหัวใจเพื่อบันทึกพื้นที่ที่สนใจ'
            : 'Tap the heart icon to save properties you like'}
        </p>
        <Link
          href="/discover"
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          {language === 'th' ? 'ค้นหาพื้นที่' : 'Browse Listings'}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-3 border-b border-gray-100">
        <h1 className="text-lg font-bold text-gray-900 mb-3">
          {language === 'th' ? 'พื้นที่ที่บันทึก' : 'Saved Properties'}
          <span className="ml-2 text-sm font-normal text-gray-400">
            ({savedItems.length})
          </span>
        </h1>

        {/* Search */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'th' ? 'ค้นหา...' : 'Search...'}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">{language === 'th' ? 'ล่าสุด' : 'Newest'}</option>
            <option value="price_asc">{language === 'th' ? 'ราคา: น้อย-มาก' : 'Price: Low-High'}</option>
            <option value="price_desc">{language === 'th' ? 'ราคา: มาก-น้อย' : 'Price: High-Low'}</option>
            <option value="size">{language === 'th' ? 'ขนาด' : 'Size'}</option>
          </select>
        </div>
      </div>

      {/* Property Grid */}
      <div className="px-4 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {savedItems.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-36">
                <img
                  src={property.images[0]}
                  alt={language === 'th' ? property.titleTh : property.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleSavedProperty(property.id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
                >
                  <Heart
                    size={16}
                    className="text-red-500 fill-red-500"
                  />
                </button>
                <div className="absolute bottom-2 left-2">
                  <span className="px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-medium text-gray-700">
                    {property.propertyType === 'mall'
                      ? language === 'th' ? 'ห้าง' : 'Mall'
                      : property.propertyType === 'street_shop'
                      ? language === 'th' ? 'ตึกแถว' : 'Street Shop'
                      : property.propertyType === 'community_mall'
                      ? language === 'th' ? 'คอมมิวนิตี้มอลล์' : 'Community Mall'
                      : property.propertyType === 'standalone'
                      ? language === 'th' ? 'อาคารเดี่ยว' : 'Standalone'
                      : property.propertyType === 'market'
                      ? language === 'th' ? 'ตลาด' : 'Market'
                      : language === 'th' ? 'ป๊อปอัพ' : 'Pop-up'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="font-semibold text-sm text-gray-900 truncate">
                  {language === 'th' ? property.titleTh : property.title}
                </h3>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                  <MapPin size={10} />
                  {language === 'th'
                    ? property.location.districtTh
                    : property.location.district}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-blue-600 font-bold text-sm">
                    {formatPrice(property.price)}/{language === 'th' ? 'ด.' : 'mo'}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-0.5">
                    <Maximize2 size={10} />
                    {property.size} {language === 'th' ? 'ตร.ม.' : 'sqm'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
