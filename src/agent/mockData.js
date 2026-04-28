// Mock data for OK Cashbag Shopping Agent
// registeredAt: 등록일 (낮을수록 최신, 단위 = 시간 전)
// popularity: 인기도 0~100

export const mockTodayDeals = [
  {
    id: 'td001',
    name: '삼성 울트라북 13인치',
    category: '노트북',
    originalPrice: 1200000,
    salePrice: 950000,
    discountRate: 21,
    stock: 5,
    endTime: '23:59',
    image: '💻',
    tags: ['노트북', '삼성', '울트라북'],
    affiliateUrl: '#',
    registeredAt: 18,
    popularity: 62,
  },
  {
    id: 'td002',
    name: '아이폰15 케이스 3종 세트',
    category: '액세서리',
    originalPrice: 35000,
    salePrice: 15000,
    discountRate: 57,
    stock: 42,
    endTime: '23:59',
    image: '📱',
    tags: ['아이폰', '케이스', '액세서리'],
    affiliateUrl: '#',
    registeredAt: 2,
    popularity: 88,
  },
  {
    id: 'td003',
    name: '에어팟 프로 2세대',
    category: '이어폰',
    originalPrice: 350000,
    salePrice: 259000,
    discountRate: 26,
    stock: 12,
    endTime: '23:59',
    image: '🎧',
    tags: ['에어팟', '이어폰', '애플'],
    affiliateUrl: '#',
    registeredAt: 10,
    popularity: 95,
  },
  {
    id: 'td004',
    name: '나이키 런닝화 에어맥스',
    category: '신발',
    originalPrice: 189000,
    salePrice: 129000,
    discountRate: 32,
    stock: 8,
    endTime: '23:59',
    image: '👟',
    tags: ['나이키', '신발', '런닝화'],
    affiliateUrl: '#',
    registeredAt: 6,
    popularity: 74,
  },
  {
    id: 'td005',
    name: '스타벅스 아메리카노 기프티콘',
    category: '기프티콘',
    originalPrice: 4500,
    salePrice: 3200,
    discountRate: 29,
    stock: 200,
    endTime: '23:59',
    image: '☕',
    tags: ['스타벅스', '커피', '기프티콘', '아메리카노'],
    affiliateUrl: '#',
    registeredAt: 14,
    popularity: 91,
  },
  {
    id: 'td006',
    name: '무선 청소기 다이슨 V12',
    category: '가전',
    originalPrice: 890000,
    salePrice: 690000,
    discountRate: 22,
    stock: 3,
    endTime: '23:59',
    image: '🌀',
    tags: ['청소기', '다이슨', '가전'],
    affiliateUrl: '#',
    registeredAt: 20,
    popularity: 55,
  },
  {
    id: 'td007',
    name: '레고 닌자고 70761',
    category: '장난감',
    originalPrice: 89000,
    salePrice: 59000,
    discountRate: 34,
    stock: 25,
    endTime: '23:59',
    image: '🧱',
    tags: ['레고', '장난감', '유아동', '닌자고'],
    affiliateUrl: '#',
    registeredAt: 8,
    popularity: 68,
  },
  {
    id: 'td008',
    name: '피셔프라이스 아기 장난감 세트',
    category: '장난감',
    originalPrice: 55000,
    salePrice: 38000,
    discountRate: 31,
    stock: 30,
    endTime: '23:59',
    image: '🧸',
    tags: ['피셔프라이스', '장난감', '유아동', '아기'],
    affiliateUrl: '#',
    registeredAt: 4,
    popularity: 72,
  },
  {
    id: 'td009',
    name: '메가MGC커피 아메리카노 기프티콘 3장',
    category: '기프티콘',
    originalPrice: 17400,
    salePrice: 11000,
    discountRate: 37,
    stock: 150,
    endTime: '23:59',
    image: '☕',
    tags: ['메가커피', '메가', '커피', '아메리카노', '기프티콘', '카페'],
    affiliateUrl: '#',
    registeredAt: 1,
    popularity: 83,
  },
];

export const mockGroupBuys = [
  {
    id: 'gb001',
    name: '무선 이어폰 소니 WF-1000XM5',
    category: '이어폰',
    price: 25000,
    discountType: '모일수록 할인',
    currentParticipants: 30,
    goalParticipants: 50,
    endDate: '2026-04-29',
    tiers: [
      { count: 30, discount: '10%' },
      { count: 40, discount: '15%' },
      { count: 50, discount: '20%' },
    ],
    image: '🎧',
    tags: ['이어폰', '소니', '무선'],
    affiliateUrl: '#',
    registeredAt: 12,
    popularity: 71,
  },
  {
    id: 'gb002',
    name: '스타벅스 커피 기프티콘 3장 팩',
    category: '기프티콘',
    price: 12000,
    discountType: '성공하면 득템',
    currentParticipants: 20,
    goalParticipants: 20,
    endDate: '2026-04-27',
    image: '☕',
    tags: ['스타벅스', '커피', '기프티콘'],
    affiliateUrl: '#',
    isSuccess: true,
    registeredAt: 22,
    popularity: 85,
  },
  {
    id: 'gb003',
    name: '유아동 장난감 레고 클래식 세트',
    category: '장난감',
    price: 45000,
    discountType: '모일수록 할인',
    currentParticipants: 15,
    goalParticipants: 40,
    endDate: '2026-04-30',
    tiers: [
      { count: 20, discount: '8%' },
      { count: 30, discount: '12%' },
      { count: 40, discount: '18%' },
    ],
    image: '🧱',
    tags: ['레고', '장난감', '유아동', '어린이'],
    affiliateUrl: '#',
    registeredAt: 5,
    popularity: 60,
  },
  {
    id: 'gb004',
    name: 'CGV 영화예매권 2매',
    category: '영화',
    price: 20000,
    discountType: '성공하면 득템',
    currentParticipants: 45,
    goalParticipants: 50,
    endDate: '2026-04-28',
    image: '🎬',
    tags: ['CGV', '영화', '예매권'],
    affiliateUrl: '#',
    registeredAt: 16,
    popularity: 90,
  },
  {
    id: 'gb006',
    name: '메가MGC커피 기프티콘 10장 묶음',
    category: '기프티콘',
    price: 38000,
    discountType: '성공하면 득템',
    currentParticipants: 62,
    goalParticipants: 80,
    endDate: '2026-04-29',
    image: '☕',
    tags: ['메가커피', '메가', '커피', '아메리카노', '기프티콘', '카페'],
    affiliateUrl: '#',
    registeredAt: 3,
    popularity: 78,
  },
  {
    id: 'gb005',
    name: '다이소 생활용품 랜덤박스',
    category: '생활용품',
    price: 9900,
    discountType: '모일수록 할인',
    currentParticipants: 88,
    goalParticipants: 100,
    endDate: '2026-04-29',
    tiers: [
      { count: 50, discount: '5%' },
      { count: 80, discount: '10%' },
      { count: 100, discount: '15%' },
    ],
    image: '🛒',
    tags: ['다이소', '생활용품'],
    affiliateUrl: '#',
    registeredAt: 9,
    popularity: 82,
  },
];

export const mockECoupons = [
  {
    id: 'ec001',
    brand: '스타벅스',
    name: '아메리카노 Tall',
    price: 3200,
    originalPrice: 4500,
    discountRate: 29,
    validDays: 90,
    image: '☕',
    tags: ['스타벅스', '커피', '아메리카노'],
    affiliateUrl: '#',
    registeredAt: 15,
    popularity: 93,
  },
  {
    id: 'ec002',
    brand: '배스킨라빈스',
    name: '패밀리 사이즈 아이스크림',
    price: 18000,
    originalPrice: 22000,
    discountRate: 18,
    validDays: 60,
    image: '🍦',
    tags: ['배스킨라빈스', '아이스크림', '디저트'],
    affiliateUrl: '#',
    registeredAt: 11,
    popularity: 76,
  },
  {
    id: 'ec003',
    brand: '파리바게뜨',
    name: '케이크 1호',
    price: 19900,
    originalPrice: 24000,
    discountRate: 17,
    validDays: 30,
    image: '🎂',
    tags: ['파리바게뜨', '케이크', '베이커리'],
    affiliateUrl: '#',
    registeredAt: 7,
    popularity: 64,
  },
  {
    id: 'ec004',
    brand: 'CJ올리브영',
    name: '3만원 상품권',
    price: 25000,
    originalPrice: 30000,
    discountRate: 17,
    validDays: 180,
    image: '💄',
    tags: ['올리브영', '뷰티', '상품권'],
    affiliateUrl: '#',
    registeredAt: 19,
    popularity: 69,
  },
  {
    id: 'ec005',
    brand: '롯데리아',
    name: '빅 버거 세트',
    price: 6500,
    originalPrice: 8900,
    discountRate: 27,
    validDays: 60,
    image: '🍔',
    tags: ['롯데리아', '버거', '패스트푸드'],
    affiliateUrl: '#',
    registeredAt: 13,
    popularity: 58,
  },
  {
    id: 'ec006',
    brand: '메가MGC커피',
    name: '아메리카노 Large (2잔)',
    price: 3900,
    originalPrice: 5800,
    discountRate: 33,
    validDays: 60,
    image: '☕',
    tags: ['메가커피', '메가', '커피', '아메리카노', '카페'],
    affiliateUrl: '#',
    registeredAt: 4,
    popularity: 81,
  },
  {
    id: 'ec007',
    brand: '메가MGC커피',
    name: '메가 아이스티 + 쿠키 세트',
    price: 4200,
    originalPrice: 6000,
    discountRate: 30,
    validDays: 45,
    image: '🧋',
    tags: ['메가커피', '메가', '커피', '아이스티', '카페'],
    affiliateUrl: '#',
    registeredAt: 1,
    popularity: 67,
  },
];

export const mockMovies = [
  {
    id: 'mv001',
    title: '어벤져스: 둠스데이',
    genre: '액션/SF',
    rating: 12,
    runtime: 148,
    theaters: ['CGV', '메가박스', '롯데시네마'],
    showtimes: {
      CGV: ['10:00', '13:20', '16:40', '19:00', '21:30'],
      메가박스: ['10:30', '14:00', '17:10', '20:00'],
      롯데시네마: ['11:00', '14:30', '18:00', '21:00'],
    },
    ticketPrice: { normal: 15000, discount: 10500 },
    image: '🦸',
    affiliateUrl: '#',
  },
  {
    id: 'mv002',
    title: '범죄도시 5',
    genre: '액션/범죄',
    rating: 15,
    runtime: 120,
    theaters: ['CGV', '메가박스', '롯데시네마'],
    showtimes: {
      CGV: ['11:30', '14:00', '16:30', '19:20', '22:00'],
      메가박스: ['12:00', '15:00', '18:00', '20:30'],
      롯데시네마: ['10:00', '13:00', '16:00', '19:00'],
    },
    ticketPrice: { normal: 14000, discount: 9800 },
    image: '🚓',
    affiliateUrl: '#',
  },
  {
    id: 'mv003',
    title: '슈퍼 마리오 브라더스 2',
    genre: '애니메이션',
    rating: 0,
    runtime: 95,
    theaters: ['CGV', '메가박스'],
    showtimes: {
      CGV: ['10:00', '12:00', '14:00', '16:00'],
      메가박스: ['10:30', '12:30', '14:30', '16:30'],
    },
    ticketPrice: { normal: 14000, discount: 9800 },
    image: '🍄',
    affiliateUrl: '#',
  },
];

export const mockUserPoint = {
  userId: 'user_demo',
  totalPoints: 12000,
  expiringPoints: 3000,
  expiringDate: '2026-05-31',
  pointHistory: [
    { date: '2026-04-20', desc: '편의점 구매 적립', amount: 500 },
    { date: '2026-04-15', desc: 'OK쇼핑 구매 적립', amount: 2000 },
    { date: '2026-04-10', desc: '영화예매 사용', amount: -4500 },
  ],
  pointValue: 1, // 1포인트 = 1원
};

// 검색 헬퍼 함수들
export const searchTodayDeals = (keyword) => {
  if (!keyword) return mockTodayDeals;
  const lower = keyword.toLowerCase();
  return mockTodayDeals.filter(
    (item) =>
      item.tags.some((t) => t.includes(keyword)) ||
      item.name.includes(keyword) ||
      item.category.includes(keyword)
  );
};

export const searchGroupBuys = (keyword) => {
  if (!keyword) return mockGroupBuys;
  return mockGroupBuys.filter(
    (item) =>
      item.tags.some((t) => t.includes(keyword)) ||
      item.name.includes(keyword) ||
      item.category.includes(keyword)
  );
};

export const searchECoupons = (keyword) => {
  if (!keyword) return mockECoupons;
  return mockECoupons.filter(
    (item) =>
      item.tags.some((t) => t.includes(keyword)) ||
      item.name.includes(keyword) ||
      item.brand.includes(keyword)
  );
};

export const getUserPoint = () => mockUserPoint;

// ─── 정렬 헬퍼 ───────────────────────────────────────────────────────────────
export const SORT_LABELS = {
  newest:        '최신 등록 순',
  discount_desc: '할인율 높은 순',
  price_asc:     '가격 낮은 순',
  price_desc:    '가격 높은 순',
  popularity:    '인기 순',
  deadline:      '마감 임박 순',
  low_stock:     '재고 부족 순',
};

export function sortItems(items, sortType) {
  const arr = [...items];
  switch (sortType) {
    case 'newest':
      return arr.sort((a, b) => (a.registeredAt ?? 99) - (b.registeredAt ?? 99));
    case 'discount_desc':
      return arr.sort((a, b) => (b.discountRate ?? 0) - (a.discountRate ?? 0));
    case 'price_asc':
      return arr.sort((a, b) => (a.salePrice ?? a.price ?? 0) - (b.salePrice ?? b.price ?? 0));
    case 'price_desc':
      return arr.sort((a, b) => (b.salePrice ?? b.price ?? 0) - (a.salePrice ?? a.price ?? 0));
    case 'popularity':
      return arr.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
    case 'deadline':
      // 마감일 임박 (공동구매 endDate 기준, 오늘특가는 stock 적은 순)
      return arr.sort((a, b) => {
        if (a.endDate && b.endDate) return a.endDate.localeCompare(b.endDate);
        return (a.stock ?? 999) - (b.stock ?? 999);
      });
    case 'low_stock':
      return arr.sort((a, b) => (a.stock ?? 999) - (b.stock ?? 999));
    default:
      return arr;
  }
}

export const getMovies = (keyword) => {
  if (!keyword) return mockMovies;
  return mockMovies.filter(
    (m) =>
      m.title.includes(keyword) ||
      m.genre.includes(keyword) ||
      m.theaters.some((t) => t.includes(keyword))
  );
};
