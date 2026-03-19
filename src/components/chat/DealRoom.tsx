'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Paperclip,
  Banknote,
  ChevronRight,
  Check,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import ChatBubble from './ChatBubble';
import OfferCard from './OfferCard';
import type { Deal, Message, Offer, DealStatus } from '@/types';

interface DealRoomProps {
  deal: Deal;
  propertyTitle: string;
  propertyTitleTh: string;
  propertyImage: string;
  propertyPrice: number;
  otherPartyName: string;
  otherPartyAvatar: string;
  currentUserId: string;
}

const dealStages: { key: DealStatus; en: string; th: string }[] = [
  { key: 'inquiry', en: 'Interested', th: 'สนใจ' },
  { key: 'negotiation', en: 'Negotiation', th: 'เจรจา' },
  { key: 'pending_contract', en: 'Contract', th: 'สัญญา' },
  { key: 'pending_signature', en: 'Signature', th: 'เซ็นสัญญา' },
  { key: 'active', en: 'Active', th: 'ดำเนินการ' },
];

export default function DealRoom({
  deal,
  propertyTitle,
  propertyTitleTh,
  propertyImage,
  propertyPrice,
  otherPartyName,
  otherPartyAvatar,
  currentUserId,
}: DealRoomProps) {
  const { t, language } = useTranslation();
  const [message, setMessage] = useState('');
  const [showOfferForm, setShowOfferForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentStageIndex = dealStages.findIndex((s) => s.key === deal.status);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [deal.messages]);

  // Interleave messages and offers by timestamp
  const timeline: Array<{ type: 'message'; data: Message } | { type: 'offer'; data: Offer }> = [];
  deal.messages.forEach((m) => timeline.push({ type: 'message', data: m }));
  deal.offers.forEach((o) => timeline.push({ type: 'offer', data: o }));
  timeline.sort(
    (a, b) =>
      new Date(
        a.type === 'message' ? a.data.timestamp : a.data.createdAt
      ).getTime() -
      new Date(
        b.type === 'message' ? b.data.timestamp : b.data.createdAt
      ).getTime()
  );

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Property info header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={propertyImage}
              alt={propertyTitle}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-gray-900 truncate">
              {language === 'th' ? propertyTitleTh : propertyTitle}
            </h3>
            <p className="text-xs text-gray-500">
              {formatPrice(propertyPrice)}/{language === 'th' ? 'เดือน' : 'mo'}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <img
                src={otherPartyAvatar}
                alt={otherPartyName}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Deal status progress bar */}
        <div className="mt-3 flex items-center gap-1">
          {dealStages.map((stage, i) => (
            <div key={stage.key} className="flex-1 flex flex-col items-center">
              <div className="w-full flex items-center">
                <div
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i <= currentStageIndex ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              </div>
              <span
                className={`text-[9px] mt-1 ${
                  i <= currentStageIndex
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-400'
                }`}
              >
                {language === 'th' ? stage.th : stage.en}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {timeline.map((item, index) => {
          if (item.type === 'message') {
            const msg = item.data as Message;
            return (
              <ChatBubble
                key={`msg-${msg.id}`}
                message={msg}
                isOwn={msg.senderId === currentUserId}
              />
            );
          } else {
            const offer = item.data as Offer;
            return (
              <OfferCard
                key={`offer-${offer.id}`}
                offer={offer}
                isOwn={offer.createdBy === currentUserId}
              />
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Offer form overlay */}
      {showOfferForm && (
        <div className="bg-white border-t border-gray-200 px-4 py-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm text-gray-900">
              {t('chat.makeOffer')}
            </span>
            <button
              onClick={() => setShowOfferForm(false)}
              className="text-xs text-gray-500"
            >
              {t('common.cancel')}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] text-gray-500 mb-0.5 block">
                {language === 'th' ? 'ค่าเช่า' : 'Rent'}
              </label>
              <input
                type="number"
                placeholder="35,000"
                className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-500 mb-0.5 block">
                {t('contract.duration')}
              </label>
              <input
                type="number"
                placeholder="12"
                className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-500 mb-0.5 block">
                {t('contract.deposit')}
              </label>
              <input
                type="number"
                placeholder="2"
                className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={() => setShowOfferForm(false)}
            className="w-full py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors"
          >
            {t('common.submit')}
          </button>
        </div>
      )}

      {/* Bottom input bar */}
      <div className="bg-white border-t border-gray-100 px-3 py-2 pb-safe">
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Paperclip className="h-5 w-5" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                language === 'th' ? 'พิมพ์ข้อความ...' : 'Type a message...'
              }
              className="w-full px-4 py-2 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>
          <button
            onClick={() => setShowOfferForm(true)}
            className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors"
          >
            <Banknote className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
