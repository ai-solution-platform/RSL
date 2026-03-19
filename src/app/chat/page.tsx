'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Circle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { getTimeAgo } from '@/lib/utils';

interface Conversation {
  id: string;
  name: string;
  nameTh: string;
  avatar: string;
  lastMessage: string;
  lastMessageTh: string;
  timestamp: string;
  unread: number;
  online: boolean;
  propertyTitle: string;
}

const mockConversations: Conversation[] = [
  {
    id: 'deal-1',
    name: 'Siam Property Group',
    nameTh: 'สยาม พร็อพเพอร์ตี้ กรุ๊ป',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
    lastMessage: 'We can accept 32,000/month. When can you visit?',
    lastMessageTh: 'เรายอมรับ 32,000/เดือนได้ครับ มาดูพื้นที่ได้เมื่อไหร่?',
    timestamp: '2026-03-19T09:30:00Z',
    unread: 2,
    online: true,
    propertyTitle: 'Sukhumvit Soi 39 Retail',
  },
  {
    id: 'deal-2',
    name: 'Bangkok Land Co.',
    nameTh: 'บางกอก แลนด์',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    lastMessage: 'Contract draft has been sent. Please review.',
    lastMessageTh: 'ส่งร่างสัญญาให้แล้วครับ รบกวนตรวจสอบด้วย',
    timestamp: '2026-03-19T08:15:00Z',
    unread: 1,
    online: false,
    propertyTitle: 'Silom Corner Shop',
  },
  {
    id: 'deal-3',
    name: 'Central Retail',
    nameTh: 'เซ็นทรัล รีเทล',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    lastMessage: 'The insurance documents are ready for your signature.',
    lastMessageTh: 'เอกสารประกันพร้อมให้เซ็นแล้วครับ',
    timestamp: '2026-03-18T16:45:00Z',
    unread: 0,
    online: true,
    propertyTitle: 'CentralWorld Zone A',
  },
  {
    id: 'deal-4',
    name: 'Nida Wellness',
    nameTh: 'นิดา เวลเนส',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    lastMessage: 'Can we negotiate on the deposit? 3 months is too high.',
    lastMessageTh: 'ขอต่อรองเงินมัดจำได้ไหมคะ? 3 เดือนสูงไปค่ะ',
    timestamp: '2026-03-18T14:20:00Z',
    unread: 0,
    online: false,
    propertyTitle: 'Ari Wellness Space',
  },
  {
    id: 'deal-5',
    name: 'TCC Assets',
    nameTh: 'ทีซีซี แอสเซ็ท',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    lastMessage: 'Thanks for your interest! Let me send you the floor plan.',
    lastMessageTh: 'ขอบคุณที่สนใจครับ! ผมจะส่งแปลนให้ดูนะครับ',
    timestamp: '2026-03-17T11:00:00Z',
    unread: 3,
    online: false,
    propertyTitle: 'Thonglor Pop-up Space',
  },
];

export default function ChatListPage() {
  const { t, language } = useTranslation();
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filtered = mockConversations.filter((c) => {
    const name = language === 'th' ? c.nameTh : c.name;
    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      c.propertyTitle.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 pt-4 pb-2 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900 mb-3">
          {t('nav.chat')}
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              language === 'th' ? 'ค้นหาการสนทนา...' : 'Search conversations...'
            }
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="divide-y divide-gray-50">
        {filtered.map((conv) => (
          <button
            key={conv.id}
            onClick={() => router.push(`/chat/${conv.id}`)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img
                  src={conv.avatar}
                  alt={conv.name}
                  className="h-full w-full object-cover"
                />
              </div>
              {conv.online && (
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-semibold text-sm text-gray-900 truncate">
                  {language === 'th' ? conv.nameTh : conv.name}
                </span>
                <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2">
                  {getTimeAgo(conv.timestamp, language)}
                </span>
              </div>
              <div className="text-xs text-gray-500 truncate mb-0.5">
                {conv.propertyTitle}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500 truncate max-w-[70%]">
                  {language === 'th' ? conv.lastMessageTh : conv.lastMessage}
                </p>
                {conv.unread > 0 && (
                  <span className="flex-shrink-0 ml-2 h-5 min-w-[20px] px-1.5 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {conv.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Search className="h-10 w-10 mb-3" />
          <p className="text-sm">{t('common.noResults')}</p>
        </div>
      )}
    </div>
  );
}
