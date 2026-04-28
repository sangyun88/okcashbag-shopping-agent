import { useState } from 'react';
import { T } from '../tokens';

const COUPONS = [
  { brand: '스타벅스', name: '카페 아메리카노 T', disc: '4천원 할인', expiry: '2025.08.31', used: false },
  { brand: '배스킨라빈스', name: '파인트 아이스크림', disc: '15% 할인', expiry: '2025.07.15', used: false },
  { brand: '이디야커피', name: '아메리카노', disc: '5% 할인', expiry: '2025.06.01', used: true },
];

const ORDERS = [
  { brand: '굽네치킨', name: '볼케이노 치킨 (반마리)', price: '10,500원', date: '2025.04.20', status: '배송완료' },
  { brand: '스타벅스', name: '카페 아메리카노 T × 2', price: '9,400원', date: '2025.04.18', status: '결제완료' },
  { brand: '올리브영', name: '선크림 SPF50+', price: '12,000원', date: '2025.04.10', status: '취소완료' },
];

const STATUS_COLORS = { '배송완료': T.gray500, '결제완료': T.purple, '취소완료': T.gray300 };
const TABS = ['쿠폰', '구매내역', '리뷰'];

export default function ScreenMY() {
  const [tab, setTab] = useState('쿠폰');

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: T.gray50 }}>
      {/* Header */}
      <div style={{ background: T.white, padding: '12px 14px', borderBottom: `1px solid ${T.gray100}` }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: T.black }}>MY 쇼핑</div>
      </div>

      {/* Profile card */}
      <div style={{ background: T.navy, padding: '20px 14px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: T.purple, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#fff' }}>홍</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>홍길동 님</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>OK캐쉬백 회원</div>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {[['12,450', '보유 포인트'], ['3', '사용가능 쿠폰'], ['5', '구매내역']].map(([v, l], i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
              {i > 0 && <span style={{ display: 'block', width: 1, height: 32, background: 'rgba(255,255,255,0.15)', margin: '0 12px' }} />}
              <span style={{ textAlign: 'center' }}>
                <span style={{ display: 'block', fontSize: 18, fontWeight: 700, color: i === 0 ? T.gold : '#fff' }}>{v}</span>
                <span style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{l}</span>
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: T.white, display: 'flex', borderBottom: `1px solid ${T.gray100}` }}>
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, background: 'none', border: 'none', cursor: 'pointer',
            padding: '12px 0', fontSize: 14, fontWeight: tab === t ? 700 : 400,
            color: tab === t ? T.black : T.gray500,
            borderBottom: tab === t ? `2px solid ${T.black}` : '2px solid transparent',
            fontFamily: 'inherit',
          }}>{t}</button>
        ))}
      </div>

      {/* Coupon tab */}
      {tab === '쿠폰' && (
        <div style={{ paddingTop: 8 }}>
          {COUPONS.map((c, i) => (
            <div key={i} style={{ margin: '0 14px 8px', border: `1px solid ${T.gray100}`, borderRadius: 8, background: T.white, opacity: c.used ? 0.5 : 1 }}>
              <div style={{ display: 'flex', gap: 12, padding: 12 }}>
                <div style={{ width: 60, height: 60, background: T.gray50, borderRadius: 8, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: T.gray500, marginBottom: 2 }}>{c.brand}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.gray900, marginBottom: 2 }}>{c.name}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.hot }}>{c.disc}</div>
                </div>
              </div>
              <div style={{ borderTop: `1px dashed ${T.gray100}`, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: T.gray500 }}>유효기간 {c.expiry}</span>
                {c.used
                  ? <span style={{ fontSize: 11, color: T.gray300 }}>사용완료</span>
                  : <button style={{ background: T.black, color: T.white, border: 'none', borderRadius: 4, padding: '4px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>사용하기</button>
                }
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order history tab */}
      {tab === '구매내역' && (
        <div style={{ paddingTop: 8 }}>
          {ORDERS.map((o, i) => (
            <div key={i} style={{ margin: '0 14px 8px', border: `1px solid ${T.gray100}`, borderRadius: 8, background: T.white }}>
              <div style={{ padding: '10px 12px', borderBottom: `1px solid ${T.gray50}`, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: T.gray500 }}>{o.date}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: STATUS_COLORS[o.status] }}>{o.status}</span>
              </div>
              <div style={{ display: 'flex', gap: 12, padding: 12 }}>
                <div style={{ width: 56, height: 56, background: T.gray50, borderRadius: 6, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: T.gray500, marginBottom: 2 }}>{o.brand}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.gray900 }}>{o.name}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.gray900, marginTop: 3 }}>{o.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review tab */}
      {tab === '리뷰' && (
        <div style={{ padding: '60px 14px', textAlign: 'center', color: T.gray500, fontSize: 14 }}>
          작성 가능한 리뷰가 없어요
        </div>
      )}
    </div>
  );
}
