'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?: (value: [number, number]) => void;
  formatValue?: (value: number) => string;
  label?: string;
  className?: string;
}

function RangeSlider({
  min,
  max,
  step = 1,
  value: controlledValue,
  defaultValue,
  onChange,
  formatValue = (v) => v.toLocaleString(),
  label,
  className = '',
}: RangeSliderProps) {
  const [internalValue, setInternalValue] = useState<[number, number]>(
    defaultValue ?? [min, max]
  );
  const value = controlledValue ?? internalValue;
  const trackRef = useRef<HTMLDivElement>(null);

  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  const snap = (v: number) => Math.round((v - min) / step) * step + min;
  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  const updateValue = useCallback(
    (next: [number, number]) => {
      if (!controlledValue) setInternalValue(next);
      onChange?.(next);
    },
    [controlledValue, onChange]
  );

  const handlePointer = useCallback(
    (thumb: 0 | 1) => (e: React.PointerEvent) => {
      e.preventDefault();
      const track = trackRef.current;
      if (!track) return;

      const move = (ev: PointerEvent) => {
        const rect = track.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (ev.clientX - rect.left) / rect.width));
        const raw = snap(clamp(min + ratio * (max - min)));
        const next: [number, number] = [...value] as [number, number];
        next[thumb] = raw;
        if (next[0] > next[1]) {
          [next[0], next[1]] = [next[1], next[0]];
        }
        updateValue(next);
      };

      const up = () => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
      };

      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, min, max, step, updateValue]
  );

  const handleInputChange = (thumb: 0 | 1) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const next: [number, number] = [...value] as [number, number];
    next[thumb] = clamp(Number(e.target.value));
    if (next[0] > next[1]) {
      [next[0], next[1]] = [next[1], next[0]];
    }
    updateValue(next);
  };

  return (
    <div className={['w-full', className].filter(Boolean).join(' ')}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      {/* Value display */}
      <div className="flex items-center justify-between mb-3 text-sm font-medium text-gray-900">
        <span>{formatValue(value[0])}</span>
        <span className="text-gray-400 mx-2">-</span>
        <span>{formatValue(value[1])}</span>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-6 flex items-center cursor-pointer touch-none"
      >
        {/* Background track */}
        <div className="absolute inset-x-0 h-1.5 bg-gray-200 rounded-full" />

        {/* Active range */}
        <div
          className="absolute h-1.5 bg-[#2563EB] rounded-full"
          style={{
            left: `${pct(value[0])}%`,
            width: `${pct(value[1]) - pct(value[0])}%`,
          }}
        />

        {/* Min thumb */}
        <div
          className="absolute w-5 h-5 bg-white border-2 border-[#2563EB] rounded-full shadow-sm -translate-x-1/2 hover:scale-110 transition-transform cursor-grab active:cursor-grabbing"
          style={{ left: `${pct(value[0])}%` }}
          onPointerDown={handlePointer(0)}
          role="slider"
          aria-label="Minimum"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value[0]}
          tabIndex={0}
        />

        {/* Max thumb */}
        <div
          className="absolute w-5 h-5 bg-white border-2 border-[#2563EB] rounded-full shadow-sm -translate-x-1/2 hover:scale-110 transition-transform cursor-grab active:cursor-grabbing"
          style={{ left: `${pct(value[1])}%` }}
          onPointerDown={handlePointer(1)}
          role="slider"
          aria-label="Maximum"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value[1]}
          tabIndex={0}
        />

        {/* Hidden range inputs for accessibility / form submission */}
        <input type="range" min={min} max={max} step={step} value={value[0]} onChange={handleInputChange(0)} className="sr-only" aria-label="Minimum value" />
        <input type="range" min={min} max={max} step={step} value={value[1]} onChange={handleInputChange(1)} className="sr-only" aria-label="Maximum value" />
      </div>
    </div>
  );
}

export { RangeSlider };
export type { RangeSliderProps };
