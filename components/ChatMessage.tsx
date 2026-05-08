'use client';

import { Message } from '@/types';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface ChatMessageProps {
  message: Message;
  isOwn: boolean;
}

export default function ChatMessage({ message, isOwn }: ChatMessageProps) {
  if (message.type === 'system') {
    return (
      <div className="flex justify-center my-2">
        <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
        {!isOwn && (
          <div className="text-xs text-gray-500 mb-1 ml-2">
            {message.senderName}
          </div>
        )}
        <div
          className={`px-4 py-2 rounded-2xl ${
            isOwn
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-none'
              : 'bg-gray-200 text-gray-800 rounded-bl-none'
          }`}
        >
          <p className="break-words">{message.content}</p>
        </div>
        <div className={`text-xs text-gray-400 mt-1 ${isOwn ? 'text-right mr-2' : 'ml-2'}`}>
          {format(message.timestamp, 'HH:mm', { locale: vi })}
        </div>
      </div>
    </div>
  );
}

// Made with Bob
