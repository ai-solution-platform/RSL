'use client';

import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { properties } from '@/data/properties';
import MapPlaceholder from '@/components/map/MapPlaceholder';
import {
  Search,
  MapPin,
  ChevronUp,
  ChevronDown,
  X,
  SlidersHorizontal,
} from 'lucide-react';

const filterChips = [
  { key: 'all', en: 'All', th: 'ทั้งหมด' },
  { key: 'mall', en: 'Mall', th: 'ห้าง' },
  { key: 'street_shop', en: 'Street Shop', th: 'ตึกแถว' },
  { key: 'community_mall', en: 'Community Mall', th: 'คอมมูนิตี้มอลล์' },
  { key: 'under50k', en: 'Under ฿50K', th: 'ต่ำกว่า ฿50K' },
  { key: 'under100k', en: 'Under ฿100K', th: 'ต่ำกว่า ฿100K' },
];

const nearbyProperties = properties
  .filter((p) => p.status === 'available')
  .slice(0, 3);

export default function MapPage() {
  const { t, language } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [bottomSheetOpen, setBottomSheetOpen] = useState(true);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  return (
    <div className="h-screen w-full relative overflow-hidden bg-gray-100">
      {/* Full-screen Map */}
      <MapPlaceholder
        className="absolute inset-0"
        onPinClick={(id) => setSelectedPropertyId(id)}
      />

      {/* Search Bar Overlay */}
      <div className="absolute top-0 left-0 right-0 z-30 pt-3 px-3">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center gap-2 px-3 py-2.5">
          <Search size={18} className="text-gray-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'th' ? 'ค้นหาพื้นที่ ย่าน หรือถนน...' : 'Search spaces, areas, or streets...'}
            className="flex-1 text-sm outline-none placeholder:text-gray-400"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')}>
              <X size={16} className="text-gray-400" />
            </button>
          )}
          <button className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <SlidersHorizontal size={14} className="text-blue-600" />
          </button>
        </div>
      </div>

      {/* Filter Chips Row */}
      <div className="absolute top-16 left-0 right-0 z-30 px-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {filterChips.map((chip) => (
            <button
              key={chip.key}
              onClick={() => setActiveFilter(chip.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors shadow-sm ${
                activeFilter === chip.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {language === 'th' ? chip.th : chip.en}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Sheet */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-30 bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-transform duration-300 ${
          bottomSheetOpen ? 'translate-y-0' : 'translate-y-[calc(100%-48px)]'
        }`}
        style={{ maxHeight: '45%' }}
      >
        {/* Drag Handle */}
        <button
          onClick={() => setBottomSheetOpen(!bottomSheetOpen)}
          className="w-full flex items-center justify-center pt-2 pb-1"
        >
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </button>

        <div className="px-4 pb-2 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 text-sm">
            {language === 'th' ? 'พื้นที่ใกล้เคียง' : 'Nearby Spaces'}
          </h3>
          <button onClick={() => setBottomSheetOpen(!bottomSheetOpen)}>
            {bottomSheetOpen ? (
              <ChevronDown size={18} className="text-gray-400" />
            ) : (
              <ChevronUp size={18} className="text-gray-400" />
            )}
          </button>
        </div>

        {/* Property Mini Cards */}
        <div className="px-4 pb-20 overflow-y-auto" style={{ maxHeight: 'calc(45vh - 60px)' }}>
          <div className="space-y-2">
            {nearbyProperties.map((property) => (
              <div
                key={property.id}
                className={`flex gap-3 p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  selectedPropertyId === property.id
                    ? 'border-blue-400 bg-blue-50/50'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
                onClick={() => setSelectedPropertyId(property.id)}
              >
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-xs text-gray-900 truncate">
                    {language === 'th' ? property.titleTh : property.title}
                  </h4>
                  <p className="text-[10px] text-gray-500 flex items-center gap-0.5 mt-0.5">
                    <MapPin size={8} />
                    {language === 'th'
                      ? property.location.districtTh
                      : property.location.district}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-blue-600 font-bold text-xs">
                      {formatPrice(property.price)}/{language === 'th' ? 'ด.' : 'mo'}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {property.size} {language === 'th' ? 'ตร.ม.' : 'sqm'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
