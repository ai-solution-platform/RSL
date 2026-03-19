'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Edit3,
  Save,
  X,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useTranslation } from '@/lib/i18n';
import type { ContractClause, RiskLevel } from '@/types';

interface ClauseEditorProps {
  clause: ContractClause;
  index: number;
  showBilingual?: boolean;
  onSave?: (clause: ContractClause) => void;
}

const riskConfig: Record<
  RiskLevel,
  { color: string; bg: string; border: string; icon: typeof ShieldCheck; variant: 'success' | 'warning' | 'danger'; label: string; labelTh: string }
> = {
  low: {
    color: 'text-green-700',
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: ShieldCheck,
    variant: 'success',
    label: 'Low Risk',
    labelTh: 'ความเสี่ยงต่ำ',
  },
  medium: {
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: Shield,
    variant: 'warning',
    label: 'Medium Risk',
    labelTh: 'ความเสี่ยงปานกลาง',
  },
  high: {
    color: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: ShieldAlert,
    variant: 'danger',
    label: 'High Risk',
    labelTh: 'ความเสี่ยงสูง',
  },
};

const importantTerms = [
  'Payment', 'การชำระเงิน',
  'Termination', 'การบอกเลิกสัญญา',
  'Liability', 'ความรับผิด',
  'Penalty', 'ค่าปรับ',
  'Default', 'ผิดนัด',
  'Compensation', 'ค่าชดเชย',
  'Obligation', 'ภาระผูกพัน',
];

function highlightTerms(text: string): React.ReactNode[] {
  const escapedTerms = importantTerms.map((t) =>
    t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );
  const regex = new RegExp(`(${escapedTerms.join('|')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) => {
    const isHighlighted = importantTerms.some(
      (term) => term.toLowerCase() === part.toLowerCase()
    );
    if (isHighlighted) {
      return (
        <span
          key={i}
          className="bg-yellow-100 text-yellow-800 px-0.5 rounded font-medium"
        >
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function ClauseEditor({
  clause,
  index,
  showBilingual = true,
  onSave,
}: ClauseEditorProps) {
  const { language } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(clause.content);
  const [editContentTh, setEditContentTh] = useState(clause.contentTh);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const risk = clause.riskLevel
    ? riskConfig[clause.riskLevel as RiskLevel]
    : null;

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [editing]);

  const handleSave = () => {
    onSave?.({
      ...clause,
      content: editContent,
      contentTh: editContentTh,
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditContent(clause.content);
    setEditContentTh(clause.contentTh);
    setEditing(false);
  };

  const isHighRisk = clause.riskLevel === 'high';

  return (
    <div
      className={[
        'rounded-xl border p-4 sm:p-5 transition-all duration-200',
        isHighRisk ? 'border-red-200 bg-red-50/30' : 'border-gray-200 bg-white',
        editing ? 'ring-2 ring-[#2563EB]/20 border-[#2563EB]' : '',
      ].join(' ')}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 min-w-0">
          <span className="text-sm font-bold text-gray-400 mt-0.5 shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 leading-tight">
              {language === 'th' ? clause.titleTh : clause.title}
            </h3>
            {showBilingual && (
              <p className="text-xs text-gray-500 mt-0.5">
                {language === 'th' ? clause.title : clause.titleTh}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {risk && (
            <Badge variant={risk.variant} icon={risk.icon} size="sm">
              {language === 'th' ? risk.labelTh : risk.label}
            </Badge>
          )}
          {isHighRisk && (
            <span className="flex items-center gap-1 text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
              <AlertTriangle size={12} />
              {language === 'th' ? 'สำคัญ' : 'Important'}
            </span>
          )}
          {clause.editable && !editing && (
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-[#2563EB] cursor-pointer"
              title={language === 'th' ? 'แก้ไข' : 'Edit'}
            >
              <Edit3 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {editing ? (
        <div className="space-y-3 ml-8">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              English
            </label>
            <textarea
              ref={textareaRef}
              value={editContent}
              onChange={(e) => {
                setEditContent(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] resize-none min-h-[80px]"
            />
          </div>
          {showBilingual && (
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                ภาษาไทย
              </label>
              <textarea
                value={editContentTh}
                onChange={(e) => {
                  setEditContentTh(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] resize-none min-h-[80px]"
              />
            </div>
          )}
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" size="sm" onClick={handleCancel} icon={X}>
              {language === 'th' ? 'ยกเลิก' : 'Cancel'}
            </Button>
            <Button variant="primary" size="sm" onClick={handleSave} icon={Save}>
              {language === 'th' ? 'บันทึก' : 'Save'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="ml-8 space-y-2">
          <div
            className={[
              'text-sm leading-relaxed',
              isHighRisk ? 'text-gray-800' : 'text-gray-700',
            ].join(' ')}
          >
            {highlightTerms(
              language === 'th' ? clause.contentTh : clause.content
            )}
          </div>
          {showBilingual && (
            <div className="text-xs text-gray-500 leading-relaxed border-l-2 border-gray-200 pl-3 mt-2">
              {language === 'th' ? clause.content : clause.contentTh}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
