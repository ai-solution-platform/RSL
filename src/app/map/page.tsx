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

  // Filter panel
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [budgetMax, setBudgetMax] = useState(500000);
  const [sizeMin, setSizeMin] = useState(0);
  const [selectedType, setSelectedType] = useState('all');

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
          <button
            onClick={() => setShowFilterPanel((v) => !v)}
            className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center active:bg-blue-100 transition-colors"
          >
            <SlidersHorizontal size={14} className="text-blue-600" />
          </button>
        </div>
      </div>

      {/* Filter Chips Row */}
      <div className="absolute top-[60px] left-0 right-0 z-[1000] px-3 py-1">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {filterChips.map((chip) => (
            <button
              key={chip.key}
              onClick={() => setActiveFilter(chip.key)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors shadow-sm ${
                activeFilter === chip.key
                  ? 'bg-blue-600 text-white shadow-blue-200'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {language === 'th' ? chip.th : chip.en}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filter Panel (ข้อ 1 - ปุ่ม filter ใช้งานได้) */}
      {showFilterPanel && (
        <div className="absolute top-[56px] left-0 right-0 z-[1001] px-3">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 mt-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-gray-900">
                {language === 'th' ? 'ตัวกรองขั้นสูง' : 'Advanced Filters'}
              </h3>
              <button onClick={() => setShowFilterPanel(false)}>
                <X size={16} className="text-gray-400" />
              </button>
            </div>

            {/* Budget */}
            <div className="mb-3">
              <label className="text-xs text-gray-500 mb-1 block">
                {language === 'th' ? 'งบประมาณสูงสุด' : 'Max Budget'}:
                <span className="text-blue-600 font-medium ml-1">
                  {formatPrice(budgetMax)}/{language === 'th' ? 'ด.' : 'mo'}
                </span>
              </label>
              <input
                type="range"
                min={10000}
                max={500000}
                step={5000}
                value={budgetMax}
                onChange={(e) => setBudgetMax(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                <span>฿10K</span>
                <span>฿500K</span>
              </div>
            </div>

            {/* Min Size */}
            <div className="mb-3">
              <label className="text-xs text-gray-500 mb-1 block">
                {language === 'th' ? 'ขนาดขั้นต่ำ' : 'Min Size'}:
                <span className="text-blue-600 font-medium ml-1">{sizeMin} {language === 'th' ? 'ตร.ม.' : 'sqm'}</span>
              </label>
              <input
                type="range"
                min={0}
                max={500}
                step={10}
                value={sizeMin}
                onChange={(e) => setSizeMin(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                <span>0</span>
                <span>500 sqm</span>
              </div>
            </div>

            {/* Property Type */}
            <div className="mb-3">
              <label className="text-xs text-gray-500 mb-1.5 block">
                {language === 'th' ? 'ประเภท' : 'Type'}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { key: 'all', th: 'ทั้งหมด', en: 'All' },
                  { key: 'mall', th: 'ห้าง', en: 'Mall' },
                  { key: 'street_shop', th: 'ตึกแถว', en: 'Street' },
                  { key: 'community_mall', th: 'คอมมูนิตี้', en: 'Community' },
                  { key: 'market', th: 'ตลาด', en: 'Market' },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setSelectedType(t.key)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                      selectedType === t.key
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {language === 'th' ? t.th : t.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => {
                setActiveFilter(selectedType);
                setShowFilterPanel(false);
              }}
              className="w-full py-2 bg-orange-500 text-white rounded-xl text-sm font-semibold active:bg-orange-600 transition-colors"
            >
              {language === 'th'
                ? `แสดงผลลัพธ์ (${filteredProperties.length})`
                : `Show Results (${filteredProperties.length})`}
            </button>
          </div>
        </div>
      )}

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

      {/* Bottom Sheet — collapsed ~8% of screen, expanded ~45% */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1000] bg-white rounded-t-2xl shadow-[0_-2px_12px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out"
        style={{
          height: bottomSheetExpanded ? '45%' : '8%',
          minHeight: bottomSheetExpanded ? '280px' : '48px',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag Handle */}
        <button
          onClick={() => setBottomSheetExpanded(!bottomSheetExpanded)}
          className="w-full flex flex-col items-center pt-1.5 pb-0.5 cursor-grab active:cursor-grabbing"
        >
          <div className="w-8 h-1 bg-gray-300 rounded-full" />
          <div className="w-full px-4 mt-1 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-xs">
              {language === 'th' ? 'พื้นที่ใกล้เคียง' : 'Nearby Spaces'}
              <span className="ml-1 text-[10px] font-normal text-gray-400">
                ({filteredProperties.length})
              </span>
            </h3>
            <span className="text-[10px] text-blue-600">
              {bottomSheetExpanded
                ? (language === 'th' ? 'ซ่อน ▼' : 'Hide ▼')
                : (language === 'th' ? 'ดูทั้งหมด ▲' : 'View all ▲')}
            </span>
          </div>
        </button>

        {/* Property Mini Cards — only visible when expanded */}
        {bottomSheetExpanded && (
          <div className="px-3 pb-4 overflow-y-auto" style={{ height: 'calc(100% - 44px)' }}>
            <div className="space-y-1.5">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className={`flex gap-2.5 p-2 rounded-xl border transition-colors cursor-pointer ${
                    selectedPropertyId === property.id
                      ? 'border-blue-400 bg-blue-50/50'
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                  onClick={() => setSelectedPropertyId(property.id)}
                >
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[11px] text-gray-900 truncate">
                      {language === 'th' ? property.titleTh : property.title}
                    </h4>
                    <p className="text-[10px] text-gray-500 flex items-center gap-0.5 mt-0.5">
                      <MapPin size={8} />
                      {language === 'th'
                        ? property.location.districtTh
                        : property.location.district}
                    </p>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-blue-600 font-bold text-[11px]">
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
        )}
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
