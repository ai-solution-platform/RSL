'use client';

import { type HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = false, padding = true, className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={[
        'bg-white rounded-xl border border-gray-100 shadow-sm',
        hover ? 'transition-shadow duration-200 hover:shadow-md' : '',
        padding ? 'p-4 sm:p-6' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = 'Card';

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={['flex items-start justify-between gap-4 mb-4', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children ?? (
        <>
          <div className="min-w-0">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </>
      )}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className = '', children, ...props }, ref) => (
  <div ref={ref} className={className} {...props}>
    {children}
  </div>
));
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className = '', children, ...props }, ref) => (
  <div
    ref={ref}
    className={[
      'flex items-center gap-3 mt-4 pt-4 border-t border-gray-100',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    {children}
  </div>
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardContent, CardFooter };
export type { CardProps, CardHeaderProps };
