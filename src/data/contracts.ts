import { ContractClause } from '@/types';

export const contractClauseTemplates: ContractClause[] = [
  // --- Standard Clauses ---
  {
    id: 'clause-001',
    title: 'Lease Term and Commencement',
    titleTh: 'ระยะเวลาเช่าและวันเริ่มต้น',
    content: 'The lease shall commence on the Start Date specified herein and shall continue for the agreed lease term unless terminated earlier in accordance with this agreement. The Tenant shall have the right to renew the lease upon expiry, subject to mutual agreement on revised terms, provided written notice is given at least 90 days before the lease expiry date.',
    contentTh: 'สัญญาเช่าจะเริ่มต้นในวันเริ่มต้นที่ระบุไว้ในสัญญาฉบับนี้ และจะดำเนินต่อไปตามระยะเวลาเช่าที่ตกลงกัน เว้นแต่จะถูกยกเลิกก่อนกำหนดตามข้อตกลงนี้ ผู้เช่ามีสิทธิ์ต่อสัญญาเช่าเมื่อครบกำหนด โดยมีเงื่อนไขว่าทั้งสองฝ่ายตกลงเรื่องเงื่อนไขใหม่ และต้องแจ้งเป็นลายลักษณ์อักษรอย่างน้อย 90 วันก่อนวันหมดอายุสัญญาเช่า',
    type: 'standard',
    editable: false,
    riskLevel: 'low',
  },
  {
    id: 'clause-002',
    title: 'Permitted Use',
    titleTh: 'วัตถุประสงค์การใช้พื้นที่',
    content: 'The Tenant shall use the Premises solely for the purpose of operating the business type as specified in this agreement. Any change in the nature of the business conducted on the Premises requires prior written consent from the Landlord. The Tenant shall comply with all applicable laws, regulations, and zoning requirements.',
    contentTh: 'ผู้เช่าจะต้องใช้สถานที่เช่าเพื่อวัตถุประสงค์ในการดำเนินธุรกิจตามประเภทที่ระบุไว้ในสัญญาฉบับนี้เท่านั้น การเปลี่ยนแปลงลักษณะธุรกิจที่ดำเนินการบนสถานที่เช่าต้องได้รับความยินยอมเป็นลายลักษณ์อักษรจากผู้ให้เช่าล่วงหน้า ผู้เช่าต้องปฏิบัติตามกฎหมาย ระเบียบ และข้อกำหนดด้านผังเมืองที่เกี่ยวข้องทั้งหมด',
    type: 'standard',
    editable: false,
    riskLevel: 'low',
  },

  // --- Financial Clauses ---
  {
    id: 'clause-003',
    title: 'Rent and Payment Terms',
    titleTh: 'ค่าเช่าและเงื่อนไขการชำระเงิน',
    content: 'The Tenant shall pay the monthly rental amount as specified in this agreement, due on or before the 5th day of each calendar month. Payment shall be made by bank transfer to the Landlord designated account. Late payment shall incur a penalty of 1.5% per month on the outstanding amount.',
    contentTh: 'ผู้เช่าจะต้องชำระค่าเช่ารายเดือนตามจำนวนที่ระบุไว้ในสัญญาฉบับนี้ ภายในวันที่ 5 ของเดือนปฏิทินแต่ละเดือน การชำระเงินจะต้องทำโดยการโอนเงินผ่านธนาคารไปยังบัญชีที่ผู้ให้เช่ากำหนด การชำระเงินล่าช้าจะมีค่าปรับ 1.5% ต่อเดือนของยอดค้างชำระ',
    type: 'financial',
    editable: true,
    riskLevel: 'medium',
  },
  {
    id: 'clause-004',
    title: 'Security Deposit',
    titleTh: 'เงินประกัน',
    content: 'Upon execution of this lease, the Tenant shall pay a security deposit equivalent to the number of months rent as specified in the offer terms. The deposit shall be held by the Landlord and returned within 30 days of lease termination, less any deductions for damages, unpaid rent, or restoration costs.',
    contentTh: 'เมื่อลงนามในสัญญาเช่านี้ ผู้เช่าจะต้องชำระเงินประกันเท่ากับค่าเช่าจำนวนเดือนตามที่ระบุไว้ในเงื่อนไขข้อเสนอ เงินประกันจะถูกเก็บรักษาโดยผู้ให้เช่าและจะคืนภายใน 30 วันนับจากวันสิ้นสุดสัญญาเช่า หักค่าเสียหาย ค่าเช่าค้างชำระ หรือค่าบูรณะ',
    type: 'financial',
    editable: true,
    riskLevel: 'medium',
  },
  {
    id: 'clause-005',
    title: 'Annual Rent Escalation',
    titleTh: 'การปรับค่าเช่าประจำปี',
    content: 'The rental amount shall be subject to annual escalation at a rate agreed upon in the offer terms, effective on each anniversary of the lease commencement date. The Landlord shall provide written notice of the adjusted rent at least 60 days prior to the adjustment date.',
    contentTh: 'จำนวนค่าเช่าจะถูกปรับขึ้นประจำปีในอัตราที่ตกลงกันในเงื่อนไขข้อเสนอ มีผลบังคับใช้ในวันครบรอบแต่ละปีนับจากวันเริ่มต้นสัญญาเช่า ผู้ให้เช่าจะต้องแจ้งค่าเช่าที่ปรับแล้วเป็นลายลักษณ์อักษรอย่างน้อย 60 วันก่อนวันปรับ',
    type: 'financial',
    editable: true,
    riskLevel: 'medium',
  },

  // --- Operational Clauses ---
  {
    id: 'clause-006',
    title: 'Operating Hours',
    titleTh: 'เวลาเปิด-ปิดทำการ',
    content: 'The Tenant shall operate the business during the operating hours specified by the zoning regulations and building management. Any request to extend operating hours must be submitted in writing and approved by both the Landlord and relevant authorities.',
    contentTh: 'ผู้เช่าจะต้องดำเนินธุรกิจในช่วงเวลาเปิด-ปิดทำการที่กำหนดโดยระเบียบผังเมืองและผู้บริหารอาคาร คำขอขยายเวลาทำการต้องยื่นเป็นลายลักษณ์อักษรและได้รับอนุมัติจากทั้งผู้ให้เช่าและหน่วยงานที่เกี่ยวข้อง',
    type: 'operational',
    editable: false,
    riskLevel: 'low',
  },
  {
    id: 'clause-007',
    title: 'Fit-Out and Modifications',
    titleTh: 'การตกแต่งและดัดแปลง',
    content: 'The Tenant may carry out interior fit-out works subject to prior written approval from the Landlord. All structural modifications are prohibited without explicit consent. Upon lease termination, the Tenant shall restore the Premises to its original condition unless otherwise agreed in writing.',
    contentTh: 'ผู้เช่าสามารถดำเนินการตกแต่งภายในได้โดยต้องได้รับการอนุมัติเป็นลายลักษณ์อักษรจากผู้ให้เช่าล่วงหน้า ห้ามดัดแปลงโครงสร้างโดยไม่ได้รับความยินยอมอย่างชัดเจน เมื่อสิ้นสุดสัญญาเช่า ผู้เช่าจะต้องคืนสถานที่ให้กลับสู่สภาพเดิม เว้นแต่จะตกลงกันเป็นอย่างอื่นเป็นลายลักษณ์อักษร',
    type: 'operational',
    editable: true,
    riskLevel: 'medium',
  },
  {
    id: 'clause-008',
    title: 'Signage and Branding',
    titleTh: 'ป้ายและแบรนดิ้ง',
    content: 'The Tenant may install signage and branding materials on the Premises subject to Landlord approval and compliance with local regulations and building management guidelines. All signage must be professionally made and maintained in good condition.',
    contentTh: 'ผู้เช่าสามารถติดตั้งป้ายและวัสดุแบรนดิ้งบนสถานที่เช่าได้โดยต้องได้รับการอนุมัติจากผู้ให้เช่า และปฏิบัติตามระเบียบท้องถิ่นและแนวทางของผู้บริหารอาคาร ป้ายทั้งหมดต้องทำอย่างมืออาชีพและดูแลรักษาให้อยู่ในสภาพดี',
    type: 'operational',
    editable: true,
    riskLevel: 'low',
  },

  // --- Maintenance Clauses ---
  {
    id: 'clause-009',
    title: 'Maintenance and Repairs',
    titleTh: 'การบำรุงรักษาและซ่อมแซม',
    content: 'The Tenant shall be responsible for daily maintenance and minor repairs of the interior of the Premises. The Landlord shall be responsible for structural repairs, external maintenance, and common area upkeep. Emergency repairs affecting building safety are the Landlord responsibility and shall be addressed within 24 hours of notification.',
    contentTh: 'ผู้เช่ามีหน้าที่รับผิดชอบการบำรุงรักษาประจำวันและการซ่อมแซมเล็กน้อยภายในสถานที่เช่า ผู้ให้เช่ามีหน้าที่รับผิดชอบการซ่อมแซมโครงสร้าง การบำรุงรักษาภายนอก และการดูแลพื้นที่ส่วนกลาง การซ่อมแซมฉุกเฉินที่ส่งผลต่อความปลอดภัยของอาคารเป็นความรับผิดชอบของผู้ให้เช่าและจะต้องดำเนินการภายใน 24 ชั่วโมงหลังได้รับแจ้ง',
    type: 'maintenance',
    editable: false,
    riskLevel: 'low',
  },

  // --- Insurance Clauses ---
  {
    id: 'clause-010',
    title: 'Insurance Requirements',
    titleTh: 'ข้อกำหนดด้านประกันภัย',
    content: 'The Tenant shall maintain adequate insurance coverage throughout the lease term, including but not limited to fire insurance, public liability insurance, and inventory insurance. The Tenant shall provide proof of insurance to the Landlord within 14 days of lease commencement and upon each renewal.',
    contentTh: 'ผู้เช่าจะต้องรักษาความคุ้มครองประกันภัยที่เพียงพอตลอดระยะเวลาเช่า รวมถึงแต่ไม่จำกัดเพียงประกันอัคคีภัย ประกันความรับผิดต่อสาธารณะ และประกันสินค้าคงคลัง ผู้เช่าจะต้องแสดงหลักฐานประกันภัยต่อผู้ให้เช่าภายใน 14 วันนับจากวันเริ่มต้นสัญญาเช่าและเมื่อมีการต่ออายุแต่ละครั้ง',
    type: 'insurance',
    editable: false,
    riskLevel: 'low',
  },

  // --- Termination Clauses ---
  {
    id: 'clause-011',
    title: 'Early Termination',
    titleTh: 'การยกเลิกสัญญาก่อนกำหนด',
    content: 'Either party may terminate this lease early by providing 90 days written notice. In the event of early termination by the Tenant, the security deposit shall be forfeited unless termination is due to breach by the Landlord. The Landlord may terminate immediately upon material breach by the Tenant, including but not limited to non-payment of rent for 30 consecutive days.',
    contentTh: 'ฝ่ายใดฝ่ายหนึ่งสามารถยกเลิกสัญญาเช่านี้ก่อนกำหนดได้โดยแจ้งเป็นลายลักษณ์อักษรล่วงหน้า 90 วัน ในกรณีที่ผู้เช่ายกเลิกสัญญาก่อนกำหนด เงินประกันจะถูกริบ เว้นแต่การยกเลิกเกิดจากการผิดสัญญาของผู้ให้เช่า ผู้ให้เช่าสามารถยกเลิกได้ทันทีเมื่อผู้เช่าผิดสัญญาอย่างร้ายแรง รวมถึงแต่ไม่จำกัดเพียงการไม่ชำระค่าเช่าเป็นเวลา 30 วันติดต่อกัน',
    type: 'termination',
    editable: true,
    riskLevel: 'high',
  },
  {
    id: 'clause-012',
    title: 'Force Majeure',
    titleTh: 'เหตุสุดวิสัย',
    content: 'Neither party shall be liable for failure to perform obligations under this lease if such failure results from circumstances beyond their reasonable control, including but not limited to natural disasters, pandemics, government orders, war, or civil unrest. The affected party must notify the other party within 7 days of the force majeure event.',
    contentTh: 'ฝ่ายใดฝ่ายหนึ่งจะไม่ต้องรับผิดชอบต่อการไม่ปฏิบัติตามภาระผูกพันภายใต้สัญญาเช่านี้ หากการไม่ปฏิบัตินั้นเกิดจากสถานการณ์ที่อยู่นอกเหนือการควบคุมอย่างสมเหตุสมผล รวมถึงแต่ไม่จำกัดเพียงภัยธรรมชาติ การระบาดใหญ่ คำสั่งรัฐบาล สงคราม หรือความไม่สงบ ฝ่ายที่ได้รับผลกระทบต้องแจ้งอีกฝ่ายภายใน 7 วันนับจากเหตุสุดวิสัย',
    type: 'termination',
    editable: false,
    riskLevel: 'low',
  },

  // --- Custom / Negotiable ---
  {
    id: 'clause-013',
    title: 'Subletting and Assignment',
    titleTh: 'การเช่าช่วงและการโอนสิทธิ์',
    content: 'The Tenant shall not sublet, assign, or transfer the lease or any part thereof without prior written consent of the Landlord. Any approved subletting arrangement shall not release the Tenant from obligations under this lease.',
    contentTh: 'ผู้เช่าจะต้องไม่เช่าช่วง โอน หรือถ่ายโอนสัญญาเช่าหรือส่วนใดส่วนหนึ่งโดยไม่ได้รับความยินยอมเป็นลายลักษณ์อักษรจากผู้ให้เช่าล่วงหน้า การเช่าช่วงที่ได้รับอนุมัติจะไม่ปลดปล่อยผู้เช่าจากภาระผูกพันภายใต้สัญญาเช่านี้',
    type: 'custom',
    editable: true,
    riskLevel: 'high',
  },
  {
    id: 'clause-014',
    title: 'Dispute Resolution',
    titleTh: 'การระงับข้อพิพาท',
    content: 'Any disputes arising from this lease shall first be resolved through good-faith negotiation between the parties. If negotiation fails within 30 days, the dispute shall be referred to arbitration under the Arbitration Rules of the Thai Arbitration Institute. The arbitration shall be conducted in Bangkok, Thailand.',
    contentTh: 'ข้อพิพาทใดๆ ที่เกิดจากสัญญาเช่านี้จะต้องแก้ไขก่อนโดยการเจรจาด้วยความสุจริตระหว่างทั้งสองฝ่าย หากการเจรจาล้มเหลวภายใน 30 วัน ข้อพิพาทจะถูกส่งไปยังอนุญาโตตุลาการภายใต้ข้อบังคับอนุญาโตตุลาการของสถาบันอนุญาโตตุลาการแห่งประเทศไทย การอนุญาโตตุลาการจะดำเนินการในกรุงเทพมหานคร ประเทศไทย',
    type: 'custom',
    editable: false,
    riskLevel: 'low',
  },
];
