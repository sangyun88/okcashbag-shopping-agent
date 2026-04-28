// Mock data for OK Cashbag Shopping Agent
// registeredAt: 등록일 (낮을수록 최신, 단위 = 시간 전)
// popularity: 인기도 0~100
// situation: 상황 태그 배열 (hot/hungry/sweet/coffee/gift/home/chicken/pizza/burger/beauty)

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
];

export const mockECoupons = [
  // ── 스타벅스 ──────────────────────────────────────────
  {
    id: 'ec001',
    brand: '스타벅스',
    name: '아이스 아메리카노 Tall',
    price: 3500,
    originalPrice: 4700,
    discountRate: 26,
    validDays: 90,
    image: '☕',
    tags: ['스타벅스', '커피', '아메리카노', '아이스', '카페'],
    situation: ['hot', 'coffee'],
    affiliateUrl: '#',
    registeredAt: 15,
    popularity: 93,
  },
  {
    id: 'ec001b',
    brand: '스타벅스',
    name: '아이스 카페 라떼 Tall',
    price: 4000,
    originalPrice: 5200,
    discountRate: 23,
    validDays: 90,
    image: '🥛',
    tags: ['스타벅스', '커피', '라떼', '아이스', '카페'],
    situation: ['hot', 'coffee'],
    affiliateUrl: '#',
    registeredAt: 16,
    popularity: 88,
  },

  // ── 메가MGC커피 ────────────────────────────────────────
  {
    id: 'ec006',
    brand: '메가MGC커피',
    name: '아이스 아메리카노 Large',
    price: 1800,
    originalPrice: 2200,
    discountRate: 18,
    validDays: 60,
    image: '☕',
    tags: ['메가커피', '메가', '커피', '아메리카노', '아이스', '카페'],
    situation: ['hot', 'coffee'],
    affiliateUrl: '#',
    registeredAt: 4,
    popularity: 81,
  },
  {
    id: 'ec007',
    brand: '메가MGC커피',
    name: '스무디 + 아이스크림 세트',
    price: 3900,
    originalPrice: 5500,
    discountRate: 29,
    validDays: 45,
    image: '🧋',
    tags: ['메가커피', '메가', '스무디', '아이스크림', '카페'],
    situation: ['hot', 'sweet'],
    affiliateUrl: '#',
    registeredAt: 1,
    popularity: 67,
  },

  // ── 이디야커피 ────────────────────────────────────────
  {
    id: 'ec_ediya01',
    brand: '이디야커피',
    name: '아이스 아메리카노 (2잔)',
    price: 3200,
    originalPrice: 4400,
    discountRate: 27,
    validDays: 60,
    image: '☕',
    tags: ['이디야', '이디야커피', '커피', '아메리카노', '아이스', '카페'],
    situation: ['hot', 'coffee'],
    affiliateUrl: '#',
    registeredAt: 3,
    popularity: 79,
  },
  {
    id: 'ec_ediya02',
    brand: '이디야커피',
    name: '블렌디드 딸기 스무디',
    price: 3500,
    originalPrice: 4800,
    discountRate: 27,
    validDays: 60,
    image: '🍓',
    tags: ['이디야', '이디야커피', '스무디', '아이스', '카페'],
    situation: ['hot', 'sweet'],
    affiliateUrl: '#',
    registeredAt: 5,
    popularity: 72,
  },

  // ── 아티제 ────────────────────────────────────────────
  {
    id: 'ec_artisee01',
    brand: '아티제',
    name: '아이스 아메리카노 R',
    price: 3800,
    originalPrice: 5000,
    discountRate: 24,
    validDays: 60,
    image: '☕',
    tags: ['아티제', '커피', '아메리카노', '아이스', '카페'],
    situation: ['hot', 'coffee'],
    affiliateUrl: '#',
    registeredAt: 6,
    popularity: 70,
  },
  {
    id: 'ec_artisee02',
    brand: '아티제',
    name: '케이크 + 음료 세트',
    price: 8900,
    originalPrice: 12000,
    discountRate: 26,
    validDays: 30,
    image: '🎂',
    tags: ['아티제', '케이크', '커피', '디저트', '카페'],
    situation: ['sweet', 'gift', 'coffee'],
    affiliateUrl: '#',
    registeredAt: 8,
    popularity: 65,
  },

  // ── 던킨 ──────────────────────────────────────────────
  {
    id: 'ec_dunkin01',
    brand: '던킨',
    name: '아이스 아메리카노 + 도넛 1개',
    price: 3500,
    originalPrice: 5400,
    discountRate: 35,
    validDays: 60,
    image: '🍩',
    tags: ['던킨', '도넛', '커피', '아메리카노', '카페'],
    situation: ['hot', 'sweet', 'coffee'],
    affiliateUrl: '#',
    registeredAt: 2,
    popularity: 77,
  },
  {
    id: 'ec_dunkin02',
    brand: '던킨',
    name: '도넛 6개 박스',
    price: 8900,
    originalPrice: 12000,
    discountRate: 26,
    validDays: 30,
    image: '🍩',
    tags: ['던킨', '도넛', '디저트', '베이커리'],
    situation: ['sweet', 'gift'],
    affiliateUrl: '#',
    registeredAt: 7,
    popularity: 73,
  },

  // ── 배스킨라빈스 ──────────────────────────────────────
  {
    id: 'ec002',
    brand: '배스킨라빈스',
    name: '싱글 레귤러 아이스크림',
    price: 2800,
    originalPrice: 3500,
    discountRate: 20,
    validDays: 60,
    image: '🍦',
    tags: ['배스킨라빈스', '배라', '아이스크림', '디저트'],
    situation: ['hot', 'sweet'],
    affiliateUrl: '#',
    registeredAt: 2,
    popularity: 85,
  },
  {
    id: 'ec002b',
    brand: '배스킨라빈스',
    name: '더블 레귤러 아이스크림',
    price: 4200,
    originalPrice: 5200,
    discountRate: 19,
    validDays: 60,
    image: '🍦',
    tags: ['배스킨라빈스', '배라', '아이스크림', '디저트'],
    situation: ['hot', 'sweet'],
    affiliateUrl: '#',
    registeredAt: 3,
    popularity: 82,
  },
  {
    id: 'ec002c',
    brand: '배스킨라빈스',
    name: '패밀리 사이즈 (파인트)',
    price: 7500,
    originalPrice: 9500,
    discountRate: 21,
    validDays: 60,
    image: '🍨',
    tags: ['배스킨라빈스', '배라', '아이스크림', '디저트', '패밀리'],
    situation: ['hot', 'sweet', 'gift'],
    affiliateUrl: '#',
    registeredAt: 11,
    popularity: 76,
  },

  // ── 뚜레쥬르 ──────────────────────────────────────────
  {
    id: 'ec_tlj01',
    brand: '뚜레쥬르',
    name: '케이크 1호 (기념일용)',
    price: 22000,
    originalPrice: 28000,
    discountRate: 21,
    validDays: 30,
    image: '🎂',
    tags: ['뚜레쥬르', '케이크', '베이커리', '기념일', '생일'],
    situation: ['sweet', 'gift'],
    affiliateUrl: '#',
    registeredAt: 9,
    popularity: 68,
  },
  {
    id: 'ec_tlj02',
    brand: '뚜레쥬르',
    name: '샌드위치 + 아이스 아메리카노',
    price: 5500,
    originalPrice: 7800,
    discountRate: 29,
    validDays: 30,
    image: '🥪',
    tags: ['뚜레쥬르', '샌드위치', '커피', '베이커리', '아이스'],
    situation: ['hungry', 'coffee'],
    affiliateUrl: '#',
    registeredAt: 4,
    popularity: 64,
  },

  // ── 올리브영 ──────────────────────────────────────────
  {
    id: 'ec004',
    brand: '올리브영',
    name: '1만원 할인 쿠폰',
    price: 5000,
    originalPrice: 10000,
    discountRate: 50,
    validDays: 180,
    image: '💄',
    tags: ['올리브영', '뷰티', '할인쿠폰', '스킨케어'],
    situation: ['beauty', 'gift'],
    affiliateUrl: '#',
    registeredAt: 19,
    popularity: 80,
  },
  {
    id: 'ec004b',
    brand: '올리브영',
    name: '선크림 기획세트 SPF50+',
    price: 18000,
    originalPrice: 26000,
    discountRate: 31,
    validDays: 180,
    image: '🧴',
    tags: ['올리브영', '뷰티', '선크림', '스킨케어'],
    situation: ['beauty', 'hot'],
    affiliateUrl: '#',
    registeredAt: 10,
    popularity: 75,
  },
  {
    id: 'ec004c',
    brand: '올리브영',
    name: '3만원 상품권',
    price: 25000,
    originalPrice: 30000,
    discountRate: 17,
    validDays: 180,
    image: '🎁',
    tags: ['올리브영', '뷰티', '상품권', '선물'],
    situation: ['beauty', 'gift'],
    affiliateUrl: '#',
    registeredAt: 14,
    popularity: 72,
  },

  // ── 리디 ──────────────────────────────────────────────
  {
    id: 'ec_ridi01',
    brand: '리디',
    name: '리디셀렉트 1개월 이용권',
    price: 6900,
    originalPrice: 9900,
    discountRate: 30,
    validDays: 90,
    image: '📚',
    tags: ['리디', '리디북스', '웹툰', '소설', '전자책', '구독'],
    situation: ['home'],
    affiliateUrl: '#',
    registeredAt: 6,
    popularity: 74,
  },
  {
    id: 'ec_ridi02',
    brand: '리디',
    name: '웹툰/소설 캐시 1만원',
    price: 8000,
    originalPrice: 10000,
    discountRate: 20,
    validDays: 180,
    image: '📖',
    tags: ['리디', '리디북스', '웹툰', '소설', '전자책', '캐시'],
    situation: ['home', 'gift'],
    affiliateUrl: '#',
    registeredAt: 9,
    popularity: 69,
  },

  // ── GS25 ──────────────────────────────────────────────
  {
    id: 'ec_gs01',
    brand: 'GS25',
    name: '편의점 도시락 + 음료 세트',
    price: 4500,
    originalPrice: 6500,
    discountRate: 31,
    validDays: 30,
    image: '🍱',
    tags: ['GS25', 'GS', '편의점', '도시락', '식사'],
    situation: ['hungry', 'home'],
    affiliateUrl: '#',
    registeredAt: 1,
    popularity: 78,
  },
  {
    id: 'ec_gs02',
    brand: 'GS25',
    name: '아이스크림 3+1 쿠폰',
    price: 2500,
    originalPrice: 3500,
    discountRate: 29,
    validDays: 30,
    image: '🍦',
    tags: ['GS25', 'GS', '편의점', '아이스크림', '아이스바'],
    situation: ['hot', 'sweet'],
    affiliateUrl: '#',
    registeredAt: 2,
    popularity: 83,
  },
  {
    id: 'ec_gs03',
    brand: 'GS25',
    name: '편의점 상품권 5천원',
    price: 4000,
    originalPrice: 5000,
    discountRate: 20,
    validDays: 180,
    image: '🏪',
    tags: ['GS25', 'GS', '편의점', '상품권'],
    situation: ['home', 'gift'],
    affiliateUrl: '#',
    registeredAt: 12,
    popularity: 70,
  },

  // ── BBQ ───────────────────────────────────────────────
  {
    id: 'ec_bbq01',
    brand: 'BBQ',
    name: '황금올리브 치킨 (한 마리)',
    price: 19000,
    originalPrice: 23000,
    discountRate: 17,
    validDays: 60,
    image: '🍗',
    tags: ['BBQ', '치킨', '황금올리브', '야식', '배달'],
    situation: ['hungry', 'chicken'],
    affiliateUrl: '#',
    registeredAt: 5,
    popularity: 86,
  },
  {
    id: 'ec_bbq02',
    brand: 'BBQ',
    name: '황금올리브 콤보 (반반)',
    price: 21000,
    originalPrice: 25000,
    discountRate: 16,
    validDays: 60,
    image: '🍗',
    tags: ['BBQ', '치킨', '콤보', '야식', '배달'],
    situation: ['hungry', 'chicken'],
    affiliateUrl: '#',
    registeredAt: 7,
    popularity: 82,
  },

  // ── 굽네치킨 ──────────────────────────────────────────
  {
    id: 'ec_goobne01',
    brand: '굽네치킨',
    name: '볼케이노 치킨 (한 마리)',
    price: 18000,
    originalPrice: 22000,
    discountRate: 18,
    validDays: 60,
    image: '🌋',
    tags: ['굽네치킨', '굽네', '치킨', '볼케이노', '매운', '야식'],
    situation: ['hungry', 'chicken'],
    affiliateUrl: '#',
    registeredAt: 3,
    popularity: 84,
  },
  {
    id: 'ec_goobne02',
    brand: '굽네치킨',
    name: '고추바사삭 (반 마리)',
    price: 10000,
    originalPrice: 12000,
    discountRate: 17,
    validDays: 60,
    image: '🍗',
    tags: ['굽네치킨', '굽네', '치킨', '고추바사삭', '야식'],
    situation: ['hungry', 'chicken'],
    affiliateUrl: '#',
    registeredAt: 6,
    popularity: 79,
  },

  // ── BHC ───────────────────────────────────────────────
  {
    id: 'ec_bhc01',
    brand: 'BHC',
    name: '뿌링클 치킨 (한 마리)',
    price: 18500,
    originalPrice: 22000,
    discountRate: 16,
    validDays: 60,
    image: '🍗',
    tags: ['BHC', '치킨', '뿌링클', '야식', '배달'],
    situation: ['hungry', 'chicken'],
    affiliateUrl: '#',
    registeredAt: 4,
    popularity: 87,
  },
  {
    id: 'ec_bhc02',
    brand: 'BHC',
    name: '맛초킹 + 콜라 세트',
    price: 20000,
    originalPrice: 25000,
    discountRate: 20,
    validDays: 60,
    image: '🍗',
    tags: ['BHC', '치킨', '맛초킹', '세트', '야식'],
    situation: ['hungry', 'chicken'],
    affiliateUrl: '#',
    registeredAt: 5,
    popularity: 81,
  },

  // ── 도미노피자 ────────────────────────────────────────
  {
    id: 'ec_domino01',
    brand: '도미노피자',
    name: '포테이토 피자 L',
    price: 18000,
    originalPrice: 24500,
    discountRate: 27,
    validDays: 60,
    image: '🍕',
    tags: ['도미노피자', '도미노', '피자', '포테이토', '야식', '배달'],
    situation: ['hungry', 'pizza'],
    affiliateUrl: '#',
    registeredAt: 3,
    popularity: 83,
  },
  {
    id: 'ec_domino02',
    brand: '도미노피자',
    name: '슈퍼시드 콰트로 L',
    price: 21000,
    originalPrice: 28000,
    discountRate: 25,
    validDays: 60,
    image: '🍕',
    tags: ['도미노피자', '도미노', '피자', '콰트로', '야식', '배달'],
    situation: ['hungry', 'pizza'],
    affiliateUrl: '#',
    registeredAt: 6,
    popularity: 79,
  },

  // ── 쉐이크쉑 ──────────────────────────────────────────
  {
    id: 'ec_shack01',
    brand: '쉐이크쉑',
    name: '쉑버거 단품',
    price: 7500,
    originalPrice: 9500,
    discountRate: 21,
    validDays: 60,
    image: '🍔',
    tags: ['쉐이크쉑', '쉑버거', '버거', '햄버거', '패스트푸드'],
    situation: ['hungry', 'burger'],
    affiliateUrl: '#',
    registeredAt: 4,
    popularity: 80,
  },
  {
    id: 'ec_shack02',
    brand: '쉐이크쉑',
    name: '더블 쉑버거 + 감자튀김 세트',
    price: 14500,
    originalPrice: 18500,
    discountRate: 22,
    validDays: 60,
    image: '🍔',
    tags: ['쉐이크쉑', '쉑버거', '버거', '세트', '패스트푸드'],
    situation: ['hungry', 'burger'],
    affiliateUrl: '#',
    registeredAt: 5,
    popularity: 77,
  },
  {
    id: 'ec_shack03',
    brand: '쉐이크쉑',
    name: '쉐이크 (바닐라/초코/딸기)',
    price: 5500,
    originalPrice: 7500,
    discountRate: 27,
    validDays: 60,
    image: '🥤',
    tags: ['쉐이크쉑', '쉐이크', '밀크쉐이크', '디저트', '아이스'],
    situation: ['hot', 'sweet'],
    affiliateUrl: '#',
    registeredAt: 6,
    popularity: 74,
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
  pointValue: 1,
};

// ─── 검색 헬퍼 ───────────────────────────────────────────────────────────────

export const searchTodayDeals = (keyword) => {
  if (!keyword) return mockTodayDeals;
  const lower = keyword.toLowerCase();
  return mockTodayDeals.filter(
    (item) =>
      item.tags.some((t) => t.toLowerCase().includes(lower)) ||
      item.name.includes(keyword) ||
      item.category.includes(keyword)
  );
};

export const searchGroupBuys = (keyword) => {
  if (!keyword) return mockGroupBuys;
  const lower = keyword.toLowerCase();
  return mockGroupBuys.filter(
    (item) =>
      item.tags.some((t) => t.toLowerCase().includes(lower)) ||
      item.name.includes(keyword) ||
      item.category.includes(keyword)
  );
};

export const searchECoupons = (keyword) => {
  if (!keyword) return mockECoupons;
  const lower = keyword.toLowerCase();
  return mockECoupons.filter(
    (item) =>
      item.tags.some((t) => t.toLowerCase().includes(lower)) ||
      item.name.includes(keyword) ||
      item.brand.includes(keyword)
  );
};

// 상황 기반 쿠폰 검색
export const searchECouponsBySituation = (situations) => {
  return mockECoupons
    .filter((item) => item.situation?.some((s) => situations.includes(s)))
    .sort((a, b) => b.popularity - a.popularity);
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
