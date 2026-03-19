'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { useAppStore } from '@/store';
import {
  ChevronLeft,
  Info,
  Target,
  Search,
  MapPin,
  MessageSquare,
  FileText,
  Shield,
  Zap,
  Users,
  Heart,
} from 'lucide-react';

interface Feature {
  icon: typeof Search;
  titleEn: string;
  titleTh: string;
  descEn: string;
  descTh: string;
}

const features: Feature[] = [
  {
    icon: Search,
    titleEn: 'Smart Discovery',
    titleTh: 'ค้นหาอัจฉริยะ',
    descEn: 'AI-powered matching to find the perfect retail space for your business.',
    descTh: 'ระบบจับคู่ด้วย AI เพื่อค้นหาพื้นที่ค้าปลีกที่เหมาะสมกับธุรกิจของคุณ',
  },
  {
    icon: MapPin,
    titleEn: 'Interactive Map',
    titleTh: 'แผนที่โต้ตอบ',
    descEn: 'Explore available spaces with zoning data and location analytics.',
    descTh: 'สำรวจพื้นที่ว่างพร้อมข้อมูลโซนนิ่งและการวิเคราะห์ทำเล',
  },
  {
    icon: MessageSquare,
    titleEn: 'Direct Chat',
    titleTh: 'แชทโดยตรง',
    descEn: 'Communicate directly with landlords and negotiate terms in real-time.',
    descTh: 'สื่อสารโดยตรงกับเจ้าของและเจรจาเงื่อนไขแบบเรียลไทม์',
  },
  {
    icon: FileText,
    titleEn: 'Digital Contracts',
    titleTh: 'สัญญาดิจิทัล',
    descEn: 'Generate, review, and sign lease agreements digitally.',
    descTh: 'สร้าง ตรวจสอบ และลงนามสัญญาเช่าแบบดิจิทัล',
  },
  {
    icon: Shield,
    titleEn: 'Verified Listings',
    titleTh: 'ประกาศที่ยืนยันแล้ว',
    descEn: 'All properties and users are verified for safety and trust.',
    descTh: 'พื้นที่และผู้ใช้ทั้งหมดได้รับการยืนยันเพื่อความปลอดภัยและความน่าเชื่อถือ',
  },
  {
    icon: Zap,
    titleEn: 'Fast Deals',
    titleTh: 'ดีลรวดเร็ว',
    descEn: 'Streamlined process from discovery to signed lease in days, not months.',
    descTh: 'กระบวนการที่คล่องตัวตั้งแต่ค้นหาจนถึงเซ็นสัญญาภายในไม่กี่วัน',
  },
];

interface TeamMember {
  nameEn: string;
  nameTh: string;
  roleEn: string;
  roleTh: string;
  emoji: string;
}

const teamMembers: TeamMember[] = [
  {
    nameEn: 'Thanakan P.',
    nameTh: 'ธนกานต์ ป.',
    roleEn: 'Founder & CEO',
    roleTh: 'ผู้ก่อตั้งและ CEO',
    emoji: '👨‍💼',
  },
  {
    nameEn: 'Siriporn K.',
    nameTh: 'ศิริพร ก.',
    roleEn: 'Head of Product',
    roleTh: 'หัวหน้าฝ่ายผลิตภัณฑ์',
    emoji: '👩‍💻',
  },
  {
    nameEn: 'Nattapong S.',
    nameTh: 'ณัฐพงศ์ ส.',
    roleEn: 'Lead Engineer',
    roleTh: 'วิศวกรหลัก',
    emoji: '👨‍🔧',
  },
  {
    nameEn: 'Kanokwan T.',
    nameTh: 'กนกวรรณ ท.',
    roleEn: 'Design Lead',
    roleTh: 'หัวหน้าฝ่ายออกแบบ',
    emoji: '👩‍🎨',
  },
];

export default function AboutPage() {
  const { language } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link href="/profile" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
            <ChevronLeft size={20} className="text-gray-600" />
          </Link>
          <div className="flex items-center gap-2">
            <Info size={20} className="text-blue-600" />
            <h1 className="text-lg font-bold text-gray-900">
              {language === 'th' ? 'เกี่ยวกับ RSL Platform' : 'About RSL Platform'}
            </h1>
          </div>
        </div>
      </div>

      <div className="space-y-2 mt-2">
        {/* Mission Section */}
        <div className="bg-white px-4 py-5">
          <div className="flex items-center gap-2 mb-3">
            <Target size={18} className="text-blue-600" />
            <h2 className="text-sm font-semibold text-gray-900">
              {language === 'th' ? 'พันธกิจของเรา' : 'Our Mission'}
            </h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {language === 'th'
              ? 'RSL Platform มุ่งมั่นที่จะเปลี่ยนแปลงวิธีที่ธุรกิจค้นหาและเช่าพื้นที่ค้าปลีกในประเทศไทย เราเชื่อมต่อผู้เช่ากับเจ้าของพื้นที่ผ่านเทคโนโลยี AI ที่จับคู่อย่างชาญฉลาด ทำให้กระบวนการเช่าง่าย รวดเร็ว และโปร่งใส'
              : 'RSL Platform is dedicated to transforming how businesses find and lease retail spaces in Thailand. We connect tenants with landlords through AI-powered smart matching technology, making the leasing process simple, fast, and transparent.'}
          </p>
        </div>

        {/* Features Section */}
        <div className="bg-white">
          <div className="px-4 py-3 border-b border-gray-50">
            <h2 className="text-sm font-semibold text-gray-900">
              {language === 'th' ? 'ฟีเจอร์หลัก' : 'Key Features'}
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="px-4 py-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {language === 'th' ? feature.titleTh : feature.titleEn}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      {language === 'th' ? feature.descTh : feature.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white">
          <div className="px-4 py-3 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-gray-600" />
              <h2 className="text-sm font-semibold text-gray-900">
                {language === 'th' ? 'ทีมของเรา' : 'Our Team'}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 p-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">{member.emoji}</div>
                <p className="text-sm font-medium text-gray-900">
                  {language === 'th' ? member.nameTh : member.nameEn}
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  {language === 'th' ? member.roleTh : member.roleEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Version Info */}
        <div className="bg-white px-4 py-4">
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#2563EB]">
                <span className="text-sm font-bold text-white tracking-tight">R</span>
              </div>
              <span className="text-lg font-bold text-gray-900">RSL Platform</span>
            </div>
            <p className="text-xs text-gray-500">
              {language === 'th' ? 'เวอร์ชัน' : 'Version'} 1.0.0
            </p>
            <p className="text-xs text-gray-400">
              {language === 'th' ? 'สร้างในปี 2569' : 'Built in 2026'}
            </p>
            <div className="flex items-center justify-center gap-1 pt-2">
              <Heart size={12} className="text-red-400" />
              <p className="text-[10px] text-gray-400">
                {language === 'th' ? 'สร้างด้วยใจ ในกรุงเทพฯ ประเทศไทย' : 'Made with love in Bangkok, Thailand'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
