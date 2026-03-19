import { ZoningInfo, PermitItem } from '@/types';

// --- Bangkok Zoning Types ---

export interface ZoningTypeInfo {
  type: ZoningInfo['type'];
  name: string;
  nameTh: string;
  color: string;
  description: string;
  descriptionTh: string;
  defaultOperatingHours: { open: string; close: string };
  allowAlcohol: boolean;
  allowTobacco: boolean;
  commonRestrictions: string[];
}

export const bangkokZoningTypes: ZoningTypeInfo[] = [
  {
    type: 'commercial',
    name: 'Commercial Zone (Red)',
    nameTh: 'เขตพาณิชยกรรม (แดง)',
    color: '#FF4444',
    description: 'Designated commercial areas for retail, office, and service businesses. Highest density commercial activity allowed. Typically found in CBD areas and along major roads.',
    descriptionTh: 'พื้นที่พาณิชยกรรมสำหรับค้าปลีก สำนักงาน และธุรกิจบริการ อนุญาตให้มีกิจกรรมพาณิชย์ความหนาแน่นสูงสุด พบได้ทั่วไปในย่าน CBD และตามถนนสายหลัก',
    defaultOperatingHours: { open: '08:00', close: '22:00' },
    allowAlcohol: true,
    allowTobacco: true,
    commonRestrictions: [
      'Building height limits per district plan',
      'Parking ratio requirements',
      'Fire safety compliance mandatory',
    ],
  },
  {
    type: 'mixed_use',
    name: 'Mixed Use Zone (Orange)',
    nameTh: 'เขตผสมผสาน (ส้ม)',
    color: '#FF8800',
    description: 'Areas allowing both commercial and residential use. Moderate commercial activity with residential compatibility requirements. Common in transitional neighborhoods.',
    descriptionTh: 'พื้นที่อนุญาตให้ใช้ทั้งพาณิชย์และที่อยู่อาศัย กิจกรรมพาณิชย์ระดับปานกลางพร้อมข้อกำหนดความเข้ากันได้กับที่อยู่อาศัย พบได้ทั่วไปในย่านเปลี่ยนผ่าน',
    defaultOperatingHours: { open: '06:00', close: '23:00' },
    allowAlcohol: true,
    allowTobacco: false,
    commonRestrictions: [
      'Noise restrictions after 22:00',
      'Limited signage size',
      'No heavy industrial activity',
      'Residential compatibility required',
    ],
  },
  {
    type: 'residential_commercial',
    name: 'Residential-Commercial Zone (Yellow)',
    nameTh: 'เขตที่อยู่อาศัย-พาณิชย์ (เหลือง)',
    color: '#FFCC00',
    description: 'Primarily residential areas with limited commercial use allowed on ground floors. Strict noise and operating hour controls. Common in suburban Bangkok neighborhoods.',
    descriptionTh: 'พื้นที่อยู่อาศัยเป็นหลักที่อนุญาตให้ใช้พาณิชย์จำกัดในชั้นล่าง ควบคุมเสียงและเวลาทำการอย่างเข้มงวด พบได้ทั่วไปในย่านชานเมืองกรุงเทพ',
    defaultOperatingHours: { open: '06:00', close: '22:00' },
    allowAlcohol: false,
    allowTobacco: false,
    commonRestrictions: [
      'Ground floor commercial only',
      'Strict noise limits at all hours',
      'No entertainment venues',
      'Limited delivery hours (08:00-18:00)',
      'No alcohol sales near schools/temples',
    ],
  },
  {
    type: 'industrial',
    name: 'Industrial Zone (Purple)',
    nameTh: 'เขตอุตสาหกรรม (ม่วง)',
    color: '#8844CC',
    description: 'Areas designated for industrial and manufacturing use. Retail activity limited to supporting services. Found in outer Bangkok districts.',
    descriptionTh: 'พื้นที่สำหรับอุตสาหกรรมและการผลิต กิจกรรมค้าปลีกจำกัดเฉพาะบริการสนับสนุน พบในเขตชานกรุงเทพ',
    defaultOperatingHours: { open: '06:00', close: '22:00' },
    allowAlcohol: false,
    allowTobacco: true,
    commonRestrictions: [
      'Retail limited to factory outlets and supporting services',
      'Environmental impact assessment may be required',
      'Heavy vehicle access required',
    ],
  },
  {
    type: 'special_economic',
    name: 'Special Economic Zone (Blue)',
    nameTh: 'เขตเศรษฐกิจพิเศษ (น้ำเงิน)',
    color: '#4488FF',
    description: 'Special economic zones with incentives for certain business types. May include tax benefits and relaxed regulations for qualifying businesses.',
    descriptionTh: 'เขตเศรษฐกิจพิเศษพร้อมสิทธิประโยชน์สำหรับธุรกิจบางประเภท อาจรวมถึงสิทธิประโยชน์ทางภาษีและระเบียบที่ผ่อนคลายสำหรับธุรกิจที่มีคุณสมบัติ',
    defaultOperatingHours: { open: '00:00', close: '23:59' },
    allowAlcohol: true,
    allowTobacco: true,
    commonRestrictions: [
      'Business must qualify for SEZ incentives',
      'Additional reporting requirements',
      'BOI approval may be required',
    ],
  },
];

// --- Permit Requirements ---

export const standardPermits: PermitItem[] = [
  {
    name: 'Business Registration (DBD)',
    nameTh: 'จดทะเบียนพาณิชย์ (กรมพัฒนาธุรกิจการค้า)',
    required: true,
    agency: 'Department of Business Development',
    agencyTh: 'กรมพัฒนาธุรกิจการค้า',
    estimatedTime: '1-3 days',
    estimatedCost: 50,
  },
  {
    name: 'Tax Registration',
    nameTh: 'จดทะเบียนภาษี',
    required: true,
    agency: 'Revenue Department',
    agencyTh: 'กรมสรรพากร',
    estimatedTime: '1-3 days',
    estimatedCost: 0,
  },
  {
    name: 'Shop Sign Permit',
    nameTh: 'ใบอนุญาตติดตั้งป้าย',
    required: true,
    agency: 'District Office (Khet)',
    agencyTh: 'สำนักงานเขต',
    estimatedTime: '7-14 days',
    estimatedCost: 500,
  },
  {
    name: 'Fire Safety Certificate',
    nameTh: 'ใบรับรองความปลอดภัยจากอัคคีภัย',
    required: true,
    agency: 'Fire Department',
    agencyTh: 'กองป้องกันและบรรเทาสาธารณภัย',
    estimatedTime: '7-14 days',
    estimatedCost: 1000,
  },
  {
    name: 'Building Use Permit',
    nameTh: 'ใบอนุญาตใช้อาคาร',
    required: true,
    agency: 'District Office (Khet)',
    agencyTh: 'สำนักงานเขต',
    estimatedTime: '14-30 days',
    estimatedCost: 2000,
  },
];

export const foodAndBeveragePermits: PermitItem[] = [
  {
    name: 'Food Establishment License',
    nameTh: 'ใบอนุญาตสถานที่จำหน่ายอาหาร',
    required: true,
    agency: 'District Office - Health Division',
    agencyTh: 'สำนักงานเขต - ฝ่ายสิ่งแวดล้อมและสุขาภิบาล',
    estimatedTime: '14-30 days',
    estimatedCost: 2000,
  },
  {
    name: 'Food Handler Certificate',
    nameTh: 'ใบรับรองผู้สัมผัสอาหาร',
    required: true,
    agency: 'Department of Health',
    agencyTh: 'กรมอนามัย',
    estimatedTime: '1-3 days',
    estimatedCost: 200,
  },
  {
    name: 'Grease Trap Installation Certificate',
    nameTh: 'ใบรับรองการติดตั้งบ่อดักไขมัน',
    required: true,
    agency: 'District Office - Engineering',
    agencyTh: 'สำนักงานเขต - ฝ่ายโยธา',
    estimatedTime: '7-14 days',
    estimatedCost: 3000,
  },
  {
    name: 'Wastewater Discharge Permit',
    nameTh: 'ใบอนุญาตระบายน้ำเสีย',
    required: true,
    agency: 'Pollution Control Department',
    agencyTh: 'กรมควบคุมมลพิษ',
    estimatedTime: '14-30 days',
    estimatedCost: 1500,
  },
];

export const alcoholPermits: PermitItem[] = [
  {
    name: 'Alcohol Sales License',
    nameTh: 'ใบอนุญาตขายสุรา',
    required: true,
    agency: 'Excise Department',
    agencyTh: 'กรมสรรพสามิต',
    estimatedTime: '14-30 days',
    estimatedCost: 5500,
  },
  {
    name: 'Late-Night Alcohol Permit',
    nameTh: 'ใบอนุญาตขายสุราหลังเวลาปกติ',
    required: false,
    agency: 'Local Police Station & Excise Department',
    agencyTh: 'สถานีตำรวจท้องที่ และกรมสรรพสามิต',
    estimatedTime: '30-45 days',
    estimatedCost: 10000,
  },
];

export const tobaccoPermits: PermitItem[] = [
  {
    name: 'Tobacco Sales License',
    nameTh: 'ใบอนุญาตขายยาสูบ',
    required: true,
    agency: 'Excise Department',
    agencyTh: 'กรมสรรพสามิต',
    estimatedTime: '7-14 days',
    estimatedCost: 200,
  },
];

export const entertainmentPermits: PermitItem[] = [
  {
    name: 'Entertainment Venue License',
    nameTh: 'ใบอนุญาตสถานบริการ',
    required: true,
    agency: 'Local Administration',
    agencyTh: 'กรมการปกครอง',
    estimatedTime: '30-60 days',
    estimatedCost: 15000,
  },
  {
    name: 'Noise Control Compliance',
    nameTh: 'การปฏิบัติตามกฎหมายควบคุมเสียง',
    required: true,
    agency: 'Pollution Control Department',
    agencyTh: 'กรมควบคุมมลพิษ',
    estimatedTime: '7-14 days',
    estimatedCost: 3000,
  },
];

export const healthAndWellnessPermits: PermitItem[] = [
  {
    name: 'Health Establishment License',
    nameTh: 'ใบอนุญาตสถานประกอบการเพื่อสุขภาพ',
    required: true,
    agency: 'Department of Health Service Support',
    agencyTh: 'กรมสนับสนุนบริการสุขภาพ',
    estimatedTime: '30-45 days',
    estimatedCost: 5000,
  },
  {
    name: 'Spa/Massage Operator License',
    nameTh: 'ใบอนุญาตผู้ประกอบการสปา/นวด',
    required: true,
    agency: 'Department of Health Service Support',
    agencyTh: 'กรมสนับสนุนบริการสุขภาพ',
    estimatedTime: '14-30 days',
    estimatedCost: 3000,
  },
];

// --- Helper: Get Required Permits by Business Type ---

export function getRequiredPermits(businessType: string, zoning: ZoningInfo): PermitItem[] {
  const permits = [...standardPermits];

  const lowerType = businessType.toLowerCase();

  if (lowerType.includes('food') || lowerType.includes('restaurant') || lowerType.includes('cafe') || lowerType.includes('noodle') || lowerType.includes('bakery')) {
    permits.push(...foodAndBeveragePermits);
  }

  if (zoning.allowAlcohol && (lowerType.includes('bar') || lowerType.includes('restaurant') || lowerType.includes('pub'))) {
    permits.push(...alcoholPermits);
  }

  if (zoning.allowTobacco) {
    permits.push(...tobaccoPermits);
  }

  if (lowerType.includes('entertainment') || lowerType.includes('club') || lowerType.includes('karaoke')) {
    permits.push(...entertainmentPermits);
  }

  if (lowerType.includes('spa') || lowerType.includes('massage') || lowerType.includes('wellness') || lowerType.includes('yoga')) {
    permits.push(...healthAndWellnessPermits);
  }

  return permits;
}

// --- Bangkok District Zoning Overview ---

export interface DistrictZoning {
  district: string;
  districtTh: string;
  primaryZoning: ZoningInfo['type'];
  notes: string;
  notesTh: string;
}

export const bangkokDistrictZoning: DistrictZoning[] = [
  { district: 'Pathum Wan', districtTh: 'ปทุมวัน', primaryZoning: 'commercial', notes: 'Major retail and commercial hub (Siam, CentralWorld)', notesTh: 'ศูนย์กลางค้าปลีกและพาณิชย์หลัก (สยาม เซ็นทรัลเวิลด์)' },
  { district: 'Bang Rak', districtTh: 'บางรัก', primaryZoning: 'commercial', notes: 'Silom-Sathorn CBD area', notesTh: 'ย่าน CBD สีลม-สาทร' },
  { district: 'Sathorn', districtTh: 'สาทร', primaryZoning: 'commercial', notes: 'Major business district', notesTh: 'ย่านธุรกิจหลัก' },
  { district: 'Watthana', districtTh: 'วัฒนา', primaryZoning: 'commercial', notes: 'Sukhumvit, Thonglor, Ekkamai area', notesTh: 'ย่านสุขุมวิท ทองหล่อ เอกมัย' },
  { district: 'Khlong Toei', districtTh: 'คลองเตย', primaryZoning: 'mixed_use', notes: 'Mix of commercial and residential (Asoke, Nana)', notesTh: 'ผสมผสานพาณิชย์และที่อยู่อาศัย (อโศก นานา)' },
  { district: 'Phaya Thai', districtTh: 'พญาไท', primaryZoning: 'mixed_use', notes: 'Ari neighborhood, mix of trendy shops and residential', notesTh: 'ย่านอารีย์ ผสมผสานร้านค้าทันสมัยและที่อยู่อาศัย' },
  { district: 'Chatuchak', districtTh: 'จตุจักร', primaryZoning: 'mixed_use', notes: 'Chatuchak Market area, Ladprao', notesTh: 'ย่านตลาดจตุจักร ลาดพร้าว' },
  { district: 'Ratchathewi', districtTh: 'ราชเทวี', primaryZoning: 'commercial', notes: 'Pratunam wholesale district', notesTh: 'ย่านค้าส่งประตูน้ำ' },
  { district: 'Phra Nakhon', districtTh: 'พระนคร', primaryZoning: 'mixed_use', notes: 'Old town, Khao San Road tourist area', notesTh: 'เมืองเก่า ย่านนักท่องเที่ยวถนนข้าวสาร' },
  { district: 'Huai Khwang', districtTh: 'ห้วยขวาง', primaryZoning: 'mixed_use', notes: 'Ratchada area, night markets', notesTh: 'ย่านรัชดา ตลาดกลางคืน' },
  { district: 'Suan Luang', districtTh: 'สวนหลวง', primaryZoning: 'residential_commercial', notes: 'Growing suburban area (On Nut)', notesTh: 'ย่านชานเมืองที่กำลังเติบโต (อ่อนนุช)' },
  { district: 'Bang Phli', districtTh: 'บางพลี', primaryZoning: 'commercial', notes: 'Mega Bangna area, large-format retail', notesTh: 'ย่านเมกาบางนา ค้าปลีกขนาดใหญ่' },
];
