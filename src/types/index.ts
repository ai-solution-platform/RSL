// ============================================================
// Retail Space Leasing Platform - TypeScript Type Definitions
// Designed for future DB scaling (Supabase/PostgreSQL ready)
// ============================================================

// --- Enums ---

export type PropertyType = 'mall' | 'street_shop' | 'community_mall' | 'standalone' | 'market' | 'pop_up';

export type PropertyStatus = 'available' | 'reserved' | 'leased' | 'maintenance' | 'coming_soon';

export type UserRole = 'tenant' | 'landlord' | 'admin';

export type DealStatus = 'inquiry' | 'negotiation' | 'pending_contract' | 'pending_signature' | 'active' | 'completed' | 'cancelled' | 'expired';

export type OfferStatus = 'pending' | 'accepted' | 'rejected' | 'countered' | 'withdrawn';

export type ContractStatus = 'draft' | 'review' | 'pending_signature' | 'signed' | 'active' | 'terminated' | 'expired';

export type ContractClauseType = 'standard' | 'financial' | 'operational' | 'termination' | 'insurance' | 'maintenance' | 'custom';

export type InsurancePlanTier = 'basic' | 'standard' | 'premium';

export type InsurancePolicyStatus = 'pending' | 'active' | 'expired' | 'cancelled' | 'claimed';

export type ZoningType = 'commercial' | 'mixed_use' | 'residential_commercial' | 'industrial' | 'special_economic';

export type FeedPostType = 'space' | 'business';

export type MediaType = 'image' | 'video';

export type RiskLevel = 'low' | 'medium' | 'high';

// --- Location & Zoning ---

export interface GeoLocation {
  lat: number;
  lng: number;
  address: string;
  addressTh: string;
  district: string;
  districtTh: string;
  province: string;
  provinceTh: string;
}

export interface ZoningInfo {
  type: ZoningType;
  color: string; // hex color for map display
  allowAlcohol: boolean;
  allowTobacco: boolean;
  operatingHours: {
    open: string; // "08:00"
    close: string; // "22:00"
  };
  restrictions: string[];
}

// --- Property ---

export interface Property {
  id: string;
  landlordId: string;
  title: string;
  titleTh: string;
  description: string;
  descriptionTh: string;
  price: number; // THB per month
  size: number; // sqm
  floor: number | string; // number or 'G' for ground, 'B1' for basement
  propertyType: PropertyType;
  location: GeoLocation;
  amenities: string[];
  images: string[];
  zoning: ZoningInfo;
  trafficScore: number; // 1-100
  competitorCount: number;
  status: PropertyStatus;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

// --- User ---

export interface TenantRequirement {
  budget: {
    min: number;
    max: number;
  };
  size: {
    min: number;
    max: number;
  };
  preferredAreas: string[];
  businessType: string;
  specialNeeds: string[];
}

export interface User {
  id: string;
  role: UserRole;
  name: string;
  nameTh: string;
  email: string;
  phone: string;
  avatar: string;
  company: string;
  companyTh: string;
  requirements?: TenantRequirement;
  verified: boolean;
  createdAt: string;
}

// --- Deal & Negotiation ---

export interface Offer {
  id: string;
  amount: number; // THB per month
  duration: number; // months
  deposit: number; // months of deposit
  conditions: string;
  status: OfferStatus;
  createdBy: string; // userId
  createdAt: string;
}

export interface MessageAttachment {
  name: string;
  url: string;
  type: string; // mime type
  size: number; // bytes
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  attachments: MessageAttachment[];
  timestamp: string;
  read: boolean;
}

export interface Deal {
  id: string;
  propertyId: string;
  tenantId: string;
  landlordId: string;
  status: DealStatus;
  offers: Offer[];
  messages: Message[];
  contract?: Contract;
  insurance?: InsurancePolicy;
  createdAt: string;
  updatedAt: string;
}

// --- Contract ---

export interface ContractClause {
  id: string;
  title: string;
  titleTh: string;
  content: string;
  contentTh: string;
  type: ContractClauseType;
  editable: boolean;
  riskLevel?: RiskLevel;
}

export interface SignatureInfo {
  userId: string;
  signedAt: string;
  signatureUrl: string;
}

export interface Contract {
  id: string;
  dealId: string;
  clauses: ContractClause[];
  status: ContractStatus;
  language: 'en' | 'th' | 'both';
  tenantSignature?: SignatureInfo;
  landlordSignature?: SignatureInfo;
  createdAt: string;
}

// --- Insurance ---

export interface CoverageItem {
  name: string;
  nameTh: string;
  limit: number; // THB
  description: string;
  descriptionTh: string;
}

export interface InsurancePolicy {
  id: string;
  dealId: string;
  plan: InsurancePlanTier;
  coverage: CoverageItem[];
  premium: number; // THB per month
  policyHolder: string; // userId
  status: InsurancePolicyStatus;
  startDate: string;
  endDate: string;
}

export interface InsurancePlan {
  id: string;
  name: string;
  nameTh: string;
  tier: InsurancePlanTier;
  coverage: CoverageItem[];
  monthlyPremium: number;
  description: string;
  descriptionTh: string;
}

// --- Feed ---

export interface FeedMedia {
  type: MediaType;
  url: string;
}

export interface FeedComment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface FeedPost {
  id: string;
  userId: string;
  type: FeedPostType;
  media: FeedMedia[];
  caption: string;
  captionTh: string;
  propertyId?: string;
  matchScore?: number; // 0-100, AI-computed relevance
  tags: string[];
  likes: number;
  comments: FeedComment[];
  shares: number;
  createdAt: string;
}

// --- Permits ---

export interface PermitItem {
  name: string;
  nameTh: string;
  required: boolean;
  agency: string;
  agencyTh: string;
  estimatedTime: string; // e.g. "7-14 days"
  estimatedCost: number; // THB
}

// --- Utility Types (for future DB scaling) ---

export type WithTimestamps = {
  createdAt: string;
  updatedAt: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
};

export type FilterParams = {
  priceMin?: number;
  priceMax?: number;
  sizeMin?: number;
  sizeMax?: number;
  propertyType?: PropertyType[];
  district?: string[];
  amenities?: string[];
  allowAlcohol?: boolean;
  status?: PropertyStatus[];
  sortBy?: 'price' | 'size' | 'trafficScore' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
};
