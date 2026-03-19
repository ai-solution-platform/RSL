'use client';

import { type ReactNode, useState, useCallback } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ElementType;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'underline' | 'pill';
  fullWidth?: boolean;
  className?: string;
}

interface TabPanelProps {
  tabId: string;
  activeTab: string;
  children: ReactNode;
  className?: string;
}

function Tabs({
  tabs,
  activeTab: controlledTab,
  defaultTab,
  onChange,
  variant = 'underline',
  fullWidth = false,
  className = '',
}: TabsProps) {
  const [internalTab, setInternalTab] = useState(defaultTab ?? tabs[0]?.id ?? '');
  const active = controlledTab ?? internalTab;

  const handleChange = useCallback(
    (tabId: string) => {
      if (!controlledTab) setInternalTab(tabId);
      onChange?.(tabId);
    },
    [controlledTab, onChange]
  );

  const baseStyles =
    variant === 'underline'
      ? 'border-b border-gray-200'
      : 'bg-gray-100 p-1 rounded-lg';

  return (
    <div
      role="tablist"
      className={[
        'flex gap-0',
        baseStyles,
        fullWidth ? '' : 'w-fit',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        const Icon = tab.icon;

        const activeClass =
          variant === 'underline'
            ? isActive
              ? 'text-[#2563EB] border-b-2 border-[#2563EB] -mb-px'
              : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent -mb-px'
            : isActive
              ? 'bg-white text-gray-900 shadow-sm rounded-md'
              : 'text-gray-500 hover:text-gray-700';

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-disabled={tab.disabled}
            disabled={tab.disabled}
            onClick={() => handleChange(tab.id)}
            className={[
              'inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium',
              'transition-colors duration-150 whitespace-nowrap cursor-pointer',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              fullWidth ? 'flex-1' : '',
              activeClass,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {Icon && <Icon size={16} className="shrink-0" />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

function TabPanel({ tabId, activeTab, children, className = '' }: TabPanelProps) {
  if (tabId !== activeTab) return null;
  return (
    <div role="tabpanel" className={className}>
      {children}
    </div>
  );
}

export { Tabs, TabPanel };
export type { TabsProps, TabPanelProps, Tab };
