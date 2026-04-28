export default function TodayDealCard({ item }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-w-[200px] max-w-[200px] flex-shrink-0">
      <div className="bg-gray-50 h-24 flex items-center justify-center text-5xl">
        {item.image}
      </div>
      <div className="p-3">
        <span className="text-xs font-medium text-[#E8003D] bg-red-50 px-2 py-0.5 rounded-full">
          -{item.discountRate}%
        </span>
        <p className="text-sm font-semibold text-gray-900 mt-1.5 leading-tight line-clamp-2">
          {item.name}
        </p>
        <p className="text-xs text-gray-400 line-through mt-0.5">
          {item.originalPrice.toLocaleString()}원
        </p>
        <p className="text-base font-bold text-[#E8003D]">
          {item.salePrice.toLocaleString()}원
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-400">잔여 {item.stock}개</span>
          <span className="text-xs text-gray-400">~{item.endTime}</span>
        </div>
        <a
          href={item.affiliateUrl}
          className="mt-2 block w-full text-center py-1.5 rounded-xl bg-[#E8003D] text-white text-sm font-semibold"
        >
          구매하기
        </a>
      </div>
    </div>
  );
}
