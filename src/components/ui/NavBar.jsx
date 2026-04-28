import { T } from '../../tokens';

export const NAV_TABS = ['추천', '공동구매', '오늘특가', 'e쿠폰', '영화티켓'];

export default function NavBar({ active, onTab, dark }) {
  const bg     = dark ? T.gray900 : T.white;
  const border = dark ? `1px solid rgba(255,255,255,0.1)` : `1px solid ${T.gray100}`;
  return (
    <div style={{ background: bg, borderBottom: border, display: 'flex', flexShrink: 0, overflowX: 'auto' }}>
      {NAV_TABS.map((t) => {
        const isActive = active === t;
        const c = dark
          ? (isActive ? T.white : 'rgba(255,255,255,0.45)')
          : (isActive ? T.black : T.gray500);
        return (
          <button
            key={t}
            onClick={() => onTab(t)}
            style={{
              flex: '0 0 auto', background: 'none', border: 'none', cursor: 'pointer',
              padding: '10px 14px', fontSize: 13,
              fontWeight: isActive ? 700 : 400, color: c,
              fontFamily: 'inherit', whiteSpace: 'nowrap',
              borderBottom: isActive
                ? `2px solid ${dark ? T.white : T.black}`
                : '2px solid transparent',
            }}
          >{t}</button>
        );
      })}
    </div>
  );
}
