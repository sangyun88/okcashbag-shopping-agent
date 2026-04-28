import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import InputBar from './InputBar';
import { useChatStore } from '../../store/chatStore';

export default function ChatWindow() {
  const { messages, isLoading, sendMessage } = useChatStore();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pt-4 pb-2">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} onQuickReply={sendMessage} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>
      <InputBar onSend={sendMessage} disabled={isLoading} />
    </div>
  );
}
