export default function ECouponCard({ item }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-w-[200px] max-w-[200px] flex-shrink-0">
      <div className="bg-amber-50 h-20 flex items-center justify-center text-5xl">
        {item.image}
      </div>
      <div className="p-3">
        <p className="text-xs font-semibold text-amber-600">{item.brand}</p>
        <p className="text-sm font-semibold text-gray-900 mt-0.5 leading-tight line-clamp-2">
          {item.name}
        </p>
        <div className="flex items-baseline gap-1.5 mt-1.5">
          <span className="text-base font-bold text-[#E8003D]">
            {item.price.toLocaleString()}원
          </span>
          <span className="text-xs text-gray-400 line-through">
            {item.originalPrice.toLocaleString()}원
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs bg-red-50 text-[#E8003D] font-semibold px-2 py-0.5 rounded-full">
            {item.discountRate}% 할인
          </span>
          <span className="text-xs text-gray-400">{item.validDays}일 유효</span>
        </div>
        <a
          href={item.affiliateUrl}
          className="mt-2.5 block w-full text-center py-1.5 rounded-xl bg-amber-500 text-white text-sm font-semibold"
        >
          구매하기
        </a>
      </div>
    </div>
  );
}
