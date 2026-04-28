import { useState } from 'react';
import './index.css';

import StatusBar from './components/ui/StatusBar';
import TopAppBar from './components/ui/TopAppBar';
import NavBar from './components/ui/NavBar';
import BottomNav from './components/ui/BottomNav';

import ScreenRecommend  from './screens/ScreenRecommend';
import ScreenGroupBuy   from './screens/ScreenGroupBuy';
import ScreenTodayDeal  from './screens/ScreenTodayDeal';
import ScreenECoupon    from './screens/ScreenECoupon';
import ScreenMovie      from './screens/ScreenMovie';
import ScreenMY         from './screens/ScreenMY';

import ChatWindow from './components/chat/ChatWindow';
import { useChatStore } from './store/chatStore';
import { T } from './tokens';

const SCREEN_MAP = {
  '추천':    <ScreenRecommend />,
  '공동구매': <ScreenGroupBuy />,
  '오늘특가': <ScreenTodayDeal />,
  'e쿠폰':   <ScreenECoupon />,
  '영화티켓': <ScreenMovie />,
};

export default function App() {
  const [navTab,    setNavTab]    = useState('추천');
  const [bottomTab, setBottomTab] = useState('쇼핑');
  const [showMY,    setShowMY]    = useState(false);
  const [chatOpen,  setChatOpen]  = useState(false);
  const reset = useChatStore((s) => s.reset);

  const isDark = navTab === '오늘특가' && !showMY;

  function handleMyPage() { setShowMY((v) => !v); }
  function handleBottomTab(t) { setBottomTab(t); setShowMY(false); }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', background: T.white, position: 'relative', overflow: 'hidden' }}>

      {/* ── Shell ── */}
      <StatusBar dark={isDark} />
      <TopAppBar dark={isDark} onMyPage={handleMyPage} />

      {showMY
        ? <ScreenMY />
        : (
          <>
            <NavBar active={navTab} onTab={setNavTab} dark={isDark} />
            {SCREEN_MAP[navTab]}
          </>
        )
      }

      <BottomNav
        active={showMY ? '적립' : bottomTab}
        onTab={handleBottomTab}
      />

      {/* ── AI Agent FAB ── */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          style={{
            position: 'fixed', bottom: 72, right: 16,
            width: 52, height: 52, borderRadius: '50%',
            background: '#E8003D', border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(232,0,61,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 100,
          }}
          aria-label="AI 에이전트 열기"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.477 2 2 6.477 2 12C2 13.89 2.525 15.655 3.438 17.168L2.046 21.953L6.832 20.561C8.345 21.474 10.11 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M8 10H16M8 14H13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      )}

      {/* ── Chat Drawer ── */}
      {chatOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          display: 'flex', flexDirection: 'column',
          background: T.white,
        }}>
          {/* Chat header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 16px', background: T.white,
            borderBottom: `1px solid ${T.gray100}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#E8003D', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.white, fontSize: 11, fontWeight: 700 }}>OK</div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: T.gray900, lineHeight: 1.2 }}>쇼핑 AI에이전트</p>
                <p style={{ fontSize: 11, color: '#22c55e', fontWeight: 600, marginTop: 1 }}>● 온라인</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button
                onClick={reset}
                style={{ fontSize: 11, color: T.gray400, padding: '6px 12px', borderRadius: 9999, border: `1px solid ${T.gray200}`, background: T.white, cursor: 'pointer' }}
              >대화 초기화</button>
              <button
                onClick={() => setChatOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke={T.gray600} strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Chat body */}
          <ChatWindow />
        </div>
      )}
    </div>
  );
}
