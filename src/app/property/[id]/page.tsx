'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Handshake,
  MapPin,
  Layers,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Building2,
  Zap,
  Droplets,
  FileText,
  Shield,
  Wine,
  Cigarette,
  Info,
  Sparkles,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { useAppStore } from '@/store';
import { formatPrice } from '@/lib/utils';
import PropertyGallery from '@/components/property/PropertyGallery';
import MatchScoreBadge from '@/components/property/MatchScoreBadge';
import TrafficChart from '@/components/intelligence/TrafficChart';
import CompetitorMap from '@/components/intelligence/CompetitorMap';
import type { Property } from '@/types';

// ---------------------------------------------------------------------------
// Mock data (same set as Discover page, for standalone rendering)
// ---------------------------------------------------------------------------
let importedProperties: Property[] | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  importedProperties = require('@/data/properties').properties ?? require('@/data/properties').default;
} catch {
  // data not yet created by another agent
}

const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-001',
    landlordId: 'landlord-001',
    title: 'Premium Retail Space at Siam Square',
    titleTh: 'พื้นที่ค้าปลีกพรีเมียม สยามสแควร์',
    description: 'Prime retail space in the heart of Siam Square, perfect for fashion and lifestyle brands. Features floor-to-ceiling windows, modern interior finishes, and proximity to BTS Siam station. The unit comes with basic electrical and plumbing infrastructure already in place.',
    descriptionTh: 'พื้นที่ค้าปลีกพรีเมียมใจกลางสยามสแควร์ เหมาะสำหรับแบรนด์แฟชั่นและไลฟ์สไตล์ มีหน้าต่างกระจกเต็มบาน ตกแต่งภายในทันสมัย ใกล้ BTS สยาม ระบบไฟฟ้าและประปาพร้อมใช้งาน',
    price: 120000,
    size: 85,
    floor: 1,
    propertyType: 'mall',
    location: { lat: 13.7456, lng: 100.5343, address: '392 Rama 1 Rd', addressTh: '392 ถ.พระราม 1', district: 'Pathum Wan', districtTh: 'ปทุมวัน', province: 'Bangkok', provinceTh: 'กรุงเทพ' },
    amenities: ['Air Conditioning', 'Elevator', 'Parking', 'Security', 'Loading Dock', 'CCTV'],
    images: [],
    zoning: { type: 'commercial', color: '#ef4444', allowAlcohol: false, allowTobacco: false, operatingHours: { open: '10:00', close: '22:00' }, restrictions: ['No loud music after 21:00', 'No food preparation requiring open flames'] },
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
    description: 'Charming street-level shop on Thonglor Soi 13, ideal for cafes or boutiques. Kitchen-ready with grease trap and exhaust system pre-installed.',
    descriptionTh: 'ร้านค้าริมถนนทองหล่อ ซอย 13 เหมาะสำหรับคาเฟ่หรือบูติก ครัวพร้อมใช้งาน มีบ่อดักไขมันและระบบระบายอากาศ',
    price: 45000,
    size: 48,
    floor: 'G',
    propertyType: 'street_shop',
    location: { lat: 13.7340, lng: 100.5790, address: 'Thonglor Soi 13', addressTh: 'ทองหล่อ ซอย 13', district: 'Watthana', districtTh: 'วัฒนา', province: 'Bangkok', provinceTh: 'กรุงเทพ' },
    amenities: ['Kitchen Ready', 'Street Frontage', 'Water Supply', 'Grease Trap'],
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
];

const ALL_PROPERTIES: Property[] = importedProperties ?? MOCK_PROPERTIES;

// ---------------------------------------------------------------------------
// Static helper data
// ---------------------------------------------------------------------------
const PROPERTY_TYPE_LABELS: Record<string, { en: string; th: string }> = {
  mall: { en: 'Mall', th: 'ห้าง' },
  street_shop: { en: 'Street Shop', th: 'ตึกแถว' },
  community_mall: { en: 'Community Mall', th: 'คอมมิวนิตี้มอลล์' },
  standalone: { en: 'Standalone', th: 'อาคารเดี่ยว' },
  market: { en: 'Market', th: 'ตลาด' },
  pop_up: { en: 'Pop-up', th: 'ป๊อปอัพ' },
};

const ZONING_LABELS: Record<string, { en: string; th: string }> = {
  commercial: { en: 'Commercial', th: 'พาณิชยกรรม' },
  mixed_use: { en: 'Mixed Use', th: 'ผสมผสาน' },
  residential_commercial: { en: 'Residential-Commercial', th: 'ที่อยู่อาศัย-พาณิชยกรรม' },
  industrial: { en: 'Industrial', th: 'อุตสาหกรรม' },
  special_economic: { en: 'Special Economic Zone', th: 'เขตเศรษฐกิจพิเศษ' },
};

const STATUS_CONFIG: Record<string, { en: string; th: string; color: string }> = {
  available: { en: 'Available', th: 'ว่าง', color: 'bg-green-100 text-green-700' },
  reserved: { en: 'Reserved', th: 'จอง', color: 'bg-yellow-100 text-yellow-700' },
  leased: { en: 'Leased', th: 'ปล่อยเช่าแล้ว', color: 'bg-red-100 text-red-700' },
  maintenance: { en: 'Maintenance', th: 'ปรับปรุง', color: 'bg-gray-100 text-gray-600' },
  coming_soon: { en: 'Coming Soon', th: 'เร็วๆ นี้', color: 'bg-blue-100 text-blue-700' },
};

type TabKey = 'overview' | 'insights' | 'legal' | 'permits';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { t, language } = useTranslation();
  const savedProperties = useAppStore((s) => s.savedProperties);
  const toggleSaved = useAppStore((s) => s.toggleSavedProperty);

  const propertyId = params?.id as string;
  const property = useMemo(
    () => ALL_PROPERTIES.find((p) => p.id === propertyId),
    [propertyId]
  );

  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const isSaved = savedProperties.includes(propertyId);

  if (!property) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-700">
            {language === 'th' ? 'ไม่พบพื้นที่' : 'Property not found'}
          </h2>
          <button
            onClick={() => router.push('/discover')}
            className="mt-3 text-sm text-blue-600 hover:underline"
          >
            {language === 'th' ? 'กลับไปค้นหา' : 'Back to Discover'}
          </button>
        </div>
      </div>
    );
  }

  const status = STATUS_CONFIG[property.status] ?? STATUS_CONFIG.available;
  const typeLabel = PROPERTY_TYPE_LABELS[property.propertyType];
  const zoningLabel = ZONING_LABELS[property.zoning.type];
  const matchScore = Math.min(100, Math.max(0, property.trafficScore));

  // --- Permits checklist (auto-generated) ---
  const permits = useMemo(() => {
    const list = [
      {
        nameEn: 'Business Registration',
        nameTh: 'จดทะเบียนธุรกิจ',
        required: true,
        agencyEn: 'Department of Business Development',
        agencyTh: 'กรมพัฒนาธุรกิจการค้า',
        time: '3-5 days',
        cost: 500,
      },
      {
        nameEn: 'Food License (Sor Bor 5)',
        nameTh: 'ใบอนุญาต สบ.5',
        required: property.amenities.some((a) => a.toLowerCase().includes('kitchen')),
        agencyEn: 'District Office',
        agencyTh: 'สำนักงานเขต',
        time: '7-14 days',
        cost: 2000,
      },
      {
        nameEn: 'Alcohol License',
        nameTh: 'ใบอนุญาตจำหน่ายสุรา',
        required: property.zoning.allowAlcohol,
        agencyEn: 'Excise Department',
        agencyTh: 'กรมสรรพสามิต',
        time: '14-30 days',
        cost: 10000,
      },
      {
        nameEn: 'Sign Permit',
        nameTh: 'ใบอนุญาตติดตั้งป้าย',
        required: true,
        agencyEn: 'District Office',
        agencyTh: 'สำนักงานเขต',
        time: '5-10 days',
        cost: 1000,
      },
      {
        nameEn: 'Electricity Connection',
        nameTh: 'ขอติดตั้งไฟฟ้า',
        required: true,
        agencyEn: 'Metropolitan Electricity Authority',
        agencyTh: 'การไฟฟ้านครหลวง',
        time: '3-7 days',
        cost: 3500,
      },
      {
        nameEn: 'Water Connection',
        nameTh: 'ขอติดตั้งประปา',
        required: true,
        agencyEn: 'Metropolitan Waterworks Authority',
        agencyTh: 'การประปานครหลวง',
        time: '3-7 days',
        cost: 2500,
      },
      {
        nameEn: 'Fire Safety Certificate',
        nameTh: 'ใบรับรองความปลอดภัยอัคคีภัย',
        required: property.size >= 50,
        agencyEn: 'Fire Department',
        agencyTh: 'สำนักป้องกันและบรรเทาสาธารณภัย',
        time: '7-14 days',
        cost: 5000,
      },
    ];
    return list;
  }, [property]);

  // --- Nearby agencies ---
  const agencies = [
    {
      nameEn: `${property.location.district} District Office`,
      nameTh: `สำนักงานเขต${property.location.districtTh}`,
      icon: Building2,
    },
    {
      nameEn: 'Metropolitan Electricity Authority',
      nameTh: 'การไฟฟ้านครหลวง',
      icon: Zap,
    },
    {
      nameEn: 'Metropolitan Waterworks Authority',
      nameTh: 'การประปานครหลวง',
      icon: Droplets,
    },
  ];

  // --- Tabs ---
  const tabs: { key: TabKey; labelEn: string; labelTh: string }[] = [
    { key: 'overview', labelEn: 'Overview', labelTh: 'ภาพรวม' },
    { key: 'insights', labelEn: 'Insights', labelTh: 'ข้อมูลเชิงลึก' },
    { key: 'legal', labelEn: 'Legal', labelTh: 'ข้อกฎหมาย' },
    { key: 'permits', labelEn: 'Permits', labelTh: 'ใบอนุญาต' },
  ];

  return (
    <div className="min-h-screen bg-gray-50/60 pb-24">
      <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('common.back')}
        </button>

        {/* Gallery */}
        <PropertyGallery
          images={property.images}
          title={language === 'th' ? property.titleTh : property.title}
        />

        {/* Title row */}
        <div className="mt-5 flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${status.color}`}>
                {language === 'th' ? status.th : status.en}
              </span>
              {typeLabel && (
                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                  {language === 'th' ? typeLabel.th : typeLabel.en}
                </span>
              )}
            </div>
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
              {language === 'th' ? property.titleTh : property.title}
            </h1>
            <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span>
                {language === 'th'
                  ? `${property.location.addressTh}, ${property.location.districtTh}`
                  : `${property.location.address}, ${property.location.district}`}
              </span>
            </div>
          </div>
          <MatchScoreBadge score={matchScore} size="lg" />
        </div>

        {/* Key stats */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-white p-3 text-center shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400">{t('property.price')}</p>
            <p className="mt-0.5 text-lg font-bold text-blue-600">{formatPrice(property.price)}</p>
            <p className="text-xs text-gray-400">/{language === 'th' ? 'เดือน' : 'mo'}</p>
          </div>
          <div className="rounded-xl bg-white p-3 text-center shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400">{t('property.size')}</p>
            <p className="mt-0.5 text-lg font-bold text-gray-900">{property.size}</p>
            <p className="text-xs text-gray-400">{language === 'th' ? 'ตร.ม.' : 'sqm'}</p>
          </div>
          <div className="rounded-xl bg-white p-3 text-center shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400">{t('property.floor')}</p>
            <p className="mt-0.5 text-lg font-bold text-gray-900">{property.floor}</p>
            <p className="text-xs text-gray-400">{language === 'th' ? 'ชั้น' : 'floor'}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex gap-1 overflow-x-auto rounded-xl bg-gray-100 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium transition-all sm:text-sm ${
                activeTab === tab.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {language === 'th' ? tab.labelTh : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-5">
          {/* --- OVERVIEW --- */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Description */}
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="mb-2 text-sm font-semibold text-gray-900">
                  {t('property.details')}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {language === 'th' ? property.descriptionTh : property.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  {t('property.amenities')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="mb-2 text-sm font-semibold text-gray-900">
                  {t('property.location')}
                </h3>
                <div className="flex h-48 items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-1 h-6 w-6" />
                    <p>{property.location.lat.toFixed(4)}, {property.location.lng.toFixed(4)}</p>
                    <p className="mt-0.5 text-xs">
                      {language === 'th'
                        ? property.location.addressTh
                        : property.location.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- INSIGHTS --- */}
          {activeTab === 'insights' && (
            <div className="space-y-5">
              <TrafficChart trafficScore={property.trafficScore} />
              <CompetitorMap competitorCount={property.competitorCount} />

              {/* AI Recommendation */}
              <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  <h3 className="text-sm font-semibold text-blue-800">
                    {language === 'th' ? 'คำแนะนำ AI' : 'AI Recommendation'}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-blue-700">
                  {language === 'th'
                    ? `พื้นที่นี้มีคะแนนการสัญจร ${property.trafficScore}/100 ซึ่ง${
                        property.trafficScore >= 80 ? 'สูงมาก' : property.trafficScore >= 60 ? 'ปานกลาง' : 'ต่ำ'
                      } มีคู่แข่ง ${property.competitorCount} รายในบริเวณใกล้เคียง ${
                        property.trafficScore >= 80
                          ? 'เหมาะสำหรับธุรกิจที่ต้องการปริมาณลูกค้าสูง'
                          : 'เหมาะสำหรับธุรกิจเฉพาะกลุ่มที่ไม่ต้องพึ่งพาทราฟฟิกมาก'
                      }`
                    : `This space has a traffic score of ${property.trafficScore}/100, which is ${
                        property.trafficScore >= 80 ? 'very high' : property.trafficScore >= 60 ? 'moderate' : 'low'
                      }. There are ${property.competitorCount} competitors nearby. ${
                        property.trafficScore >= 80
                          ? 'Ideal for businesses that thrive on high foot traffic.'
                          : 'Better suited for niche businesses that do not rely heavily on walk-in customers.'
                      }`}
                </p>
              </div>
            </div>
          )}

          {/* --- LEGAL --- */}
          {activeTab === 'legal' && (
            <div className="space-y-4">
              {/* Zoning */}
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  {t('property.zoning')}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="h-4 w-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: property.zoning.color }}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {zoningLabel
                      ? language === 'th'
                        ? zoningLabel.th
                        : zoningLabel.en
                      : property.zoning.type}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Alcohol */}
                  <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
                    <Wine className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-400">
                        {language === 'th' ? 'แอลกอฮอล์' : 'Alcohol'}
                      </p>
                      {property.zoning.allowAlcohol ? (
                        <p className="text-xs font-medium text-green-600 flex items-center gap-0.5">
                          <CheckCircle2 className="h-3 w-3" />
                          {language === 'th' ? 'อนุญาต' : 'Allowed'}
                        </p>
                      ) : (
                        <p className="text-xs font-medium text-red-600 flex items-center gap-0.5">
                          <XCircle className="h-3 w-3" />
                          {language === 'th' ? 'ไม่อนุญาต' : 'Not Allowed'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Tobacco */}
                  <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
                    <Cigarette className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-400">
                        {language === 'th' ? 'ยาสูบ' : 'Tobacco'}
                      </p>
                      {property.zoning.allowTobacco ? (
                        <p className="text-xs font-medium text-green-600 flex items-center gap-0.5">
                          <CheckCircle2 className="h-3 w-3" />
                          {language === 'th' ? 'อนุญาต' : 'Allowed'}
                        </p>
                      ) : (
                        <p className="text-xs font-medium text-red-600 flex items-center gap-0.5">
                          <XCircle className="h-3 w-3" />
                          {language === 'th' ? 'ไม่อนุญาต' : 'Not Allowed'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {language === 'th' ? 'เวลาเปิด-ปิด' : 'Operating Hours'}
                </h3>
                <p className="text-sm text-gray-700">
                  {property.zoning.operatingHours.open} - {property.zoning.operatingHours.close}
                </p>
              </div>

              {/* Restrictions */}
              {property.zoning.restrictions.length > 0 && (
                <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4">
                  <h3 className="mb-2 text-sm font-semibold text-amber-800 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" />
                    {language === 'th' ? 'ข้อจำกัด' : 'Restrictions'}
                  </h3>
                  <ul className="space-y-1.5">
                    {property.zoning.restrictions.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-amber-700">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* --- PERMITS --- */}
          {activeTab === 'permits' && (
            <div className="space-y-5">
              {/* Checklist */}
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                  <FileText className="h-4 w-4" />
                  {language === 'th' ? 'รายการใบอนุญาตที่ต้องมี' : 'Required Permits Checklist'}
                </h3>
                <div className="space-y-3">
                  {permits.map((permit) => (
                    <div
                      key={permit.nameEn}
                      className={`rounded-lg p-3 ${
                        permit.required
                          ? 'border border-blue-100 bg-blue-50/40'
                          : 'border border-gray-100 bg-gray-50/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          {permit.required ? (
                            <Shield className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                          ) : (
                            <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {language === 'th' ? permit.nameTh : permit.nameEn}
                            </p>
                            <p className="text-xs text-gray-500">
                              {language === 'th' ? permit.agencyTh : permit.agencyEn}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                            permit.required
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {permit.required
                            ? language === 'th'
                              ? 'จำเป็น'
                              : 'Required'
                            : language === 'th'
                            ? 'ไม่จำเป็น'
                            : 'Optional'}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                        <span>{language === 'th' ? 'ระยะเวลา' : 'Time'}: {permit.time}</span>
                        <span>{language === 'th' ? 'ค่าใช้จ่าย' : 'Cost'}: {formatPrice(permit.cost)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby Agencies */}
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  {language === 'th' ? 'หน่วยงานใกล้เคียง' : 'Nearby Government Agencies'}
                </h3>
                <div className="space-y-2.5">
                  {agencies.map((agency) => {
                    const Icon = agency.icon;
                    return (
                      <div
                        key={agency.nameEn}
                        className="flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-2.5"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm text-gray-700">
                          {language === 'th' ? agency.nameTh : agency.nameEn}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur-sm px-4 py-3 shadow-lg">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <button
            onClick={() => toggleSaved(propertyId)}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all ${
              isSaved
                ? 'border-red-200 bg-red-50 text-red-500'
                : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
          <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
            <MessageCircle className="h-4 w-4" />
            {language === 'th' ? 'แชท' : 'Chat'}
          </button>
          <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 text-sm font-semibold text-white transition-colors hover:bg-orange-600">
            <Handshake className="h-4 w-4" />
            {language === 'th' ? 'ขอดีล' : 'Request Deal'}
          </button>
        </div>
      </div>
    </div>
  );
}
