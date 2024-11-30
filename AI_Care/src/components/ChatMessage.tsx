import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Bot, User } from 'lucide-react';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAi = message.sender === 'ai';
  
  return (
    <div className={`flex gap-3 ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
        ${isAi ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
        {isAi ? <Bot size={20} /> : <User size={20} />}
      </div>
      <div className={`flex flex-col max-w-[80%] ${isAi ? 'items-start' : 'items-end'}`}>
        <div className={`rounded-lg px-4 py-2 ${
          isAi ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'
        }`}>
          {message.content}
        </div>
        <span className="text-xs text-gray-500 mt-1">
          {formatDistanceToNow(message.timestamp, { addSuffix: true })}
        </span>
      </div>
    </div>
  );
}