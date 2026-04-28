import { useState } from 'react';
import { T } from '../tokens';
import Chip from '../components/ui/Chip';
import EcouponListCard from '../components/cards/EcouponListCard';
import { mockECoupons } from '../agent/mockData';

const CATS = [
  { label: '전체',    tags: [] },
  { label: '카페',    tags: ['커피', '카페', '아메리카노', '라떼'] },
  { label: '치킨',    tags: ['치킨', '야식'] },
  { label: '피자',    tags: ['피자'] },
  { label: '버거',    tags: ['버거', '햄버거'] },
  { label: '아이스크림', tags: ['아이스크림'] },
  { label: '베이커리', tags: ['베이커리', '도넛', '케이크', '샌드위치'] },
  { label: '편의점',  tags: ['편의점'] },
  { label: '뷰티',    tags: ['뷰티', '스킨케어', '화장품', '선크림'] },
  { label: '문화',    tags: ['웹툰', '소설', '전자책', '구독'] },
];

export default function ScreenECoupon() {
  const [cat, setCat] = useState('전체');
  const [sort, setSort] = useState('할인율 순');

  const activeCat = CATS.find((c) => c.label === cat);
  const filtered = activeCat?.tags.length
    ? mockECoupons.filter((item) =>
        activeCat.tags.some((tag) => item.tags.some((t) => t.includes(tag)))
      )
    : mockECoupons;

  const sorted = [...filtered].sort((a, b) =>
    sort === '할인율 순' ? b.discountRate - a.discountRate :
    sort === '가격 낮은 순' ? a.price - b.price :
    sort === '인기 순' ? b.popularity - a.popularity : 0
  );

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: T.gray50 }}>
      {/* 혜택 배너 */}
      <div style={{
        background: `linear-gradient(135deg, ${T.purple}22, ${T.pink}18)`,
        borderBottom: `1px solid ${T.purple}22`,
        padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: T.purple, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>%</span>
        </div>
        <span style={{ fontSize: 12, color: T.purple, fontWeight: 600 }}>🏆 타사 대비 최저가 보장 · 실시간 비교</span>
        <span style={{ fontSize: 12, color: T.gray500, marginLeft: 'auto' }}>더보기 ›</span>
      </div>

      {/* 카테고리 칩 */}
      <div style={{ background: T.white, borderBottom: `1px solid ${T.gray100}` }}>
        <div style={{ display: 'flex', gap: 6, padding: '10px 14px', overflowX: 'auto' }}>
          {CATS.map((c) => (
            <Chip key={c.label} label={c.label} active={cat === c.label} onClick={() => setCat(c.label)} />
          ))}
        </div>
      </div>

      {/* 정렬 + 결과 수 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 14px', background: T.white, borderBottom: `1px solid ${T.gray50}` }}>
        <span style={{ fontSize: 12, color: T.gray500 }}>총 {sorted.length}개</span>
        <div style={{ display: 'flex', gap: 8 }}>
          {['할인율 순', '가격 낮은 순', '인기 순'].map((s) => (
            <button key={s} onClick={() => setSort(s)} style={{
              fontSize: 11, padding: '4px 10px', borderRadius: 9999, cursor: 'pointer', fontFamily: 'inherit',
              background: sort === s ? T.black : T.white,
              color: sort === s ? T.white : T.gray500,
              border: `1px solid ${sort === s ? T.black : T.gray200}`,
              fontWeight: sort === s ? 700 : 400,
            }}>{s}</button>
          ))}
        </div>
      </div>

      {/* 쿠폰 리스트 */}
      <div style={{ padding: '12px 14px 20px' }}>
        {sorted.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: T.gray400, fontSize: 14 }}>
            해당 카테고리 쿠폰이 없어요
          </div>
        ) : (
          sorted.map((item) => <EcouponListCard key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}
