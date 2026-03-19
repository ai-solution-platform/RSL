'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle2,
  Shield,
  Download,
  FolderOpen,
  ArrowRight,
  Calendar,
  Hash,
  User,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';

export default function InsurancePolicyClient() {
  const { language } = useTranslation();
  const router = useRouter();
  const [showCheck, setShowCheck] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowCheck(true), 300);
    const t2 = setTimeout(() => setShowContent(true), 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const policy = {
    id: 'POL-2026-08421',
    plan: 'Standard Protection',
    planTh: 'แผนคุ้มครองมาตรฐาน',
    tier: 'standard',
    coverageAmount: 1000000,
    premium: 3500,
    policyHolder: 'นายสมชาย รุ่งเรืองกิจ',
    startDate: '2026-03-19',
    endDate: '2029-03-19',
    status: 'active',
    coverage: [
      { name: 'Fire Insurance', nameTh: 'ประกันอัคคีภัย', limit: 500000 },
      { name: 'Flood Insurance', nameTh: 'ประกันอุทกภัย', limit: 300000 },
      {
        name: 'Property Damage',
        nameTh: 'ความเสียหายต่อทรัพย์สิน',
        limit: 300000,
      },
      {
        name: 'Accident Coverage',
        nameTh: 'ประกันอุบัติเหตุ',
        limit: 200000,
      },
    ],
  };

  const infoRows = [
    {
      icon: Hash,
      label: language === 'th' ? 'เลขกรมธรรม์' : 'Policy Number',
      value: policy.id,
    },
    {
      icon: Shield,
      label: language === 'th' ? 'แผนประกัน' : 'Insurance Plan',
      value: language === 'th' ? policy.planTh : policy.plan,
    },
    {
      icon: User,
      label: language === 'th' ? 'ผู้ถือกรมธรรม์' : 'Policy Holder',
      value: policy.policyHolder,
    },
    {
      icon: Calendar,
      label: language === 'th' ? 'วันเริ่มต้น' : 'Start Date',
      value: new Date(policy.startDate).toLocaleDateString(
        language === 'th' ? 'th-TH' : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric' }
      ),
    },
    {
      icon: Calendar,
      label: language === 'th' ? 'วันหมดอายุ' : 'End Date',
      value: new Date(policy.endDate).toLocaleDateString(
        language === 'th' ? 'th-TH' : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric' }
      ),
    },
  ];

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
            <Shield size={20} className="text-[#2563EB]" />
            <h1 className="text-lg font-semibold text-gray-900">
              {language === 'th' ? 'กรมธรรม์ประกันภัย' : 'Insurance Policy'}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Success Animation */}
        <div className="flex flex-col items-center mb-8">
          <div
            className={[
              'w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500',
              showCheck
                ? 'bg-green-100 scale-100 opacity-100'
                : 'bg-green-50 scale-75 opacity-0',
            ].join(' ')}
          >
            <CheckCircle2
              size={48}
              className={[
                'text-green-500 transition-all duration-500',
                showCheck ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
              ].join(' ')}
            />
          </div>
          <h2
            className={[
              'text-xl font-bold text-gray-900 mt-4 transition-all duration-500',
              showCheck
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0',
            ].join(' ')}
          >
            {language === 'th'
              ? 'ออกกรมธรรม์สำเร็จ!'
              : 'Policy Issued Successfully!'}
          </h2>
          <p
            className={[
              'text-sm text-gray-500 mt-1 transition-all duration-500 delay-100',
              showCheck
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0',
            ].join(' ')}
          >
            {language === 'th'
              ? 'กรมธรรม์ของคุณมีผลบังคับใช้แล้ว'
              : 'Your insurance policy is now active'}
          </p>
        </div>

        {/* Policy Summary Card */}
        <div
          className={[
            'transition-all duration-700 delay-200',
            showContent
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0',
          ].join(' ')}
        >
          <Card className="mb-6">
            {/* Status */}
            <div className="flex items-center justify-between mb-4">
              <Badge variant="success" size="md" icon={Shield}>
                {language === 'th' ? 'กรมธรรม์มีผล' : 'Active Policy'}
              </Badge>
              <span className="text-xs text-gray-500">{policy.id}</span>
            </div>

            {/* Coverage Amount */}
            <div className="text-center py-4 mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {language === 'th' ? 'วงเงินคุ้มครองรวม' : 'Total Coverage'}
              </p>
              <p className="text-3xl font-bold text-[#2563EB] mt-1">
                {formatPrice(policy.coverageAmount)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {language === 'th'
                  ? `เบี้ยประกัน ${formatPrice(policy.premium)} / เดือน`
                  : `Premium ${formatPrice(policy.premium)} / month`}
              </p>
            </div>

            {/* Info Rows */}
            <div className="space-y-3">
              {infoRows.map((row, idx) => {
                const RowIcon = row.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                      <RowIcon size={16} className="text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">{row.label}</p>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {row.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Coverage Breakdown */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                {language === 'th'
                  ? 'รายการความคุ้มครอง'
                  : 'Coverage Breakdown'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {policy.coverage.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 rounded-lg p-3 text-center"
                  >
                    <p className="text-xs text-gray-500">
                      {language === 'th' ? item.nameTh : item.name}
                    </p>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">
                      {formatPrice(item.limit)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div
          className={[
            'space-y-3 transition-all duration-700 delay-300',
            showContent
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0',
          ].join(' ')}
        >
          <Button
            variant="primary"
            size="lg"
            fullWidth
            icon={Download}
          >
            {language === 'th'
              ? 'ดาวน์โหลดกรมธรรม์ (PDF)'
              : 'Download Policy (PDF)'}
          </Button>

          <Button
            variant="secondary"
            size="md"
            fullWidth
            icon={FolderOpen}
          >
            {language === 'th'
              ? 'ดูในเอกสารของฉัน'
              : 'View in My Documents'}
          </Button>

          <Button
            variant="ghost"
            size="md"
            fullWidth
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => router.push('/discover')}
          >
            {language === 'th' ? 'กลับไปที่ดีล' : 'Back to Deal'}
          </Button>
        </div>
      </div>
    </div>
  );
}
