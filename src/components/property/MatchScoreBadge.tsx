'use client';

import { useTranslation } from '@/lib/i18n';

interface MatchScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function MatchScoreBadge({ score, size = 'md' }: MatchScoreBadgeProps) {
  const { language } = useTranslation();

  const getColor = (s: number) => {
    if (s >= 80) return { ring: '#22c55e', bg: '#f0fdf4', text: '#15803d' };
    if (s >= 60) return { ring: '#eab308', bg: '#fefce8', text: '#a16207' };
    return { ring: '#ef4444', bg: '#fef2f2', text: '#b91c1c' };
  };

  const dims = {
    sm: { outer: 40, r: 15, stroke: 3, fontSize: '10px', label: '7px' },
    md: { outer: 56, r: 22, stroke: 3.5, fontSize: '14px', label: '8px' },
    lg: { outer: 80, r: 32, stroke: 4, fontSize: '20px', label: '10px' },
  }[size];

  const color = getColor(score);
  const circumference = 2 * Math.PI * dims.r;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: dims.outer, height: dims.outer }}
      title={language === 'th' ? `คะแนนจับคู่ ${score}%` : `Match Score ${score}%`}
    >
      <svg
        width={dims.outer}
        height={dims.outer}
        className="rotate-[-90deg]"
      >
        <circle
          cx={dims.outer / 2}
          cy={dims.outer / 2}
          r={dims.r}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={dims.stroke}
        />
        <circle
          cx={dims.outer / 2}
          cy={dims.outer / 2}
          r={dims.r}
          fill="none"
          stroke={color.ring}
          strokeWidth={dims.stroke}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
          style={{
            animation: 'matchScoreIn 0.8s ease-out forwards',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-bold leading-none"
          style={{ fontSize: dims.fontSize, color: color.text }}
        >
          {score}
        </span>
        {size !== 'sm' && (
          <span
            className="text-gray-400 leading-none mt-0.5"
            style={{ fontSize: dims.label }}
          >
            %
          </span>
        )}
      </div>
      <style>{`
        @keyframes matchScoreIn {
          from { stroke-dashoffset: ${circumference}; }
          to { stroke-dashoffset: ${dashOffset}; }
        }
      `}</style>
    </div>
  );
}
