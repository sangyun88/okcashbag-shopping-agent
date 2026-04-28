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

export default function App() {
  const [navTab,    setNavTab]    = useState('추천');
  const [bottomTab, setBottomTab] = useState('쇼핑');
  const [showMY,    setShowMY]    = useState(false);
  const [chatOpen,  setChatOpen]  = useState(false);
  const { reset, sendMessage } = useChatStore();

  function handleAISearch(query) {
    setChatOpen(true);
    setTimeout(() => sendMessage(query), 100);
  }

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
            {navTab === '추천'    && <ScreenRecommend onAISearch={handleAISearch} />}
            {navTab === '공동구매' && <ScreenGroupBuy />}
            {navTab === '오늘특가' && <ScreenTodayDeal />}
            {navTab === 'e쿠폰'   && <ScreenECoupon />}
            {navTab === '영화티켓' && <ScreenMovie />}
          </>
        )
      }

      <BottomNav
        active={showMY ? '적립' : bottomTab}
        onTab={handleBottomTab}
      />

      {/* ── Chat Drawer ── */}
      {chatOpen && (
        <div style={{
          position: 'fixed', top: 0, bottom: 0,
          left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: 480,
          zIndex: 200,
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
