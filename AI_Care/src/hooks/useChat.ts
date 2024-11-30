import { useState, useCallback } from 'react';
import { Message } from '../types/chat';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(content),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
  };
}

function generateResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  // Check if the message contains location information
  const hasLocation = message.includes('street') || message.includes('avenue') || message.includes('road') || message.includes('park');
  
  if (!hasLocation) {
    return "Could you please specify the location of the issue? This helps us direct the report to the right department.";
  }

  return `Thank you for your report. I've recorded the following details:
• Location: ${extractLocation(message)}
• Issue: ${userMessage}

Your report has been logged and will be reviewed by the relevant department. You'll receive updates on its status.

Is there anything else you'd like to add to this report?`;
}

function extractLocation(message: string): string {
  const words = message.split(' ');
  let locationStart = -1;
  
  // Look for common location indicators
  words.forEach((word, index) => {
    if (word.includes('street') || word.includes('avenue') || word.includes('road') || word.includes('park')) {
      locationStart = index - 1;
    }
  });

  if (locationStart >= 0) {
    return words.slice(locationStart, locationStart + 2).join(' ');
  }

  return "Location needs clarification";
}