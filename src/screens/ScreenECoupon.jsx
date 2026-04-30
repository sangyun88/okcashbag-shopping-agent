import { useState } from 'react';
import { T } from '../tokens';
import Chip from '../components/ui/Chip';
import Card2 from '../components/ui/Card2';

const CATS = ['카페', '패스트푸드', '편의점', '치킨', '피자', '베이커리', '뷰티'];

const ITEMS = [
  { brand: '스타벅스', name: '카페 아메리카노 T', price: '4,700원', disc: '4%' },
  { brand: '스타벅스', name: '디카페인 아메리카노 T', price: '5,000원' },
  { brand: '스타벅스', name: '콜드 브루 T', price: '5,100원', disc: '8%' },
  { brand: '스타벅스', name: '아이스 카페 라떼 T', price: '5,200원' },
  { brand: '스타벅스', name: '카페 라떼 T', price: '5,500원', disc: '6%' },
  { brand: '스타벅스', name: '디카페인 카페 라떼 T', price: '5,500원' },
];

export default function ScreenECoupon() {
  const [cat, setCat] = useState('카페');

  return (
    <div className="scrollbar-hide" style={{ flex: 1, overflowY: 'auto', background: T.white }}>
      {/* Benefit banner */}
      <div style={{
        background: `linear-gradient(135deg, ${T.purple}22, ${T.pink}18)`,
        borderBottom: `1px solid ${T.purple}22`,
        padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: T.purple, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>%</span>
        </div>
        <span style={{ fontSize: 12, color: T.purple, fontWeight: 600 }}>지금 4천원 할인 쿠폰 받기</span>
        <span style={{ fontSize: 12, color: T.gray500, marginLeft: 'auto' }}>받기 ›</span>
      </div>

      {/* Category chips */}
      <div style={{ borderBottom: `1px solid ${T.gray100}` }}>
        <div style={{ display: 'flex', gap: 6, padding: '10px 14px', overflowX: 'auto' }}>
          {CATS.map((c) => (
            <Chip key={c} label={c} active={cat === c} onClick={() => setCat(c)} />
          ))}
        </div>
      </div>

      {/* Sort */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 14px', borderBottom: `1px solid ${T.gray50}` }}>
        <span style={{ fontSize: 12, color: T.gray800, display: 'flex', alignItems: 'center', gap: 2 }}>
          할인율 순 ▾
        </span>
      </div>

      {/* Grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '8px 14px 20px' }}>
        {ITEMS.map((p, i) => <Card2 key={i} {...p} />)}
      </div>
    </div>
  );
}
