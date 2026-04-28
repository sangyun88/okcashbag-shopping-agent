import { getCompetitorPrices } from '../../agent/mockData';

export default function ECouponCard({ item }) {
  const { competitors, saving } = getCompetitorPrices(item);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-w-[210px] max-w-[210px] flex-shrink-0">
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

        {/* 가격 비교 */}
        <div className="mt-2.5 pt-2.5 border-t border-dashed border-gray-100">
          <div className="flex items-center gap-1 mb-1.5">
            <span className="text-xs font-bold text-emerald-600">🏆 최저가</span>
            <span className="text-xs text-emerald-600 font-semibold">
              타사 대비 {saving.toLocaleString()}원↓
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {competitors.map((c) => (
              <div key={c.name} className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400 w-16">{c.name}</span>
                <div className="flex items-center gap-1.5 flex-1">
                  <div
                    className="h-1.5 rounded-full bg-gray-100"
                    style={{ flex: 1, position: 'relative' }}
                  >
                    <div
                      className="h-1.5 rounded-full bg-gray-300"
                      style={{ width: `${Math.min((item.price / c.price) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-500 w-14 text-right">
                    {c.price.toLocaleString()}원
                  </span>
                </div>
              </div>
            ))}
          </div>
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
