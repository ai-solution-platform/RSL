'use client';

import { useRouter } from 'next/navigation';
import {
  Eye,
  MessageSquare,
  FileText,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import type { DealStatus } from '@/types';

interface DealCard {
  id: string;
  chatId: string;
  propertyTitle: string;
  propertyTitleTh: string;
  propertyImage: string;
  price: number;
  otherParty: string;
  otherPartyRole: 'tenant' | 'landlord';
  otherPartyAvatar: string;
  status: DealStatus;
  updatedAt: string;
}

const columns: {
  key: DealStatus;
  en: string;
  th: string;
  color: string;
  bgColor: string;
  icon: React.ElementType;
}[] = [
  {
    key: 'inquiry',
    en: 'Interested',
    th: 'สนใจ',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200',
    icon: Eye,
  },
  {
    key: 'negotiation',
    en: 'Negotiation',
    th: 'เจรจา',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200',
    icon: MessageSquare,
  },
  {
    key: 'pending_contract',
    en: 'Contract Draft',
    th: 'ร่างสัญญา',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 border-amber-200',
    icon: FileText,
  },
  {
    key: 'pending_signature',
    en: 'Insurance',
    th: 'ประกัน',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50 border-teal-200',
    icon: Shield,
  },
  {
    key: 'active',
    en: 'Closed',
    th: 'ปิดดีล',
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200',
    icon: CheckCircle2,
  },
];

const mockDeals: DealCard[] = [
  {
    id: 'd1',
    chatId: 'deal-5',
    propertyTitle: 'Thonglor Pop-up Space',
    propertyTitleTh: 'พื้นที่ Pop-up ทองหล่อ',
    propertyImage: 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=300&q=80',
    price: 25000,
    otherParty: 'TCC Assets',
    otherPartyRole: 'landlord',
    otherPartyAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    status: 'inquiry',
    updatedAt: '2026-03-17T11:00:00Z',
  },
  {
    id: 'd2',
    chatId: 'deal-1',
    propertyTitle: 'Sukhumvit Soi 39 Retail',
    propertyTitleTh: 'พื้นที่ค้าปลีก สุขุมวิท ซอย 39',
    propertyImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&q=80',
    price: 32000,
    otherParty: 'Siam Property Group',
    otherPartyRole: 'landlord',
    otherPartyAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
    status: 'negotiation',
    updatedAt: '2026-03-19T09:30:00Z',
  },
  {
    id: 'd3',
    chatId: 'deal-4',
    propertyTitle: 'Ari Wellness Space',
    propertyTitleTh: 'พื้นที่เวลเนส อารีย์',
    propertyImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6c?w=300&q=80',
    price: 45000,
    otherParty: 'Nida Wellness',
    otherPartyRole: 'tenant',
    otherPartyAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    status: 'negotiation',
    updatedAt: '2026-03-18T14:20:00Z',
  },
  {
    id: 'd4',
    chatId: 'deal-2',
    propertyTitle: 'Silom Corner Shop',
    propertyTitleTh: 'ร้านหัวมุม ถนนสีลม',
    propertyImage: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=300&q=80',
    price: 55000,
    otherParty: 'Bangkok Land Co.',
    otherPartyRole: 'landlord',
    otherPartyAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    status: 'pending_contract',
    updatedAt: '2026-03-19T08:15:00Z',
  },
  {
    id: 'd5',
    chatId: 'deal-3',
    propertyTitle: 'CentralWorld Zone A',
    propertyTitleTh: 'เซ็นทรัลเวิลด์ โซน A',
    propertyImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&q=80',
    price: 120000,
    otherParty: 'Central Retail',
    otherPartyRole: 'landlord',
    otherPartyAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    status: 'pending_signature',
    updatedAt: '2026-03-18T16:45:00Z',
  },
  {
    id: 'd6',
    chatId: 'deal-6',
    propertyTitle: 'Ratchada Night Market',
    propertyTitleTh: 'ตลาดนัดรัชดา',
    propertyImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&q=80',
    price: 15000,
    otherParty: 'Market Corp',
    otherPartyRole: 'landlord',
    otherPartyAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80',
    status: 'active',
    updatedAt: '2026-03-10T10:00:00Z',
  },
  {
    id: 'd7',
    chatId: 'deal-7',
    propertyTitle: 'Chatuchak Weekend Zone',
    propertyTitleTh: 'โซนจตุจักร วีคเอนด์',
    propertyImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&q=80',
    price: 18000,
    otherParty: 'JJ Market Ltd.',
    otherPartyRole: 'landlord',
    otherPartyAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
    status: 'active',
    updatedAt: '2026-03-05T10:00:00Z',
  },
];

export default function DealsPage() {
  const { t, language } = useTranslation();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-4 pb-3">
        <h1 className="text-xl font-bold text-gray-900">
          {language === 'th' ? 'ดีลของฉัน' : 'My Deals'}
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          {language === 'th'
            ? `${mockDeals.length} ดีลทั้งหมด`
            : `${mockDeals.length} total deals`}
        </p>
      </div>

      {/* Kanban board */}
      <div className="overflow-x-auto px-3 pt-4">
        <div className="flex gap-3 min-w-max pb-4">
          {columns.map((col) => {
            const columnDeals = mockDeals.filter((d) => d.status === col.key);
            const Icon = col.icon;

            return (
              <div
                key={col.key}
                className="w-72 flex-shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm"
              >
                {/* Column header */}
                <div className="px-4 py-3 border-b border-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-4 w-4 ${col.color}`} />
                      <span className="font-semibold text-sm text-gray-900">
                        {language === 'th' ? col.th : col.en}
                      </span>
                    </div>
                    <span
                      className={`h-5 min-w-[20px] px-1.5 rounded-full text-[10px] font-bold flex items-center justify-center ${col.bgColor} ${col.color}`}
                    >
                      {columnDeals.length}
                    </span>
                  </div>
                </div>

                {/* Column cards */}
                <div className="p-2 space-y-2 min-h-[120px]">
                  {columnDeals.length === 0 && (
                    <div className="flex items-center justify-center py-8 text-gray-300 text-xs">
                      {language === 'th' ? 'ไม่มีดีล' : 'No deals'}
                    </div>
                  )}
                  {columnDeals.map((deal) => (
                    <button
                      key={deal.id}
                      onClick={() => router.push(`/chat/${deal.chatId}`)}
                      className={`w-full rounded-xl border p-3 hover:shadow-md transition-all text-left ${col.bgColor}`}
                    >
                      {/* Property image + title */}
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={deal.propertyImage}
                            alt={deal.propertyTitle}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-xs text-gray-900 truncate">
                            {language === 'th'
                              ? deal.propertyTitleTh
                              : deal.propertyTitle}
                          </h4>
                          <p className="text-[10px] text-gray-500">
                            {formatPrice(deal.price)}/
                            {language === 'th' ? 'เดือน' : 'mo'}
                          </p>
                        </div>
                      </div>

                      {/* Other party */}
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full overflow-hidden">
                          <img
                            src={deal.otherPartyAvatar}
                            alt={deal.otherParty}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="text-[10px] text-gray-600 truncate">
                          {deal.otherParty}
                        </span>
                        <span
                          className={`ml-auto px-1.5 py-0.5 rounded text-[9px] font-medium ${
                            deal.otherPartyRole === 'tenant'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {deal.otherPartyRole === 'tenant'
                            ? language === 'th'
                              ? 'ผู้เช่า'
                              : 'Tenant'
                            : language === 'th'
                              ? 'เจ้าของ'
                              : 'Landlord'}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
