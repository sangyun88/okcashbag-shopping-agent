import { useState } from 'react';
import { T } from '../tokens';
import Chip from '../components/ui/Chip';

const GENRES = ['전체', '액션', '드라마', '코미디', 'SF', '공포'];

const MOVIES = [
  { title: '어벤져스: 둠즈데이', genre: '액션', rating: '12세', disc: '30%', price: '9,100원', screens: 'CGV · 메가박스 · 롯데시네마' },
  { title: '미키 17', genre: 'SF', rating: '15세', disc: '25%', price: '10,500원', screens: 'CGV · 메가박스' },
  { title: '브리짓 존스: 매드 어바웃 더 보이', genre: '드라마', rating: '15세', disc: '20%', price: '11,200원', screens: 'CGV · 롯데시네마' },
  { title: '하얼빈', genre: '드라마', rating: '12세', disc: '15%', price: '11,900원', screens: 'CGV · 메가박스 · 롯데시네마' },
];

export default function ScreenMovie() {
  const [genre, setGenre] = useState('전체');

  return (
    <div className="scrollbar-hide" style={{ flex: 1, overflowY: 'auto', background: T.gray50 }}>
      {/* Dark hero */}
      <div style={{ background: 'linear-gradient(135deg, #0d0d1a, #1a0533)', padding: '20px 14px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: T.white, letterSpacing: '-0.5px' }}>영화 할인 티켓</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>CGV · 메가박스 · 롯데시네마 최대 30% 할인</div>
      </div>

      {/* Genre chips */}
      <div style={{ background: T.white, borderBottom: `1px solid ${T.gray100}` }}>
        <div style={{ display: 'flex', gap: 6, padding: '10px 14px', overflowX: 'auto' }}>
          {GENRES.map((g) => (
            <Chip key={g} label={g} active={genre === g} onClick={() => setGenre(g)} />
          ))}
        </div>
      </div>

      {/* Movie cards */}
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {MOVIES.map((m, i) => (
          <div key={i} style={{ background: T.white, borderRadius: 10, overflow: 'hidden', display: 'flex', gap: 12, padding: 14 }}>
            <div style={{ width: 72, height: 100, background: `hsl(${i * 60 + 200},30%,80%)`, borderRadius: 6, flexShrink: 0, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 4, left: 4, background: T.hot, color: T.white, fontSize: 10, fontWeight: 700, padding: '2px 5px', borderRadius: 3 }}>{m.disc}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 3 }}>
                <div style={{ background: T.gray50, borderRadius: 3, padding: '1px 5px', fontSize: 10, color: T.gray500, fontWeight: 600 }}>{m.rating}</div>
                <div style={{ fontSize: 11, color: T.gray500 }}>{m.genre}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.gray900, marginBottom: 3, lineHeight: 1.3 }}>{m.title}</div>
              <div style={{ fontSize: 11, color: T.gray500, marginBottom: 6 }}>{m.screens}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.hot }}>{m.disc}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: T.gray900 }}>{m.price}</span>
                <span style={{ fontSize: 11, color: T.gray300 }}>/ 1인</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
