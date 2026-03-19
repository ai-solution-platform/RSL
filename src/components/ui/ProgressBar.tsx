'use client';

import { Check } from 'lucide-react';

/* ─── Simple Progress Bar ─── */

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'blue' | 'orange' | 'green' | 'red';
  size?: 'sm' | 'md';
  className?: string;
}

const barColors = {
  blue: 'bg-[#2563EB]',
  orange: 'bg-[#F97316]',
  green: 'bg-green-500',
  red: 'bg-red-500',
};

const barSizes = {
  sm: 'h-1.5',
  md: 'h-2.5',
};

function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = false,
  color = 'blue',
  size = 'md',
  className = '',
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={['w-full', className].filter(Boolean).join(' ')}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-1.5 text-sm">
          {label && <span className="font-medium text-gray-700">{label}</span>}
          {showPercentage && (
            <span className="text-gray-500">{Math.round(pct)}%</span>
          )}
        </div>
      )}
      <div className={['w-full bg-gray-200 rounded-full overflow-hidden', barSizes[size]].join(' ')}>
        <div
          className={[
            'h-full rounded-full transition-all duration-300 ease-out',
            barColors[color],
          ].join(' ')}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}

/* ─── Step Progress (Deal Pipeline) ─── */

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number; // 0-indexed
  className?: string;
}

function StepProgress({ steps, currentStep, className = '' }: StepProgressProps) {
  return (
    <div className={['w-full', className].filter(Boolean).join(' ')}>
      {/* Mobile: compact */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-gray-500">
            {steps[currentStep]?.label}
          </span>
        </div>
        <ProgressBar value={currentStep + 1} max={steps.length} size="sm" />
      </div>

      {/* Desktop: full steps */}
      <div className="hidden sm:flex items-center">
        {steps.map((step, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;

          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <div
                  className={[
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors',
                    isCompleted
                      ? 'bg-[#2563EB] border-[#2563EB] text-white'
                      : isCurrent
                        ? 'border-[#2563EB] text-[#2563EB] bg-white'
                        : 'border-gray-300 text-gray-400 bg-white',
                  ].join(' ')}
                >
                  {isCompleted ? <Check size={16} /> : i + 1}
                </div>
                <span
                  className={[
                    'mt-1.5 text-xs font-medium whitespace-nowrap',
                    isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400',
                  ].join(' ')}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span className="text-xs text-gray-400 mt-0.5 whitespace-nowrap">
                    {step.description}
                  </span>
                )}
              </div>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  className={[
                    'flex-1 h-0.5 mx-3 mt-[-1.25rem]',
                    i < currentStep ? 'bg-[#2563EB]' : 'bg-gray-200',
                  ].join(' ')}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { ProgressBar, StepProgress };
export type { ProgressBarProps, StepProgressProps, Step };
