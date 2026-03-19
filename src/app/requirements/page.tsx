'use client';

import { useState, useMemo } from 'react';
import { useTranslation } from '@/lib/i18n';
import { useAppStore } from '@/store';
import { properties } from '@/data/properties';
import { formatPrice } from '@/lib/utils';
import {
  Sparkles,
  DollarSign,
  Ruler,
  MapPin,
  Briefcase,
  Settings2,
  Coffee,
  UtensilsCrossed,
  Wine,
  Stethoscope,
  ShoppingBag,
  Scissors,
  Dumbbell,
  Store,
  Beer,
  Zap,
  Car,
  Train,
  ArrowUp,
  ChevronDown,
  Check,
} from 'lucide-react';

const districts = [
  { en: 'Sathorn', th: 'สาทร' },
  { en: 'Silom', th: 'สีลม' },
  { en: 'Sukhumvit', th: 'สุขุมวิท' },
  { en: 'Siam', th: 'สยาม' },
  { en: 'Ari', th: 'อารีย์' },
  { en: 'Thonglor', th: 'ทองหล่อ' },
  { en: 'Ekkamai', th: 'เอกมัย' },
  { en: 'Ratchada', th: 'รัชดา' },
  { en: 'Ladprao', th: 'ลาดพร้าว' },
  { en: 'On Nut', th: 'อ่อนนุช' },
];

const businessTypes = [
  { key: 'cafe', en: 'Cafe', th: 'คาเฟ่', icon: Coffee },
  { key: 'restaurant', en: 'Restaurant', th: 'ร้านอาหาร', icon: UtensilsCrossed },
  { key: 'bar', en: 'Bar', th: 'บาร์', icon: Wine },
  { key: 'clinic', en: 'Clinic', th: 'คลินิก', icon: Stethoscope },
  { key: 'retail', en: 'Retail', th: 'ค้าปลีก', icon: ShoppingBag },
  { key: 'salon', en: 'Salon', th: 'ร้านเสริมสวย', icon: Scissors },
  { key: 'gym', en: 'Gym', th: 'ฟิตเนส', icon: Dumbbell },
  { key: 'convenience', en: 'Convenience Store', th: 'ร้านสะดวกซื้อ', icon: Store },
];

const specialRequirements = [
  { key: 'alcohol', en: 'Alcohol license area', th: 'พื้นที่ขายแอลกอฮอล์', icon: Beer },
  { key: 'kitchen', en: 'Kitchen/grease trap', th: 'ครัว/ถังดักไขมัน', icon: UtensilsCrossed },
  { key: 'parking', en: 'Parking', th: 'ที่จอดรถ', icon: Car },
  { key: 'power', en: '3-Phase power', th: 'ไฟฟ้า 3 เฟส', icon: Zap },
  { key: 'bts', en: 'BTS/MRT nearby', th: 'ใกล้ BTS/MRT', icon: Train },
  { key: 'ceiling', en: 'High ceiling', th: 'เพดานสูง', icon: ArrowUp },
];

export default function RequirementsPage() {
  const { t, language } = useTranslation();
  const { setSearchFilters } = useAppStore();

  const [budgetMin, setBudgetMin] = useState(10000);
  const [budgetMax, setBudgetMax] = useState(200000);
  const [sizeMin, setSizeMin] = useState(20);
  const [sizeMax, setSizeMax] = useState(300);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<string>('');
  const [selectedSpecial, setSelectedSpecial] = useState<string[]>([]);

  const toggleDistrict = (d: string) => {
    setSelectedDistricts((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };

  const toggleSpecial = (s: string) => {
    setSelectedSpecial((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  // Count matching properties in real-time
  const matchCount = useMemo(() => {
    return properties.filter((p) => {
      if (p.status !== 'available') return false;
      if (p.price < budgetMin || p.price > budgetMax) return false;
      if (p.size < sizeMin || p.size > sizeMax) return false;
      if (selectedDistricts.length > 0) {
        const districtMatch = selectedDistricts.some(
          (d) =>
            p.location.district.toLowerCase().includes(d.toLowerCase()) ||
            p.location.districtTh.includes(
              districts.find((dd) => dd.en === d)?.th || ''
            )
        );
        if (!districtMatch) return false;
      }
      if (selectedSpecial.includes('alcohol') && !p.zoning.allowAlcohol) return false;
      if (selectedSpecial.includes('parking') && !p.amenities.some((a) => a.toLowerCase().includes('parking'))) return false;
      if (selectedSpecial.includes('bts') && !p.amenities.some((a) => a.includes('BTS') || a.includes('MRT'))) return false;
      if (selectedSpecial.includes('ceiling') && !p.amenities.some((a) => a.includes('High Ceiling'))) return false;
      return true;
    }).length;
  }, [budgetMin, budgetMax, sizeMin, sizeMax, selectedDistricts, selectedSpecial]);

  const budgetPercent = (v: number) => ((v - 10000) / (500000 - 10000)) * 100;
  const sizePercent = (v: number) => ((v - 10) / (500 - 10)) * 100;

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 pt-6 pb-6">
        <h1 className="text-white text-xl font-bold">
          {language === 'th' ? 'สร้างความต้องการ' : 'Build Requirements'}
        </h1>
        <p className="text-blue-200 text-sm mt-1">
          {language === 'th'
            ? 'บอกเราว่าคุณต้องการอะไร เราจะหาพื้นที่ที่ตรงกับคุณ'
            : 'Tell us what you need, we\'ll find matching spaces'}
        </p>
      </div>

      <div className="px-4 -mt-2 space-y-4">
        {/* Section 1: Budget */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <DollarSign size={16} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-900">
                {language === 'th' ? 'งบประมาณ' : 'Budget'}
              </h3>
              <p className="text-[10px] text-gray-400">
                {language === 'th' ? 'ต่อเดือน' : 'per month'}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">
              {formatPrice(budgetMin)}
            </span>
            <span className="text-sm font-medium text-blue-600">
              {formatPrice(budgetMax)}
            </span>
          </div>
          <div className="relative h-6 flex items-center">
            <div className="absolute w-full h-1.5 bg-gray-200 rounded-full" />
            <div
              className="absolute h-1.5 bg-blue-500 rounded-full"
              style={{
                left: `${budgetPercent(budgetMin)}%`,
                width: `${budgetPercent(budgetMax) - budgetPercent(budgetMin)}%`,
              }}
            />
            <input
              type="range"
              min={10000}
              max={500000}
              step={5000}
              value={budgetMin}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v < budgetMax) setBudgetMin(v);
              }}
              className="absolute w-full h-6 opacity-0 cursor-pointer z-10"
            />
            <input
              type="range"
              min={10000}
              max={500000}
              step={5000}
              value={budgetMax}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v > budgetMin) setBudgetMax(v);
              }}
              className="absolute w-full h-6 opacity-0 cursor-pointer z-20"
            />
            <div
              className="absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-sm z-30 pointer-events-none"
              style={{ left: `calc(${budgetPercent(budgetMin)}% - 10px)` }}
            />
            <div
              className="absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-sm z-30 pointer-events-none"
              style={{ left: `calc(${budgetPercent(budgetMax)}% - 10px)` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-gray-400">฿10K</span>
            <span className="text-[10px] text-gray-400">฿500K</span>
          </div>
        </div>

        {/* Section 2: Size */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
              <Ruler size={16} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-900">
                {language === 'th' ? 'ขนาดพื้นที่' : 'Size'}
              </h3>
              <p className="text-[10px] text-gray-400">
                {language === 'th' ? 'ตารางเมตร' : 'square meters'}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-600">
              {sizeMin} {language === 'th' ? 'ตร.ม.' : 'sqm'}
            </span>
            <span className="text-sm font-medium text-green-600">
              {sizeMax} {language === 'th' ? 'ตร.ม.' : 'sqm'}
            </span>
          </div>
          <div className="relative h-6 flex items-center">
            <div className="absolute w-full h-1.5 bg-gray-200 rounded-full" />
            <div
              className="absolute h-1.5 bg-green-500 rounded-full"
              style={{
                left: `${sizePercent(sizeMin)}%`,
                width: `${sizePercent(sizeMax) - sizePercent(sizeMin)}%`,
              }}
            />
            <input
              type="range"
              min={10}
              max={500}
              step={5}
              value={sizeMin}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v < sizeMax) setSizeMin(v);
              }}
              className="absolute w-full h-6 opacity-0 cursor-pointer z-10"
            />
            <input
              type="range"
              min={10}
              max={500}
              step={5}
              value={sizeMax}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v > sizeMin) setSizeMax(v);
              }}
              className="absolute w-full h-6 opacity-0 cursor-pointer z-20"
            />
            <div
              className="absolute w-5 h-5 bg-white border-2 border-green-500 rounded-full shadow-sm z-30 pointer-events-none"
              style={{ left: `calc(${sizePercent(sizeMin)}% - 10px)` }}
            />
            <div
              className="absolute w-5 h-5 bg-white border-2 border-green-500 rounded-full shadow-sm z-30 pointer-events-none"
              style={{ left: `calc(${sizePercent(sizeMax)}% - 10px)` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-gray-400">10 sqm</span>
            <span className="text-[10px] text-gray-400">500 sqm</span>
          </div>
        </div>

        {/* Section 3: Preferred Areas */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
              <MapPin size={16} className="text-purple-600" />
            </div>
            <h3 className="font-semibold text-sm text-gray-900">
              {language === 'th' ? 'ย่านที่ต้องการ' : 'Preferred Areas'}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {districts.map((d) => (
              <button
                key={d.en}
                onClick={() => toggleDistrict(d.en)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedDistricts.includes(d.en)
                    ? 'bg-purple-100 text-purple-700 border border-purple-300'
                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {selectedDistricts.includes(d.en) && (
                  <Check size={10} className="inline mr-1" />
                )}
                {language === 'th' ? d.th : d.en}
              </button>
            ))}
          </div>
        </div>

        {/* Section 4: Business Type */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
              <Briefcase size={16} className="text-orange-600" />
            </div>
            <h3 className="font-semibold text-sm text-gray-900">
              {language === 'th' ? 'ประเภทธุรกิจ' : 'Business Type'}
            </h3>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {businessTypes.map((bt) => {
              const Icon = bt.icon;
              return (
                <button
                  key={bt.key}
                  onClick={() => setSelectedBusiness(bt.key === selectedBusiness ? '' : bt.key)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                    selectedBusiness === bt.key
                      ? 'bg-orange-50 border-orange-400 text-orange-700'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-[10px] font-medium leading-tight text-center">
                    {language === 'th' ? bt.th : bt.en}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 5: Special Requirements */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
              <Settings2 size={16} className="text-red-600" />
            </div>
            <h3 className="font-semibold text-sm text-gray-900">
              {language === 'th' ? 'ความต้องการพิเศษ' : 'Special Requirements'}
            </h3>
          </div>
          <div className="space-y-2">
            {specialRequirements.map((sr) => {
              const Icon = sr.icon;
              const isActive = selectedSpecial.includes(sr.key);
              return (
                <button
                  key={sr.key}
                  onClick={() => toggleSpecial(sr.key)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                    isActive
                      ? 'bg-red-50 border-red-200'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} className={isActive ? 'text-red-500' : 'text-gray-400'} />
                    <span className={`text-sm ${isActive ? 'text-red-700 font-medium' : 'text-gray-600'}`}>
                      {language === 'th' ? sr.th : sr.en}
                    </span>
                  </div>
                  <div
                    className={`w-10 h-6 rounded-full p-0.5 transition-colors ${
                      isActive ? 'bg-red-500' : 'bg-gray-200'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                        isActive ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed CTA Button */}
      <div className="fixed bottom-20 left-0 right-0 px-4 z-40">
        <button
          className="w-full py-4 bg-orange-500 text-white rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-colors active:scale-[0.98]"
          onClick={() => {
            setSearchFilters({
              budget: { min: budgetMin, max: budgetMax },
              size: { min: sizeMin, max: sizeMax },
              businessType: selectedBusiness,
              specialNeeds: selectedSpecial,
            });
          }}
        >
          <Sparkles size={18} />
          {language === 'th'
            ? `ค้นหาพื้นที่ที่ตรงกัน (${matchCount})`
            : `Find Matching Spaces (${matchCount})`}
        </button>
      </div>
    </div>
  );
}
