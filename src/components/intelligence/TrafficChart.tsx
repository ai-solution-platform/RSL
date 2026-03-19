'use client';

import { useTranslation } from '@/lib/i18n';

interface TrafficChartProps {
  trafficScore?: number;
}

const TRAFFIC_DATA = [
  { dayEn: 'Mon', dayTh: 'จ.', value: 65 },
  { dayEn: 'Tue', dayTh: 'อ.', value: 58 },
  { dayEn: 'Wed', dayTh: 'พ.', value: 72 },
  { dayEn: 'Thu', dayTh: 'พฤ.', value: 68 },
  { dayEn: 'Fri', dayTh: 'ศ.', value: 85 },
  { dayEn: 'Sat', dayTh: 'ส.', value: 95 },
  { dayEn: 'Sun', dayTh: 'อา.', value: 78 },
];

export default function TrafficChart({ trafficScore }: TrafficChartProps) {
  const { language } = useTranslation();
  const maxValue = Math.max(...TRAFFIC_DATA.map((d) => d.value));

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">
          {language === 'th' ? 'ความหนาแน่นการสัญจร' : 'Foot Traffic'}
        </h3>
        {trafficScore !== undefined && (
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
            {language === 'th' ? 'คะแนน' : 'Score'}: {trafficScore}/100
          </span>
        )}
      </div>

      <div className="flex items-end justify-between gap-2" style={{ height: 160 }}>
        {TRAFFIC_DATA.map((d) => {
          const pct = (d.value / maxValue) * 100;
          const isHigh = d.value >= 80;
          return (
            <div key={d.dayEn} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-xs font-medium text-gray-500">{d.value}</span>
              <div className="relative w-full" style={{ height: 120 }}>
                <div
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] max-w-8 rounded-t-md transition-all duration-500 ${
                    isHigh ? 'bg-blue-600' : 'bg-blue-300'
                  }`}
                  style={{ height: `${pct}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">
                {language === 'th' ? d.dayTh : d.dayEn}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-gray-400">
        {language === 'th'
          ? 'ข้อมูลการสัญจรเฉลี่ยรายวัน (สัมพัทธ์)'
          : 'Average daily foot traffic (relative)'}
      </p>
    </div>
  );
}
