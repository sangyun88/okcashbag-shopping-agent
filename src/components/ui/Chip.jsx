import { T } from '../../tokens';

export default function Chip({ label, active, onClick, dark }) {
  return (
    <button
      onClick={onClick}
      style={{
        flexShrink: 0, border: 'none', cursor: 'pointer',
        padding: '6px 14px', borderRadius: 9999, fontSize: 13,
        fontWeight: active ? 700 : 500,
        background: active
          ? (dark ? T.white : T.black)
          : (dark ? 'rgba(255,255,255,0.12)' : T.gray50),
        color: active
          ? (dark ? T.black : T.white)
          : (dark ? 'rgba(255,255,255,0.7)' : T.gray800),
        fontFamily: 'inherit', whiteSpace: 'nowrap',
      }}
    >{label}</button>
  );
}
