'use client';

import { useState } from 'react';
import {
  Shield,
  Check,
  X,
  AlertCircle,
  CreditCard,
  Users,
  User,
  Banknote,
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import type { InsurancePlan } from '@/types';

interface CoverageModalProps {
  open: boolean;
  onClose: () => void;
  plan: InsurancePlan | null;
  onConfirm: (policyHolder: string, payWithDeposit: boolean) => void;
}

const exclusions = {
  en: [
    'Pre-existing damage before lease commencement',
    'Damage from war, terrorism, or nuclear events',
    'Intentional damage by the insured party',
    'Damage from illegal activities conducted on premises',
    'Wear and tear from normal use',
  ],
  th: [
    'ความเสียหายที่มีอยู่ก่อนเริ่มสัญญาเช่า',
    'ความเสียหายจากสงคราม การก่อการร้าย หรือเหตุการณ์นิวเคลียร์',
    'ความเสียหายที่ผู้เอาประกันก่อขึ้นโดยเจตนา',
    'ความเสียหายจากกิจกรรมผิดกฎหมาย',
    'การสึกหรอจากการใช้งานปกติ',
  ],
};

const conditions = {
  en: [
    'Policy must be maintained throughout the entire lease period',
    'Claims must be filed within 30 days of the incident',
    'Police report required for theft or vandalism claims',
    'Annual inspection may be required for coverage renewal',
    'Deductible of 10,000 THB applies per claim',
  ],
  th: [
    'กรมธรรม์ต้องคงสถานะตลอดระยะเวลาเช่า',
    'ต้องยื่นเรียกร้องภายใน 30 วันหลังเกิดเหตุ',
    'ต้องมีบันทึกประจำวันจากตำรวจสำหรับการเรียกร้องกรณีโจรกรรม',
    'อาจต้องมีการตรวจสอบประจำปีสำหรับการต่ออายุความคุ้มครอง',
    'มีค่าเสียหายส่วนแรก 10,000 บาท ต่อครั้ง',
  ],
};

const coverageAmounts: Record<string, number> = {
  basic: 500000,
  standard: 1000000,
  premium: 3000000,
};

export default function CoverageModal({
  open,
  onClose,
  plan,
  onConfirm,
}: CoverageModalProps) {
  const { language } = useTranslation();
  const [policyHolder, setPolicyHolder] = useState<'tenant' | 'landlord' | 'joint'>('tenant');
  const [payWithDeposit, setPayWithDeposit] = useState(false);

  if (!plan) return null;

  const coverageAmount = coverageAmounts[plan.tier] ?? 1000000;

  const holderOptions: { value: 'tenant' | 'landlord' | 'joint'; label: string; icon: typeof User }[] = [
    {
      value: 'tenant',
      label: language === 'th' ? 'ผู้เช่า' : 'Tenant',
      icon: User,
    },
    {
      value: 'landlord',
      label: language === 'th' ? 'เจ้าของ' : 'Landlord',
      icon: User,
    },
    {
      value: 'joint',
      label: language === 'th' ? 'ร่วมกัน' : 'Joint',
      icon: Users,
    },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        language === 'th'
          ? `รายละเอียดความคุ้มครอง - ${plan.nameTh}`
          : `Coverage Details - ${plan.name}`
      }
      size="lg"
    >
      <div className="space-y-6">
        {/* Coverage Amount */}
        <div className="text-center p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {language === 'th' ? 'วงเงินคุ้มครอง' : 'Coverage Amount'}
          </p>
          <p className="text-3xl font-bold text-[#2563EB] mt-1">
            {formatPrice(coverageAmount)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {language === 'th'
              ? `เบี้ยประกัน ${formatPrice(plan.monthlyPremium)} / เดือน`
              : `Premium ${formatPrice(plan.monthlyPremium)} / month`}
          </p>
        </div>

        {/* Coverage Items */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Shield size={16} className="text-[#2563EB]" />
            {language === 'th' ? 'รายการความคุ้มครอง' : 'Coverage Items'}
          </h4>
          <div className="space-y-2">
            {plan.coverage.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check size={14} className="text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700">
                    {language === 'th' ? item.nameTh : item.name}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {language === 'th'
                    ? `สูงสุด ${formatPrice(item.limit)}`
                    : `Up to ${formatPrice(item.limit)}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <AlertCircle size={16} className="text-amber-600" />
            {language === 'th' ? 'เงื่อนไข' : 'Conditions'}
          </h4>
          <ul className="space-y-2">
            {(language === 'th' ? conditions.th : conditions.en).map(
              (item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs text-gray-600"
                >
                  <span className="w-4 h-4 rounded-full bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-amber-600 text-[10px] font-bold">
                      {idx + 1}
                    </span>
                  </span>
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Exclusions */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <X size={16} className="text-red-500" />
            {language === 'th' ? 'ข้อยกเว้น' : 'Exclusions'}
          </h4>
          <ul className="space-y-2">
            {(language === 'th' ? exclusions.th : exclusions.en).map(
              (item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs text-gray-600"
                >
                  <div className="w-4 h-4 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                    <X size={10} className="text-red-500" />
                  </div>
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Policy Holder Selector */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            {language === 'th' ? 'ผู้ถือกรมธรรม์' : 'Policy Holder'}
          </h4>
          <div className="flex gap-2">
            {holderOptions.map((opt) => {
              const OptIcon = opt.icon;
              return (
                <button
                  key={opt.value}
                  onClick={() => setPolicyHolder(opt.value)}
                  className={[
                    'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer',
                    policyHolder === opt.value
                      ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300',
                  ].join(' ')}
                >
                  <OptIcon size={16} />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            {language === 'th' ? 'วิธีชำระเงิน' : 'Payment Method'}
          </h4>
          <div className="space-y-2">
            <label
              className={[
                'flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer',
                !payWithDeposit
                  ? 'border-[#2563EB] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300',
              ].join(' ')}
            >
              <input
                type="radio"
                name="payment"
                checked={!payWithDeposit}
                onChange={() => setPayWithDeposit(false)}
                className="text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
              />
              <CreditCard
                size={16}
                className={
                  !payWithDeposit ? 'text-[#2563EB]' : 'text-gray-400'
                }
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {language === 'th'
                    ? 'ชำระแยกรายเดือน'
                    : 'Pay Separately (Monthly)'}
                </p>
                <p className="text-xs text-gray-500">
                  {formatPrice(plan.monthlyPremium)}{' '}
                  {language === 'th' ? '/เดือน' : '/month'}
                </p>
              </div>
            </label>
            <label
              className={[
                'flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer',
                payWithDeposit
                  ? 'border-[#2563EB] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300',
              ].join(' ')}
            >
              <input
                type="radio"
                name="payment"
                checked={payWithDeposit}
                onChange={() => setPayWithDeposit(true)}
                className="text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
              />
              <Banknote
                size={16}
                className={
                  payWithDeposit ? 'text-[#2563EB]' : 'text-gray-400'
                }
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {language === 'th'
                    ? 'หักจากเงินมัดจำ'
                    : 'Deduct from Deposit'}
                </p>
                <p className="text-xs text-gray-500">
                  {language === 'th'
                    ? 'หักเบี้ยประกันปีแรกจากเงินมัดจำ'
                    : 'First year premium deducted from deposit'}
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">
              {language === 'th' ? 'เบี้ยประกันรายเดือน' : 'Monthly Premium'}
            </span>
            <span className="font-medium text-gray-900">
              {formatPrice(plan.monthlyPremium)}
            </span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">
              {language === 'th' ? 'เบี้ยประกันรายปี' : 'Annual Premium'}
            </span>
            <span className="font-medium text-gray-900">
              {formatPrice(plan.monthlyPremium * 12)}
            </span>
          </div>
          <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between text-sm">
            <span className="font-semibold text-gray-900">
              {language === 'th' ? 'ยอดชำระวันนี้' : 'Due Today'}
            </span>
            <span className="font-bold text-[#2563EB]">
              {payWithDeposit
                ? formatPrice(0)
                : formatPrice(plan.monthlyPremium)}
            </span>
          </div>
        </div>

        {/* Confirm */}
        <Button
          variant="accent"
          size="lg"
          fullWidth
          icon={Shield}
          onClick={() => onConfirm(policyHolder, payWithDeposit)}
        >
          {language === 'th' ? 'ยืนยันซื้อประกัน' : 'Confirm Purchase'}
        </Button>
      </div>
    </Modal>
  );
}
