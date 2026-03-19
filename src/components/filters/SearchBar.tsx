'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { useAppStore } from '@/store';

const BANGKOK_LOCATIONS = [
  { en: 'Sukhumvit', th: 'สุขุมวิท' },
  { en: 'Silom', th: 'สีลม' },
  { en: 'Sathorn', th: 'สาทร' },
  { en: 'Thonglor', th: 'ทองหล่อ' },
  { en: 'Ekkamai', th: 'เอกมัย' },
  { en: 'Ari', th: 'อารีย์' },
  { en: 'Ladprao', th: 'ลาดพร้าว' },
  { en: 'Ratchada', th: 'รัชดา' },
  { en: 'Pratunam', th: 'ประตูน้ำ' },
  { en: 'Chatuchak', th: 'จตุจักร' },
  { en: 'Bang Na', th: 'บางนา' },
  { en: 'On Nut', th: 'อ่อนนุช' },
  { en: 'Phra Khanong', th: 'พระโขนง' },
  { en: 'Asoke', th: 'อโศก' },
  { en: 'Phrom Phong', th: 'พร้อมพงษ์' },
  { en: 'Siam', th: 'สยาม' },
  { en: 'Chidlom', th: 'ชิดลม' },
  { en: 'Ratchathewi', th: 'ราชเทวี' },
  { en: 'Victory Monument', th: 'อนุสาวรีย์ชัยฯ' },
  { en: 'Wang Thonglang', th: 'วังทองหลาง' },
];

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function SearchBar({ value: externalValue, onChange }: SearchBarProps) {
  const { t, language } = useTranslation();
  const setSearchFilters = useAppStore((s) => s.setSearchFilters);
  const [query, setQuery] = useState(externalValue ?? '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (externalValue !== undefined) setQuery(externalValue);
  }, [externalValue]);

  const filtered = query.trim()
    ? BANGKOK_LOCATIONS.filter(
        (loc) =>
          loc.en.toLowerCase().includes(query.toLowerCase()) ||
          loc.th.includes(query)
      )
    : BANGKOK_LOCATIONS.slice(0, 8);

  const handleSelect = (loc: (typeof BANGKOK_LOCATIONS)[0]) => {
    const val = language === 'th' ? loc.th : loc.en;
    setQuery(val);
    setShowSuggestions(false);
    setSearchFilters({ location: loc.en });
    onChange?.(val);
  };

  const handleClear = () => {
    setQuery('');
    setSearchFilters({ location: '' });
    onChange?.('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      handleSelect(filtered[focusedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-5 w-5 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
            setFocusedIndex(-1);
            onChange?.(e.target.value);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={t('discover.search')}
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-10 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 rounded-full p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showSuggestions && filtered.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
          {filtered.map((loc, i) => (
            <button
              key={loc.en}
              onClick={() => handleSelect(loc)}
              className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-colors ${
                i === focusedIndex ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
              <span>{language === 'th' ? loc.th : loc.en}</span>
              {language === 'th' && (
                <span className="ml-auto text-xs text-gray-400">{loc.en}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
