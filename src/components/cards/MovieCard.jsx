const RATING_LABEL = { 0: '전체', 12: '12세', 15: '15세', 19: '청불' };

export default function MovieCard({ item }) {
  const ratingLabel = RATING_LABEL[item.rating] ?? `${item.rating}세`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-w-[220px] max-w-[220px] flex-shrink-0">
      <div className="bg-gray-900 h-28 flex items-center justify-center text-6xl relative">
        {item.image}
        <span className="absolute top-2 left-2 text-xs bg-yellow-400 text-gray-900 font-bold px-2 py-0.5 rounded">
          {ratingLabel}
        </span>
      </div>
      <div className="p-3">
        <p className="text-sm font-bold text-gray-900 leading-tight">{item.title}</p>
        <p className="text-xs text-gray-500 mt-0.5">
          {item.genre} · {item.runtime}분
        </p>

        <div className="mt-2 flex flex-wrap gap-1">
          {item.theaters.map((t) => (
            <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-2 border-t border-gray-50 pt-2">
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-gray-500">정가</span>
            <span className="text-xs text-gray-500">
              {item.ticketPrice.normal.toLocaleString()}원
            </span>
          </div>
          <div className="flex justify-between items-baseline mt-0.5">
            <span className="text-xs font-semibold text-[#E8003D]">포인트 할인가</span>
            <span className="text-sm font-bold text-[#E8003D]">
              {item.ticketPrice.discount.toLocaleString()}원~
            </span>
          </div>
        </div>

        <a
          href={item.affiliateUrl}
          className="mt-2 block w-full text-center py-1.5 rounded-xl bg-gray-900 text-white text-sm font-semibold"
        >
          예매하기
        </a>
      </div>
    </div>
  );
}
