import type { Property, TenantRequirement } from '@/types';

/**
 * Calculate a match score (0-100) between a property and tenant requirements.
 * Considers budget fit, size fit, location, business type compatibility,
 * and legal/zoning compliance.
 */
export function calculateMatchScore(
  property: Property,
  requirement: TenantRequirement
): number {
  let score = 0;
  let totalWeight = 0;

  // --- Budget fit (weight: 30) ---
  const budgetWeight = 30;
  totalWeight += budgetWeight;
  if (property.price >= requirement.budget.min && property.price <= requirement.budget.max) {
    // Perfect fit
    score += budgetWeight;
  } else if (property.price < requirement.budget.min) {
    // Under budget is still good (cheaper)
    score += budgetWeight * 0.8;
  } else {
    // Over budget — scale down proportionally
    const overBy = property.price - requirement.budget.max;
    const budgetRange = requirement.budget.max - requirement.budget.min || 1;
    const penalty = Math.min(overBy / budgetRange, 1);
    score += budgetWeight * Math.max(0, 1 - penalty);
  }

  // --- Size fit (weight: 25) ---
  const sizeWeight = 25;
  totalWeight += sizeWeight;
  if (property.size >= requirement.size.min && property.size <= requirement.size.max) {
    score += sizeWeight;
  } else {
    const sizeRange = requirement.size.max - requirement.size.min || 1;
    const sizeDiff =
      property.size < requirement.size.min
        ? requirement.size.min - property.size
        : property.size - requirement.size.max;
    const penalty = Math.min(sizeDiff / sizeRange, 1);
    score += sizeWeight * Math.max(0, 1 - penalty);
  }

  // --- Location proximity (weight: 20) ---
  const locationWeight = 20;
  totalWeight += locationWeight;
  if (requirement.preferredAreas.length > 0) {
    const matchesArea = requirement.preferredAreas.some(
      (area) =>
        property.location.district.toLowerCase().includes(area.toLowerCase()) ||
        property.location.districtTh.includes(area) ||
        property.location.province.toLowerCase().includes(area.toLowerCase()) ||
        property.location.provinceTh.includes(area)
    );
    score += matchesArea ? locationWeight : locationWeight * 0.2;
  } else {
    // No preference — neutral score
    score += locationWeight * 0.5;
  }

  // --- Business type compatibility (weight: 15) ---
  const businessWeight = 15;
  totalWeight += businessWeight;

  // Check if the zoning allows the business type
  const alcoholBusinesses = ['bar', 'pub', 'nightclub'];
  const isAlcoholBusiness = alcoholBusinesses.some((b) =>
    requirement.businessType.toLowerCase().includes(b)
  );

  if (isAlcoholBusiness && !property.zoning.allowAlcohol) {
    // Zoning blocks this business type entirely
    score += 0;
  } else if (property.zoning.type === 'commercial' || property.zoning.type === 'mixed_use') {
    score += businessWeight;
  } else if (property.zoning.type === 'residential_commercial') {
    score += businessWeight * 0.7;
  } else {
    score += businessWeight * 0.3;
  }

  // --- Legal compliance / special needs (weight: 10) ---
  const legalWeight = 10;
  totalWeight += legalWeight;
  if (requirement.specialNeeds.length > 0) {
    const metNeeds = requirement.specialNeeds.filter((need) =>
      property.amenities.some(
        (amenity) => amenity.toLowerCase().includes(need.toLowerCase())
      )
    );
    const ratio = metNeeds.length / requirement.specialNeeds.length;
    score += legalWeight * ratio;
  } else {
    score += legalWeight;
  }

  // Normalize to 0-100
  return Math.round((score / totalWeight) * 100);
}
