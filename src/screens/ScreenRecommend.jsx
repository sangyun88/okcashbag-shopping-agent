import { useState } from 'react';
import { T } from '../tokens';
import Card2 from '../components/ui/Card2';
import SectionTitle from '../components/ui/SectionTitle';

const PRODUCTS = [
  { brand: '스타벅스', name: '카페 아메리카노 T', price: '4,700원', disc: '4%', rating: '4.5', reviews: '1.2k' },
  { brand: '올리브영', name: '닥터지 선크림 SPF50+', price: '15,900원', disc: '24%', rating: '4.1', reviews: '366' },
  { brand: '메가커피', name: '아이스 아메리카노 L', price: '2,200원', disc: '10%' },
  { brand: '배스킨라빈스', name: '파인트 아이스크림', price: '9,500원', disc: '15%', rating: '4.3', reviews: '88' },
  { brand: 'BBQ치킨', name: '황금올리브 콤보', price: '22,000원', disc: '8%' },
  { brand: '도미노피자', name: '슈퍼시드 콰트로 L', price: '18,900원', disc: '25%', rating: '4.2', reviews: '210' },
];

export default function ScreenRecommend({ onAISearch }) {
  const [query, setQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    onAISearch(query.trim());
    setQuery('');
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: T.gray50 }}>
      {/* Hero banner */}
      <div style={{
        position: 'relative', height: 220,
        background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b69 50%, #11998e 100%)',
        overflow: 'hidden', flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 70% 30%, rgba(108,64,240,0.5) 0%, transparent 60%)',
        }} />
        <div style={{ position: 'absolute', bottom: 32, left: 0, right: 0, textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#fff', lineHeight: 1.25, marginBottom: 12, whiteSpace: 'pre-line' }}>
            {'영화 할인,\n따로 찾지 마세요'}
          </div>
          <button style={{
            background: T.gray900, color: T.white, border: 'none',
            borderRadius: 9999, padding: '9px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
          }}>영화 예매하기</button>
        </div>
        {/* Dots */}
        <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 4 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{
              width: i === 0 ? 16 : 6, height: 6, borderRadius: 3,
              background: i === 0 ? '#fff' : 'rgba(255,255,255,0.4)',
            }} />
          ))}
        </div>
      </div>

      {/* AI 검색창 */}
      <div style={{ background: T.white, padding: '14px 14px 10px', borderBottom: `1px solid ${T.gray100}` }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: 8, background: T.gray50, borderRadius: 12, padding: '10px 14px', border: `1px solid ${T.gray100}` }}>
          {/* 스파클 아이콘 */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill={T.purple} />
            <path d="M19 16L19.75 18.25L22 19L19.75 19.75L19 22L18.25 19.75L16 19L18.25 18.25L19 16Z" fill={T.purple} opacity="0.6" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="AI에게 상품 추천 받기..."
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              fontSize: 14, color: T.gray900, fontFamily: 'inherit',
            }}
          />
          <button
            type="submit"
            style={{
              width: 32, height: 32, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: query.trim() ? '#E8003D' : T.gray200,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, transition: 'background 0.15s',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
        {/* 빠른 질문 */}
        <div style={{ display: 'flex', gap: 6, marginTop: 8, overflowX: 'auto' }}>
          {['오늘 핫딜 추천', '스타벅스 쿠폰', '치킨 할인'].map((q) => (
            <button key={q} onClick={() => onAISearch(q)} style={{
              flexShrink: 0, background: 'none', border: `1px solid ${T.gray200}`,
              borderRadius: 9999, padding: '4px 12px', fontSize: 12, color: T.gray700,
              cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
            }}>{q}</button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div style={{ background: T.white, paddingBottom: 14 }}>
        <SectionTitle title="추천 상품" more />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '0 14px' }}>
          {PRODUCTS.map((p, i) => <Card2 key={i} {...p} />)}
        </div>
      </div>
    </div>
  );
}
