import InsurancePolicyClient from './client';

export function generateStaticParams() {
  return [
    { id: 'ins-001' },
    { id: 'basic' },
    { id: 'standard' },
    { id: 'premium' },
  ];
}

export default function InsurancePolicyPage() {
  return <InsurancePolicyClient />;
}
