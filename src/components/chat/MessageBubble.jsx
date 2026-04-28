import CardCarousel from '../cards/CardCarousel';
import QuickReplies from './QuickReplies';

function parseMarkdown(text) {
  return text
    .split('\n')
    .map((line, i) => {
      const boldLine = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      return `<span key="${i}">${boldLine}</span>`;
    })
    .join('<br/>');
}

export default function MessageBubble({ message, onQuickReply }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} mb-4`}>
      {!isUser && (
        <div className="flex items-end gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-[#E8003D] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            OK
          </div>
          <div
            className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 max-w-[75vw] shadow-sm text-sm text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(message.text) }}
          />
        </div>
      )}

      {isUser && (
        <div className="bg-[#E8003D] rounded-2xl rounded-br-sm px-4 py-3 max-w-[75vw] text-sm text-white leading-relaxed">
          {message.text}
        </div>
      )}

      {!isUser && message.cards && <CardCarousel cards={message.cards} />}

      {!isUser && message.quickReplies?.length > 0 && (
        <div className="pl-10 mt-2">
          <QuickReplies replies={message.quickReplies} onSelect={onQuickReply} />
        </div>
      )}
    </div>
  );
}
