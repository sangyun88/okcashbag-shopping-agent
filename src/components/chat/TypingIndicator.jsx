export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-4">
      <div className="w-8 h-8 rounded-full bg-[#E8003D] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
        OK
      </div>
      <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-1">
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}
