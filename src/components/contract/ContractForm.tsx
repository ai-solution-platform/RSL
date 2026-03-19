'use client';

import { useState } from 'react';
import {
  FileText,
  Building2,
  User,
  MapPin,
  Ruler,
  BadgeDollarSign,
  Clock,
  Shield,
  Languages,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';

interface ContractFormData {
  landlordName: string;
  tenantName: string;
  propertyAddress: string;
  propertySize: number;
  monthlyRent: number;
  leaseDuration: number;
  depositMonths: number;
  canRenovate: boolean;
  noAlcohol: boolean;
  operatingHoursRestriction: boolean;
  additionalTerms: string;
  language: 'en' | 'th' | 'both';
}

interface ContractFormProps {
  onGenerate: (data: ContractFormData) => void;
  loading?: boolean;
}

export default function ContractForm({ onGenerate, loading = false }: ContractFormProps) {
  const { t, language } = useTranslation();

  const [form, setForm] = useState<ContractFormData>({
    landlordName: 'บริษัท เซ็นทรัล พัฒนา จำกัด (มหาชน)',
    tenantName: 'นายสมชาย รุ่งเรืองกิจ',
    propertyAddress: '999/9 ถ.พระราม 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ 10330',
    propertySize: 120,
    monthlyRent: 85000,
    leaseDuration: 3,
    depositMonths: 3,
    canRenovate: false,
    noAlcohol: false,
    operatingHoursRestriction: false,
    additionalTerms: '',
    language: 'both',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(form);
  };

  const durationOptions = [
    { value: '1', label: language === 'th' ? '1 ปี' : '1 Year' },
    { value: '2', label: language === 'th' ? '2 ปี' : '2 Years' },
    { value: '3', label: language === 'th' ? '3 ปี' : '3 Years' },
    { value: '4', label: language === 'th' ? '4 ปี' : '4 Years' },
    { value: '5', label: language === 'th' ? '5 ปี' : '5 Years' },
  ];

  const depositOptions = [
    { value: '2', label: language === 'th' ? '2 เดือน' : '2 Months' },
    { value: '3', label: language === 'th' ? '3 เดือน' : '3 Months' },
    { value: '4', label: language === 'th' ? '4 เดือน' : '4 Months' },
    { value: '5', label: language === 'th' ? '5 เดือน' : '5 Months' },
    { value: '6', label: language === 'th' ? '6 เดือน' : '6 Months' },
  ];

  const languageOptions = [
    { value: 'th', label: language === 'th' ? 'ภาษาไทย' : 'Thai' },
    { value: 'en', label: language === 'th' ? 'ภาษาอังกฤษ' : 'English' },
    { value: 'both', label: language === 'th' ? 'ทั้งสองภาษา' : 'Both Languages' },
  ];

  const specialConditions = [
    {
      key: 'canRenovate' as const,
      label: language === 'th' ? 'อนุญาตให้ปรับปรุงพื้นที่' : 'Can Renovate Space',
      labelTh: 'อนุญาตให้ปรับปรุงพื้นที่',
    },
    {
      key: 'noAlcohol' as const,
      label: language === 'th' ? 'ห้ามจำหน่ายเครื่องดื่มแอลกอฮอล์' : 'No Alcohol Sales',
      labelTh: 'ห้ามจำหน่ายเครื่องดื่มแอลกอฮอล์',
    },
    {
      key: 'operatingHoursRestriction' as const,
      label: language === 'th' ? 'จำกัดเวลาเปิด-ปิดร้าน' : 'Operating Hours Restriction',
      labelTh: 'จำกัดเวลาเปิด-ปิดร้าน',
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section: Party Information */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <User size={18} className="text-[#2563EB]" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'th' ? 'ข้อมูลคู่สัญญา' : 'Party Information'}
          </h2>
        </div>
        <div className="space-y-4 bg-gray-50 rounded-xl p-4">
          <Input
            label={language === 'th' ? 'ชื่อผู้ให้เช่า (เจ้าของ)' : 'Landlord Name'}
            icon={Building2}
            value={form.landlordName}
            disabled
            className="bg-white"
          />
          <Input
            label={language === 'th' ? 'ชื่อผู้เช่า' : 'Tenant Name'}
            icon={User}
            value={form.tenantName}
            disabled
            className="bg-white"
          />
          <Input
            label={language === 'th' ? 'ที่อยู่ทรัพย์สิน' : 'Property Address'}
            icon={MapPin}
            value={form.propertyAddress}
            disabled
            className="bg-white"
          />
          <Input
            label={language === 'th' ? 'ขนาดพื้นที่ (ตร.ม.)' : 'Size (sqm)'}
            icon={Ruler}
            value={`${form.propertySize} ${language === 'th' ? 'ตร.ม.' : 'sqm'}`}
            disabled
            className="bg-white"
          />
        </div>
      </section>

      {/* Section: Lease Terms */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <BadgeDollarSign size={18} className="text-[#2563EB]" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'th' ? 'เงื่อนไขการเช่า' : 'Lease Terms'}
          </h2>
        </div>
        <div className="space-y-4">
          <Input
            label={language === 'th' ? 'ค่าเช่ารายเดือน (บาท)' : 'Monthly Rent (THB)'}
            icon={BadgeDollarSign}
            type="number"
            min={0}
            step={1000}
            value={form.monthlyRent}
            onChange={(e) =>
              setForm((f) => ({ ...f, monthlyRent: Number(e.target.value) }))
            }
          />
          <p className="text-xs text-gray-500 -mt-2 ml-1">
            {language === 'th'
              ? `ค่าเช่ารวม: ${formatPrice(form.monthlyRent)} / เดือน`
              : `Total rent: ${formatPrice(form.monthlyRent)} / month`}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label={language === 'th' ? 'ระยะเวลาเช่า' : 'Lease Duration'}
              options={durationOptions}
              value={String(form.leaseDuration)}
              onChange={(e) =>
                setForm((f) => ({ ...f, leaseDuration: Number(e.target.value) }))
              }
            />
            <Select
              label={language === 'th' ? 'เงินมัดจำ' : 'Deposit'}
              options={depositOptions}
              value={String(form.depositMonths)}
              onChange={(e) =>
                setForm((f) => ({ ...f, depositMonths: Number(e.target.value) }))
              }
            />
          </div>
          <p className="text-xs text-gray-500 ml-1">
            {language === 'th'
              ? `เงินมัดจำ: ${formatPrice(form.monthlyRent * form.depositMonths)}`
              : `Deposit amount: ${formatPrice(form.monthlyRent * form.depositMonths)}`}
          </p>
        </div>
      </section>

      {/* Section: Special Conditions */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <Shield size={18} className="text-[#2563EB]" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'th' ? 'เงื่อนไขพิเศษ' : 'Special Conditions'}
          </h2>
        </div>
        <div className="space-y-3">
          {specialConditions.map((cond) => (
            <label
              key={cond.key}
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-[#2563EB]/30 hover:bg-blue-50/30 transition-colors cursor-pointer"
            >
              <input
                type="checkbox"
                checked={form[cond.key]}
                onChange={(e) =>
                  setForm((f) => ({ ...f, [cond.key]: e.target.checked }))
                }
                className="w-5 h-5 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
              />
              <span className="text-sm text-gray-700">{cond.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Section: Additional Terms */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <FileText size={18} className="text-[#2563EB]" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'th' ? 'เงื่อนไขเพิ่มเติม' : 'Additional Terms'}
          </h2>
        </div>
        <Textarea
          placeholder={
            language === 'th'
              ? 'ระบุเงื่อนไขเพิ่มเติมที่ต้องการ...'
              : 'Enter any additional terms or conditions...'
          }
          value={form.additionalTerms}
          onChange={(e) =>
            setForm((f) => ({ ...f, additionalTerms: e.target.value }))
          }
          rows={4}
        />
      </section>

      {/* Section: Language */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <Languages size={18} className="text-[#2563EB]" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'th' ? 'ภาษาสัญญา' : 'Contract Language'}
          </h2>
        </div>
        <div className="flex gap-2">
          {languageOptions.map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() =>
                setForm((f) => ({
                  ...f,
                  language: opt.value as 'en' | 'th' | 'both',
                }))
              }
              className={[
                'flex-1 py-2.5 px-3 rounded-lg text-sm font-medium border transition-colors cursor-pointer',
                form.language === opt.value
                  ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300',
              ].join(' ')}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      {/* Generate Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="accent"
          size="lg"
          fullWidth
          loading={loading}
          icon={Sparkles}
        >
          {language === 'th' ? 'สร้างสัญญาอัตโนมัติ' : 'Generate Contract'}
        </Button>
        <p className="text-xs text-center text-gray-400 mt-2">
          {language === 'th'
            ? 'สัญญาจะถูกสร้างด้วย AI และสามารถแก้ไขได้ภายหลัง'
            : 'Contract will be AI-generated and can be edited afterwards'}
        </p>
      </div>
    </form>
  );
}
