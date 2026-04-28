import { getCompetitorPrices } from '../../agent/mockData';
import { T } from '../../tokens';

export default function EcouponListCard({ item }) {
  const { competitors, saving } = getCompetitorPrices(item);

  return (
    <div style={{ background: T.white, borderRadius: 12, border: `1px solid ${T.gray100}`, overflow: 'hidden', marginBottom: 10 }}>
      <div style={{ display: 'flex', gap: 12, padding: 14 }}>
        {/* 이미지 */}
        <div style={{ width: 64, height: 64, background: '#FFF8EC', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
          {item.image}
        </div>

        {/* 상품 정보 */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, color: '#D97706', fontWeight: 600, marginBottom: 2 }}>{item.brand}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.gray900, lineHeight: 1.35, marginBottom: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {item.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: T.hot }}>{item.price.toLocaleString()}원</span>
            <span style={{ fontSize: 11, color: T.gray300, textDecoration: 'line-through' }}>{item.originalPrice.toLocaleString()}원</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.hot, background: '#FFF0F3', padding: '1px 6px', borderRadius: 9999 }}>{item.discountRate}%↓</span>
          </div>
        </div>
      </div>

      {/* 가격 비교 섹션 */}
      <div style={{ borderTop: `1px dashed ${T.gray100}`, padding: '10px 14px', background: '#F8FFF9' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#059669' }}>🏆 OCB 최저가</span>
          </div>
          <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 9999, padding: '2px 10px' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#059669' }}>최대 {saving.toLocaleString()}원 저렴</span>
          </div>
        </div>

        {/* 경쟁사 바 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {/* OCB 바 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: T.hot, width: 52, flexShrink: 0 }}>OK캐쉬백</span>
            <div style={{ flex: 1, height: 8, background: T.gray100, borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '100%', background: `linear-gradient(to right, ${T.hot}, #FF6B8A)`, borderRadius: 4 }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.hot, width: 52, textAlign: 'right', flexShrink: 0 }}>
              {item.price.toLocaleString()}원
            </span>
          </div>

          {/* 경쟁사 바들 */}
          {competitors.map((c) => {
            const ratio = (item.price / c.price) * 100;
            return (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 10, color: T.gray400, width: 52, flexShrink: 0 }}>{c.name}</span>
                <div style={{ flex: 1, height: 8, background: T.gray100, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${ratio}%`, height: '100%', background: T.gray300, borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 11, color: T.gray500, width: 52, textAlign: 'right', flexShrink: 0 }}>
                  {c.price.toLocaleString()}원
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 구매 버튼 */}
      <div style={{ padding: '10px 14px 12px' }}>
        <button style={{ width: '100%', background: T.black, color: T.white, border: 'none', borderRadius: 10, padding: '11px 0', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          구매하기 · {item.validDays}일 유효
        </button>
      </div>
    </div>
  );
}
