'use client';

import { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, SearchX } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import SearchBar from '@/components/filters/SearchBar';
import FilterPanel from '@/components/filters/FilterPanel';
import PropertyCard from '@/components/property/PropertyCard';
import type { Property } from '@/types';

// ---------------------------------------------------------------------------
// Mock data: used until the shared data layer is ready
// ---------------------------------------------------------------------------
let importedProperties: Property[] | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  importedProperties = require('@/data/properties').properties ?? require('@/data/properties').default;
} catch {
  // data file not yet created by another agent - use built-in mock
}

const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-001',
    landlordId: 'landlord-001',
    title: 'Premium Retail Space at Siam Square',
    titleTh: 'พื้นที่ค้าปลีกพรีเมียม สยามสแควร์',
    description: 'Prime retail space in the heart of Siam Square, perfect for fashion and lifestyle brands.',
    descriptionTh: 'พื้นที่ค้าปลีกพรีเมียมใจกลางสยามสแควร์ เหมาะสำหรับแบรนด์แฟชั่นและไลฟ์สไตล์',
    price: 120000,
    size: 85,
    floor: 1,
    propertyType: 'mall',
    location: { lat: 13.7456, lng: 100.5343, address: '392 Rama 1 Rd', addressTh: '392 ถ.พระราม 1', district: 'Pathum Wan', districtTh: 'ปทุมวัน', province: 'Bangkok', provinceTh: 'กรุงเทพ' },
    amenities: ['Air Conditioning', 'Elevator', 'Parking', 'Security'],
    images: [],
    zoning: { type: 'commercial', color: '#ef4444', allowAlcohol: false, allowTobacco: false, operatingHours: { open: '10:00', close: '22:00' }, restrictions: ['No loud music after 21:00'] },
    trafficScore: 92,
    competitorCount: 45,
    status: 'available',
    createdAt: '2025-12-01T00:00:00Z',
    updatedAt: '2026-01-15T00:00:00Z',
  },
  {
    id: 'prop-002',
    landlordId: 'landlord-002',
    title: 'Cozy Street Shop in Thonglor',
    titleTh: 'ร้านค้าริมถนนบรรยากาศดี ทองหล่อ',
    description: 'Charming street-level shop on Thonglor Soi 13, ideal for cafes or boutiques.',
    descriptionTh: 'ร้านค้าริมถนนทองหล่อ ซอย 13 เหมาะสำหรับคาเฟ่หรือบูติก',
    price: 45000,
    size: 48,
    floor: 'G',
    propertyType: 'street_shop',
    location: { lat: 13.7340, lng: 100.5790, address: 'Thonglor Soi 13', addressTh: 'ทองหล่อ ซอย 13', district: 'Watthana', districtTh: 'วัฒนา', province: 'Bangkok', provinceTh: 'กรุงเทพ' },
    amenities: ['Kitchen Ready', 'Street Frontage', 'Water Supply'],
    images: [],
    zoning: { type: 'mixed_use', color: '#f59e0b', allowAlcohol: true, allowTobacco: false, operatingHours: { open: '06:00', close: '23:00' }, restrictions: [] },
    trafficScore: 78,
    competitorCount: 22,
    status: 'available',
    createdAt: '2026-01-10T00:00:00Z',
    updatedAt: '2026-02-20T00:00:00Z',
  },
  {
    id: 'prop-003',
    landlordId: 'landlord-001',
    title: 'Community Mall Unit at The Commons',
    titleTh: 'ยูนิตคอมมิวนิตี้มอลล์ The Commons',
    description: 'Modern community mall unit with high foot traffic, great for F&B concepts.',
    descriptionTh: 'ยูนิตคอมมิวนิตี้มอลล์ทันสมัย มีคนสัญจรสูง เหมาะสำหรับธุรกิจอาหารและเครื่องดื่ม',
    price: 75000,
    size: 65,
    floor: 2,
    propertyType: 'community_mall',
    location: { lat: 13.7280, lng: 100.5850, address: 'Thonglor Soi 17', addressTh: 'ทองหล่อ ซอย 17', district: 'Watthana', districtTh: 'วัฒนา', province: 'Bangkok', provinceTh: 'กรุงเทพ' },
    amenities: ['Kitchen Ready', 'Grease Trap', 'Parking', 'Loading Dock'],
    images: [],
    zoning: { type: 'commercial', color: '#ef4444', allowAlcohol: true, allowTobacco: false, operatingHours: { open: '08:00', close: '00:00' }, restrictions: [] },
    trafficScore: 85,
    competitorCount: 18,
    status: 'available',
    createdAt: '2026-02-01T00:00:00Z',
    updatedAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'prop-004',
    landlordId: 'landlord-003',
    title: 'Budget Market Stall at Chatuchak',
    titleTh: 'แผงตลาดราคาประหยัด จตุจักร',
    description: 'Affordable market stall in the famous Chatuchak Weekend Market area.',
    descriptionTh: 'แผงตลาดราคาเข้าถึงง่ายในบริเวณตลาดนัดจตุจักร',
    price: 15000,
    size: 12,
    floor: 'G',
    propertyType: 'market',
    location: { lat: 13.7999, lng: 100.5504, address: 'Kamphaeng Phet 2 Rd', addressTh: 'ถ.กำแพงเพชร 2', district: 'Chatuchak', districtTh: 'จตุจักร', province: 'Bangkok', provinceTh: 'กรุงเทพ' },
    amenities: ['Electricity', 'Shared Restroom'],
    images: [],
    zoning: { type: 'commercial', color: '#ef4444', allowAlcohol: false, allowTobacco: false, operatingHours: { open: '06:00', close: '18:00' }, restrictions: ['Weekend operation only'] },
    trafficScore: 70,
    competitorCount: 200,
    status: 'available',
    createdAt: '2026-01-20T00:00:00Z',
    updatedAt: '2026-02-28T00:00:00Z',
  },
  {
    id: 'prop-005',
    landlordId: 'landlord-002',
    title: 'Pop-up Space at Ari BTS',
    titleTh: 'พื้นที่ป๊อปอัพ BTS อารีย์',
    description: 'Short-term pop-up space right next to Ari BTS station, high visibility.',
    descriptionTh: 'พื้นที่ป๊อปอัพระยะสั้นติด BTS อารีย์ มองเห็นง่าย',
    price: 25000,
    size: 20,
    floor: 'G',
    propertyType: 'pop_up',
    location: { lat: 13.7792, lng: 100.5449, address: 'Phahonyothin Rd', addressTh: 'ถ.พหลโยธิน', district: 'Phaya Thai', districtTh: 'พญาไท', province: 'Bangkok', provinceTh: 'กรุงเทพ' },
    amenities: ['Electricity', '3-Phase Power'],
    images: [],
    zoning: { type: 'mixed_use', color: '#f59e0b', allowAlcohol: false, allowTobacco: false, operatingHours: { open: '08:00', close: '20:00' }, restrictions: [] },
    trafficScore: 65,
    competitorCount: 10,
    status: 'available',
    createdAt: '2026-03-01T00:00:00Z',
    updatedAt: '2026-03-10T00:00:00Z',
  },
  {
    id: 'prop-006',
    landlordId: 'landlord-004',
    title: 'Large Retail Floor at Silom Complex',
    titleTh: 'พื้นที่ค้าปลีกขนาดใหญ่ สีลมคอมเพล็กซ์',
    description: 'Spacious retail floor in Silom Complex, suitable for anchor tenants.',
    descriptionTh: 'พื้นที่ค้าปลีกกว้างขวางในสีลมคอมเพล็กซ์ เหมาะสำหรับผู้เช่ารายใหญ่',
    price: 350000,
    size: 300,
    floor: 3,
    propertyType: 'mall',
    location: { lat: 13.7279, lng: 100.5354, address: '191 Silom Rd', addressTh: '191 ถ.สีลม', district: 'Bang Rak', districtTh: 'บางรัก', province: 'Bangkok', provinceTh: 'กรุงเทพ' },
    amenities: ['Air Conditioning', 'Elevator', 'Parking', 'Security', 'Loading Dock', '3-Phase Power'],
    images: [],
    zoning: { type: 'commercial', color: '#ef4444', allowAlcohol: true, allowTobacco: true, operatingHours: { open: '10:00', close: '22:00' }, restrictions: [] },
    trafficScore: 88,
    competitorCount: 60,
    status: 'reserved',
    createdAt: '2025-11-15T00:00:00Z',
    updatedAt: '2026-03-05T00:00:00Z',
  },
];

const ALL_PROPERTIES: Property[] = importedProperties ?? MOCK_PROPERTIES;

type SortKey = 'price_asc' | 'price_desc' | 'match' | 'newest';

export default function DiscoverPage() {
  const { t, language } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('match');
  const [filters, setFilters] = useState({
    budgetMin: 10000,
    budgetMax: 500000,
    sizeMin: 10,
    sizeMax: 500,
    businessType: '',
    propertyTypes: [] as string[],
    specialNeeds: [] as string[],
  });

  const filtered = useMemo(() => {
    let result = ALL_PROPERTIES.filter((p) => {
      // Budget
      if (p.price < filters.budgetMin || p.price > filters.budgetMax) return false;
      // Size
      if (p.size < filters.sizeMin || p.size > filters.sizeMax) return false;
      // Property type
      if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(p.propertyType)) return false;
      // Location search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchLocation =
          p.location.district.toLowerCase().includes(q) ||
          p.location.districtTh.includes(searchQuery) ||
          p.location.address.toLowerCase().includes(q) ||
          p.location.addressTh.includes(searchQuery) ||
          p.title.toLowerCase().includes(q) ||
          p.titleTh.includes(searchQuery);
        if (!matchLocation) return false;
      }
      // Special needs
      if (filters.specialNeeds.includes('alcohol') && !p.zoning.allowAlcohol) return false;
      if (filters.specialNeeds.includes('kitchen') && !p.amenities.some((a) => a.toLowerCase().includes('kitchen'))) return false;
      if (filters.specialNeeds.includes('parking') && !p.amenities.some((a) => a.toLowerCase().includes('parking'))) return false;
      if (filters.specialNeeds.includes('three_phase') && !p.amenities.some((a) => a.toLowerCase().includes('3-phase'))) return false;
      return true;
    });

    // Sort
    switch (sortBy) {
      case 'price_asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'match':
        result = [...result].sort((a, b) => b.trafficScore - a.trafficScore);
        break;
      case 'newest':
        result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return result;
  }, [searchQuery, sortBy, filters]);

  const sortOptions: { key: SortKey; labelEn: string; labelTh: string }[] = [
    { key: 'match', labelEn: 'Best Match', labelTh: 'ตรงที่สุด' },
    { key: 'price_asc', labelEn: 'Price: Low to High', labelTh: 'ราคา: ต่ำ-สูง' },
    { key: 'price_desc', labelEn: 'Price: High to Low', labelTh: 'ราคา: สูง-ต่ำ' },
    { key: 'newest', labelEn: 'Newest First', labelTh: 'ใหม่ที่สุด' },
  ];

  return (
    <div className="min-h-screen bg-gray-50/60">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <h1 className="mb-5 text-2xl font-bold text-gray-900">{t('discover.title')}</h1>

        {/* Search + Filter */}
        <div className="mb-4 space-y-3">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterPanel onApply={setFilters} />
        </div>

        {/* Results bar */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            {filtered.length}{' '}
            {language === 'th' ? 'รายการ' : filtered.length === 1 ? 'result' : 'results'}
          </p>

          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="h-3.5 w-3.5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-700 focus:border-blue-500 focus:outline-none"
            >
              {sortOptions.map((o) => (
                <option key={o.key} value={o.key}>
                  {language === 'th' ? o.labelTh : o.labelEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <SearchX className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mb-1 text-lg font-semibold text-gray-700">
              {t('common.noResults')}
            </h3>
            <p className="max-w-sm text-sm text-gray-400">
              {language === 'th'
                ? 'ลองปรับตัวกรองหรือค้นหาด้วยคำอื่น'
                : 'Try adjusting your filters or search with different keywords'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
