'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Edit3,
  Share2,
  PenTool,
  AlertTriangle,
  Check,
  Clock,
  Download,
  X,
  Calendar,
  Type,
  Pen,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { useTranslation } from '@/lib/i18n';
import type { Contract, ContractClause, RiskLevel } from '@/types';

interface DocumentViewerProps {
  contract: Contract;
  onEdit?: () => void;
  onShare?: () => void;
}

type SignMode = 'draw' | 'type';

function SignatureCanvas({
  onSave,
  onCancel,
}: {
  onSave: (name: string, date: string) => void;
  onCancel: () => void;
}) {
  const { language } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [mode, setMode] = useState<SignMode>('type');
  const [typedName, setTypedName] = useState('');
  const [signDate, setSignDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const startDraw = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      setIsDrawing(true);
      setHasDrawn(true);
      const rect = canvas.getBoundingClientRect();
      const x =
        'touches' in e
          ? e.touches[0].clientX - rect.left
          : e.clientX - rect.left;
      const y =
        'touches' in e
          ? e.touches[0].clientY - rect.top
          : e.clientY - rect.top;
      ctx.beginPath();
      ctx.moveTo(x, y);
    },
    []
  );

  const draw = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const x =
        'touches' in e
          ? e.touches[0].clientX - rect.left
          : e.clientX - rect.left;
      const y =
        'touches' in e
          ? e.touches[0].clientY - rect.top
          : e.clientY - rect.top;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineTo(x, y);
      ctx.stroke();
    },
    [isDrawing]
  );

  const stopDraw = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleSave = () => {
    const name = mode === 'type' ? typedName : 'Drawn Signature';
    if ((mode === 'type' && !typedName.trim()) || (mode === 'draw' && !hasDrawn))
      return;
    onSave(name, signDate);
  };

  const canSave =
    (mode === 'type' && typedName.trim().length > 0) ||
    (mode === 'draw' && hasDrawn);

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode('type')}
          className={[
            'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer',
            mode === 'type'
              ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]'
              : 'border-gray-200 text-gray-600 hover:border-gray-300',
          ].join(' ')}
        >
          <Type size={16} />
          {language === 'th' ? 'พิมพ์ชื่อ' : 'Type Name'}
        </button>
        <button
          onClick={() => setMode('draw')}
          className={[
            'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer',
            mode === 'draw'
              ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]'
              : 'border-gray-200 text-gray-600 hover:border-gray-300',
          ].join(' ')}
        >
          <Pen size={16} />
          {language === 'th' ? 'วาดลายเซ็น' : 'Draw Signature'}
        </button>
      </div>

      {/* Signature Area */}
      {mode === 'type' ? (
        <div>
          <Input
            label={language === 'th' ? 'ชื่อผู้ลงนาม' : 'Signer Name'}
            placeholder={
              language === 'th' ? 'พิมพ์ชื่อเต็ม' : 'Type your full name'
            }
            value={typedName}
            onChange={(e) => setTypedName(e.target.value)}
          />
          {typedName && (
            <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-center">
              <p
                className="text-2xl text-gray-800"
                style={{ fontFamily: 'cursive' }}
              >
                {typedName}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-gray-700">
              {language === 'th' ? 'วาดลายเซ็นด้านล่าง' : 'Draw signature below'}
            </label>
            <button
              onClick={clearCanvas}
              className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              {language === 'th' ? 'ล้าง' : 'Clear'}
            </button>
          </div>
          <canvas
            ref={canvasRef}
            width={400}
            height={150}
            className="w-full border border-gray-300 rounded-lg bg-white cursor-crosshair touch-none"
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={stopDraw}
          />
        </div>
      )}

      {/* Date */}
      <Input
        label={language === 'th' ? 'วันที่ลงนาม' : 'Signing Date'}
        type="date"
        icon={Calendar}
        value={signDate}
        onChange={(e) => setSignDate(e.target.value)}
      />

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button variant="ghost" size="md" onClick={onCancel} fullWidth>
          {language === 'th' ? 'ยกเลิก' : 'Cancel'}
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          fullWidth
          disabled={!canSave}
          icon={PenTool}
        >
          {language === 'th' ? 'ลงนาม' : 'Sign'}
        </Button>
      </div>
    </div>
  );
}

function SignatureStatus({
  label,
  signed,
  signerName,
  signedDate,
}: {
  label: string;
  signed: boolean;
  signerName?: string;
  signedDate?: string;
}) {
  return (
    <div
      className={[
        'flex items-center gap-3 p-3 rounded-lg border',
        signed
          ? 'border-green-200 bg-green-50'
          : 'border-gray-200 bg-gray-50',
      ].join(' ')}
    >
      <div
        className={[
          'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
          signed ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400',
        ].join(' ')}
      >
        {signed ? <Check size={16} /> : <Clock size={16} />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {signed ? (
          <p className="text-xs text-green-600">
            {signerName} - {signedDate}
          </p>
        ) : (
          <p className="text-xs text-gray-500">Pending signature</p>
        )}
      </div>
      <Badge variant={signed ? 'success' : 'default'} size="sm">
        {signed ? 'Signed' : 'Pending'}
      </Badge>
    </div>
  );
}

export default function DocumentViewer({
  contract,
  onEdit,
  onShare,
}: DocumentViewerProps) {
  const { language } = useTranslation();
  const [signModalOpen, setSignModalOpen] = useState(false);
  const [tenantSigned, setTenantSigned] = useState(!!contract.tenantSignature);
  const [tenantSignInfo, setTenantSignInfo] = useState<{
    name: string;
    date: string;
  } | null>(
    contract.tenantSignature
      ? {
          name: contract.tenantSignature.userId,
          date: contract.tenantSignature.signedAt,
        }
      : null
  );
  const [landlordSigned] = useState(!!contract.landlordSignature);

  const handleSign = (name: string, date: string) => {
    setTenantSigned(true);
    setTenantSignInfo({ name, date });
    setSignModalOpen(false);
  };

  const riskBg: Record<RiskLevel, string> = {
    low: '',
    medium: 'bg-amber-50/50',
    high: 'bg-yellow-50',
  };

  return (
    <div className="flex flex-col h-full">
      {/* Document Scroll Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto bg-white shadow-sm border border-gray-100 rounded-xl">
          {/* Document Header */}
          <div className="text-center py-8 px-6 border-b border-gray-100">
            <h1 className="text-xl font-bold text-gray-900">
              {language === 'th'
                ? 'สัญญาเช่าพื้นที่เชิงพาณิชย์'
                : 'Commercial Space Lease Agreement'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {language === 'th'
                ? 'สัญญาเช่าพื้นที่ค้าปลีก / Commercial Space Lease Agreement'
                : 'Commercial Space Lease Agreement / สัญญาเช่าพื้นที่ค้าปลีก'}
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <Badge variant="info">
                {language === 'th' ? 'ร่างสัญญา' : 'Draft'}
              </Badge>
              <Badge variant="default">
                {contract.id}
              </Badge>
            </div>
          </div>

          {/* Clauses */}
          <div className="px-6 py-6 space-y-6">
            {contract.clauses.map((clause, idx) => {
              const risk = clause.riskLevel as RiskLevel | undefined;
              const isHighRisk = risk === 'high';
              const bgClass = risk ? riskBg[risk] : '';

              return (
                <div
                  key={clause.id}
                  className={[
                    'rounded-lg p-4 transition-colors',
                    bgClass,
                    isHighRisk ? 'border border-red-200' : '',
                  ].join(' ')}
                >
                  {/* Clause Header */}
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-sm font-bold text-[#2563EB] shrink-0">
                      {language === 'th' ? `ข้อ ${idx + 1}.` : `Article ${idx + 1}.`}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {language === 'th' ? clause.titleTh : clause.title}
                        </h3>
                        {isHighRisk && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
                            <AlertTriangle size={10} />
                            {language === 'th' ? 'ความเสี่ยงสูง' : 'High Risk'}
                          </span>
                        )}
                        {risk === 'medium' && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded">
                            {language === 'th' ? 'ปานกลาง' : 'Medium'}
                          </span>
                        )}
                      </div>
                      {contract.language === 'both' && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {language === 'th' ? clause.title : clause.titleTh}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Clause Content */}
                  <div className="ml-8 space-y-2">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {language === 'th' ? clause.contentTh : clause.content}
                    </p>
                    {contract.language === 'both' && (
                      <p className="text-xs text-gray-500 leading-relaxed border-l-2 border-gray-200 pl-3">
                        {language === 'th' ? clause.content : clause.contentTh}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Signatures Section */}
          <div className="px-6 py-6 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              {language === 'th' ? 'ลายเซ็น' : 'Signatures'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SignatureStatus
                label={language === 'th' ? 'ผู้เช่า' : 'Tenant'}
                signed={tenantSigned}
                signerName={tenantSignInfo?.name}
                signedDate={tenantSignInfo?.date}
              />
              <SignatureStatus
                label={language === 'th' ? 'เจ้าของ' : 'Landlord'}
                signed={landlordSigned}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 flex gap-2 z-10">
        <Button
          variant="secondary"
          size="md"
          icon={Edit3}
          onClick={onEdit}
          className="flex-1"
        >
          {language === 'th' ? 'แก้ไข' : 'Edit'}
        </Button>
        <Button
          variant="secondary"
          size="md"
          icon={Share2}
          onClick={onShare}
          className="flex-1"
        >
          {language === 'th' ? 'แชร์' : 'Share'}
        </Button>
        <Button
          variant="primary"
          size="md"
          icon={PenTool}
          onClick={() => setSignModalOpen(true)}
          className="flex-1"
        >
          {language === 'th' ? 'ลงนาม' : 'e-Sign'}
        </Button>
      </div>

      {/* e-Sign Modal */}
      <Modal
        open={signModalOpen}
        onClose={() => setSignModalOpen(false)}
        title={language === 'th' ? 'ลงนามอิเล็กทรอนิกส์' : 'Electronic Signature'}
        size="md"
      >
        <SignatureCanvas
          onSave={handleSign}
          onCancel={() => setSignModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
