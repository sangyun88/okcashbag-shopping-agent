import { useState, useEffect } from 'react';
import { T } from '../tokens';
import Card2 from '../components/ui/Card2';

const ITEMS = [
  { brand: '교촌치킨', name: '허니콤보 치킨 (반마리)', price: '11,900원', disc: '20%' },
  { brand: '스타벅스', name: '돌체 라떼 (Venti)', price: '6,800원', disc: '12%' },
  { brand: '올리브영', name: '선크림 기획 세트', price: '23,000원', disc: '35%' },
  { brand: '메가커피', name: '카페라떼 XL', price: '2,700원', disc: '10%' },
  { brand: '도미노피자', name: '포테이토 피자 L', price: '17,400원', disc: '30%' },
  { brand: '배스킨라빈스', name: '쿼터 케이크', price: '24,000원', disc: '15%' },
];

function fmt(n) { return String(n).padStart(2, '0'); }

export default function ScreenTodayDeal() {
  const [sec, setSec] = useState(12 * 3600 + 23 * 60 + 12);

  useEffect(() => {
    const t = setInterval(() => setSec((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;

  return (
    <div className="scrollbar-hide" style={{ flex: 1, overflowY: 'auto', background: T.gray900 }}>
      {/* Dark hero */}
      <div style={{ position: 'relative', background: T.gray900, padding: '20px 14px 16px', overflow: 'hidden' }}>
        {[140, 200, 60].map((x, i) => (
          <div key={i} style={{
            position: 'absolute', top: 0, left: x, width: 2, height: 80,
            background: `linear-gradient(transparent, rgba(${i === 1 ? '224,254,76' : '255,100,100'},0.4))`,
            borderRadius: 1, opacity: 0.6,
          }} />
        ))}
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', marginBottom: 4 }}>
            매일 아침 9시마다
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: T.white, letterSpacing: '-0.5px' }}>오늘특가</div>
        </div>
      </div>

      {/* Gradient timer */}
      <div style={{ background: 'linear-gradient(to right, #AA23E9, #FF427D)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 0' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="2"/>
          <path d="M12 7V12L15 14" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{fmt(h)}:{fmt(m)}:{fmt(s)}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>남음</span>
      </div>

      {/* Product grid */}
      <div style={{ background: T.white, borderRadius: '20px 20px 0 0', paddingBottom: 20 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '14px 14px 0' }}>
          {ITEMS.map((p, i) => <Card2 key={i} {...p} />)}
        </div>
        <div style={{ padding: '14px 14px 0', display: 'flex', justifyContent: 'center' }}>
          <button style={{ border: `1px solid ${T.gray100}`, background: T.white, borderRadius: 9999, padding: '12px 40px', fontSize: 13, fontWeight: 500, color: T.black, cursor: 'pointer' }}>
            더 많은 상품 보기 ›
          </button>
        </div>
      </div>
    </div>
  );
}
