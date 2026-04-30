import { useState, useEffect } from 'react';
import { T } from '../tokens';

const DEALS = [
  { brand: '스타벅스', name: '아이스 카페 아메리카노 T', orig: '5,200원', now: '3,900원', disc: '25%', joined: 847, target: 1000 },
  { brand: '교촌치킨', name: '허니콤보 1마리', orig: '22,000원', now: '16,500원', disc: '25%', joined: 2341, target: 3000 },
  { brand: '올리브영', name: '비타민C 세럼 30ml', orig: '38,000원', now: '25,000원', disc: '34%', joined: 512, target: 800 },
  { brand: '배스킨라빈스', name: '패밀리 아이스크림 3L', orig: '28,000원', now: '18,900원', disc: '32%', joined: 1203, target: 1500 },
];

function fmt(n) { return String(n).padStart(2, '0'); }

export default function ScreenGroupBuy() {
  const [timeM, setM] = useState(34);
  const [timeS, setS] = useState(17);

  useEffect(() => {
    const t = setInterval(() => {
      setS((s) => {
        if (s > 0) return s - 1;
        setM((m) => (m > 0 ? m - 1 : 59));
        return 59;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="scrollbar-hide" style={{ flex: 1, overflowY: 'auto', background: T.gray50 }}>
      {/* Hero banner */}
      <div style={{ position: 'relative', height: 120, background: T.white, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -30, left: 100, width: 180, height: 180, borderRadius: '50%', background: T.green, opacity: 0.55 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(transparent, #fff)' }} />
        <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: T.black, letterSpacing: '-0.5px' }}>가격이 내려가는</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(0,0,0,0.55)', marginTop: 2 }}>모이면 모일수록</div>
        </div>
      </div>

      {/* Countdown */}
      <div style={{ background: T.gray900, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>마감까지</span>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {['02', fmt(timeM), fmt(timeS)].map((v, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{
                background: 'rgba(255,255,255,0.15)', borderRadius: 4, padding: '3px 8px',
                fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: T.neon,
              }}>{v}</span>
              {i < 2 && <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: 700 }}>:</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Deal cards */}
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {DEALS.map((d, i) => {
          const pct = Math.round((d.joined / d.target) * 100);
          return (
            <div key={i} style={{ background: T.white, borderRadius: 10, overflow: 'hidden', padding: 14 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 80, height: 80, background: T.gray50, borderRadius: 8, flexShrink: 0, position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 4, left: 4, background: T.hot, color: T.white, fontSize: 10, fontWeight: 700, padding: '2px 5px', borderRadius: 3 }}>{d.disc}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: T.gray500, marginBottom: 2 }}>{d.brand}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.gray900, lineHeight: 1.3, marginBottom: 5 }}>{d.name}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: T.hot }}>{d.disc}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: T.gray900 }}>{d.now}</span>
                    <span style={{ fontSize: 11, color: T.gray300, textDecoration: 'line-through' }}>{d.orig}</span>
                  </div>
                </div>
              </div>
              {/* Progress */}
              <div style={{ marginTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: T.purple, fontWeight: 600 }}>{d.joined.toLocaleString()}명 참여중</span>
                  <span style={{ fontSize: 11, color: T.gray500 }}>목표 {d.target.toLocaleString()}명</span>
                </div>
                <div style={{ height: 6, background: T.gray50, borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(to right, ${T.purple}, ${T.pink})`, borderRadius: 3 }} />
                </div>
              </div>
              <button style={{ marginTop: 10, width: '100%', background: T.black, color: T.white, border: 'none', borderRadius: 8, padding: '10px 0', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                같이 구매하기
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
