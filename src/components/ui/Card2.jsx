import { T } from '../../tokens';

export default function Card2({ brand, name, price, disc, rating, reviews, bg = T.gray50 }) {
  return (
    <div style={{ flex: '1 1 calc(50% - 4px)', background: T.white, borderRadius: 4, overflow: 'hidden', minWidth: 0 }}>
      <div style={{ width: '100%', aspectRatio: '1', background: bg, position: 'relative' }}>
        {disc && (
          <div style={{
            position: 'absolute', top: 6, left: 6,
            background: T.hot, color: T.white,
            fontSize: 10, fontWeight: 700, padding: '2px 5px', borderRadius: 3,
          }}>{disc}</div>
        )}
      </div>
      <div style={{ padding: '8px 8px 10px' }}>
        <div style={{ fontSize: 11, color: T.gray500, marginBottom: 2 }}>{brand}</div>
        <div style={{
          fontSize: 13, fontWeight: 700, color: T.gray900,
          lineHeight: 1.3, marginBottom: 4,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{name}</div>
        {rating && (
          <div style={{ fontSize: 11, color: T.gray500, marginBottom: 3 }}>
            ★ {rating} ({reviews})
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          {disc && <span style={{ fontSize: 13, fontWeight: 700, color: T.hot }}>{disc}</span>}
          <span style={{ fontSize: 13, fontWeight: 700, color: T.gray900 }}>{price}</span>
        </div>
      </div>
    </div>
  );
}
