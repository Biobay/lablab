import React from 'react';
import { MessageSquare } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { WelcomeMessage } from './components/WelcomeMessage';
import { ReportSuggestions } from './components/ReportSuggestions';
import { useChat } from './hooks/useChat';

function App() {
  const { messages, isTyping, sendMessage } = useChat();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-xl bg-white shadow-lg">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-gray-200 px-6 py-4">
            <div className="rounded-full bg-blue-100 p-2 text-blue-600">
              <MessageSquare size={24} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Community Report Assistant</h1>
              <p className="text-sm text-gray-500">Submit and track your reports</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-[600px] overflow-y-auto px-6 py-4">
            {messages.length === 0 && <WelcomeMessage />}
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:0.2s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:0.4s]"></div>
                </div>
              )}
            </div>
          </div>

          {/* Suggestions */}
          <ReportSuggestions />

          {/* Input */}
          <div className="border-t border-gray-200 px-6 py-4">
            <ChatInput 
              onSendMessage={sendMessage} 
              disabled={isTyping} 
              placeholder="Describe the issue you'd like to report..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;