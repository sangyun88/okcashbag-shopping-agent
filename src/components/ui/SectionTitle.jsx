import { T } from '../../tokens';

export default function SectionTitle({ title, more, sub }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 14px 8px',
    }}>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: T.black }}>{title}</div>
        {sub && <div style={{ fontSize: 11, color: T.gray500, marginTop: 2 }}>{sub}</div>}
      </div>
      {more && <span style={{ fontSize: 12, color: T.gray500 }}>더보기 ›</span>}
    </div>
  );
}
