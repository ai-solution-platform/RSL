'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { useAppStore } from '@/store';
import { ChevronLeft, Shield } from 'lucide-react';

interface PolicySection {
  titleEn: string;
  titleTh: string;
  contentEn: string;
  contentTh: string;
}

const policySections: PolicySection[] = [
  {
    titleEn: '1. Information We Collect',
    titleTh: '1. ข้อมูลที่เราเก็บรวบรวม',
    contentEn:
      'We collect information you provide directly, including your name, email address, phone number, business registration details, and financial documents. We also collect usage data such as search history, viewed properties, and interaction patterns to improve our matching algorithm.',
    contentTh:
      'เราเก็บรวบรวมข้อมูลที่คุณให้โดยตรง รวมถึงชื่อ อีเมล เบอร์โทรศัพท์ รายละเอียดการจดทะเบียนธุรกิจ และเอกสารทางการเงิน นอกจากนี้เรายังเก็บข้อมูลการใช้งาน เช่น ประวัติการค้นหา พื้นที่ที่ดู และรูปแบบการโต้ตอบเพื่อปรับปรุงระบบจับคู่ของเรา',
  },
  {
    titleEn: '2. How We Use Your Information',
    titleTh: '2. วิธีที่เราใช้ข้อมูลของคุณ',
    contentEn:
      'Your information is used to facilitate property matching, enable communication between tenants and landlords, process lease agreements, verify identity and business credentials, and provide personalized recommendations.',
    contentTh:
      'ข้อมูลของคุณถูกใช้เพื่ออำนวยความสะดวกในการจับคู่พื้นที่ เปิดการสื่อสารระหว่างผู้เช่าและเจ้าของ ดำเนินการสัญญาเช่า ตรวจสอบตัวตนและข้อมูลธุรกิจ และให้คำแนะนำที่เหมาะสม',
  },
  {
    titleEn: '3. Data Sharing and Disclosure',
    titleTh: '3. การแบ่งปันและเปิดเผยข้อมูล',
    contentEn:
      'We share your business profile information with potential landlords or tenants when you express interest in a property. We do not sell your personal data to third parties. We may share data with service providers who assist in platform operations, subject to confidentiality agreements.',
    contentTh:
      'เราแบ่งปันข้อมูลโปรไฟล์ธุรกิจของคุณกับเจ้าของหรือผู้เช่าที่มีศักยภาพเมื่อคุณแสดงความสนใจในพื้นที่ เราไม่ขายข้อมูลส่วนบุคคลของคุณให้บุคคลภายนอก เราอาจแบ่งปันข้อมูลกับผู้ให้บริการที่ช่วยดำเนินการแพลตฟอร์ม ภายใต้ข้อตกลงรักษาความลับ',
  },
  {
    titleEn: '4. Data Security',
    titleTh: '4. ความปลอดภัยของข้อมูล',
    contentEn:
      'We implement industry-standard security measures including encryption, secure servers, and access controls to protect your information. All financial documents are encrypted at rest and in transit. Regular security audits are conducted to ensure data integrity.',
    contentTh:
      'เราใช้มาตรการรักษาความปลอดภัยตามมาตรฐานอุตสาหกรรม รวมถึงการเข้ารหัส เซิร์ฟเวอร์ที่ปลอดภัย และการควบคุมการเข้าถึง เอกสารทางการเงินทั้งหมดถูกเข้ารหัสทั้งในขณะจัดเก็บและระหว่างการส่ง มีการตรวจสอบความปลอดภัยอย่างสม่ำเสมอ',
  },
  {
    titleEn: '5. Your Rights',
    titleTh: '5. สิทธิ์ของคุณ',
    contentEn:
      'Under the Thailand Personal Data Protection Act (PDPA), you have the right to access, correct, delete, or restrict processing of your personal data. You may also withdraw consent at any time. To exercise these rights, contact our data protection officer at privacy@rslplatform.com.',
    contentTh:
      'ภายใต้พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA) คุณมีสิทธิ์เข้าถึง แก้ไข ลบ หรือจำกัดการประมวลผลข้อมูลส่วนบุคคล คุณยังสามารถถอนความยินยอมได้ตลอดเวลา หากต้องการใช้สิทธิ์ กรุณาติดต่อเจ้าหน้าที่คุ้มครองข้อมูลที่ privacy@rslplatform.com',
  },
  {
    titleEn: '6. Cookies and Tracking',
    titleTh: '6. คุกกี้และการติดตาม',
    contentEn:
      'We use cookies and similar technologies to enhance your experience, remember preferences, and analyze usage patterns. You can manage cookie preferences in your browser settings. Essential cookies required for platform functionality cannot be disabled.',
    contentTh:
      'เราใช้คุกกี้และเทคโนโลยีที่คล้ายกันเพื่อปรับปรุงประสบการณ์ จดจำการตั้งค่า และวิเคราะห์รูปแบบการใช้งาน คุณสามารถจัดการการตั้งค่าคุกกี้ในเบราว์เซอร์ คุกกี้ที่จำเป็นสำหรับการทำงานของแพลตฟอร์มไม่สามารถปิดได้',
  },
  {
    titleEn: '7. Contact Us',
    titleTh: '7. ติดต่อเรา',
    contentEn:
      'For privacy-related inquiries, contact our Data Protection Officer at privacy@rslplatform.com or call 02-123-4567. Our office is located in Bangkok, Thailand.',
    contentTh:
      'สำหรับข้อสงสัยเกี่ยวกับความเป็นส่วนตัว ติดต่อเจ้าหน้าที่คุ้มครองข้อมูลที่ privacy@rslplatform.com หรือโทร 02-123-4567 สำนักงานของเราตั้งอยู่ในกรุงเทพฯ ประเทศไทย',
  },
];

export default function PrivacyPage() {
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
            <Shield size={20} className="text-violet-600" />
            <h1 className="text-lg font-bold text-gray-900">
              {language === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}
            </h1>
          </div>
        </div>
      </div>

      {/* Last updated */}
      <div className="px-4 py-3">
        <p className="text-xs text-gray-400">
          {language === 'th' ? 'อัปเดตล่าสุด: 1 มกราคม 2569' : 'Last updated: January 1, 2026'}
        </p>
      </div>

      {/* Policy Sections */}
      <div className="space-y-2">
        {policySections.map((section, index) => (
          <div key={index} className="bg-white px-4 py-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">
              {language === 'th' ? section.titleTh : section.titleEn}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {language === 'th' ? section.contentTh : section.contentEn}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
