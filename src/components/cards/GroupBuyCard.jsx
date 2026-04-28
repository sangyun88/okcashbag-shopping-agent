export default function GroupBuyCard({ item }) {
  const progress = Math.round((item.currentParticipants / item.goalParticipants) * 100);
  const isSuccess = item.isSuccess || item.currentParticipants >= item.goalParticipants;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-w-[220px] max-w-[220px] flex-shrink-0">
      <div className="bg-gray-50 h-24 flex items-center justify-center text-5xl relative">
        {item.image}
        {isSuccess && (
          <span className="absolute top-2 right-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-semibold">
            성공!
          </span>
        )}
      </div>
      <div className="p-3">
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
          {item.discountType}
        </span>
        <p className="text-sm font-semibold text-gray-900 mt-1.5 leading-tight line-clamp-2">
          {item.name}
        </p>
        <p className="text-base font-bold text-gray-900 mt-1">
          {item.price.toLocaleString()}원~
        </p>

        {/* 참여 현황 프로그레스바 */}
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{item.currentParticipants}명 참여</span>
            <span>목표 {item.goalParticipants}명</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full bg-[#E8003D] transition-all"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-1.5">마감 {item.endDate}</p>
        <a
          href={item.affiliateUrl}
          className="mt-2 block w-full text-center py-1.5 rounded-xl bg-[#E8003D] text-white text-sm font-semibold"
        >
          참여하기
        </a>
      </div>
    </div>
  );
}
