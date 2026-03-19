'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Upload,
  MapPin,
  Building2,
  DollarSign,
  Ruler,
  Clock,
  Users,
  FileText,
  Check,
  Image as ImageIcon,
  X,
  Plus,
} from 'lucide-react';

const districts = [
  { en: 'Pathum Wan', th: 'ปทุมวัน' },
  { en: 'Watthana', th: 'วัฒนา' },
  { en: 'Sathorn', th: 'สาทร' },
  { en: 'Bang Rak', th: 'บางรัก' },
  { en: 'Khlong Toei', th: 'คลองเตย' },
  { en: 'Phaya Thai', th: 'พญาไท' },
  { en: 'Chatuchak', th: 'จตุจักร' },
  { en: 'Huai Khwang', th: 'ห้วยขวาง' },
  { en: 'Ratchathewi', th: 'ราชเทวี' },
  { en: 'Phra Nakhon', th: 'พระนคร' },
  { en: 'Suan Luang', th: 'สวนหลวง' },
];

const propertyTypes = [
  { value: 'mall', en: 'Mall', th: 'ห้าง' },
  { value: 'street_shop', en: 'Street Shop', th: 'ตึกแถว' },
  { value: 'community_mall', en: 'Community Mall', th: 'คอมมิวนิตี้มอลล์' },
  { value: 'standalone', en: 'Standalone', th: 'อาคารเดี่ยว' },
  { value: 'market', en: 'Market', th: 'ตลาด' },
  { value: 'pop_up', en: 'Pop-up', th: 'ป๊อปอัพ' },
];

const amenitiesList = [
  'BTS Connected', 'MRT Connected', 'Parking', 'Loading Dock',
  'Central AC', 'Security 24/7', 'Wi-Fi', 'High Ceiling',
  'Grease Trap', 'Outdoor Seating', 'Elevator', 'Street Frontage',
];

const tenantTypes = [
  { value: 'cafe', en: 'Cafe', th: 'คาเฟ่' },
  { value: 'restaurant', en: 'Restaurant', th: 'ร้านอาหาร' },
  { value: 'bar', en: 'Bar', th: 'บาร์' },
  { value: 'retail', en: 'Retail', th: 'ค้าปลีก' },
  { value: 'salon', en: 'Salon', th: 'ร้านเสริมสวย' },
  { value: 'clinic', en: 'Clinic', th: 'คลินิก' },
  { value: 'gym', en: 'Gym', th: 'ฟิตเนส' },
  { value: 'convenience', en: 'Convenience Store', th: 'ร้านสะดวกซื้อ' },
];

const steps = [
  { en: 'Basic Info', th: 'ข้อมูลพื้นฐาน' },
  { en: 'Details', th: 'รายละเอียด' },
  { en: 'Photos', th: 'รูปภาพ' },
  { en: 'Preferences', th: 'การตั้งค่า' },
];

export default function AddListingPage() {
  const { t, language } = useTranslation();
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    title: '',
    titleTh: '',
    address: '',
    district: '',
    propertyType: '',
    floor: '',
    price: '',
    size: '',
    amenities: [] as string[],
    openTime: '10:00',
    closeTime: '22:00',
    photos: [] as string[],
    targetTenants: [] as string[],
    conditions: '',
  });

  const updateForm = (key: string, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleAmenity = (amenity: string) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const toggleTenant = (tenant: string) => {
    setForm((prev) => ({
      ...prev,
      targetTenants: prev.targetTenants.includes(tenant)
        ? prev.targetTenants.filter((t) => t !== tenant)
        : [...prev.targetTenants, tenant],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <Link href="/landlord" className="text-gray-600">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-semibold text-gray-900">
          {language === 'th' ? 'เพิ่มประกาศใหม่' : 'Add New Listing'}
        </h1>
      </div>

      {/* Step Progress */}
      <div className="px-4 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  i < step
                    ? 'bg-green-500 text-white'
                    : i === step
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-8 sm:w-12 h-0.5 ${
                    i < step ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-center text-gray-500">
          {language === 'th' ? steps[step].th : steps[step].en} ({step + 1}/{steps.length})
        </p>
      </div>

      {/* Step Content */}
      <div className="px-4 py-4">
        {/* Step 1: Basic Info */}
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'th' ? 'ชื่อประกาศ (EN)' : 'Title (EN)'}
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateForm('title', e.target.value)}
                placeholder="e.g., Premium Retail Space at Siam"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'th' ? 'ชื่อประกาศ (TH)' : 'Title (TH)'}
              </label>
              <input
                type="text"
                value={form.titleTh}
                onChange={(e) => updateForm('titleTh', e.target.value)}
                placeholder="เช่น พื้นที่ค้าปลีกพรีเมียม สยาม"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin size={14} className="inline mr-1" />
                {language === 'th' ? 'ที่อยู่' : 'Address'}
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => updateForm('address', e.target.value)}
                placeholder={language === 'th' ? 'ที่อยู่เต็ม' : 'Full address'}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'th' ? 'เขต' : 'District'}
              </label>
              <select
                value={form.district}
                onChange={(e) => updateForm('district', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">{language === 'th' ? 'เลือกเขต' : 'Select district'}</option>
                {districts.map((d) => (
                  <option key={d.en} value={d.en}>
                    {language === 'th' ? d.th : d.en}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Building2 size={14} className="inline mr-1" />
                {language === 'th' ? 'ประเภทพื้นที่' : 'Property Type'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {propertyTypes.map((pt) => (
                  <button
                    key={pt.value}
                    onClick={() => updateForm('propertyType', pt.value)}
                    className={`px-3 py-2 rounded-xl text-sm border transition-colors ${
                      form.propertyType === pt.value
                        ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {language === 'th' ? pt.th : pt.en}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'th' ? 'ชั้น' : 'Floor'}
              </label>
              <input
                type="text"
                value={form.floor}
                onChange={(e) => updateForm('floor', e.target.value)}
                placeholder="e.g., G, 1, 2, B1"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <DollarSign size={14} className="inline mr-1" />
                {language === 'th' ? 'ราคา/เดือน (บาท)' : 'Price/Month (THB)'}
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => updateForm('price', e.target.value)}
                placeholder="e.g., 50000"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {form.price && (
                <p className="text-xs text-gray-500 mt-1">
                  {formatPrice(Number(form.price))}/{language === 'th' ? 'เดือน' : 'month'}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Ruler size={14} className="inline mr-1" />
                {language === 'th' ? 'ขนาด (ตร.ม.)' : 'Size (sqm)'}
              </label>
              <input
                type="number"
                value={form.size}
                onChange={(e) => updateForm('size', e.target.value)}
                placeholder="e.g., 80"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'th' ? 'สิ่งอำนวยความสะดวก' : 'Amenities'}
              </label>
              <div className="flex flex-wrap gap-2">
                {amenitiesList.map((am) => (
                  <button
                    key={am}
                    onClick={() => toggleAmenity(am)}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                      form.amenities.includes(am)
                        ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {form.amenities.includes(am) && <Check size={10} className="inline mr-1" />}
                    {am}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Clock size={14} className="inline mr-1" />
                {language === 'th' ? 'เวลาทำการ' : 'Operating Hours'}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={form.openTime}
                  onChange={(e) => updateForm('openTime', e.target.value)}
                  className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="time"
                  value={form.closeTime}
                  onChange={(e) => updateForm('closeTime', e.target.value)}
                  className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Photos */}
        {step === 2 && (
          <div className="space-y-4">
            <div
              className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-blue-400 transition-colors cursor-pointer bg-gray-50"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-3">
                <Camera size={28} className="text-blue-600" />
              </div>
              <p className="font-medium text-gray-700 text-sm">
                {language === 'th' ? 'อัพโหลดรูปภาพ' : 'Upload Photos'}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {language === 'th'
                  ? 'ลากไฟล์มาวางหรือแตะเพื่อเลือก'
                  : 'Drag & drop or tap to select'}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                JPG, PNG (max 5MB)
              </p>
              <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-medium flex items-center gap-1.5">
                <Upload size={14} />
                {language === 'th' ? 'เลือกไฟล์' : 'Choose Files'}
              </button>
            </div>
            {/* Placeholder uploaded images */}
            <div className="grid grid-cols-3 gap-2">
              {['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200', 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=200'].map((img, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden aspect-square bg-gray-100">
                  <img src={img} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                  <button className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center">
                    <X size={10} className="text-white" />
                  </button>
                </div>
              ))}
              <div className="rounded-xl border-2 border-dashed border-gray-200 aspect-square flex items-center justify-center cursor-pointer hover:border-blue-400">
                <Plus size={20} className="text-gray-400" />
              </div>
            </div>
            <p className="text-xs text-gray-400 text-center">
              {language === 'th'
                ? 'เพิ่มรูปถ่ายเพื่อดึงดูดผู้เช่า (แนะนำ 5-10 รูป)'
                : 'Add photos to attract tenants (recommended 5-10)'}
            </p>
          </div>
        )}

        {/* Step 4: Preferences */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users size={14} className="inline mr-1" />
                {language === 'th' ? 'ประเภทผู้เช่าเป้าหมาย' : 'Target Tenant Types'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {tenantTypes.map((tt) => (
                  <button
                    key={tt.value}
                    onClick={() => toggleTenant(tt.value)}
                    className={`px-3 py-2.5 rounded-xl text-sm border transition-colors text-left ${
                      form.targetTenants.includes(tt.value)
                        ? 'bg-orange-50 border-orange-400 text-orange-700 font-medium'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {form.targetTenants.includes(tt.value) && (
                      <Check size={12} className="inline mr-1" />
                    )}
                    {language === 'th' ? tt.th : tt.en}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FileText size={14} className="inline mr-1" />
                {language === 'th' ? 'เงื่อนไขพิเศษ' : 'Special Conditions'}
              </label>
              <textarea
                value={form.conditions}
                onChange={(e) => updateForm('conditions', e.target.value)}
                placeholder={
                  language === 'th'
                    ? 'เช่น ต้องมีประกัน, ห้ามเปิดหลัง 22:00'
                    : 'e.g., Insurance required, No operation after 22:00'
                }
                rows={3}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Preview Card */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                {language === 'th' ? 'ตัวอย่างประกาศ' : 'Listing Preview'}
              </p>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <ImageIcon size={32} className="text-blue-400" />
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-sm text-gray-900 truncate">
                    {form.title || (language === 'th' ? 'ชื่อพื้นที่' : 'Property Title')}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                    <MapPin size={10} />
                    {form.district || (language === 'th' ? 'เลือกเขต' : 'Select district')}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-blue-600 font-bold text-sm">
                      {form.price ? formatPrice(Number(form.price)) : '฿--'}/
                      {language === 'th' ? 'เดือน' : 'mo'}
                    </span>
                    <span className="text-xs text-gray-400">
                      {form.size ? `${form.size} ${language === 'th' ? 'ตร.ม.' : 'sqm'}` : '--'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Publish Button */}
            <button className="w-full py-3.5 bg-orange-500 text-white rounded-2xl font-semibold text-sm hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/25 mt-4">
              {language === 'th' ? 'ลงประกาศ' : 'Publish Listing'}
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      {step < 3 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 py-3 border border-gray-200 rounded-2xl text-sm font-medium text-gray-700 flex items-center justify-center gap-1"
            >
              <ArrowLeft size={16} />
              {t('common.back')}
            </button>
          )}
          <button
            onClick={() => setStep(step + 1)}
            className="flex-1 py-3 bg-blue-600 text-white rounded-2xl text-sm font-semibold flex items-center justify-center gap-1 hover:bg-blue-700 transition-colors"
          >
            {t('common.next')}
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
