'use client';

import {
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type ElementType,
  forwardRef,
} from 'react';
import { Search } from 'lucide-react';

/* ─── Text Input ─── */

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ElementType;
  iconPosition?: 'left' | 'right';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, icon: Icon, iconPosition = 'left', className = '', id, ...props },
    ref
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && iconPosition === 'left' && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <Icon size={18} />
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={[
              'w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900',
              'placeholder:text-gray-400',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              error
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-300 focus:border-[#2563EB] focus:ring-[#2563EB]/20',
              Icon && iconPosition === 'left' ? 'pl-10' : '',
              Icon && iconPosition === 'right' ? 'pr-10' : '',
              'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            {...props}
          />
          {Icon && iconPosition === 'right' && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <Icon size={18} />
            </span>
          )}
        </div>
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

/* ─── Textarea ─── */

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={[
            'w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900',
            'placeholder:text-gray-400 resize-y min-h-[80px]',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
              : 'border-gray-300 focus:border-[#2563EB] focus:ring-[#2563EB]/20',
            'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

/* ─── Search Input ─── */

interface SearchInputProps extends Omit<InputProps, 'icon' | 'iconPosition'> {
  onSearch?: (value: string) => void;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onSearch, onKeyDown, ...props }, ref) => (
    <Input
      ref={ref}
      icon={Search}
      iconPosition="left"
      placeholder="Search..."
      onKeyDown={(e) => {
        if (e.key === 'Enter' && onSearch) {
          onSearch(e.currentTarget.value);
        }
        onKeyDown?.(e);
      }}
      {...props}
    />
  )
);
SearchInput.displayName = 'SearchInput';

export { Input, Textarea, SearchInput };
export type { InputProps, TextareaProps, SearchInputProps };
