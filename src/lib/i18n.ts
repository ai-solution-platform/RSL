import { useAppStore } from '@/store';

type TranslationKey = string;

const translations: Record<'th' | 'en', Record<TranslationKey, string>> = {
  th: {
    // Navigation
    'nav.discover': 'ค้นหา',
    'nav.map': 'แผนที่',
    'nav.feed': 'ฟีด',
    'nav.chat': 'แชท',
    'nav.profile': 'โปรไฟล์',

    // Header
    'header.appName': 'RSL',
    'header.tenant': 'ผู้เช่า',
    'header.landlord': 'เจ้าของ',
    'header.notifications': 'การแจ้งเตือน',

    // Discover page
    'discover.title': 'ค้นหาพื้นที่',
    'discover.search': 'ค้นหาพื้นที่เช่า...',
    'discover.filters': 'ตัวกรอง',
    'discover.budget': 'งบประมาณ',
    'discover.size': 'ขนาดพื้นที่',
    'discover.businessType': 'ประเภทธุรกิจ',
    'discover.matchScore': 'คะแนนจับคู่',
    'discover.recommended': 'แนะนำสำหรับคุณ',
    'discover.nearby': 'ใกล้เคียง',
    'discover.popular': 'ยอดนิยม',
    'discover.newListings': 'ประกาศใหม่',

    // Property details
    'property.price': 'ราคา',
    'property.size': 'ขนาด',
    'property.floor': 'ชั้น',
    'property.location': 'ที่ตั้ง',
    'property.details': 'รายละเอียด',
    'property.amenities': 'สิ่งอำนวยความสะดวก',
    'property.zoning': 'โซนนิ่ง',
    'property.legal': 'ข้อกฎหมาย',
    'property.permits': 'ใบอนุญาต',
    'property.traffic': 'ความหนาแน่นการสัญจร',
    'property.competitors': 'คู่แข่งในพื้นที่',
    'property.available': 'ว่าง',
    'property.reserved': 'จอง',
    'property.leased': 'ปล่อยเช่าแล้ว',
    'property.maintenance': 'ปรับปรุง',
    'property.comingSoon': 'เร็วๆ นี้',
    'property.type.mall': 'ห้าง',
    'property.type.streetShop': 'ตึกแถว',
    'property.type.communityMall': 'คอมมิวนิตี้มอลล์',
    'property.type.standalone': 'อาคารเดี่ยว',
    'property.type.market': 'ตลาด',
    'property.type.popUp': 'ป๊อปอัพ',

    // Business types
    'business.cafe': 'คาเฟ่',
    'business.restaurant': 'ร้านอาหาร',
    'business.clinic': 'คลินิก',
    'business.retail': 'ร้านค้าปลีก',
    'business.bar': 'บาร์',
    'business.salon': 'ร้านเสริมสวย',
    'business.gym': 'ฟิตเนส',
    'business.pharmacy': 'ร้านขายยา',
    'business.laundry': 'ร้านซักรีด',
    'business.convenience': 'ร้านสะดวกซื้อ',
    'business.bakery': 'เบเกอรี่',
    'business.spa': 'สปา',
    'business.tutoring': 'โรงเรียนกวดวิชา',
    'business.coworking': 'โคเวิร์คกิ้งสเปซ',
    'business.other': 'อื่นๆ',

    // Zoning
    'zoning.commercial': 'พาณิชยกรรม',
    'zoning.mixedUse': 'ผสมผสาน',
    'zoning.residentialCommercial': 'ที่อยู่อาศัย-พาณิชยกรรม',
    'zoning.industrial': 'อุตสาหกรรม',
    'zoning.specialEconomic': 'เขตเศรษฐกิจพิเศษ',

    // Deal status
    'deal.inquiry': 'สนใจ',
    'deal.negotiation': 'เจรจา',
    'deal.pendingContract': 'รอสัญญา',
    'deal.pendingSignature': 'รอเซ็นสัญญา',
    'deal.active': 'ใช้งาน',
    'deal.completed': 'เสร็จสิ้น',
    'deal.cancelled': 'ยกเลิก',
    'deal.expired': 'หมดอายุ',

    // Contract
    'contract.generate': 'สร้างสัญญา',
    'contract.leaseTerms': 'เงื่อนไขการเช่า',
    'contract.duration': 'ระยะเวลา',
    'contract.deposit': 'เงินมัดจำ',
    'contract.clauses': 'ข้อกำหนด',
    'contract.sign': 'เซ็นสัญญา',
    'contract.draft': 'ร่างสัญญา',
    'contract.review': 'ตรวจสอบ',
    'contract.signed': 'เซ็นแล้ว',
    'contract.terminated': 'ยกเลิกสัญญา',

    // Insurance
    'insurance.basic': 'แผนพื้นฐาน',
    'insurance.standard': 'แผนมาตรฐาน',
    'insurance.premium': 'แผนพรีเมียม',
    'insurance.coverage': 'ความคุ้มครอง',
    'insurance.policy': 'กรมธรรม์',
    'insurance.premium_amount': 'เบี้ยประกัน',
    'insurance.select': 'เลือกแผนประกัน',

    // Feed
    'feed.createPost': 'สร้างโพสต์',
    'feed.promoteSpace': 'โปรโมทพื้นที่',
    'feed.promoteBusiness': 'โปรโมทธุรกิจ',
    'feed.matchMe': 'จับคู่ให้ฉัน',
    'feed.likes': 'ถูกใจ',
    'feed.comments': 'ความคิดเห็น',
    'feed.shares': 'แชร์',
    'feed.trending': 'กำลังมาแรง',

    // Chat
    'chat.sendMessage': 'ส่งข้อความ',
    'chat.makeOffer': 'ยื่นข้อเสนอ',
    'chat.counterOffer': 'เสนอราคาสวน',
    'chat.accept': 'ยอมรับ',
    'chat.reject': 'ปฏิเสธ',
    'chat.typing': 'กำลังพิมพ์...',
    'chat.online': 'ออนไลน์',
    'chat.offline': 'ออฟไลน์',

    // Offer status
    'offer.pending': 'รอดำเนินการ',
    'offer.accepted': 'ยอมรับแล้ว',
    'offer.rejected': 'ปฏิเสธแล้ว',
    'offer.countered': 'เสนอราคาสวนแล้ว',
    'offer.withdrawn': 'ถอนข้อเสนอ',

    // Common actions
    'common.save': 'บันทึก',
    'common.share': 'แชร์',
    'common.cancel': 'ยกเลิก',
    'common.submit': 'ส่ง',
    'common.back': 'กลับ',
    'common.next': 'ถัดไป',
    'common.loading': 'กำลังโหลด...',
    'common.noResults': 'ไม่พบผลลัพธ์',
    'common.seeAll': 'ดูทั้งหมด',
    'common.edit': 'แก้ไข',
    'common.delete': 'ลบ',
    'common.confirm': 'ยืนยัน',
    'common.close': 'ปิด',
    'common.search': 'ค้นหา',
    'common.filter': 'กรอง',
    'common.sort': 'เรียงลำดับ',
    'common.reset': 'รีเซ็ต',
    'common.apply': 'นำไปใช้',
    'common.viewMore': 'ดูเพิ่มเติม',
    'common.contact': 'ติดต่อ',
    'common.call': 'โทร',
    'common.email': 'อีเมล',

    // Landlord dashboard
    'landlord.dashboard': 'แดชบอร์ด',
    'landlord.addListing': 'เพิ่มประกาศ',
    'landlord.vacancyRate': 'อัตราว่าง',
    'landlord.matchingTenants': 'ผู้เช่าที่ตรงกัน',
    'landlord.revenue': 'รายได้',
    'landlord.properties': 'พื้นที่ของฉัน',
    'landlord.activeDeals': 'ดีลที่กำลังดำเนินการ',

    // Units
    'unit.sqm': 'ตร.ม.',
    'unit.bahtMonth': 'บาท/เดือน',
    'unit.months': 'เดือน',
    'unit.years': 'ปี',
    'unit.baht': 'บาท',

    // Time
    'time.justNow': 'เมื่อกี้',
    'time.minutesAgo': 'นาทีที่แล้ว',
    'time.hoursAgo': 'ชั่วโมงที่แล้ว',
    'time.daysAgo': 'วันที่แล้ว',
    'time.weeksAgo': 'สัปดาห์ที่แล้ว',
    'time.monthsAgo': 'เดือนที่แล้ว',
  },

  en: {
    // Navigation
    'nav.discover': 'Discover',
    'nav.map': 'Map',
    'nav.feed': 'Feed',
    'nav.chat': 'Chat',
    'nav.profile': 'Profile',

    // Header
    'header.appName': 'RSL',
    'header.tenant': 'Tenant',
    'header.landlord': 'Landlord',
    'header.notifications': 'Notifications',

    // Discover page
    'discover.title': 'Find Your Space',
    'discover.search': 'Search for rental spaces...',
    'discover.filters': 'Filters',
    'discover.budget': 'Budget',
    'discover.size': 'Size',
    'discover.businessType': 'Business Type',
    'discover.matchScore': 'Match Score',
    'discover.recommended': 'Recommended for You',
    'discover.nearby': 'Nearby',
    'discover.popular': 'Popular',
    'discover.newListings': 'New Listings',

    // Property details
    'property.price': 'Price',
    'property.size': 'Size',
    'property.floor': 'Floor',
    'property.location': 'Location',
    'property.details': 'Details',
    'property.amenities': 'Amenities',
    'property.zoning': 'Zoning',
    'property.legal': 'Legal',
    'property.permits': 'Permits',
    'property.traffic': 'Traffic Score',
    'property.competitors': 'Nearby Competitors',
    'property.available': 'Available',
    'property.reserved': 'Reserved',
    'property.leased': 'Leased',
    'property.maintenance': 'Maintenance',
    'property.comingSoon': 'Coming Soon',
    'property.type.mall': 'Mall',
    'property.type.streetShop': 'Street Shop',
    'property.type.communityMall': 'Community Mall',
    'property.type.standalone': 'Standalone',
    'property.type.market': 'Market',
    'property.type.popUp': 'Pop-up',

    // Business types
    'business.cafe': 'Cafe',
    'business.restaurant': 'Restaurant',
    'business.clinic': 'Clinic',
    'business.retail': 'Retail',
    'business.bar': 'Bar',
    'business.salon': 'Salon',
    'business.gym': 'Gym',
    'business.pharmacy': 'Pharmacy',
    'business.laundry': 'Laundry',
    'business.convenience': 'Convenience Store',
    'business.bakery': 'Bakery',
    'business.spa': 'Spa',
    'business.tutoring': 'Tutoring',
    'business.coworking': 'Co-working Space',
    'business.other': 'Other',

    // Zoning
    'zoning.commercial': 'Commercial',
    'zoning.mixedUse': 'Mixed Use',
    'zoning.residentialCommercial': 'Residential-Commercial',
    'zoning.industrial': 'Industrial',
    'zoning.specialEconomic': 'Special Economic Zone',

    // Deal status
    'deal.inquiry': 'Interested',
    'deal.negotiation': 'Negotiation',
    'deal.pendingContract': 'Contract Draft',
    'deal.pendingSignature': 'Pending Signature',
    'deal.active': 'Active',
    'deal.completed': 'Completed',
    'deal.cancelled': 'Cancelled',
    'deal.expired': 'Expired',

    // Contract
    'contract.generate': 'Generate Contract',
    'contract.leaseTerms': 'Lease Terms',
    'contract.duration': 'Duration',
    'contract.deposit': 'Deposit',
    'contract.clauses': 'Clauses',
    'contract.sign': 'Sign Contract',
    'contract.draft': 'Draft',
    'contract.review': 'Review',
    'contract.signed': 'Signed',
    'contract.terminated': 'Terminated',

    // Insurance
    'insurance.basic': 'Basic Plan',
    'insurance.standard': 'Standard Plan',
    'insurance.premium': 'Premium Plan',
    'insurance.coverage': 'Coverage',
    'insurance.policy': 'Policy',
    'insurance.premium_amount': 'Premium',
    'insurance.select': 'Select Insurance Plan',

    // Feed
    'feed.createPost': 'Create Post',
    'feed.promoteSpace': 'Promote Space',
    'feed.promoteBusiness': 'Promote Business',
    'feed.matchMe': 'Match Me',
    'feed.likes': 'Likes',
    'feed.comments': 'Comments',
    'feed.shares': 'Shares',
    'feed.trending': 'Trending',

    // Chat
    'chat.sendMessage': 'Send Message',
    'chat.makeOffer': 'Make Offer',
    'chat.counterOffer': 'Counter Offer',
    'chat.accept': 'Accept',
    'chat.reject': 'Reject',
    'chat.typing': 'Typing...',
    'chat.online': 'Online',
    'chat.offline': 'Offline',

    // Offer status
    'offer.pending': 'Pending',
    'offer.accepted': 'Accepted',
    'offer.rejected': 'Rejected',
    'offer.countered': 'Countered',
    'offer.withdrawn': 'Withdrawn',

    // Common actions
    'common.save': 'Save',
    'common.share': 'Share',
    'common.cancel': 'Cancel',
    'common.submit': 'Submit',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.loading': 'Loading...',
    'common.noResults': 'No results found',
    'common.seeAll': 'See All',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.reset': 'Reset',
    'common.apply': 'Apply',
    'common.viewMore': 'View More',
    'common.contact': 'Contact',
    'common.call': 'Call',
    'common.email': 'Email',

    // Landlord dashboard
    'landlord.dashboard': 'Dashboard',
    'landlord.addListing': 'Add Listing',
    'landlord.vacancyRate': 'Vacancy Rate',
    'landlord.matchingTenants': 'Matching Tenants',
    'landlord.revenue': 'Revenue',
    'landlord.properties': 'My Properties',
    'landlord.activeDeals': 'Active Deals',

    // Units
    'unit.sqm': 'sqm',
    'unit.bahtMonth': 'THB/mo',
    'unit.months': 'months',
    'unit.years': 'years',
    'unit.baht': 'THB',

    // Time
    'time.justNow': 'Just now',
    'time.minutesAgo': 'minutes ago',
    'time.hoursAgo': 'hours ago',
    'time.daysAgo': 'days ago',
    'time.weeksAgo': 'weeks ago',
    'time.monthsAgo': 'months ago',
  },
};

export function t(key: string, lang: 'th' | 'en'): string {
  return translations[lang][key] ?? key;
}

export function useTranslation() {
  const language = useAppStore((state) => state.language);

  return {
    t: (key: string) => t(key, language),
    language,
  };
}

export { translations };
