import { useState } from 'react';

export default function InputBar({ onSend, disabled }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 px-4 py-3 bg-white border-t border-gray-100"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="무엇이든 물어보세요..."
        disabled={disabled}
        className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#E8003D]/30 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={!text.trim() || disabled}
        className="w-10 h-10 rounded-full bg-[#E8003D] flex items-center justify-center flex-shrink-0 disabled:opacity-40 active:scale-95 transition-transform"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M22 2L11 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </form>
  );
}
