'use client';

import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Phone, MoreVertical } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import DealRoom from '@/components/chat/DealRoom';
import type { Deal, Message, Offer } from '@/types';

const currentUserId = 'current-user';

const mockDeals: Record<
  string,
  {
    deal: Deal;
    propertyTitle: string;
    propertyTitleTh: string;
    propertyImage: string;
    propertyPrice: number;
    otherPartyName: string;
    otherPartyAvatar: string;
  }
> = {
  'deal-1': {
    deal: {
      id: 'deal-1',
      propertyId: 'p1',
      tenantId: 'current-user',
      landlordId: 'u1',
      status: 'negotiation',
      offers: [
        {
          id: 'o1',
          amount: 35000,
          duration: 12,
          deposit: 3,
          conditions: 'Fitout allowance included',
          status: 'countered',
          createdBy: 'u1',
          createdAt: '2026-03-17T10:00:00Z',
        },
        {
          id: 'o2',
          amount: 30000,
          duration: 12,
          deposit: 2,
          conditions: 'Rent-free first month requested',
          status: 'countered',
          createdBy: 'current-user',
          createdAt: '2026-03-18T09:00:00Z',
        },
        {
          id: 'o3',
          amount: 32000,
          duration: 12,
          deposit: 2,
          conditions: 'Final offer, includes maintenance',
          status: 'pending',
          createdBy: 'u1',
          createdAt: '2026-03-19T08:00:00Z',
        },
      ],
      messages: [
        {
          id: 'm1',
          senderId: 'u1',
          content: 'Welcome! Thanks for your interest in our Sukhumvit property.',
          attachments: [],
          timestamp: '2026-03-17T09:00:00Z',
          read: true,
        },
        {
          id: 'm2',
          senderId: 'current-user',
          content: 'Hi! The location is perfect for my cafe. Can we discuss pricing?',
          attachments: [],
          timestamp: '2026-03-17T09:30:00Z',
          read: true,
        },
        {
          id: 'm3',
          senderId: 'u1',
          content: 'Of course! I have sent you our initial offer. The space is 45 sqm with full kitchen utilities.',
          attachments: [],
          timestamp: '2026-03-17T10:00:00Z',
          read: true,
        },
        {
          id: 'm4',
          senderId: 'current-user',
          content: 'The price is a bit high for my budget. Can we negotiate?',
          attachments: [],
          timestamp: '2026-03-18T08:30:00Z',
          read: true,
        },
        {
          id: 'm5',
          senderId: 'current-user',
          content: 'I have submitted a counter offer. Please review.',
          attachments: [],
          timestamp: '2026-03-18T09:00:00Z',
          read: true,
        },
        {
          id: 'm6',
          senderId: 'u1',
          content: 'I appreciate your offer. Let me check with management and get back to you.',
          attachments: [],
          timestamp: '2026-03-18T14:00:00Z',
          read: true,
        },
        {
          id: 'm7',
          senderId: 'u1',
          content: 'Here is our final offer. We can do 32,000/month including maintenance. This is our best price.',
          attachments: [],
          timestamp: '2026-03-19T08:00:00Z',
          read: true,
        },
        {
          id: 'm8',
          senderId: 'u1',
          content: 'When can you visit the space? We are available this week.',
          attachments: [],
          timestamp: '2026-03-19T09:30:00Z',
          read: false,
        },
      ],
      createdAt: '2026-03-17T09:00:00Z',
      updatedAt: '2026-03-19T09:30:00Z',
    },
    propertyTitle: 'Sukhumvit Soi 39 Retail Space',
    propertyTitleTh: 'พื้นที่ค้าปลีก สุขุมวิท ซอย 39',
    propertyImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80',
    propertyPrice: 35000,
    otherPartyName: 'Siam Property Group',
    otherPartyAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
  },
  'deal-2': {
    deal: {
      id: 'deal-2',
      propertyId: 'p5',
      tenantId: 'current-user',
      landlordId: 'u5',
      status: 'pending_contract',
      offers: [
        {
          id: 'o4',
          amount: 55000,
          duration: 24,
          deposit: 3,
          conditions: 'Renovations allowed with approval',
          status: 'accepted',
          createdBy: 'u5',
          createdAt: '2026-03-15T10:00:00Z',
        },
      ],
      messages: [
        {
          id: 'm9',
          senderId: 'u5',
          content: 'Great news! We have accepted your terms. The contract draft is being prepared.',
          attachments: [],
          timestamp: '2026-03-18T10:00:00Z',
          read: true,
        },
        {
          id: 'm10',
          senderId: 'u5',
          content: 'Contract draft has been sent. Please review.',
          attachments: [{ name: 'contract_draft.pdf', url: '#', type: 'application/pdf', size: 245000 }],
          timestamp: '2026-03-19T08:15:00Z',
          read: false,
        },
      ],
      createdAt: '2026-03-14T09:00:00Z',
      updatedAt: '2026-03-19T08:15:00Z',
    },
    propertyTitle: 'Silom Corner Shop',
    propertyTitleTh: 'ร้านหัวมุม ถนนสีลม',
    propertyImage: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=400&q=80',
    propertyPrice: 55000,
    otherPartyName: 'Bangkok Land Co.',
    otherPartyAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
  },
  'deal-3': {
    deal: {
      id: 'deal-3',
      propertyId: 'p3',
      tenantId: 'current-user',
      landlordId: 'u3',
      status: 'pending_signature',
      offers: [
        {
          id: 'o5',
          amount: 120000,
          duration: 36,
          deposit: 3,
          conditions: 'Premium location, includes parking',
          status: 'accepted',
          createdBy: 'u3',
          createdAt: '2026-03-10T10:00:00Z',
        },
      ],
      messages: [
        {
          id: 'm11',
          senderId: 'u3',
          content: 'Everything looks good! Insurance documents are ready for your signature.',
          attachments: [],
          timestamp: '2026-03-18T16:45:00Z',
          read: true,
        },
      ],
      createdAt: '2026-03-08T09:00:00Z',
      updatedAt: '2026-03-18T16:45:00Z',
    },
    propertyTitle: 'CentralWorld Zone A',
    propertyTitleTh: 'เซ็นทรัลเวิลด์ โซน A',
    propertyImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80',
    propertyPrice: 120000,
    otherPartyName: 'Central Retail',
    otherPartyAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
  'deal-4': {
    deal: {
      id: 'deal-4',
      propertyId: 'p8',
      tenantId: 'u6',
      landlordId: 'current-user',
      status: 'negotiation',
      offers: [
        {
          id: 'o6',
          amount: 45000,
          duration: 12,
          deposit: 3,
          conditions: 'Need ground floor access',
          status: 'pending',
          createdBy: 'u6',
          createdAt: '2026-03-18T14:20:00Z',
        },
      ],
      messages: [
        {
          id: 'm12',
          senderId: 'u6',
          content: 'Can we negotiate on the deposit? 3 months is too high.',
          attachments: [],
          timestamp: '2026-03-18T14:20:00Z',
          read: true,
        },
      ],
      createdAt: '2026-03-17T09:00:00Z',
      updatedAt: '2026-03-18T14:20:00Z',
    },
    propertyTitle: 'Ari Wellness Space',
    propertyTitleTh: 'พื้นที่เวลเนส อารีย์',
    propertyImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6c?w=400&q=80',
    propertyPrice: 50000,
    otherPartyName: 'Nida Wellness',
    otherPartyAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
  },
  'deal-5': {
    deal: {
      id: 'deal-5',
      propertyId: 'p7',
      tenantId: 'current-user',
      landlordId: 'u7',
      status: 'inquiry',
      offers: [],
      messages: [
        {
          id: 'm13',
          senderId: 'u7',
          content: 'Thanks for your interest! Let me send you the floor plan.',
          attachments: [],
          timestamp: '2026-03-17T11:00:00Z',
          read: false,
        },
      ],
      createdAt: '2026-03-17T10:00:00Z',
      updatedAt: '2026-03-17T11:00:00Z',
    },
    propertyTitle: 'Thonglor Pop-up Space',
    propertyTitleTh: 'พื้นที่ Pop-up ทองหล่อ',
    propertyImage: 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=400&q=80',
    propertyPrice: 25000,
    otherPartyName: 'TCC Assets',
    otherPartyAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
  },
};

export default function ChatRoomClient() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { language } = useTranslation();

  const dealId = params.id;
  const data = mockDeals[dealId];

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">
          {language === 'th' ? 'ไม่พบการสนทนา' : 'Conversation not found'}
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-3 py-3 flex items-center gap-3 z-10">
        <button
          onClick={() => router.push('/chat')}
          className="p-1 text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="h-9 w-9 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={data.otherPartyAvatar}
            alt={data.otherPartyName}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-sm text-gray-900 truncate">
            {data.otherPartyName}
          </h2>
          <span className="text-[10px] text-green-500">
            {language === 'th' ? 'ออนไลน์' : 'Online'}
          </span>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <Phone className="h-5 w-5" />
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      {/* Deal room */}
      <div className="flex-1 overflow-hidden">
        <DealRoom
          deal={data.deal}
          propertyTitle={data.propertyTitle}
          propertyTitleTh={data.propertyTitleTh}
          propertyImage={data.propertyImage}
          propertyPrice={data.propertyPrice}
          otherPartyName={data.otherPartyName}
          otherPartyAvatar={data.otherPartyAvatar}
          currentUserId={currentUserId}
        />
      </div>
    </div>
  );
}
