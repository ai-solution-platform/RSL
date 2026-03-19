'use client';

import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { deals } from '@/data/deals';
import { properties } from '@/data/properties';
import { users } from '@/data/users';
import { X, MessageSquare, FileText, Clock } from 'lucide-react';
import type { Deal } from '@/types';

const PIPELINE_STAGES = [
  { key: 'inquiry', en: 'Inquiry', th: 'สนใจ', color: 'bg-gray-500' },
  { key: 'negotiation', en: 'Negotiation', th: 'เจรจา', color: 'bg-blue-500' },
  { key: 'pending_contract', en: 'Pending Contract', th: 'รอสัญญา', color: 'bg-orange-500' },
  { key: 'pending_signature', en: 'Pending Signature', th: 'รอเซ็น', color: 'bg-yellow-500' },
  { key: 'active', en: 'Active', th: 'ใช้งาน', color: 'bg-green-500' },
  { key: 'completed', en: 'Completed', th: 'เสร็จสิ้น', color: 'bg-emerald-500' },
  { key: 'cancelled', en: 'Cancelled', th: 'ยกเลิก', color: 'bg-red-500' },
];

export default function AdminDealsPage() {
  const { language } = useTranslation();
  const isEn = language === 'en';

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const getName = (id: string) => {
    const u = users.find((u) => u.id === id);
    return u ? (isEn ? u.name : u.nameTh) : id;
  };

  const getProperty = (id: string) => {
    const p = properties.find((p) => p.id === id);
    return p ? (isEn ? p.title : p.titleTh) : id;
  };

  const getStage = (status: string) => PIPELINE_STAGES.find((s) => s.key === status);

  const filtered =
    statusFilter === 'all' ? deals : deals.filter((d) => d.status === statusFilter);

  // Pipeline counts
  const pipelineCounts = PIPELINE_STAGES.map((stage) => ({
    ...stage,
    count: deals.filter((d) => d.status === stage.key).length,
  }));

  const getDealValue = (deal: Deal) => {
    const accepted = deal.offers.find((o) => o.status === 'accepted');
    const latest = deal.offers[deal.offers.length - 1];
    return accepted?.amount || latest?.amount || 0;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEn ? 'Deal Management' : 'จัดการดีล'}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {isEn ? 'Track and manage all deals' : 'ติดตามและจัดการดีลทั้งหมด'}
        </p>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {pipelineCounts.map((stage) => (
          <button
            key={stage.key}
            onClick={() => setStatusFilter(statusFilter === stage.key ? 'all' : stage.key)}
            className={`rounded-xl p-3 text-center border transition-colors ${
              statusFilter === stage.key
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-100 bg-white hover:border-gray-300'
            }`}
          >
            <div className={`w-3 h-3 rounded-full ${stage.color} mx-auto mb-2`} />
            <p className="text-2xl font-bold">{stage.count}</p>
            <p className="text-xs text-gray-500 mt-1">{isEn ? stage.en : stage.th}</p>
          </button>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
            statusFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600'
          }`}
        >
          {isEn ? 'All Deals' : 'ดีลทั้งหมด'} ({deals.length})
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">{isEn ? 'Property' : 'พื้นที่'}</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">{isEn ? 'Tenant' : 'ผู้เช่า'}</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">{isEn ? 'Landlord' : 'เจ้าของ'}</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">{isEn ? 'Status' : 'สถานะ'}</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">{isEn ? 'Value' : 'มูลค่า'}</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">{isEn ? 'Last Updated' : 'อัปเดตล่าสุด'}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    {isEn ? 'No deals found' : 'ไม่พบดีล'}
                  </td>
                </tr>
              ) : (
                filtered.map((deal) => {
                  const stage = getStage(deal.status);
                  return (
                    <tr
                      key={deal.id}
                      className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedDeal(deal)}
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-800 truncate max-w-[200px]">
                          {getProperty(deal.propertyId)}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{getName(deal.tenantId)}</td>
                      <td className="px-4 py-3 text-gray-600">{getName(deal.landlordId)}</td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${stage?.color}`} />
                          <span className="text-gray-700">{isEn ? stage?.en : stage?.th}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-gray-700">
                        {getDealValue(deal) > 0 ? `${formatPrice(getDealValue(deal))}/mo` : '-'}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(deal.updatedAt).toLocaleDateString(isEn ? 'en-US' : 'th-TH', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deal Detail Modal */}
      {selectedDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedDeal(null)}>
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {isEn ? 'Deal Details' : 'รายละเอียดดีล'}
                </h3>
                <button onClick={() => setSelectedDeal(null)} className="p-1 rounded hover:bg-gray-100">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Property */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">{getProperty(selectedDeal.propertyId)}</p>
                <p className="text-sm text-gray-500 mt-0.5">
                  {getName(selectedDeal.tenantId)} &rarr; {getName(selectedDeal.landlordId)}
                </p>
              </div>

              {/* Status */}
              <div className="mb-4">
                <p className="text-xs text-gray-400 uppercase mb-1">{isEn ? 'Status' : 'สถานะ'}</p>
                <span className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${getStage(selectedDeal.status)?.color}`} />
                  <span className="font-medium">{isEn ? getStage(selectedDeal.status)?.en : getStage(selectedDeal.status)?.th}</span>
                </span>
              </div>

              {/* Timeline */}
              <div className="mb-4">
                <p className="text-xs text-gray-400 uppercase mb-3">{isEn ? 'Timeline' : 'ไทม์ไลน์'}</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MessageSquare className="w-3 h-3 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{isEn ? 'Deal Created' : 'สร้างดีล'}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(selectedDeal.createdAt).toLocaleString(isEn ? 'en-US' : 'th-TH')}
                      </p>
                    </div>
                  </div>

                  {selectedDeal.offers.map((offer, i) => (
                    <div key={offer.id} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FileText className="w-3 h-3 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {isEn ? 'Offer' : 'ข้อเสนอ'} #{i + 1}: {formatPrice(offer.amount)}/mo
                        </p>
                        <p className="text-xs text-gray-500">{offer.duration} {isEn ? 'months' : 'เดือน'} | {isEn ? 'Status' : 'สถานะ'}: {offer.status}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(offer.createdAt).toLocaleString(isEn ? 'en-US' : 'th-TH')}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-3 h-3 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{isEn ? 'Last Updated' : 'อัปเดตล่าสุด'}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(selectedDeal.updatedAt).toLocaleString(isEn ? 'en-US' : 'th-TH')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages count */}
              <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                {selectedDeal.messages.length} {isEn ? 'messages in conversation' : 'ข้อความในการสนทนา'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
