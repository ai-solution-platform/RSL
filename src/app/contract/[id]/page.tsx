import ContractDetailClient from './client';

export function generateStaticParams() {
  return [
    { id: 'ctr-001' },
  ];
}

export default function ContractDetailPage() {
  return <ContractDetailClient />;
}
