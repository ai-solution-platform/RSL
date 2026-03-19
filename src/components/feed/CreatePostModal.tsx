'use client';

import { useState } from 'react';
import {
  X,
  Building2,
  Store,
  Camera,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreatePostModal({ open, onClose }: CreatePostModalProps) {
  const { t, language } = useTranslation();
  const [step, setStep] = useState(1);
  const [postType, setPostType] = useState<'space' | 'business' | null>(null);
  const [caption, setCaption] = useState('');

  if (!open) return null;

  const stepTitles = {
    1: language === 'th' ? 'เลือกประเภท' : 'Select Type',
    2: language === 'th' ? 'อัปโหลดรูป' : 'Upload Photos',
    3: language === 'th' ? 'เพิ่มรายละเอียด' : 'Add Details',
    4: language === 'th' ? 'เขียนคำบรรยาย' : 'Write Caption',
  };

  const handleAiGenerate = () => {
    if (postType === 'space') {
      setCaption(
        language === 'th'
          ? 'พื้นที่เช่าทำเลทองใจกลางสุขุมวิท เหมาะสำหรับคาเฟ่หรือร้านค้า ใกล้ BTS พร้อมเข้าใช้งานได้ทันที!'
          : 'Prime retail space in the heart of Sukhumvit, perfect for a cafe or retail shop. Near BTS, ready to move in!'
      );
    } else {
      setCaption(
        language === 'th'
          ? 'กำลังมองหาพื้นที่สำหรับเปิดคาเฟ่สไตล์ญี่ปุ่น ขนาด 40-60 ตร.ม. ย่านทองหล่อ-เอกมัย งบ 30,000-50,000 บาท/เดือน'
          : 'Looking for a space to open a Japanese-style cafe, 40-60 sqm in Thonglor-Ekkamai area. Budget 30,000-50,000 THB/mo'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {step > 1 && (
              <button onClick={() => setStep(step - 1)}>
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
            )}
            <h2 className="font-semibold text-gray-900">
              {stepTitles[step as keyof typeof stepTitles]}
            </h2>
          </div>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1 px-4 pt-3">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                s <= step ? 'bg-orange-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <div className="p-4">
          {/* Step 1: Select Type */}
          {step === 1 && (
            <div className="grid grid-cols-2 gap-3 mt-2">
              <button
                onClick={() => {
                  setPostType('space');
                  setStep(2);
                }}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${
                  postType === 'space'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900 text-sm">
                    {t('feed.promoteSpace')}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {language === 'th'
                      ? 'ลงประกาศพื้นที่ว่าง'
                      : 'List your available space'}
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setPostType('business');
                  setStep(2);
                }}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${
                  postType === 'business'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
                  <Store className="h-8 w-8 text-orange-600" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900 text-sm">
                    {t('feed.promoteBusiness')}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {language === 'th'
                      ? 'ประกาศหาพื้นที่'
                      : 'Find space for your business'}
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* Step 2: Upload Photos */}
          {step === 2 && (
            <div className="mt-2">
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 flex flex-col items-center gap-3 text-center hover:border-orange-400 hover:bg-orange-50/30 transition-colors cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <Camera className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">
                    {language === 'th'
                      ? 'แตะเพื่ออัปโหลดรูปภาพ'
                      : 'Tap to upload photos'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {language === 'th'
                      ? 'JPG, PNG สูงสุด 10 รูป'
                      : 'JPG, PNG up to 10 photos'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setStep(3)}
                className="w-full mt-4 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-colors"
              >
                {t('common.next')} <ChevronRight className="inline h-4 w-4" />
              </button>
            </div>
          )}

          {/* Step 3: Details Form */}
          {step === 3 && (
            <div className="mt-2 space-y-4">
              {postType === 'space' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('property.price')} ({language === 'th' ? 'บาท/เดือน' : 'THB/mo'})
                    </label>
                    <input
                      type="number"
                      placeholder="35,000"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('property.size')} ({language === 'th' ? 'ตร.ม.' : 'sqm'})
                    </label>
                    <input
                      type="number"
                      placeholder="45"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      {t('property.location')}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        language === 'th' ? 'สุขุมวิท ซอย 39' : 'Sukhumvit Soi 39'
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-sm"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('discover.businessType')}
                    </label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-sm bg-white">
                      <option>{t('business.cafe')}</option>
                      <option>{t('business.restaurant')}</option>
                      <option>{t('business.retail')}</option>
                      <option>{t('business.salon')}</option>
                      <option>{t('business.bakery')}</option>
                      <option>{t('business.gym')}</option>
                      <option>{t('business.other')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('discover.budget')} ({language === 'th' ? 'บาท/เดือน' : 'THB/mo'})
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder={language === 'th' ? 'ต่ำสุด' : 'Min'}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-sm"
                      />
                      <input
                        type="number"
                        placeholder={language === 'th' ? 'สูงสุด' : 'Max'}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      {language === 'th' ? 'พื้นที่ที่ต้องการ' : 'Preferred Location'}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        language === 'th' ? 'ทองหล่อ, เอกมัย' : 'Thonglor, Ekkamai'
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-sm"
                    />
                  </div>
                </>
              )}
              <button
                onClick={() => setStep(4)}
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-colors"
              >
                {t('common.next')} <ChevronRight className="inline h-4 w-4" />
              </button>
            </div>
          )}

          {/* Step 4: Caption */}
          {step === 4 && (
            <div className="mt-2 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    {language === 'th' ? 'คำบรรยาย' : 'Caption'}
                  </label>
                  <button
                    onClick={handleAiGenerate}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium hover:opacity-90 transition-opacity"
                  >
                    <Sparkles className="h-3 w-3" />
                    {language === 'th' ? 'AI สร้างให้' : 'AI Generate'}
                  </button>
                </div>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows={4}
                  placeholder={
                    language === 'th'
                      ? 'เขียนคำบรรยายโพสต์ของคุณ...'
                      : 'Write your post caption...'
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-sm resize-none"
                />
                <p className="text-right text-xs text-gray-400 mt-1">
                  {caption.length}/500
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-colors"
              >
                {language === 'th' ? 'เผยแพร่' : 'Publish'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
