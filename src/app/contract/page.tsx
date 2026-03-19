'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Sparkles, ShieldCheck, ArrowLeft } from 'lucide-react';
import ContractForm from '@/components/contract/ContractForm';
import { useTranslation } from '@/lib/i18n';

export default function ContractPage() {
  const { language } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    // Simulate AI contract generation
    setTimeout(() => {
      router.push('/contract/ctr-001');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-[#2563EB]" />
            <h1 className="text-lg font-semibold text-gray-900">
              {language === 'th' ? 'สร้างสัญญา' : 'Create Contract'}
            </h1>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-white/90 flex flex-col items-center justify-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-gray-200 border-t-[#F97316] animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles size={24} className="text-[#F97316]" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">
              {language === 'th'
                ? 'กำลังสร้างสัญญา...'
                : 'Generating Contract...'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {language === 'th'
                ? 'AI กำลังร่างข้อกำหนดที่เหมาะสม'
                : 'AI is drafting appropriate clauses for you'}
            </p>
          </div>
          <div className="flex gap-1 mt-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[#F97316] animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* AI Info Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 mb-6">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 flex items-center justify-center shrink-0">
              <Sparkles size={20} className="text-[#2563EB]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {language === 'th'
                  ? 'สัญญาอัจฉริยะ AI'
                  : 'AI-Powered Contract Generation'}
              </h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                {language === 'th'
                  ? 'ระบบจะสร้างสัญญาเช่าที่ครอบคลุมข้อกำหนดทางกฎหมายไทย ตรวจสอบข้อจำกัดโซนนิ่ง และแจ้งเตือนความเสี่ยงโดยอัตโนมัติ คุณสามารถแก้ไขทุกข้อกำหนดได้ภายหลัง'
                  : 'Our system generates comprehensive lease agreements compliant with Thai law, checks zoning restrictions, and highlights risks automatically. You can edit all clauses afterwards.'}
              </p>
            </div>
          </div>
          <div className="flex gap-4 mt-3 ml-13">
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <ShieldCheck size={14} className="text-green-600" />
              {language === 'th' ? 'ตรวจสอบกฎหมายไทย' : 'Thai Law Compliant'}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <ShieldCheck size={14} className="text-green-600" />
              {language === 'th' ? 'สองภาษา' : 'Bilingual'}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6">
          <ContractForm onGenerate={handleGenerate} loading={loading} />
        </div>
      </div>
    </div>
  );
}
