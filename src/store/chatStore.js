import { create } from 'zustand';
import { processMessage, QUICK_REPLY_INTENT_MAP } from '../agent/agentCore';

const INITIAL_MESSAGE = {
  id: 'init',
  role: 'agent',
  text: '안녕하세요! 👋 OK캐쉬백 쇼핑 AI에이전트입니다.\n\n무엇을 도와드릴까요?',
  cards: null,
  quickReplies: ['오늘 특가 보여줘', '공동구매 목록', 'e쿠폰 추천', '영화 예매하기', '내 포인트 확인'],
  timestamp: new Date().toISOString(),
};

export const useChatStore = create((set, get) => ({
  messages: [INITIAL_MESSAGE],
  isLoading: false,

  sendMessage: async (text) => {
    if (!text.trim() || get().isLoading) return;

    const userMsg = {
      id: `u_${Date.now()}`,
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };

    set((state) => ({
      messages: [...state.messages, userMsg],
      isLoading: true,
    }));

    try {
      const history = get().messages;
      const resolvedText = QUICK_REPLY_INTENT_MAP[text] || text;
      const response = await processMessage(resolvedText, history);

      const agentMsg = {
        id: `a_${Date.now()}`,
        role: 'agent',
        ...response,
        timestamp: new Date().toISOString(),
      };

      set((state) => ({
        messages: [...state.messages, agentMsg],
        isLoading: false,
      }));
    } catch {
      const errMsg = {
        id: `err_${Date.now()}`,
        role: 'agent',
        text: '일시적인 오류가 발생했어요. 잠시 후 다시 시도해 주세요.',
        cards: null,
        quickReplies: ['처음으로'],
        timestamp: new Date().toISOString(),
      };
      set((state) => ({
        messages: [...state.messages, errMsg],
        isLoading: false,
      }));
    }
  },

  reset: () =>
    set({ messages: [INITIAL_MESSAGE], isLoading: false }),
}));
