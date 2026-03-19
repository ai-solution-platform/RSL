import PropertyDetailClient from './client';

export function generateStaticParams() {
  return [
    { id: 'prop-001' },
    { id: 'prop-002' },
    { id: 'prop-003' },
    { id: 'prop-004' },
    { id: 'prop-005' },
    { id: 'prop-006' },
    { id: 'prop-007' },
    { id: 'prop-008' },
    { id: 'prop-009' },
    { id: 'prop-010' },
    { id: 'prop-011' },
    { id: 'prop-012' },
    { id: 'prop-013' },
    { id: 'prop-014' },
    { id: 'prop-015' },
    { id: 'prop-016' },
    { id: 'prop-017' },
    { id: 'prop-018' },
    { id: 'prop-019' },
    { id: 'prop-020' },
    { id: 'prop-021' },
    { id: 'prop-022' },
    { id: 'prop-023' },
  ];
}

export default function PropertyDetailPage() {
  return <PropertyDetailClient />;
}
