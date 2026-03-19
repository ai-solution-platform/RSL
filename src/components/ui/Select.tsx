'use client';

import { type SelectHTMLAttributes, type ElementType, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  icon?: ElementType;
  options?: SelectOption[];
  groups?: SelectOptionGroup[];
  placeholder?: string;
  selectSize?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'py-1.5 text-sm',
  md: 'py-2.5 text-sm',
  lg: 'py-3 text-base',
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      icon: Icon,
      options,
      groups,
      placeholder,
      selectSize = 'md',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <Icon size={18} />
            </span>
          )}
          <select
            ref={ref}
            id={selectId}
            className={[
              'w-full rounded-lg border bg-white pr-10 text-gray-900 appearance-none',
              'transition-colors duration-150 cursor-pointer',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              error
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-300 focus:border-[#2563EB] focus:ring-[#2563EB]/20',
              Icon ? 'pl-10' : 'pl-3',
              sizeStyles[selectSize],
              'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
            {groups?.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <ChevronDown size={18} />
          </span>
        </div>
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';

export { Select };
export type { SelectProps, SelectOption, SelectOptionGroup };
