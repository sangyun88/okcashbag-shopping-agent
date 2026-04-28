import { useChatStore } from '../../store/chatStore';

export default function Header() {
  const reset = useChatStore((s) => s.reset);

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[#E8003D] flex items-center justify-center text-white text-xs font-bold">
          OK
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900 leading-tight">쇼핑 AI에이전트</p>
          <p className="text-xs text-green-500 font-medium">● 온라인</p>
        </div>
      </div>
      <button
        onClick={reset}
        className="text-xs text-gray-400 px-3 py-1.5 rounded-full border border-gray-200 active:bg-gray-50"
      >
        대화 초기화
      </button>
    </header>
  );
}
