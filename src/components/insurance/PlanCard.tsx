'use client';

import { Check, Star, Shield, ShieldCheck, ShieldPlus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import type { InsurancePlan, InsurancePlanTier } from '@/types';

interface PlanCardProps {
  plan: InsurancePlan;
  selected?: boolean;
  popular?: boolean;
  onSelect: (plan: InsurancePlan) => void;
  onViewDetails: (plan: InsurancePlan) => void;
}

const tierConfig: Record<
  InsurancePlanTier,
  {
    color: string;
    bg: string;
    border: string;
    badgeVariant: 'success' | 'warning' | 'danger';
    icon: typeof Shield;
    gradient: string;
  }
> = {
  basic: {
    color: 'text-green-700',
    bg: 'bg-green-50',
    border: 'border-green-200',
    badgeVariant: 'success',
    icon: Shield,
    gradient: 'from-green-500 to-emerald-600',
  },
  standard: {
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    badgeVariant: 'warning',
    icon: ShieldCheck,
    gradient: 'from-amber-500 to-orange-600',
  },
  premium: {
    color: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
    badgeVariant: 'danger',
    icon: ShieldPlus,
    gradient: 'from-red-500 to-rose-600',
  },
};

export default function PlanCard({
  plan,
  selected = false,
  popular = false,
  onSelect,
  onViewDetails,
}: PlanCardProps) {
  const { language } = useTranslation();
  const config = tierConfig[plan.tier];
  const TierIcon = config.icon;

  return (
    <div
      className={[
        'relative bg-white rounded-2xl border-2 shadow-sm transition-all duration-200 flex flex-col',
        selected
          ? 'border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-md'
          : 'border-gray-100 hover:border-gray-200 hover:shadow-md',
        popular ? 'sm:-mt-2 sm:mb-2' : '',
      ].join(' ')}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#F97316] text-white text-xs font-semibold rounded-full shadow-sm">
            <Star size={12} fill="currentColor" />
            {language === 'th' ? 'แนะนำ' : 'Most Popular'}
          </span>
        </div>
      )}

      {/* Header */}
      <div className={`p-5 pb-4 ${popular ? 'pt-7' : ''}`}>
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center`}
          >
            <TierIcon size={20} className="text-white" />
          </div>
          <div>
            <Badge variant={config.badgeVariant} size="sm">
              {plan.tier.charAt(0).toUpperCase() + plan.tier.slice(1)}
            </Badge>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900">
          {language === 'th' ? plan.nameTh : plan.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {language === 'th' ? plan.descriptionTh : plan.description}
        </p>

        {/* Price */}
        <div className="mt-4">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(plan.monthlyPremium)}
            </span>
            <span className="text-sm text-gray-500">
              {language === 'th' ? '/เดือน' : '/mo'}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mx-5" />

      {/* Coverage List */}
      <div className="p-5 pt-4 flex-1">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          {language === 'th' ? 'ความคุ้มครอง' : 'Coverage Includes'}
        </p>
        <ul className="space-y-2.5">
          {plan.coverage.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={12} className="text-green-600" />
              </div>
              <span className="text-sm text-gray-700">
                {language === 'th' ? item.nameTh : item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="p-5 pt-0 space-y-2">
        <Button
          variant={selected ? 'primary' : 'accent'}
          size="md"
          fullWidth
          onClick={() => onSelect(plan)}
          icon={selected ? Check : undefined}
        >
          {selected
            ? language === 'th'
              ? 'เลือกแล้ว'
              : 'Selected'
            : language === 'th'
              ? 'เลือกแผนนี้'
              : 'Select Plan'}
        </Button>
        <button
          onClick={() => onViewDetails(plan)}
          className="w-full text-center text-xs text-[#2563EB] hover:text-[#1d4ed8] font-medium py-1 cursor-pointer"
        >
          {language === 'th'
            ? 'ดูรายละเอียดความคุ้มครอง'
            : 'View Coverage Details'}
        </button>
      </div>
    </div>
  );
}
