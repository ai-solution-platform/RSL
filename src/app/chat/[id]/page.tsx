import ChatRoomClient from './client';

export function generateStaticParams() {
  return [
    { id: 'deal-1' },
    { id: 'deal-2' },
    { id: 'deal-3' },
    { id: 'deal-4' },
    { id: 'deal-5' },
  ];
}

export default function ChatRoomPage() {
  return <ChatRoomClient />;
}
