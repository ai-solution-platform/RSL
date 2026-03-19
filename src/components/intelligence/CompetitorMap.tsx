'use client';

import { Store, Coffee, UtensilsCrossed, Pill, Scissors, Dumbbell } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface CompetitorMapProps {
  competitorCount?: number;
}

const COMPETITOR_DATA = [
  {
    categoryEn: 'Cafes & Coffee',
    categoryTh: 'คาเฟ่และกาแฟ',
    count: 8,
    icon: Coffee,
    color: 'text-amber-600 bg-amber-50',
  },
  {
    categoryEn: 'Restaurants',
    categoryTh: 'ร้านอาหาร',
    count: 12,
    icon: UtensilsCrossed,
    color: 'text-red-600 bg-red-50',
  },
  {
    categoryEn: 'Retail Shops',
    categoryTh: 'ร้านค้าปลีก',
    count: 15,
    icon: Store,
    color: 'text-blue-600 bg-blue-50',
  },
  {
    categoryEn: 'Pharmacy',
    categoryTh: 'ร้านขายยา',
    count: 3,
    icon: Pill,
    color: 'text-green-600 bg-green-50',
  },
  {
    categoryEn: 'Salons & Spas',
    categoryTh: 'ร้านเสริมสวยและสปา',
    count: 5,
    icon: Scissors,
    color: 'text-pink-600 bg-pink-50',
  },
  {
    categoryEn: 'Fitness',
    categoryTh: 'ฟิตเนส',
    count: 2,
    icon: Dumbbell,
    color: 'text-purple-600 bg-purple-50',
  },
];

export default function CompetitorMap({ competitorCount }: CompetitorMapProps) {
  const { language } = useTranslation();
  const totalNearby = COMPETITOR_DATA.reduce((sum, c) => sum + c.count, 0);

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">
          {language === 'th' ? 'คู่แข่งในพื้นที่' : 'Nearby Competitors'}
        </h3>
        <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-700">
          {competitorCount ?? totalNearby} {language === 'th' ? 'ร้าน' : 'businesses'}
        </span>
      </div>

      <div className="space-y-2.5">
        {COMPETITOR_DATA.map((cat) => {
          const Icon = cat.icon;
          const barPct = (cat.count / Math.max(...COMPETITOR_DATA.map((c) => c.count))) * 100;
          return (
            <div key={cat.categoryEn} className="flex items-center gap-3">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${cat.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700 truncate">
                    {language === 'th' ? cat.categoryTh : cat.categoryEn}
                  </span>
                  <span className="text-xs font-semibold text-gray-900 ml-2">{cat.count}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-gray-100">
                  <div
                    className="h-1.5 rounded-full bg-blue-400 transition-all duration-500"
                    style={{ width: `${barPct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-gray-400">
        {language === 'th'
          ? 'จำนวนธุรกิจในรัศมี 500 เมตร'
          : 'Businesses within 500m radius'}
      </p>
    </div>
  );
}
