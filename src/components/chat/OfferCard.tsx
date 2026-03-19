'use client';

import { useState } from 'react';
import { Check, X, ArrowLeftRight, Clock, Banknote, Calendar, Shield } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import type { Offer, OfferStatus } from '@/types';

interface OfferCardProps {
  offer: Offer;
  isOwn: boolean;
  onAccept?: () => void;
  onReject?: () => void;
  onCounter?: () => void;
}

const statusConfig: Record<
  OfferStatus,
  { label: string; labelTh: string; color: string; bg: string }
> = {
  pending: {
    label: 'Pending',
    labelTh: 'รอดำเนินการ',
    color: 'text-amber-700',
    bg: 'bg-amber-50 border-amber-200',
  },
  accepted: {
    label: 'Accepted',
    labelTh: 'ยอมรับแล้ว',
    color: 'text-green-700',
    bg: 'bg-green-50 border-green-200',
  },
  rejected: {
    label: 'Rejected',
    labelTh: 'ปฏิเสธแล้ว',
    color: 'text-red-700',
    bg: 'bg-red-50 border-red-200',
  },
  countered: {
    label: 'Countered',
    labelTh: 'เสนอราคาสวนแล้ว',
    color: 'text-blue-700',
    bg: 'bg-blue-50 border-blue-200',
  },
  withdrawn: {
    label: 'Withdrawn',
    labelTh: 'ถอนข้อเสนอ',
    color: 'text-gray-700',
    bg: 'bg-gray-50 border-gray-200',
  },
};

export default function OfferCard({
  offer,
  isOwn,
  onAccept,
  onReject,
  onCounter,
}: OfferCardProps) {
  const { t, language } = useTranslation();
  const config = statusConfig[offer.status];

  return (
    <div className={`mx-2 my-2 ${isOwn ? 'ml-auto max-w-[85%]' : 'mr-auto max-w-[85%]'}`}>
      <div className={`rounded-2xl border-2 p-4 ${config.bg}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Banknote className="h-4 w-4 text-gray-600" />
            <span className="font-semibold text-sm text-gray-900">
              {language === 'th' ? 'ข้อเสนอ' : 'Offer'}
            </span>
          </div>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color} ${config.bg}`}
          >
            {language === 'th' ? config.labelTh : config.label}
          </span>
        </div>

        {/* Offer details */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Banknote className="h-3.5 w-3.5" />
              <span className="text-xs">
                {language === 'th' ? 'ค่าเช่า/เดือน' : 'Rent/month'}
              </span>
            </div>
            <span className="font-bold text-sm text-gray-900">
              {formatPrice(offer.amount)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-3.5 w-3.5" />
              <span className="text-xs">{t('contract.duration')}</span>
            </div>
            <span className="font-semibold text-sm text-gray-900">
              {offer.duration} {language === 'th' ? 'เดือน' : 'months'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="h-3.5 w-3.5" />
              <span className="text-xs">{t('contract.deposit')}</span>
            </div>
            <span className="font-semibold text-sm text-gray-900">
              {offer.deposit} {language === 'th' ? 'เดือน' : 'months'}
            </span>
          </div>
        </div>

        {/* Conditions */}
        {offer.conditions && (
          <p className="mt-2 text-xs text-gray-500 italic border-t border-gray-200/60 pt-2">
            {offer.conditions}
          </p>
        )}

        {/* Action buttons (only shown for pending offers that aren't own) */}
        {offer.status === 'pending' && !isOwn && (
          <div className="flex gap-2 mt-3 pt-2 border-t border-gray-200/60">
            <button
              onClick={onAccept}
              className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white text-xs font-semibold transition-colors"
            >
              <Check className="h-3.5 w-3.5" />
              {t('chat.accept')}
            </button>
            <button
              onClick={onCounter}
              className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold transition-colors"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
              {t('chat.counterOffer')}
            </button>
            <button
              onClick={onReject}
              className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              {t('chat.reject')}
            </button>
          </div>
        )}

        {/* Timestamp */}
        <div className="flex items-center gap-1 mt-2">
          <Clock className="h-3 w-3 text-gray-400" />
          <span className="text-[10px] text-gray-400">
            {new Date(offer.createdAt).toLocaleString(
              language === 'th' ? 'th-TH' : 'en-US',
              {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
