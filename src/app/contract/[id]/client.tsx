'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  FileText,
  Edit3,
  Share2,
  PenTool,
  AlertTriangle,
  X,
  Wine,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import DocumentViewer from '@/components/contract/DocumentViewer';
import ClauseEditor from '@/components/contract/ClauseEditor';
import { useTranslation } from '@/lib/i18n';
import type { Contract, ContractClause } from '@/types';

const mockClauses: ContractClause[] = [
  {
    id: 'cl-01',
    title: 'Parties to the Agreement',
    titleTh: 'คู่สัญญา',
    content:
      'This Lease Agreement is entered into between the Landlord, Central Pattana Public Company Limited ("Lessor"), and Mr. Somchai Rungruangkit ("Lessee"), hereinafter referred to as the Parties.',
    contentTh:
      'สัญญาเช่าฉบับนี้ทำขึ้นระหว่าง บริษัท เซ็นทรัล พัฒนา จำกัด (มหาชน) ในฐานะ "ผู้ให้เช่า" และ นายสมชาย รุ่งเรืองกิจ ในฐานะ "ผู้เช่า" ซึ่งต่อไปในสัญญานี้เรียกว่า "คู่สัญญา"',
    type: 'standard',
    editable: false,
    riskLevel: 'low',
  },
  {
    id: 'cl-02',
    title: 'Leased Property',
    titleTh: 'ทรัพย์สินที่เช่า',
    content:
      'The Lessor agrees to lease commercial space located at Unit 999/9, Rama 1 Road, Pathumwan Sub-district, Pathumwan District, Bangkok 10330, with a total area of 120 square meters (sqm), to the Lessee for commercial retail purposes.',
    contentTh:
      'ผู้ให้เช่าตกลงให้เช่าพื้นที่เชิงพาณิชย์ตั้งอยู่ที่ ยูนิต 999/9 ถนนพระราม 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพมหานคร 10330 พื้นที่รวม 120 ตารางเมตร แก่ผู้เช่า เพื่อใช้ในกิจการค้าปลีก',
    type: 'standard',
    editable: false,
    riskLevel: 'low',
  },
  {
    id: 'cl-03',
    title: 'Rental Payment',
    titleTh: 'การชำระค่าเช่า',
    content:
      'The Lessee shall pay monthly rent of 85,000 THB (Eighty-Five Thousand Baht) to the Lessor on or before the 5th day of each calendar month. Late Payment beyond 7 days will incur a Penalty of 1.5% per month on the outstanding balance. Payment shall be made by bank transfer to the account specified by the Lessor.',
    contentTh:
      'ผู้เช่าตกลงชำระค่าเช่ารายเดือนจำนวน 85,000 บาท (แปดหมื่นห้าพันบาทถ้วน) ให้แก่ผู้ให้เช่า ภายในวันที่ 5 ของทุกเดือน หากชำระล่าช้าเกิน 7 วัน จะมีค่าปรับในอัตราร้อยละ 1.5 ต่อเดือนของยอดค้างชำระ การชำระเงินให้โอนเข้าบัญชีที่ผู้ให้เช่ากำหนด',
    type: 'financial',
    editable: true,
    riskLevel: 'high',
  },
  {
    id: 'cl-04',
    title: 'Lease Duration',
    titleTh: 'ระยะเวลาการเช่า',
    content:
      'The lease term shall be 3 (three) years, commencing from the date of signing this agreement. The lease may be renewed for additional terms upon mutual agreement of both parties, with notice given at least 90 days prior to expiration.',
    contentTh:
      'ระยะเวลาการเช่ามีกำหนด 3 (สาม) ปี นับจากวันที่ลงนามในสัญญาฉบับนี้ สัญญาเช่าอาจต่ออายุได้ตามข้อตกลงร่วมกันของคู่สัญญาทั้งสองฝ่าย โดยต้องแจ้งล่วงหน้าอย่างน้อย 90 วันก่อนสัญญาหมดอายุ',
    type: 'standard',
    editable: true,
    riskLevel: 'low',
  },
  {
    id: 'cl-05',
    title: 'Security Deposit',
    titleTh: 'เงินประกัน',
    content:
      'The Lessee shall pay a security deposit equivalent to 3 (three) months of rent, totaling 255,000 THB (Two Hundred Fifty-Five Thousand Baht), upon signing this agreement. The deposit shall be refunded within 30 days of lease termination, subject to deductions for damages or unpaid obligations.',
    contentTh:
      'ผู้เช่าต้องชำระเงินประกันเท่ากับค่าเช่า 3 (สาม) เดือน รวมเป็นเงิน 255,000 บาท (สองแสนห้าหมื่นห้าพันบาทถ้วน) ณ วันลงนามในสัญญา เงินประกันจะคืนภายใน 30 วันหลังสิ้นสุดสัญญา โดยหักค่าเสียหายหรือภาระผูกพันที่ค้างชำระ',
    type: 'financial',
    editable: true,
    riskLevel: 'medium',
  },
  {
    id: 'cl-06',
    title: 'Maintenance and Repairs',
    titleTh: 'การบำรุงรักษาและซ่อมแซม',
    content:
      'The Lessee shall maintain the leased premises in good condition and repair. Structural repairs and maintenance of common areas shall be the Obligation of the Lessor. The Lessee is responsible for all interior maintenance, fixtures, and equipment installed by the Lessee.',
    contentTh:
      'ผู้เช่ามีหน้าที่รักษาพื้นที่เช่าให้อยู่ในสภาพดี การซ่อมแซมโครงสร้างและการบำรุงรักษาพื้นที่ส่วนกลางเป็นภาระผูกพันของผู้ให้เช่า ผู้เช่ารับผิดชอบการบำรุงรักษาภายใน อุปกรณ์ติดตั้ง และเครื่องมือที่ผู้เช่าติดตั้ง',
    type: 'maintenance',
    editable: true,
    riskLevel: 'medium',
  },
  {
    id: 'cl-07',
    title: 'Termination',
    titleTh: 'การบอกเลิกสัญญา',
    content:
      'Either party may terminate this agreement by providing 90 days written notice. In case of Default by the Lessee (failure to pay rent for 2 consecutive months), the Lessor may terminate immediately without Compensation. Early Termination by the Lessee without cause results in forfeiture of the security deposit as Liability payment.',
    contentTh:
      'คู่สัญญาฝ่ายใดฝ่ายหนึ่งอาจบอกเลิกสัญญาโดยแจ้งเป็นลายลักษณ์อักษรล่วงหน้า 90 วัน กรณีผู้เช่าผิดนัดชำระค่าเช่า 2 เดือนติดต่อกัน ผู้ให้เช่าสามารถบอกเลิกสัญญาได้ทันทีโดยไม่ต้องจ่ายค่าชดเชย การบอกเลิกสัญญาก่อนกำหนดโดยผู้เช่าโดยไม่มีเหตุผลอันสมควร จะถูกริบเงินประกันเป็นค่าความรับผิด',
    type: 'termination',
    editable: true,
    riskLevel: 'high',
  },
  {
    id: 'cl-08',
    title: 'Insurance Requirement',
    titleTh: 'ข้อกำหนดด้านการประกันภัย',
    content:
      'The Lessee shall maintain commercial property insurance covering fire, flood, and third-party Liability throughout the lease term. Minimum coverage shall be 1,000,000 THB. Proof of insurance must be provided to the Lessor within 30 days of lease commencement.',
    contentTh:
      'ผู้เช่าต้องทำประกันภัยทรัพย์สินเชิงพาณิชย์ครอบคลุมอัคคีภัย อุทกภัย และความรับผิดต่อบุคคลภายนอกตลอดระยะเวลาเช่า ความคุ้มครองขั้นต่ำ 1,000,000 บาท ผู้เช่าต้องส่งหลักฐานการทำประกันภัยให้ผู้ให้เช่าภายใน 30 วันนับจากวันเริ่มเช่า',
    type: 'insurance',
    editable: true,
    riskLevel: 'medium',
  },
  {
    id: 'cl-09',
    title: 'Use of Premises',
    titleTh: 'การใช้พื้นที่',
    content:
      'The leased premises shall be used solely for lawful commercial retail purposes as approved by the Lessor. The Lessee shall not change the nature of business without prior written consent. Sub-leasing or assignment of this lease is prohibited without the Lessor\'s written approval.',
    contentTh:
      'พื้นที่เช่าจะใช้เพื่อกิจการค้าปลีกที่ถูกกฎหมายตามที่ผู้ให้เช่าอนุมัติเท่านั้น ผู้เช่าจะไม่เปลี่ยนแปลงลักษณะธุรกิจโดยไม่ได้รับความยินยอมเป็นลายลักษณ์อักษรจากผู้ให้เช่า การเช่าช่วงหรือโอนสิทธิ์สัญญาเช่าเป็นสิ่งต้องห้ามโดยไม่ได้รับอนุมัติเป็นลายลักษณ์อักษรจากผู้ให้เช่า',
    type: 'operational',
    editable: true,
    riskLevel: 'medium',
  },
  {
    id: 'cl-10',
    title: 'Renovation and Alterations',
    titleTh: 'การปรับปรุงและดัดแปลง',
    content:
      'The Lessee may undertake interior renovations with prior written approval from the Lessor. All renovations must comply with building codes and regulations. Upon lease expiration, the Lessee shall restore the premises to its original condition unless otherwise agreed.',
    contentTh:
      'ผู้เช่าสามารถปรับปรุงภายในได้โดยได้รับอนุมัติเป็นลายลักษณ์อักษรจากผู้ให้เช่าก่อน การปรับปรุงทั้งหมดต้องเป็นไปตามกฎหมายอาคารและระเบียบที่เกี่ยวข้อง เมื่อสัญญาหมดอายุ ผู้เช่าต้องคืนสภาพพื้นที่ให้เป็นสภาพเดิม เว้นแต่จะตกลงกันเป็นอย่างอื่น',
    type: 'operational',
    editable: true,
    riskLevel: 'low',
  },
  {
    id: 'cl-11',
    title: 'Governing Law and Dispute Resolution',
    titleTh: 'กฎหมายที่ใช้บังคับและการระงับข้อพิพาท',
    content:
      'This agreement shall be governed by the laws of the Kingdom of Thailand. Any disputes arising from this agreement shall be resolved through mediation first. If mediation fails, disputes shall be submitted to the Thai Arbitration Institute or the competent courts of Thailand.',
    contentTh:
      'สัญญาฉบับนี้อยู่ภายใต้กฎหมายแห่งราชอาณาจักรไทย ข้อพิพาทใดๆ ที่เกิดขึ้นจากสัญญาฉบับนี้จะระงับโดยการไกล่เกลี่ยก่อน หากไกล่เกลี่ยไม่สำเร็จ ข้อพิพาทจะถูกเสนอต่อสถาบันอนุญาโตตุลาการแห่งประเทศไทยหรือศาลที่มีเขตอำนาจ',
    type: 'standard',
    editable: false,
    riskLevel: 'low',
  },
  {
    id: 'cl-12',
    title: 'Signatures',
    titleTh: 'ลายเซ็น',
    content:
      'Both parties acknowledge that they have read, understood, and agree to all terms and conditions set forth in this agreement. This contract is executed in two identical copies, one for each party.',
    contentTh:
      'คู่สัญญาทั้งสองฝ่ายรับทราบว่าได้อ่าน เข้าใจ และตกลงตามเงื่อนไขทั้งหมดที่กำหนดในสัญญาฉบับนี้ สัญญาฉบับนี้ทำขึ้นเป็นสองฉบับมีข้อความเหมือนกัน คู่สัญญาแต่ละฝ่ายถือไว้ฝ่ายละฉบับ',
    type: 'standard',
    editable: false,
    riskLevel: 'low',
  },
];

const mockContract: Contract = {
  id: 'CTR-2026-00142',
  dealId: 'deal-001',
  clauses: mockClauses,
  status: 'draft',
  language: 'both',
  createdAt: new Date().toISOString(),
};

export default function ContractDetailClient() {
  const { language } = useTranslation();
  const router = useRouter();
  const [view, setView] = useState<'document' | 'editor'>('document');
  const [clauses, setClauses] = useState<ContractClause[]>(mockClauses);
  const [contract] = useState<Contract>({ ...mockContract, clauses });

  // Smart warning: detect alcohol restriction zone without contract mention
  const isAlcoholZone = true; // Mock: property is in alcohol-restricted zone
  const hasAlcoholClause = clauses.some(
    (c) =>
      c.content.toLowerCase().includes('alcohol') ||
      c.contentTh.includes('แอลกอฮอล์')
  );
  const showAlcoholWarning = isAlcoholZone && !hasAlcoholClause;

  const handleClauseSave = (updated: ContractClause) => {
    setClauses((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 cursor-pointer"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-[#2563EB]" />
                <h1 className="text-base font-semibold text-gray-900">
                  {language === 'th' ? 'สัญญาเช่า' : 'Lease Agreement'}
                </h1>
              </div>
              <p className="text-xs text-gray-500 ml-6">{contract.id}</p>
            </div>
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => setView('document')}
              className={[
                'px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer',
                view === 'document'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-700',
              ].join(' ')}
            >
              {language === 'th' ? 'เอกสาร' : 'Document'}
            </button>
            <button
              onClick={() => setView('editor')}
              className={[
                'px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer',
                view === 'editor'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-700',
              ].join(' ')}
            >
              {language === 'th' ? 'แก้ไขข้อ' : 'Edit Clauses'}
            </button>
          </div>
        </div>
      </div>

      {/* Smart Warning Banner */}
      {showAlcoholWarning && (
        <div className="max-w-3xl mx-auto px-4 mt-4">
          <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
              <Wine size={16} className="text-amber-700" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-amber-800">
                {language === 'th'
                  ? 'คำเตือน: พื้นที่นี้อยู่ในเขตควบคุมเครื่องดื่มแอลกอฮอล์'
                  : 'Warning: This property is in an alcohol-restricted zone'}
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                {language === 'th'
                  ? 'สัญญาฉบับนี้ยังไม่มีข้อกำหนดเกี่ยวกับการห้ามจำหน่ายเครื่องดื่มแอลกอฮอล์ แนะนำให้เพิ่มข้อกำหนดนี้'
                  : 'This contract does not include an alcohol restriction clause. Consider adding one to comply with zoning regulations.'}
              </p>
            </div>
            <button className="shrink-0 text-amber-600 hover:text-amber-800 cursor-pointer">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 px-4 py-4">
        {view === 'document' ? (
          <div className="max-w-3xl mx-auto">
            <DocumentViewer
              contract={{ ...contract, clauses }}
              onEdit={() => setView('editor')}
              onShare={() => {}}
            />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4">
              <p className="text-xs text-blue-700">
                {language === 'th'
                  ? 'คลิกปุ่มแก้ไข (ดินสอ) ที่ข้อกำหนดที่ต้องการแก้ไข ข้อกำหนดที่ไม่สามารถแก้ไขได้จะไม่มีปุ่มแก้ไข'
                  : 'Click the edit (pencil) icon on any editable clause. Non-editable clauses are locked.'}
              </p>
            </div>
            {clauses.map((clause, idx) => (
              <ClauseEditor
                key={clause.id}
                clause={clause}
                index={idx}
                showBilingual={contract.language === 'both'}
                onSave={handleClauseSave}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Sticky Bar */}
      {view === 'editor' && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 z-10">
          <div className="max-w-3xl mx-auto flex gap-2">
            <Button
              variant="secondary"
              size="md"
              icon={Edit3}
              onClick={() => setView('document')}
              className="flex-1"
            >
              {language === 'th' ? 'ดูเอกสาร' : 'View Document'}
            </Button>
            <Button
              variant="secondary"
              size="md"
              icon={Share2}
              className="flex-1"
            >
              {language === 'th' ? 'แชร์' : 'Share to Other Party'}
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={PenTool}
              className="flex-1"
            >
              {language === 'th' ? 'ส่งลงนาม' : 'Send for e-Sign'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
