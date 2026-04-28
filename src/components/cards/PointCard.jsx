export default function PointCard({ data }) {
  return (
    <div className="bg-gradient-to-br from-[#E8003D] to-[#C0002F] rounded-2xl p-4 text-white min-w-[260px] max-w-[280px] flex-shrink-0 shadow-md">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">💰</span>
        <span className="text-sm font-semibold opacity-80">OK캐쉬백 포인트</span>
      </div>

      <p className="text-3xl font-bold tracking-tight">
        {data.totalPoints.toLocaleString()}
        <span className="text-lg font-medium ml-1">P</span>
      </p>
      <p className="text-xs opacity-70 mt-0.5">= {data.totalPoints.toLocaleString()}원 사용 가능</p>

      {data.expiringPoints > 0 && (
        <div className="mt-3 bg-white/15 rounded-xl p-2.5">
          <p className="text-xs font-semibold">⚠️ 소멸 예정 포인트</p>
          <p className="text-sm font-bold mt-0.5">
            {data.expiringPoints.toLocaleString()}P
            <span className="text-xs font-normal opacity-80 ml-1">
              ({data.expiringDate} 만료)
            </span>
          </p>
        </div>
      )}

      <div className="mt-3 space-y-1">
        {data.pointHistory.slice(0, 3).map((h, i) => (
          <div key={i} className="flex justify-between text-xs opacity-80">
            <span>{h.desc}</span>
            <span className={h.amount > 0 ? 'text-green-300 font-semibold' : 'text-white/60'}>
              {h.amount > 0 ? '+' : ''}{h.amount.toLocaleString()}P
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
