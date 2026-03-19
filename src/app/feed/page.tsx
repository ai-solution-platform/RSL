'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import FeedCard from '@/components/feed/FeedCard';
import CreatePostModal from '@/components/feed/CreatePostModal';
import type { FeedPost } from '@/types';

const mockUsers = [
  {
    id: 'u1',
    name: 'Siam Property Group',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
    verified: true,
  },
  {
    id: 'u2',
    name: 'Cafe Nomad BKK',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    verified: false,
  },
  {
    id: 'u3',
    name: 'Central Retail',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    verified: true,
  },
  {
    id: 'u4',
    name: "Som's Bakery",
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    verified: false,
  },
  {
    id: 'u5',
    name: 'Bangkok Land',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    verified: true,
  },
  {
    id: 'u6',
    name: 'Nida Wellness',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    verified: false,
  },
  {
    id: 'u7',
    name: 'TCC Assets',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    verified: true,
  },
  {
    id: 'u8',
    name: 'Pim Fashion',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
    verified: false,
  },
];

const mockFeedPosts: FeedPost[] = [
  {
    id: 'fp1',
    userId: 'u1',
    type: 'space',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80' },
    ],
    caption: 'Premium retail space in Sukhumvit Soi 39. High foot traffic, near BTS Phrom Phong. Perfect for cafes or boutique shops.',
    captionTh: 'พื้นที่เช่าทำเลทอง สุขุมวิท ซอย 39 ใกล้ BTS พร้อมพงษ์ ผู้คนพลุกพล่าน เหมาะสำหรับคาเฟ่หรือร้านบูทีค',
    propertyId: 'p1',
    matchScore: 92,
    tags: ['Sukhumvit', 'Cafe', 'BTS', 'HighTraffic'],
    likes: 234,
    comments: [
      { id: 'c1', userId: 'u2', content: 'สนใจมากครับ!', createdAt: '2026-03-19T08:00:00Z' },
    ],
    shares: 45,
    createdAt: '2026-03-19T06:00:00Z',
  },
  {
    id: 'fp2',
    userId: 'u2',
    type: 'business',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80' },
    ],
    caption: 'Looking for space to open a specialty coffee shop. 40-60 sqm, Thonglor-Ekkamai area. Budget 30,000-50,000/mo.',
    captionTh: 'กำลังมองหาพื้นที่เปิดร้านกาแฟ Specialty ขนาด 40-60 ตร.ม. ย่านทองหล่อ-เอกมัย งบ 30,000-50,000/เดือน',
    matchScore: 85,
    tags: ['Cafe', 'Thonglor', 'Ekkamai', 'Specialty'],
    likes: 156,
    comments: [
      { id: 'c2', userId: 'u1', content: 'We have perfect spot!', createdAt: '2026-03-19T07:00:00Z' },
      { id: 'c3', userId: 'u3', content: 'Check DM', createdAt: '2026-03-19T07:30:00Z' },
    ],
    shares: 28,
    createdAt: '2026-03-19T04:00:00Z',
  },
  {
    id: 'fp3',
    userId: 'u3',
    type: 'space',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80' },
    ],
    caption: 'Ground floor retail at CentralWorld zone. 120 sqm with full fitout. Available from April 2026.',
    captionTh: 'ชั้น G โซน CentralWorld ขนาด 120 ตร.ม. ตกแต่งพร้อมเข้าอยู่ ว่างตั้งแต่เมษายน 2569',
    propertyId: 'p3',
    matchScore: 78,
    tags: ['CentralWorld', 'Retail', 'Premium', 'GroundFloor'],
    likes: 412,
    comments: [],
    shares: 89,
    createdAt: '2026-03-18T12:00:00Z',
  },
  {
    id: 'fp4',
    userId: 'u4',
    type: 'business',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&q=80' },
    ],
    caption: 'Expanding our bakery chain! Need 30-50 sqm space in community malls. Multiple locations wanted.',
    captionTh: 'ขยายสาขาเบเกอรี่! ต้องการพื้นที่ 30-50 ตร.ม. ในคอมมิวนิตี้มอลล์ ต้องการหลายสาขา',
    matchScore: 88,
    tags: ['Bakery', 'CommunityMall', 'Expansion', 'Chain'],
    likes: 98,
    comments: [
      { id: 'c4', userId: 'u5', content: 'มีพื้นที่ว่างครับ', createdAt: '2026-03-18T14:00:00Z' },
    ],
    shares: 15,
    createdAt: '2026-03-18T10:00:00Z',
  },
  {
    id: 'fp5',
    userId: 'u5',
    type: 'space',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80' },
    ],
    caption: 'Corner shop on Silom Road. 80 sqm, excellent visibility. Suitable for clinics, salons, or retail.',
    captionTh: 'ร้านหัวมุมถนนสีลม ขนาด 80 ตร.ม. มองเห็นชัดเจน เหมาะสำหรับคลินิก ร้านเสริมสวย หรือร้านค้า',
    propertyId: 'p5',
    matchScore: 95,
    tags: ['Silom', 'CornerShop', 'Clinic', 'HighVisibility'],
    likes: 567,
    comments: [
      { id: 'c5', userId: 'u6', content: 'Perfect for my clinic!', createdAt: '2026-03-17T16:00:00Z' },
    ],
    shares: 112,
    createdAt: '2026-03-17T09:00:00Z',
  },
  {
    id: 'fp6',
    userId: 'u6',
    type: 'business',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6c?w=800&q=80' },
    ],
    caption: 'Opening a wellness spa + yoga studio. Need 100+ sqm, ground floor with parking. Ari-Phahonyothin area preferred.',
    captionTh: 'จะเปิดสปาเพื่อสุขภาพ + สตูดิโอโยคะ ต้องการพื้นที่ 100+ ตร.ม. ชั้น G มีที่จอดรถ ต้องการย่านอารีย์-พหลโยธิน',
    matchScore: 72,
    tags: ['Spa', 'Yoga', 'Ari', 'Wellness'],
    likes: 201,
    comments: [],
    shares: 34,
    createdAt: '2026-03-17T07:00:00Z',
  },
  {
    id: 'fp7',
    userId: 'u7',
    type: 'space',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=800&q=80' },
    ],
    caption: 'Pop-up space at The Commons Thonglor. 25 sqm, fully furnished. Available for 1-3 month lease.',
    captionTh: 'พื้นที่ Pop-up ที่ The Commons ทองหล่อ ขนาด 25 ตร.ม. ตกแต่งครบ เช่าได้ 1-3 เดือน',
    propertyId: 'p7',
    matchScore: 81,
    tags: ['PopUp', 'Thonglor', 'ShortTerm', 'TheCommons'],
    likes: 345,
    comments: [
      { id: 'c6', userId: 'u8', content: 'How much per month?', createdAt: '2026-03-16T18:00:00Z' },
    ],
    shares: 67,
    createdAt: '2026-03-16T14:00:00Z',
  },
  {
    id: 'fp8',
    userId: 'u8',
    type: 'business',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80' },
    ],
    caption: 'Fashion boutique looking for 50 sqm in Siam or Chidlom area. Need high foot traffic and young demographic.',
    captionTh: 'ร้านบูทีคแฟชั่นมองหาพื้นที่ 50 ตร.ม. ย่านสยาม-ชิดลม ต้องการทำเลผู้คนพลุกพล่าน กลุ่มเป้าหมายวัยรุ่น',
    matchScore: 76,
    tags: ['Fashion', 'Siam', 'Chidlom', 'Boutique'],
    likes: 189,
    comments: [],
    shares: 41,
    createdAt: '2026-03-16T11:00:00Z',
  },
];

export default function FeedPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Snap scroll container */}
      <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
        {mockFeedPosts.map((post) => {
          const user = mockUsers.find((u) => u.id === post.userId)!;
          return (
            <FeedCard
              key={post.id}
              post={post}
              userName={user.name}
              userAvatar={user.avatar}
              verified={user.verified}
            />
          );
        })}
      </div>

      {/* Floating create button */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-6 right-4 z-30 h-14 w-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30 flex items-center justify-center transition-all active:scale-90"
      >
        <Plus className="h-7 w-7" />
      </button>

      {/* Create post modal */}
      <CreatePostModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      {/* Hide scrollbar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
