export default function QuickReplies({ replies, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {replies.map((reply) => (
        <button
          key={reply}
          onClick={() => onSelect(reply)}
          className="text-xs px-3 py-1.5 rounded-full border border-[#E8003D] text-[#E8003D] bg-white font-medium active:bg-red-50 transition-colors"
        >
          {reply}
        </button>
      ))}
    </div>
  );
}
