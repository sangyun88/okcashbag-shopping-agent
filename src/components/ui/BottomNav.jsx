import { T } from '../../tokens';

const BOTTOM_TABS = [
  { label: '적립', path: 'M12 2L15 9H22L16.5 13.5L18.5 21L12 16.5L5.5 21L7.5 13.5L2 9H9Z' },
  { label: '사용', path: 'M3 6H21M3 12H21M3 18H21' },
  { label: '홈',   path: 'M3 12L12 4L21 12V20H15V14H9V20H3Z' },
  { label: '쇼핑', path: 'M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6ZM16 10C16 12.2 14.2 14 12 14C9.8 14 8 12.2 8 10' },
  { label: '메뉴', path: 'M3 6H21M3 12H21M3 18H21' },
];

export default function BottomNav({ active, onTab }) {
  return (
    <div style={{
      height: 56, background: T.white,
      borderTop: `0.5px solid rgba(0,0,0,0.06)`,
      display: 'flex', flexShrink: 0,
    }}>
      {BOTTOM_TABS.map(({ label, path }) => {
        const isActive = active === label;
        const c = isActive ? T.black : T.gray500;
        return (
          <button
            key={label}
            onClick={() => onTab(label)}
            style={{
              flex: 1, background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 3,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d={path} stroke={c} strokeWidth={isActive ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 10, color: c, fontWeight: isActive ? 700 : 400 }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
