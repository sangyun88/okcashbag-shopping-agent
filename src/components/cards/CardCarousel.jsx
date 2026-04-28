import TodayDealCard from './TodayDealCard';
import GroupBuyCard from './GroupBuyCard';
import ECouponCard from './ECouponCard';
import MovieCard from './MovieCard';
import PointCard from './PointCard';

function renderCardByType(item, type) {
  switch (type) {
    case 'today_deals': return <TodayDealCard key={item.id} item={item} />;
    case 'group_buy':   return <GroupBuyCard key={item.id} item={item} />;
    case 'ecoupon':     return <ECouponCard key={item.id} item={item} />;
    case 'movie':       return <MovieCard key={item.id} item={item} />;
    default:            return null;
  }
}

export default function CardCarousel({ cards }) {
  if (!cards) return null;

  if (cards.type === 'point') {
    return (
      <div className="mt-2 pl-10">
        <PointCard data={cards.data} />
      </div>
    );
  }

  // 통합 검색: 카테고리별 섹션 + 헤더
  if (cards.type === 'multi_search') {
    return (
      <div className="mt-2 pl-10 flex flex-col gap-4">
        {cards.sections.map((section) => (
          <div key={section.label}>
            <p className="text-xs font-bold text-gray-500 mb-2 tracking-wide">
              {section.label}
            </p>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
              {section.items.map((item) => renderCardByType(item, section.type))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-2 pl-10 flex gap-3 overflow-x-auto scrollbar-hide pb-1">
      {cards.items.map((item) => renderCardByType(item, cards.type))}
    </div>
  );
}
