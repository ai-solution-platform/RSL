'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { users } from '@/data/users';
import { properties } from '@/data/properties';
import MatchScoreBadge from '@/components/property/MatchScoreBadge';
import {
  ArrowLeft,
  MapPin,
  Send,
  MessageCircle,
  SlidersHorizontal,
  ChevronDown,
  Briefcase,
  DollarSign,
  ArrowUpDown,
} from 'lucide-react';

const tenants = users.filter((u) => u.role === 'tenant');
const landlordProperties = properties.filter((p) => p.landlordId === 'user-006');

// Mock match scores for each tenant
const matchData = [
  { tenantId: 'user-001', score: 92, matchReasons: ['Budget match', 'Location match', 'Business type fit'] },
  { tenantId: 'user-002', score: 85, matchReasons: ['Size match', 'Amenities match'] },
  { tenantId: 'user-005', score: 78, matchReasons: ['Location match', 'Size match'] },
  { tenantId: 'user-004', score: 74, matchReasons: ['Budget match', 'High traffic area'] },
  { tenantId: 'user-003', score: 68, matchReasons: ['Budget match', 'F&B ready'] },
  { tenantId: 'user-011', score: 65, matchReasons: ['Alcohol license zone', 'Size match'] },
];

export default function MatchingTenantsPage() {
  const { t, language } = useTranslation();
  const [selectedProperty, setSelectedProperty] = useState('all');
  const [sortDesc, setSortDesc] = useState(true);

  const sortedMatches = useMemo(() => {
    const sorted = [...matchData].sort((a, b) =>
      sortDesc ? b.score - a.score : a.score - b.score
    );
    return sorted;
  }, [sortDesc]);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <Link href="/landlord" className="text-gray-600">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-semibold text-gray-900">
          {language === 'th' ? 'ผู้เช่าที่ตรงกัน' : 'Matching Tenants'}
        </h1>
      </div>

      {/* Filters */}
      <div className="px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">
                {language === 'th' ? 'พื้นที่ทั้งหมด' : 'All Properties'}
              </option>
              {landlordProperties.map((p) => (
                <option key={p.id} value={p.id}>
                  {language === 'th' ? p.titleTh : p.title}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <button
            onClick={() => setSortDesc(!sortDesc)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 flex items-center gap-1.5 hover:bg-gray-50"
          >
            <ArrowUpDown size={14} />
            {language === 'th' ? 'คะแนน' : 'Score'}
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="px-4 py-2">
        <p className="text-xs text-gray-500">
          {language === 'th'
            ? `พบ ${sortedMatches.length} ผู้เช่าที่ตรงกัน`
            : `${sortedMatches.length} matching tenants found`}
        </p>
      </div>

      {/* Tenant Cards */}
      <div className="px-4 space-y-3">
        {sortedMatches.map((match) => {
          const tenant = tenants.find((t) => t.id === match.tenantId);
          if (!tenant || !tenant.requirements) return null;

          return (
            <div
              key={match.tenantId}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <img
                    src={tenant.avatar}
                    alt={tenant.name}
                    className="w-12 h-12 rounded-full bg-gray-100 shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {language === 'th' ? tenant.nameTh : tenant.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {language === 'th' ? tenant.companyTh : tenant.company}
                        </p>
                      </div>
                      <MatchScoreBadge score={match.score} size="sm" />
                    </div>

                    {/* Details */}
                    <div className="mt-2 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Briefcase size={12} className="text-gray-400" />
                        {tenant.requirements.businessType}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <DollarSign size={12} className="text-gray-400" />
                        {formatPrice(tenant.requirements.budget.min)} - {formatPrice(tenant.requirements.budget.max)}/{language === 'th' ? 'เดือน' : 'mo'}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <MapPin size={12} className="text-gray-400" />
                        {tenant.requirements.preferredAreas.join(', ')}
                      </div>
                    </div>

                    {/* Match Reasons */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {match.matchReasons.map((reason, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-[10px]"
                        >
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-50">
                  <button className="flex-1 py-2 bg-orange-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-orange-600 transition-colors">
                    <Send size={12} />
                    {language === 'th' ? 'เชิญชมพื้นที่' : 'Invite to View'}
                  </button>
                  <button className="flex-1 py-2 border border-orange-200 text-orange-600 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-orange-50 transition-colors">
                    <MessageCircle size={12} />
                    {t('common.contact')}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
