'use client';

import { Heart, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { useAppStore } from '@/store';
import { formatPrice } from '@/lib/utils';
import MatchScoreBadge from './MatchScoreBadge';
import type { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
}

const PROPERTY_TYPE_LABELS: Record<string, { en: string; th: string }> = {
  mall: { en: 'Mall', th: 'ห้าง' },
  street_shop: { en: 'Street Shop', th: 'ตึกแถว' },
  community_mall: { en: 'Community Mall', th: 'คอมมิวนิตี้มอลล์' },
  standalone: { en: 'Standalone', th: 'อาคารเดี่ยว' },
  market: { en: 'Market', th: 'ตลาด' },
  pop_up: { en: 'Pop-up', th: 'ป๊อปอัพ' },
};

const STATUS_CONFIG: Record<string, { en: string; th: string; color: string }> = {
  available: { en: 'Available', th: 'ว่าง', color: 'bg-green-100 text-green-700' },
  reserved: { en: 'Reserved', th: 'จอง', color: 'bg-yellow-100 text-yellow-700' },
  leased: { en: 'Leased', th: 'ปล่อยเช่าแล้ว', color: 'bg-red-100 text-red-700' },
  maintenance: { en: 'Maintenance', th: 'ปรับปรุง', color: 'bg-gray-100 text-gray-600' },
  coming_soon: { en: 'Coming Soon', th: 'เร็วๆ นี้', color: 'bg-blue-100 text-blue-700' },
};

export default function PropertyCard({ property }: PropertyCardProps) {
  const { language } = useTranslation();
  const savedProperties = useAppStore((s) => s.savedProperties);
  const toggleSaved = useAppStore((s) => s.toggleSavedProperty);
  const isSaved = savedProperties.includes(property.id);

  const status = STATUS_CONFIG[property.status] ?? STATUS_CONFIG.available;
  const typeLabel = PROPERTY_TYPE_LABELS[property.propertyType];
  const matchScore = Math.min(100, Math.max(0, property.trafficScore));

  const mainImage = property.images?.[0] || '/placeholder-property.jpg';

  return (
    <Link
      href={`/property/${property.id}`}
      className="group block rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-gray-100">
        <img
          src={mainImage}
          alt={language === 'th' ? property.titleTh : property.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%23f3f4f6"><rect width="400" height="300"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="14">No Image</text></svg>';
          }}
        />

        {/* Save Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSaved(property.id);
          }}
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-all hover:scale-110"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>

        {/* Status Badge */}
        <div className="absolute left-2.5 top-2.5">
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${status.color}`}>
            {language === 'th' ? status.th : status.en}
          </span>
        </div>

        {/* Match Score */}
        <div className="absolute bottom-2.5 right-2.5">
          <MatchScoreBadge score={matchScore} size="sm" />
        </div>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
            {language === 'th' ? property.titleTh : property.title}
          </h3>
        </div>

        <div className="mb-2 flex items-center gap-1 text-xs text-gray-500">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="line-clamp-1">
            {language === 'th' ? property.location.districtTh : property.location.district}
          </span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-base font-bold text-blue-600">
              {formatPrice(property.price)}
              <span className="text-xs font-normal text-gray-400">
                /{language === 'th' ? 'เดือน' : 'mo'}
              </span>
            </p>
            <p className="mt-0.5 text-xs text-gray-500">
              {property.size} {language === 'th' ? 'ตร.ม.' : 'sqm'}
            </p>
          </div>

          {typeLabel && (
            <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              {language === 'th' ? typeLabel.th : typeLabel.en}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
