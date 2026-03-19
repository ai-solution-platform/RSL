'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { properties } from '@/data/properties';
import {
  Search,
  MapPin,
  X,
  SlidersHorizontal,
  Layers,
  Building2,
  Wine,
} from 'lucide-react';

const InteractiveMap = dynamic(() => import('@/components/map/InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <span className="text-gray-400 text-sm">Loading map...</span>
    </div>
  ),
});

const filterChips = [
  { key: 'all', en: 'All', th: 'ทั้งหมด' },
  { key: 'mall', en: 'Mall', th: 'ห้าง' },
  { key: 'street_shop', en: 'Street Shop', th: 'ตึกแถว' },
  { key: 'community_mall', en: 'Community Mall', th: 'คอมมูนิตี้มอลล์' },
  { key: 'under50k', en: 'Under ฿50K', th: 'ต่ำกว่า ฿50K' },
  { key: 'under100k', en: 'Under ฿100K', th: 'ต่ำกว่า ฿100K' },
];

export default function MapPage() {
  const { language } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  // Layer toggles
  const [showSpaces, setShowSpaces] = useState(true);
  const [showZoning, setShowZoning] = useState(false);
  const [showAlcohol, setShowAlcohol] = useState(false);
  const [showLayerPanel, setShowLayerPanel] = useState(false);

  // Bottom sheet state
  const [bottomSheetExpanded, setBottomSheetExpanded] = useState(false);
  const touchStartY = useRef<number>(0);
  const touchDelta = useRef<number>(0);

  // Filter properties
  const filteredProperties = useMemo(() => {
    let result = properties.filter((p) => p.status === 'available');

    // Search filter by district name, title, address
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.location.district.toLowerCase().includes(q) ||
          p.location.districtTh.includes(searchQuery) ||
          p.title.toLowerCase().includes(q) ||
          p.titleTh.includes(searchQuery) ||
          p.location.address.toLowerCase().includes(q) ||
          p.location.addressTh.includes(searchQuery)
      );
    }

    // Type / price filter
    switch (activeFilter) {
      case 'mall':
        result = result.filter((p) => p.propertyType === 'mall');
        break;
      case 'street_shop':
        result = result.filter((p) => p.propertyType === 'street_shop');
        break;
      case 'community_mall':
        result = result.filter((p) => p.propertyType === 'community_mall');
        break;
      case 'under50k':
        result = result.filter((p) => p.price < 50000);
        break;
      case 'under100k':
        result = result.filter((p) => p.price < 100000);
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, activeFilter]);

  // Bottom sheet touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchDelta.current = 0;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchDelta.current = e.touches[0].clientY - touchStartY.current;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchDelta.current < -40) {
      setBottomSheetExpanded(true);
    } else if (touchDelta.current > 40) {
      setBottomSheetExpanded(false);
    }
    touchDelta.current = 0;
  }, []);

  const layers = [
    {
      key: 'spaces',
      en: 'Available Spaces',
      th: 'พื้นที่ว่าง',
      icon: Building2,
      active: showSpaces,
      toggle: () => setShowSpaces((v) => !v),
    },
    {
      key: 'zoning',
      en: 'Zoning',
      th: 'โซนนิ่ง',
      icon: Layers,
      active: showZoning,
      toggle: () => setShowZoning((v) => !v),
    },
    {
      key: 'alcohol',
      en: 'Alcohol Zones',
      th: 'โซนแอลกอฮอล์',
      icon: Wine,
      active: showAlcohol,
      toggle: () => setShowAlcohol((v) => !v),
    },
  ];

  return (
    <div className="w-full relative overflow-hidden bg-gray-100" style={{ height: 'calc(100vh - 56px - 64px)' }}>
      {/* Full-screen Map */}
      <div className="absolute inset-0">
        <InteractiveMap
          properties={filteredProperties}
          selectedPropertyId={selectedPropertyId}
          onSelectProperty={setSelectedPropertyId}
          showSpaces={showSpaces}
          showZoning={showZoning}
          showAlcohol={showAlcohol}
        />
      </div>

      {/* Search Bar Overlay */}
      <div className="absolute top-0 left-0 right-0 z-[1000] pt-3 px-3">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center gap-2 px-3 py-2.5">
          <Search size={18} className="text-gray-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'th'
                ? 'ค้นหาพื้นที่ ย่าน หรือถนน...'
                : 'Search spaces, areas, or streets...'
            }
            className="flex-1 text-sm outline-none placeholder:text-gray-400 bg-transparent"
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
      <div className="absolute top-16 left-0 right-0 z-[1000] px-3">
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

      {/* Layer Toggle Panel (top-right) */}
      <div className="absolute right-3 top-28 z-[1000]">
        <button
          onClick={() => setShowLayerPanel(!showLayerPanel)}
          className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center border border-gray-100 hover:bg-gray-50"
        >
          <Layers size={18} className="text-gray-700" />
        </button>
        {showLayerPanel && (
          <div className="mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden min-w-[160px]">
            {layers.map((layer) => {
              const Icon = layer.icon;
              return (
                <button
                  key={layer.key}
                  onClick={layer.toggle}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 text-xs transition-colors ${
                    layer.active
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={14} />
                  <span className="flex-1 text-left">
                    {language === 'th' ? layer.th : layer.en}
                  </span>
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      layer.active
                        ? 'bg-blue-600 border-blue-600'
                        : 'border-gray-300'
                    }`}
                  >
                    {layer.active && (
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path
                          d="M1 3L3 5L7 1"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Sheet */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1000] bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out"
        style={{
          maxHeight: bottomSheetExpanded ? '40%' : '120px',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag Handle */}
        <button
          onClick={() => setBottomSheetExpanded(!bottomSheetExpanded)}
          className="w-full flex items-center justify-center pt-2 pb-1 cursor-grab active:cursor-grabbing"
        >
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </button>

        <div className="px-4 pb-2 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 text-sm">
            {language === 'th' ? 'พื้นที่ใกล้เคียง' : 'Nearby Spaces'}
            <span className="ml-1.5 text-xs font-normal text-gray-400">
              ({filteredProperties.length})
            </span>
          </h3>
        </div>

        {/* Property Mini Cards - scrollable when expanded */}
        <div
          className="px-4 pb-20 overflow-y-auto transition-all duration-300"
          style={{
            maxHeight: bottomSheetExpanded ? 'calc(40vh - 70px)' : '0px',
            opacity: bottomSheetExpanded ? 1 : 0,
          }}
        >
          <div className="space-y-2">
            {filteredProperties.map((property) => (
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
