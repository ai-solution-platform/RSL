'use client';

import { CheckCheck, Paperclip } from 'lucide-react';
import type { Message } from '@/types';

interface ChatBubbleProps {
  message: Message;
  isOwn: boolean;
}

export default function ChatBubble({ message, isOwn }: ChatBubbleProps) {
  const time = new Date(message.timestamp).toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-[75%] px-3.5 py-2 rounded-2xl ${
          isOwn
            ? 'bg-blue-600 text-white rounded-br-md'
            : 'bg-white text-gray-900 rounded-bl-md border border-gray-100 shadow-sm'
        }`}
      >
        {/* Attachment indicator */}
        {message.attachments && message.attachments.length > 0 && (
          <div
            className={`flex items-center gap-1.5 mb-1 text-xs ${
              isOwn ? 'text-blue-200' : 'text-gray-500'
            }`}
          >
            <Paperclip className="h-3 w-3" />
            <span>
              {message.attachments.length} file
              {message.attachments.length > 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Message content */}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>

        {/* Timestamp + read status */}
        <div
          className={`flex items-center gap-1 mt-1 ${
            isOwn ? 'justify-end' : 'justify-start'
          }`}
        >
          <span
            className={`text-[10px] ${
              isOwn ? 'text-blue-200' : 'text-gray-400'
            }`}
          >
            {time}
          </span>
          {isOwn && (
            <CheckCheck
              className={`h-3.5 w-3.5 ${
                message.read ? 'text-blue-200' : 'text-blue-300/50'
              }`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
