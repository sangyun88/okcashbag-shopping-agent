import OcbLogo from './OcbLogo';
import { T } from '../../tokens';

export default function TopAppBar({ dark, onMyPage }) {
  const bg = dark ? T.gray900 : T.white;
  const c  = dark ? T.white   : T.black;
  return (
    <div style={{
      height: 48, background: bg,
      display: 'flex', alignItems: 'center', padding: '0 8px', flexShrink: 0,
      borderBottom: dark ? 'none' : `0.5px solid ${T.gray100}`,
    }}>
      <div style={{ flex: 1, padding: '0 8px' }}>
        <OcbLogo color={c} h={20} />
      </div>
      <button
        onClick={onMyPage}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: c }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke={c} strokeWidth="2"/>
          <path d="M4 20C4 16.686 7.582 14 12 14C16.418 14 20 16.686 20 20" stroke={c} strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}
