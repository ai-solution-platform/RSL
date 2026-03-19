'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw, Check } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { useAppStore } from '@/store';
import { formatPrice } from '@/lib/utils';

const BUSINESS_TYPES = [
  'cafe', 'restaurant', 'clinic', 'retail', 'bar',
  'salon', 'gym', 'pharmacy', 'laundry', 'convenience',
  'bakery', 'spa', 'tutoring', 'coworking', 'other',
] as const;

const PROPERTY_TYPES = [
  { key: 'mall', en: 'Mall', th: 'ห้าง' },
  { key: 'street_shop', en: 'Street Shop', th: 'ตึกแถว' },
  { key: 'community_mall', en: 'Community Mall', th: 'คอมมิวนิตี้มอลล์' },
  { key: 'market', en: 'Market', th: 'ตลาด' },
  { key: 'pop_up', en: 'Pop-up', th: 'ป๊อปอัพ' },
] as const;

const SPECIAL_NEEDS = [
  { key: 'alcohol', en: 'Alcohol License', th: 'ใบอนุญาตแอลกอฮอล์' },
  { key: 'kitchen', en: 'Kitchen', th: 'ครัว' },
  { key: 'parking', en: 'Parking', th: 'ที่จอดรถ' },
  { key: 'three_phase', en: '3-Phase Power', th: 'ไฟ 3 เฟส' },
] as const;

interface FilterPanelProps {
  onApply?: (filters: FilterState) => void;
}

interface FilterState {
  budgetMin: number;
  budgetMax: number;
  sizeMin: number;
  sizeMax: number;
  businessType: string;
  propertyTypes: string[];
  specialNeeds: string[];
}

export default function FilterPanel({ onApply }: FilterPanelProps) {
  const { t, language } = useTranslation();
  const setSearchFilters = useAppStore((s) => s.setSearchFilters);
  const [isOpen, setIsOpen] = useState(false);

  const [budgetMin, setBudgetMin] = useState(10000);
  const [budgetMax, setBudgetMax] = useState(500000);
  const [sizeMin, setSizeMin] = useState(10);
  const [sizeMax, setSizeMax] = useState(500);
  const [businessType, setBusinessType] = useState('');
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [specialNeeds, setSpecialNeeds] = useState<string[]>([]);

  const togglePropertyType = (key: string) => {
    setPropertyTypes((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const toggleSpecialNeed = (key: string) => {
    setSpecialNeeds((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleReset = () => {
    setBudgetMin(10000);
    setBudgetMax(500000);
    setSizeMin(10);
    setSizeMax(500);
    setBusinessType('');
    setPropertyTypes([]);
    setSpecialNeeds([]);
    setSearchFilters({
      budget: { min: 0, max: 200000 },
      size: { min: 0, max: 500 },
      businessType: '',
      specialNeeds: [],
    });
    onApply?.({
      budgetMin: 10000,
      budgetMax: 500000,
      sizeMin: 10,
      sizeMax: 500,
      businessType: '',
      propertyTypes: [],
      specialNeeds: [],
    });
  };

  const handleApply = () => {
    const filters: FilterState = {
      budgetMin,
      budgetMax,
      sizeMin,
      sizeMax,
      businessType,
      propertyTypes,
      specialNeeds,
    };
    setSearchFilters({
      budget: { min: budgetMin, max: budgetMax },
      size: { min: sizeMin, max: sizeMax },
      businessType,
      specialNeeds,
    });
    onApply?.(filters);
    setIsOpen(false);
  };

  const activeCount =
    (businessType ? 1 : 0) +
    propertyTypes.length +
    specialNeeds.length +
    (budgetMin > 10000 || budgetMax < 500000 ? 1 : 0) +
    (sizeMin > 10 || sizeMax < 500 ? 1 : 0);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          <span>{t('discover.filters')}</span>
          {activeCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs font-semibold text-white">
              {activeCount}
            </span>
          )}
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {isOpen && (
        <div className="mt-2 rounded-xl border border-gray-100 bg-white p-4 shadow-lg space-y-5">
          {/* Budget Range */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t('discover.budget')}
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <input
                  type="range"
                  min={10000}
                  max={500000}
                  step={5000}
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(Math.min(Number(e.target.value), budgetMax - 5000))}
                  className="w-full accent-blue-600"
                />
                <p className="mt-0.5 text-xs text-gray-500">{formatPrice(budgetMin)}</p>
              </div>
              <span className="text-gray-400">-</span>
              <div className="flex-1">
                <input
                  type="range"
                  min={10000}
                  max={500000}
                  step={5000}
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(Math.max(Number(e.target.value), budgetMin + 5000))}
                  className="w-full accent-blue-600"
                />
                <p className="mt-0.5 text-xs text-gray-500">{formatPrice(budgetMax)}</p>
              </div>
            </div>
          </div>

          {/* Size Range */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t('discover.size')} ({language === 'th' ? 'ตร.ม.' : 'sqm'})
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <input
                  type="range"
                  min={10}
                  max={500}
                  step={5}
                  value={sizeMin}
                  onChange={(e) => setSizeMin(Math.min(Number(e.target.value), sizeMax - 5))}
                  className="w-full accent-blue-600"
                />
                <p className="mt-0.5 text-xs text-gray-500">{sizeMin} {language === 'th' ? 'ตร.ม.' : 'sqm'}</p>
              </div>
              <span className="text-gray-400">-</span>
              <div className="flex-1">
                <input
                  type="range"
                  min={10}
                  max={500}
                  step={5}
                  value={sizeMax}
                  onChange={(e) => setSizeMax(Math.max(Number(e.target.value), sizeMin + 5))}
                  className="w-full accent-blue-600"
                />
                <p className="mt-0.5 text-xs text-gray-500">{sizeMax} {language === 'th' ? 'ตร.ม.' : 'sqm'}</p>
              </div>
            </div>
          </div>

          {/* Business Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t('discover.businessType')}
            </label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">{language === 'th' ? 'ทั้งหมด' : 'All Types'}</option>
              {BUSINESS_TYPES.map((bt) => (
                <option key={bt} value={bt}>
                  {t(`business.${bt}`)}
                </option>
              ))}
            </select>
          </div>

          {/* Property Type Chips */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {language === 'th' ? 'ประเภทอสังหา' : 'Property Type'}
            </label>
            <div className="flex flex-wrap gap-2">
              {PROPERTY_TYPES.map((pt) => (
                <button
                  key={pt.key}
                  onClick={() => togglePropertyType(pt.key)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                    propertyTypes.includes(pt.key)
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {language === 'th' ? pt.th : pt.en}
                </button>
              ))}
            </div>
          </div>

          {/* Special Needs */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {language === 'th' ? 'ความต้องการพิเศษ' : 'Special Needs'}
            </label>
            <div className="space-y-2">
              {SPECIAL_NEEDS.map((sn) => (
                <label
                  key={sn.key}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1 py-1 hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-all ${
                      specialNeeds.includes(sn.key)
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    }`}
                  >
                    {specialNeeds.includes(sn.key) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={specialNeeds.includes(sn.key)}
                    onChange={() => toggleSpecialNeed(sn.key)}
                    className="hidden"
                  />
                  <span className="text-sm text-gray-700">
                    {language === 'th' ? sn.th : sn.en}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleReset}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {t('common.reset')}
            </button>
            <button
              onClick={handleApply}
              className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              {t('common.apply')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
