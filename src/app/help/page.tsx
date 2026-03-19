'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { useAppStore } from '@/store';
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MessageSquare,
  Send,
  HelpCircle,
} from 'lucide-react';

interface FaqItem {
  questionEn: string;
  questionTh: string;
  answerEn: string;
  answerTh: string;
}

const faqItems: FaqItem[] = [
  {
    questionEn: 'How do I search for retail spaces?',
    questionTh: 'ฉันค้นหาพื้นที่ค้าปลีกได้อย่างไร?',
    answerEn:
      'Use the Discover tab to browse listings or the Map tab to find spaces by location. You can filter by budget, size, and business type.',
    answerTh:
      'ใช้แท็บค้นหาเพื่อดูประกาศ หรือแท็บแผนที่เพื่อค้นหาพื้นที่ตามตำแหน่ง คุณสามารถกรองตามงบประมาณ ขนาด และประเภทธุรกิจ',
  },
  {
    questionEn: 'How does the matching system work?',
    questionTh: 'ระบบจับคู่ทำงานอย่างไร?',
    answerEn:
      'Our AI-powered matching system analyzes your business profile, budget, and preferences to suggest the most suitable spaces with a match score.',
    answerTh:
      'ระบบจับคู่ด้วย AI วิเคราะห์โปรไฟล์ธุรกิจ งบประมาณ และความต้องการของคุณ เพื่อแนะนำพื้นที่ที่เหมาะสมที่สุดพร้อมคะแนนจับคู่',
  },
  {
    questionEn: 'How do I make an offer on a space?',
    questionTh: 'ฉันยื่นข้อเสนอพื้นที่ได้อย่างไร?',
    answerEn:
      'Open a property listing, tap Chat to contact the landlord, then use the Make Offer button to submit your proposed terms and price.',
    answerTh:
      'เปิดประกาศพื้นที่ กดแชทเพื่อติดต่อเจ้าของ จากนั้นใช้ปุ่มยื่นข้อเสนอเพื่อส่งเงื่อนไขและราคาที่ต้องการ',
  },
  {
    questionEn: 'What documents do I need to lease a space?',
    questionTh: 'ต้องใช้เอกสารอะไรบ้างในการเช่าพื้นที่?',
    answerEn:
      'Typically you need a business registration, ID verification, and financial statements. You can upload these in your profile under My Documents.',
    answerTh:
      'โดยทั่วไปต้องใช้ทะเบียนการค้า การยืนยันตัวตน และงบการเงิน คุณสามารถอัปโหลดเอกสารเหล่านี้ในโปรไฟล์ภายใต้เอกสารของฉัน',
  },
  {
    questionEn: 'How do I list my property as a landlord?',
    questionTh: 'ฉันลงประกาศพื้นที่ในฐานะเจ้าของได้อย่างไร?',
    answerEn:
      'Switch to Landlord mode using the toggle in the header, then go to Dashboard and tap Add Listing to create a new property listing.',
    answerTh:
      'สลับไปโหมดเจ้าของโดยใช้ปุ่มสลับในส่วนหัว จากนั้นไปที่แดชบอร์ดและกดเพิ่มประกาศเพื่อสร้างประกาศใหม่',
  },
];

export default function HelpPage() {
  const { language } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleFeedbackSubmit = () => {
    if (feedbackMessage.trim()) {
      setFeedbackSent(true);
      setFeedbackMessage('');
      setTimeout(() => setFeedbackSent(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link href="/profile" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
            <ChevronLeft size={20} className="text-gray-600" />
          </Link>
          <div className="flex items-center gap-2">
            <HelpCircle size={20} className="text-cyan-600" />
            <h1 className="text-lg font-bold text-gray-900">
              {language === 'th' ? 'ช่วยเหลือและสนับสนุน' : 'Help & Support'}
            </h1>
          </div>
        </div>
      </div>

      <div className="space-y-2 mt-2">
        {/* FAQ Section */}
        <div className="bg-white">
          <div className="px-4 py-3 border-b border-gray-50">
            <h2 className="text-sm font-semibold text-gray-900">
              {language === 'th' ? 'คำถามที่พบบ่อย' : 'Frequently Asked Questions'}
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {faqItems.map((faq, index) => (
              <div key={index}>
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm text-gray-700 pr-4">
                    {language === 'th' ? faq.questionTh : faq.questionEn}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp size={16} className="text-gray-400 shrink-0" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-400 shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-3">
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {language === 'th' ? faq.answerTh : faq.answerEn}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white">
          <div className="px-4 py-3 border-b border-gray-50">
            <h2 className="text-sm font-semibold text-gray-900">
              {language === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            <div className="px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <Mail size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {language === 'th' ? 'อีเมล' : 'Email'}
                </p>
                <p className="text-xs text-gray-500">support@rslplatform.com</p>
              </div>
            </div>
            <div className="px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                <Phone size={16} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {language === 'th' ? 'โทรศัพท์' : 'Phone'}
                </p>
                <p className="text-xs text-gray-500">02-123-4567</p>
              </div>
            </div>
            <div className="px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                <MessageSquare size={16} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Line</p>
                <p className="text-xs text-gray-500">@rslplatform</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="bg-white">
          <div className="px-4 py-3 border-b border-gray-50">
            <h2 className="text-sm font-semibold text-gray-900">
              {language === 'th' ? 'ส่งความคิดเห็น' : 'Send Feedback'}
            </h2>
          </div>
          <div className="px-4 py-3">
            <textarea
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
              placeholder={
                language === 'th'
                  ? 'แจ้งปัญหาหรือให้ข้อเสนอแนะ...'
                  : 'Report an issue or share your feedback...'
              }
              className="w-full h-24 text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 resize-none placeholder:text-gray-400"
            />
            <div className="flex items-center justify-between mt-2">
              {feedbackSent && (
                <p className="text-xs text-green-600">
                  {language === 'th' ? 'ส่งเรียบร้อยแล้ว!' : 'Feedback sent successfully!'}
                </p>
              )}
              <button
                onClick={handleFeedbackSubmit}
                disabled={!feedbackMessage.trim()}
                className="ml-auto flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={14} />
                {language === 'th' ? 'ส่ง' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
