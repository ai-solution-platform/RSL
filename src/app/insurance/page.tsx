'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Shield,
  Sparkles,
  ShoppingBag,
  Check,
} from 'lucide-react';
import PlanCard from '@/components/insurance/PlanCard';
import CoverageModal from '@/components/insurance/CoverageModal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import type { InsurancePlan, CoverageItem } from '@/types';

const mockPlans: InsurancePlan[] = [
  {
    id: 'plan-basic',
    name: 'Basic Protection',
    nameTh: 'แผนคุ้มครองพื้นฐาน',
    tier: 'basic',
    coverage: [
      {
        name: 'Fire Insurance',
        nameTh: 'ประกันอัคคีภัย',
        limit: 300000,
        description: 'Coverage for fire damage to the premises',
        descriptionTh: 'คุ้มครองความเสียหายจากเพลิงไหม้',
      },
      {
        name: 'Flood Insurance',
        nameTh: 'ประกันอุทกภัย',
        limit: 200000,
        description: 'Coverage for flood damage',
        descriptionTh: 'คุ้มครองความเสียหายจากน้ำท่วม',
      },
    ],
    monthlyPremium: 1500,
    description:
      'Essential coverage for fire and flood damage. Ideal for low-risk retail spaces.',
    descriptionTh:
      'ความคุ้มครองพื้นฐานสำหรับอัคคีภัยและอุทกภัย เหมาะสำหรับพื้นที่ค้าปลีกความเสี่ยงต่ำ',
  },
  {
    id: 'plan-standard',
    name: 'Standard Protection',
    nameTh: 'แผนคุ้มครองมาตรฐาน',
    tier: 'standard',
    coverage: [
      {
        name: 'Fire Insurance',
        nameTh: 'ประกันอัคคีภัย',
        limit: 500000,
        description: 'Coverage for fire damage to the premises',
        descriptionTh: 'คุ้มครองความเสียหายจากเพลิงไหม้',
      },
      {
        name: 'Flood Insurance',
        nameTh: 'ประกันอุทกภัย',
        limit: 300000,
        description: 'Coverage for flood damage',
        descriptionTh: 'คุ้มครองความเสียหายจากน้ำท่วม',
      },
      {
        name: 'Property Damage',
        nameTh: 'ความเสียหายต่อทรัพย์สิน',
        limit: 300000,
        description: 'Coverage for property and equipment damage',
        descriptionTh: 'คุ้มครองความเสียหายต่อทรัพย์สินและอุปกรณ์',
      },
      {
        name: 'Accident Coverage',
        nameTh: 'ประกันอุบัติเหตุ',
        limit: 200000,
        description: 'Coverage for accidents occurring on the premises',
        descriptionTh: 'คุ้มครองอุบัติเหตุที่เกิดขึ้นภายในพื้นที่',
      },
    ],
    monthlyPremium: 3500,
    description:
      'Comprehensive coverage including property damage and accidents. Recommended for restaurants and retail stores.',
    descriptionTh:
      'ความคุ้มครองครอบคลุมรวมความเสียหายต่อทรัพย์สินและอุบัติเหตุ แนะนำสำหรับร้านอาหารและร้านค้าปลีก',
  },
  {
    id: 'plan-premium',
    name: 'Premium Protection',
    nameTh: 'แผนคุ้มครองพรีเมียม',
    tier: 'premium',
    coverage: [
      {
        name: 'Fire Insurance',
        nameTh: 'ประกันอัคคีภัย',
        limit: 1000000,
        description: 'Full coverage for fire damage',
        descriptionTh: 'คุ้มครองเต็มวงเงินจากเพลิงไหม้',
      },
      {
        name: 'Flood Insurance',
        nameTh: 'ประกันอุทกภัย',
        limit: 500000,
        description: 'Full coverage for flood damage',
        descriptionTh: 'คุ้มครองเต็มวงเงินจากน้ำท่วม',
      },
      {
        name: 'Property Damage',
        nameTh: 'ความเสียหายต่อทรัพย์สิน',
        limit: 500000,
        description: 'Full coverage for property and equipment',
        descriptionTh: 'คุ้มครองเต็มวงเงินต่อทรัพย์สินและอุปกรณ์',
      },
      {
        name: 'Accident Coverage',
        nameTh: 'ประกันอุบัติเหตุ',
        limit: 500000,
        description: 'Full accident coverage',
        descriptionTh: 'คุ้มครองอุบัติเหตุเต็มวงเงิน',
      },
      {
        name: 'Business Interruption',
        nameTh: 'ธุรกิจหยุดชะงัก',
        limit: 300000,
        description: 'Income protection during business disruption',
        descriptionTh: 'คุ้มครองรายได้ระหว่างธุรกิจหยุดชะงัก',
      },
      {
        name: 'Customer Liability',
        nameTh: 'ความรับผิดต่อลูกค้า',
        limit: 200000,
        description: 'Third-party liability for customer injuries',
        descriptionTh: 'ความรับผิดต่อบุคคลภายนอกกรณีลูกค้าได้รับบาดเจ็บ',
      },
    ],
    monthlyPremium: 7500,
    description:
      'Maximum protection including business interruption and customer liability. Best for high-traffic venues and restaurants.',
    descriptionTh:
      'คุ้มครองสูงสุดรวมธุรกิจหยุดชะงักและความรับผิดต่อลูกค้า เหมาะสำหรับสถานที่ที่มีผู้คนจำนวนมากและร้านอาหาร',
  },
];

export default function InsurancePage() {
  const { language } = useTranslation();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<InsurancePlan | null>(
    mockPlans[1]
  );
  const [modalPlan, setModalPlan] = useState<InsurancePlan | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [policyHolder, setPolicyHolder] = useState<string>('tenant');
  const [purchasing, setPurchasing] = useState(false);

  const handleSelect = (plan: InsurancePlan) => {
    setSelectedPlan(plan);
  };

  const handleViewDetails = (plan: InsurancePlan) => {
    setModalPlan(plan);
    setModalOpen(true);
  };

  const handleConfirm = (holder: string, payWithDeposit: boolean) => {
    setPolicyHolder(holder);
    setModalOpen(false);
    setPurchasing(true);
    setTimeout(() => {
      router.push('/insurance/pol-001');
    }, 1500);
  };

  const handlePurchase = () => {
    if (!selectedPlan) return;
    setModalPlan(selectedPlan);
    setModalOpen(true);
  };

  const holderOptions = [
    { value: 'tenant', label: language === 'th' ? 'ผู้เช่า' : 'Tenant' },
    { value: 'landlord', label: language === 'th' ? 'เจ้าของ' : 'Landlord' },
    { value: 'joint', label: language === 'th' ? 'ร่วมกัน' : 'Joint' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loading overlay */}
      {purchasing && (
        <div className="fixed inset-0 z-50 bg-white/90 flex flex-col items-center justify-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-gray-200 border-t-[#F97316] animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield size={24} className="text-[#F97316]" />
            </div>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {language === 'th'
              ? 'กำลังออกกรมธรรม์...'
              : 'Issuing Your Policy...'}
          </p>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-[#2563EB]" />
            <h1 className="text-lg font-semibold text-gray-900">
              {language === 'th' ? 'เลือกแผนประกัน' : 'Select Insurance Plan'}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Recommendation Banner */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 flex items-center justify-center shrink-0">
              <Sparkles size={20} className="text-[#F97316]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {language === 'th'
                  ? 'คำแนะนำจาก AI'
                  : 'AI Recommendation'}
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                {language === 'th'
                  ? 'เราแนะนำแผนมาตรฐานสำหรับธุรกิจร้านอาหาร ครอบคลุมอัคคีภัย อุทกภัย ความเสียหายต่อทรัพย์สิน และอุบัติเหตุ เหมาะสมกับขนาดพื้นที่และประเภทธุรกิจของคุณ'
                  : 'We recommend the Standard plan for restaurant businesses. It covers fire, flood, property damage, and accidents - suitable for your space size and business type.'}
              </p>
              <div className="flex items-center gap-1.5 mt-2">
                <ShoppingBag size={14} className="text-amber-600" />
                <span className="text-xs font-medium text-amber-700">
                  {language === 'th'
                    ? 'ร้านอาหาร | 120 ตร.ม. | เขตปทุมวัน'
                    : 'Restaurant | 120 sqm | Pathumwan'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:items-start">
          {mockPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              selected={selectedPlan?.id === plan.id}
              popular={plan.tier === 'standard'}
              onSelect={handleSelect}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* Mobile horizontal scroll hint */}
        <p className="text-xs text-center text-gray-400 sm:hidden">
          {language === 'th'
            ? 'เลื่อนเพื่อดูแผนทั้งหมด'
            : 'Scroll to see all plans'}
        </p>

        {/* Policy Holder Selection */}
        {selectedPlan && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              {language === 'th' ? 'ผู้ถือกรมธรรม์' : 'Policy Holder'}
            </h3>
            <div className="flex gap-2">
              {holderOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPolicyHolder(opt.value)}
                  className={[
                    'flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer',
                    policyHolder === opt.value
                      ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300',
                  ].join(' ')}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Payment Summary */}
        {selectedPlan && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              {language === 'th' ? 'สรุปการชำระเงิน' : 'Payment Summary'}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {language === 'th' ? 'แผนที่เลือก' : 'Selected Plan'}
                </span>
                <span className="font-medium text-gray-900">
                  {language === 'th' ? selectedPlan.nameTh : selectedPlan.name}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {language === 'th' ? 'เบี้ยประกันรายเดือน' : 'Monthly Premium'}
                </span>
                <span className="font-medium text-gray-900">
                  {formatPrice(selectedPlan.monthlyPremium)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {language === 'th' ? 'เบี้ยประกันรายปี' : 'Annual Premium'}
                </span>
                <span className="font-medium text-gray-900">
                  {formatPrice(selectedPlan.monthlyPremium * 12)}
                </span>
              </div>
              <div className="border-t border-gray-100 pt-2 mt-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-900">
                    {language === 'th' ? 'ผู้ถือกรมธรรม์' : 'Policy Holder'}
                  </span>
                  <Badge variant="info" size="sm">
                    {holderOptions.find((o) => o.value === policyHolder)?.label}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Purchase CTA */}
        {selectedPlan && (
          <Button
            variant="accent"
            size="lg"
            fullWidth
            icon={Shield}
            onClick={handlePurchase}
          >
            {language === 'th'
              ? `ซื้อประกัน - ${formatPrice(selectedPlan.monthlyPremium)}/เดือน`
              : `Purchase Policy - ${formatPrice(selectedPlan.monthlyPremium)}/mo`}
          </Button>
        )}
      </div>

      {/* Coverage Modal */}
      <CoverageModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        plan={modalPlan}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
