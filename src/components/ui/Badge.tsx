'use client';

import { type HTMLAttributes, type ElementType, forwardRef } from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';
type BadgeSize = 'sm' | 'md';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ElementType;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-700',
  success: 'bg-green-50 text-green-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-red-50 text-red-700',
  info: 'bg-blue-50 text-[#2563EB]',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-2.5 py-1 text-sm gap-1.5',
};

const iconSizes: Record<BadgeSize, number> = {
  sm: 12,
  md: 14,
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { variant = 'default', size = 'sm', icon: Icon, className = '', children, ...props },
    ref
  ) => (
    <span
      ref={ref}
      className={[
        'inline-flex items-center font-medium rounded-full whitespace-nowrap',
        variantStyles[variant],
        sizeStyles[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {Icon && <Icon size={iconSizes[size]} className="shrink-0" />}
      {children}
    </span>
  )
);
Badge.displayName = 'Badge';

export { Badge };
export type { BadgeProps, BadgeVariant, BadgeSize };
