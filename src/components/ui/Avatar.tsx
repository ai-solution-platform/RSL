'use client';

import { type ImgHTMLAttributes, forwardRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'> {
  name?: string;
  size?: AvatarSize;
  verified?: boolean;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
};

const badgeSizes: Record<AvatarSize, number> = {
  sm: 12,
  md: 14,
  lg: 18,
};

const badgePosition: Record<AvatarSize, string> = {
  sm: '-bottom-0.5 -right-0.5',
  md: '-bottom-0.5 -right-0.5',
  lg: '-bottom-1 -right-1',
};

function getInitials(name?: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function stringToColor(str: string): string {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-amber-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-teal-500',
    'bg-indigo-500',
    'bg-rose-500',
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ name, src, alt, size = 'md', verified = false, className = '', ...imgProps }, ref) => {
    const [imgError, setImgError] = useState(false);
    const showImage = src && !imgError;

    return (
      <div ref={ref} className={['relative inline-flex shrink-0', className].filter(Boolean).join(' ')}>
        {showImage ? (
          <img
            src={src}
            alt={alt ?? name ?? 'Avatar'}
            onError={() => setImgError(true)}
            className={[
              'rounded-full object-cover',
              sizeStyles[size],
            ].join(' ')}
            {...imgProps}
          />
        ) : (
          <div
            className={[
              'rounded-full flex items-center justify-center font-semibold text-white',
              sizeStyles[size],
              stringToColor(name ?? ''),
            ].join(' ')}
            aria-label={name ?? 'Avatar'}
          >
            {getInitials(name)}
          </div>
        )}

        {verified && (
          <span
            className={[
              'absolute bg-white rounded-full flex items-center justify-center',
              badgePosition[size],
            ].join(' ')}
          >
            <CheckCircle2
              size={badgeSizes[size]}
              className="text-[#2563EB] fill-white"
            />
          </span>
        )}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';

export { Avatar };
export type { AvatarProps, AvatarSize };
