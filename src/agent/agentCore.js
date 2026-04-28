import {
  searchTodayDeals,
  searchGroupBuys,
  searchECoupons,
  getMovies,
  getUserPoint,
  sortItems,
  SORT_LABELS,
} from './mockData';

// ─── 1. 텍스트 정규화 ─────────────────────────────────────────────────────────

const NORMALIZATIONS = [
  [/공구/g, '공동구매'],
  [/득템/g, '공동구매'],
  [/이쿠폰|e 쿠폰|이 쿠폰/g, 'e쿠폰'],
  [/기프티콘|모바일상품권|모바일 상품권|모바일쿠폰/g, 'e쿠폰'],
  [/씨지브이|cgv/gi, 'CGV'],
  [/메박/g, '메가박스'],
  [/롯시|롯데시네/g, '롯데시네마'],
  [/메가커피|메가mgc|megacoffee|mega coffee/gi, '메가커피'],
  [/스벅|스타벅|starbucks/gi, '스타벅스'],
  [/에어팟|airpod/gi, '에어팟'],
  [/갤럭시|galaxy/gi, '갤럭시'],
  [/아이폰|iphone/gi, '아이폰'],
  [/노트북|랩탑|laptop/gi, '노트북'],
  [/배라|베라/g, '배스킨'],
  [/올영/g, '올리브영'],
  [/아가|애기|애기용/g, '아기'],
  [/애들|아이들|애기들/g, '유아동'],
  [/캐쉬백|ok캐쉬|okcash|포인/gi, '포인트'],
  [/잔액|남은포인트|남은 포인트|쌓인|쌓였/g, '포인트'],
  [/타임딜|핫딜|세일|할인행사/g, '오늘특가'],
  [/싸게 파는|저렴하게|가성비 좋은|할인 중|세일 중/g, '오늘특가'],
];

function normalize(text) {
  let result = text.toLowerCase();
  for (const [pattern, replacement] of NORMALIZATIONS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

// ─── 2. 슬롯(키워드) 추출 ────────────────────────────────────────────────────

const PRODUCT_SYNONYMS = {
  메가커피: ['메가커피', '메가mgc', '메가 커피'],
  스타벅스: ['스타벅스', '스벅'],
  노트북:   ['노트북', '랩탑', '울트라북', '맥북'],
  이어폰:   ['이어폰', '에어팟', '버즈', '헤드셋', '이어버드'],
  스마트폰: ['스마트폰', '아이폰', '갤럭시', '핸드폰', '휴대폰'],
  청소기:   ['청소기', '다이슨', '로봇청소기'],
  커피:     ['커피', '아메리카노', '라떼', '카페'],
  아이스크림: ['아이스크림', '배스킨', '젤라또'],
  버거:     ['버거', '햄버거', '맥도날드', '버거킹', '롯데리아'],
  신발:     ['신발', '운동화', '나이키', '아디다스', '런닝화'],
  뷰티:     ['화장품', '뷰티', '올리브영', '스킨케어', '로션'],
  장난감:   ['장난감', '레고', '피셔', '유아', '아기', '어린이', '유아동'],
  CGV:      ['cgv', 'CGV'],
  메가박스: ['메가박스', '메박'],
  롯데시네마: ['롯데시네마', '롯시'],
};

// 의도 키워드 — 슬롯 추출 시 제외
const INTENT_WORDS = new Set([
  '공동구매', '오늘특가', '특가', '쿠폰', 'e쿠폰', '영화', '포인트', '예매', '할인',
]);

function extractKeyword(normalized, original) {
  for (const [canonical, synonyms] of Object.entries(PRODUCT_SYNONYMS)) {
    if (synonyms.some((s) => normalized.includes(s.toLowerCase()))) return canonical;
  }
  const nounMatch = (original ?? normalized).match(
    /([가-힣a-zA-Z]{2,8})(?:이|가|은|는|을|를|의|에서|에|있|없|알려|줘|해줘|보여|추천|할인)/
  );
  if (nounMatch && !INTENT_WORDS.has(nounMatch[1])) return nounMatch[1];
  return null;
}

// ─── 3. 대화 컨텍스트 추출 ───────────────────────────────────────────────────

function extractContext(history) {
  const agentMsgs = history.filter((m) => m.role === 'agent');
  const userMsgs  = history.filter((m) => m.role === 'user');

  const lastAgent = agentMsgs[agentMsgs.length - 1] ?? null;

  // 가장 최근 유저 발화에서 키워드 역방향 탐색
  let lastKeyword = null;
  for (const msg of [...userMsgs].reverse()) {
    const norm = normalize(msg.text);
    const kw = extractKeyword(norm, msg.text);
    if (kw) { lastKeyword = kw; break; }
  }

  // 에이전트 응답 텍스트에서 따옴표 키워드 보조 추출
  if (!lastKeyword && lastAgent?.text) {
    const m = lastAgent.text.match(/"([^"]{1,15})"/);
    if (m) lastKeyword = m[1];
  }

  const lastIntent = lastAgent?.type ?? null;
  const lastItems =
    lastAgent?.cards?.items ??
    lastAgent?.cards?.sections?.flatMap((s) => s.items) ??
    [];

  return { lastKeyword, lastIntent, lastItems, lastAgent };
}

// ─── 4. 정렬 감지 & 처리 ─────────────────────────────────────────────────────

const SORT_PATTERNS = [
  { re: /최신|새로\s*나온|방금|갓\s*올라온|신규|막\s*나온|최근\s*(등록|나온|올라온)?/, type: 'newest' },
  { re: /할인\s*(많이|높은|큰|최대|순)\s*|최대\s*할인|가장\s*(많이\s*)?할인|세일\s*많이/, type: 'discount_desc' },
  { re: /가격\s*(낮은|저렴한)\s*순|싼\s*것?\s*(부터|순)|저렴한\s*(것?순|거부터)|가장\s*싼/, type: 'price_asc' },
  { re: /가격\s*(높은|비싼)\s*순|비싼\s*(것?부터|순)|프리미엄\s*순/, type: 'price_desc' },
  { re: /인기\s*(있는|순|많은)|많이\s*(사는|팔리는|팔린)|핫한|베스트|잘\s*팔리는/, type: 'popularity' },
  { re: /마감\s*임박|곧\s*끝나는|오늘\s*마감|시간\s*(얼마|없는)|얼마\s*안\s*남은|종료\s*임박/, type: 'deadline' },
  { re: /재고\s*(얼마|없는|적은|부족)|품절\s*임박|수량\s*(적은|없는|얼마)/, type: 'low_stock' },
];

function detectSort(normalized) {
  for (const { re, type } of SORT_PATTERNS) {
    if (re.test(normalized)) return type;
  }
  return null;
}

// 정렬 적용 후 카드 타입 매핑
const INTENT_TO_CARD_TYPE = {
  today_deals_search: 'today_deals',
  groupbuy_search:    'group_buy',
  ecoupon_search:     'ecoupon',
};

function buildSortedResults(sortType, keyword, categoryIntent, existingItems) {
  // 우선순위: existingItems(이미 보여준 것) > 카테고리 검색 > 전체 오늘특가 기본
  let items = existingItems;
  let cardType = INTENT_TO_CARD_TYPE[categoryIntent] ?? 'today_deals';

  if (!items || items.length === 0) {
    if (categoryIntent === 'groupbuy_search') {
      items = searchGroupBuys(keyword);
      cardType = 'group_buy';
    } else if (categoryIntent === 'ecoupon_search') {
      items = searchECoupons(keyword);
      cardType = 'ecoupon';
    } else {
      items = searchTodayDeals(keyword);
      cardType = 'today_deals';
    }
  }

  if (items.length === 0) {
    return {
      text: `정렬할 상품이 없어요. 먼저 검색을 해볼까요?`,
      cards: null,
      quickReplies: ['오늘 특가 보여줘', '공동구매 목록', 'e쿠폰 추천'],
      type: 'no_result',
    };
  }

  const sorted = sortItems(items, sortType);
  const label = SORT_LABELS[sortType];
  const kwLabel = keyword ? `"${keyword}" ` : '';

  return {
    text: `${kwLabel}${label}으로 정렬했어요! 📊`,
    cards: { type: cardType, items: sorted.slice(0, 5) },
    quickReplies: Object.entries(SORT_LABELS)
      .filter(([k]) => k !== sortType)
      .slice(0, 3)
      .map(([, v]) => `${v}으로 보기`),
    type: categoryIntent ?? 'today_deals_search',
    _sortType: sortType,
  };
}

// ─── 5. 팔로우업 감지 ────────────────────────────────────────────────────────

const AFFIRMATIVE_RE = /^(응|맞아|그래|좋아|네|예|ㅇㅇ|ㅇㅋ|오케이|okay|yes|좋아요|그럼|그거로|ㄱㄱ)[!.~♡]?$/i;
const NEGATIVE_RE    = /^(아니|아뇨|노|no|말고|다른\s*거|다른\s*것|싫어)[!.~]?$/i;
const MORE_RE        = /더\s*(보여|있어|없어|줘|찾아)|다른\s*(거|것|상품)|추가로|또\s*(있어|없어)/;
const CHEAPER_RE     = /더\s*(싸|저렴|싸게|싼|낮은)|가격.*낮|만원\s*이하|[\d]+만\s*원\s*이하/;
const EXPENSIVE_RE   = /더\s*(비싼|좋은|고급|프리미엄)|고가/;
const PRONOUN_RE     = /^(그|이|저)(거|것|게|걸|건)|(그|이|저)\s*(상품|거|것)/;
const PRICE_ASK_RE   = /(얼마|가격|금액|비용)(야|이야|예요|에요|\?)?/;

const CATEGORY_SWITCHES = [
  { re: /공동구매|공구/,               intent: 'groupbuy_search'      },
  { re: /오늘특가|특가|핫딜/,          intent: 'today_deals_search'   },
  { re: /e쿠폰|이쿠폰|쿠폰|기프티콘/, intent: 'ecoupon_search'       },
  { re: /영화|예매|극장|시네마/,        intent: 'movie_search'         },
  { re: /포인트|캐쉬백/,              intent: 'point_inquiry'         },
];

function detectFollowUp(text, normalized, ctx) {
  // 이전 대화가 없거나 인사/도움말 직후면 팔로우업 없음
  if (!ctx.lastIntent || ['greeting', 'help', null].includes(ctx.lastIntent)) return null;

  const hasNewKeyword = !!extractKeyword(normalized, text);

  // 긍정 반응
  if (AFFIRMATIVE_RE.test(text.trim())) return { type: 'affirmative' };

  // 부정 / 다른 거
  if (NEGATIVE_RE.test(text.trim())) return { type: 'negative' };

  // 가격 질문 + 대명사
  if (PRICE_ASK_RE.test(normalized) && (PRONOUN_RE.test(normalized) || !hasNewKeyword)) {
    return { type: 'price_ask' };
  }

  // 카테고리 전환 — 새 키워드 없이 카테고리만 언급
  if (!hasNewKeyword && ctx.lastKeyword) {
    for (const { re, intent } of CATEGORY_SWITCHES) {
      if (re.test(normalized) && intent !== ctx.lastIntent) {
        return { type: 'category_switch', targetIntent: intent };
      }
    }
  }

  // 더 보여줘 / 다른 거
  if (MORE_RE.test(normalized)) return { type: 'more' };

  // 가격 필터
  if (CHEAPER_RE.test(normalized))   return { type: 'cheaper' };
  if (EXPENSIVE_RE.test(normalized)) return { type: 'expensive' };

  // 대명사 참조
  if (PRONOUN_RE.test(normalized) && ctx.lastItems.length > 0) return { type: 'reference' };

  return null;
}

// ─── 5. 팔로우업 응답 처리 ───────────────────────────────────────────────────

function handleFollowUp(followUp, ctx) {
  const { lastKeyword, lastIntent, lastItems } = ctx;

  switch (followUp.type) {

    case 'category_switch': {
      const kw = lastKeyword;
      const label = kw ? `"${kw}"` : '';
      switch (followUp.targetIntent) {
        case 'groupbuy_search':    return buildGroupBuy(kw);
        case 'today_deals_search': return buildTodayDeals(kw);
        case 'ecoupon_search':     return buildECoupon(kw);
        case 'movie_search':       return buildMovie(kw);
        case 'point_inquiry':      return buildPointInfo();
      }
      break;
    }

    case 'affirmative': {
      if (lastItems.length > 0) {
        const item = lastItems[0];
        const name = item.name ?? item.title ?? '해당 상품';
        return {
          text: `좋아요! "${name}" 페이지로 이동할게요 😊\n구매 후 OK캐쉬백 포인트도 꼭 적립하세요!`,
          cards: null,
          quickReplies: ['내 포인트 확인', '다른 상품 보기'],
          type: 'affirmative',
        };
      }
      return buildHelp();
    }

    case 'negative': {
      if (lastKeyword) {
        return {
          ...buildMultiSearch(lastKeyword),
          text: `다른 혜택으로 찾아볼게요! "${lastKeyword}" 전체 검색 결과예요.`,
        };
      }
      return buildHelp();
    }

    case 'more': {
      const intentHandlers = {
        today_deals_search: () => buildTodayDeals(lastKeyword),
        groupbuy_search:    () => buildGroupBuy(lastKeyword),
        ecoupon_search:     () => buildECoupon(lastKeyword),
        movie_search:       () => buildMovie(lastKeyword),
        multi_search:       () => buildMultiSearch(lastKeyword),
      };
      return (intentHandlers[lastIntent] ?? buildHelp)();
    }

    case 'cheaper': {
      if (lastItems.length > 0) {
        const sorted = [...lastItems].sort(
          (a, b) => (a.salePrice ?? a.price ?? 0) - (b.salePrice ?? b.price ?? 0)
        );
        const cardType =
          lastIntent === 'today_deals_search' ? 'today_deals'
          : lastIntent === 'groupbuy_search'  ? 'group_buy'
          : lastIntent === 'ecoupon_search'   ? 'ecoupon'
          : 'today_deals';
        return {
          text: `가격 낮은 순으로 정렬했어요! 💸`,
          cards: { type: cardType, items: sorted },
          quickReplies: ['더 싼 거 있어?', '공동구매도 보기', 'e쿠폰도 보기'],
          type: lastIntent,
        };
      }
      return buildHelp();
    }

    case 'expensive': {
      if (lastItems.length > 0) {
        const sorted = [...lastItems].sort(
          (a, b) => (b.salePrice ?? b.price ?? 0) - (a.salePrice ?? a.price ?? 0)
        );
        const cardType =
          lastIntent === 'today_deals_search' ? 'today_deals'
          : lastIntent === 'groupbuy_search'  ? 'group_buy'
          : 'ecoupon';
        return {
          text: `프리미엄 상품 순으로 보여드릴게요! ✨`,
          cards: { type: cardType, items: sorted },
          quickReplies: ['더 저렴한 거 보기', 'e쿠폰도 보기'],
          type: lastIntent,
        };
      }
      return buildHelp();
    }

    case 'price_ask': {
      if (lastItems.length > 0) {
        const item = lastItems[0];
        const name  = item.name ?? item.title ?? '해당 상품';
        const price = item.salePrice ?? item.price;
        const orig  = item.originalPrice;
        const disc  = item.discountRate;
        let msg = `"${name}"\n\n💰 ${price?.toLocaleString()}원`;
        if (orig && disc) msg += `\n원가 ${orig.toLocaleString()}원 → **${disc}% 할인**`;
        return {
          text: msg,
          cards: null,
          quickReplies: ['구매하기', '공동구매도 있어?', '다른 거 보기'],
          type: 'reference',
        };
      }
      return buildHelp();
    }

    case 'reference': {
      if (lastItems.length > 0) {
        const item = lastItems[0];
        const name  = item.name ?? item.title ?? '해당 상품';
        const price = item.salePrice ?? item.price;
        return {
          text: `"${name}" 이에요!\n\n💰 ${price?.toLocaleString()}원\n\n구매를 도와드릴까요?`,
          cards: null,
          quickReplies: ['구매하기', '다른 거 보기', '공동구매 찾기'],
          type: 'reference',
        };
      }
      return buildHelp();
    }

    default:
      return null;
  }
}

// ─── 6. 점수 기반 의도 분류 ───────────────────────────────────────────────────

const INTENT_SCORES = [
  {
    intent: 'greeting',
    patterns: [
      { kw: '안녕', score: 3 }, { kw: '하이', score: 3 }, { kw: '헬로', score: 3 },
      { kw: '반가워', score: 3 }, { kw: '처음', score: 1 }, { kw: '시작', score: 1 },
    ],
  },
  {
    intent: 'help',
    patterns: [
      { kw: '뭐 해줘', score: 3 }, { kw: '뭐할수있', score: 3 }, { kw: '기능', score: 2 },
      { kw: '메뉴', score: 2 }, { kw: '도움말', score: 3 }, { kw: '사용법', score: 3 },
    ],
  },
  {
    intent: 'today_deals_search',
    patterns: [
      { kw: '오늘특가', score: 5 }, { kw: '오늘 특가', score: 5 }, { kw: '특가', score: 3 },
      { kw: '타임딜', score: 3 }, { kw: '핫딜', score: 3 }, { kw: '할인', score: 1 },
      { kw: '세일', score: 1 }, { kw: '싸게', score: 1 }, { kw: '저렴', score: 1 },
      { kw: '가성비', score: 1 }, { kw: '오늘만', score: 3 }, { kw: '지금 파는', score: 2 },
    ],
  },
  {
    intent: 'groupbuy_search',
    patterns: [
      { kw: '공동구매', score: 5 }, { kw: '같이 사', score: 4 }, { kw: '함께 사', score: 4 },
      { kw: '단체구매', score: 4 }, { kw: '여럿이', score: 3 }, { kw: '모여서', score: 3 },
      { kw: '모일수록', score: 4 }, { kw: '참여', score: 2 },
    ],
  },
  {
    intent: 'ecoupon_search',
    patterns: [
      { kw: 'e쿠폰', score: 5 }, { kw: '기프티콘', score: 5 }, { kw: '모바일쿠폰', score: 5 },
      { kw: '쿠폰', score: 3 }, { kw: '상품권', score: 3 }, { kw: '선물', score: 2 },
      { kw: '기프트', score: 3 }, { kw: '선물할', score: 3 },
    ],
  },
  {
    intent: 'movie_search',
    patterns: [
      { kw: '영화', score: 4 }, { kw: '예매', score: 4 }, { kw: '상영', score: 4 },
      { kw: '극장', score: 4 }, { kw: 'cgv', score: 4 }, { kw: '메가박스', score: 4 },
      { kw: '롯데시네마', score: 4 }, { kw: '시네마', score: 3 }, { kw: '영화 보', score: 5 },
      { kw: '볼만한', score: 2 }, { kw: '무슨 영화', score: 5 }, { kw: '티켓', score: 3 },
      { kw: '관람', score: 3 },
    ],
  },
  {
    intent: 'point_inquiry',
    patterns: [
      { kw: '포인트', score: 5 }, { kw: '캐쉬백', score: 4 }, { kw: '잔액', score: 3 },
      { kw: '얼마 있', score: 3 }, { kw: '만료', score: 3 }, { kw: '소멸', score: 3 },
      { kw: '사용 가능', score: 3 }, { kw: '쓸 수 있', score: 2 }, { kw: '쌓인', score: 2 },
      { kw: '적립', score: 2 },
    ],
  },
];

function detectIntent(normalized, history) {
  const scores = {};
  for (const { intent, patterns } of INTENT_SCORES) {
    scores[intent] = patterns.reduce(
      (sum, { kw, score }) => sum + (normalized.includes(kw) ? score : 0),
      0
    );
  }

  // 컨텍스트 보정: 직전 에이전트 응답 타입 기반 약한 신호 증폭
  const lastAgent = [...history].reverse().find((m) => m.role === 'agent');
  if (lastAgent?.type) {
    const boost = {
      movie:       { movie_search: 2 },
      today_deals: { today_deals_search: 2 },
      group_buy:   { groupbuy_search: 2 },
      ecoupon:     { ecoupon_search: 2 },
      point:       { point_inquiry: 2 },
    }[lastAgent.type];
    if (boost) {
      for (const [intent, val] of Object.entries(boost)) {
        scores[intent] = (scores[intent] ?? 0) + val;
      }
    }
  }

  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return best[1] >= 2 ? best[0] : 'unknown';
}

// ─── 7. 응답 빌더 ────────────────────────────────────────────────────────────

function buildGreeting() {
  return {
    text: `안녕하세요! 👋 OK캐쉬백 쇼핑 AI에이전트입니다.\n\n무엇을 도와드릴까요?`,
    cards: null,
    quickReplies: ['오늘 특가 보여줘', '공동구매 목록', 'e쿠폰 추천', '영화 예매하기', '내 포인트 확인'],
    type: 'greeting',
  };
}

function buildHelp() {
  return {
    text: `OK캐쉬백 쇼핑 AI로 할 수 있는 것들이에요:\n\n🏷️ **오늘특가** — "오늘 싸게 파는 노트북 있어?"\n🤝 **공동구매** — "같이 사면 할인되는 장난감 있어?"\n🎟️ **e쿠폰** — "스벅 기프티콘 있어?"\n🎬 **영화예매** — "이번 주 볼만한 영화 뭐야?"\n💰 **포인트** — "캐쉬백 얼마 남았어?"`,
    cards: null,
    quickReplies: ['오늘 특가 보여줘', '공동구매 목록', '내 포인트 확인'],
    type: 'help',
  };
}

function buildTodayDeals(keyword, extras) {
  const results = searchTodayDeals(keyword);
  if (results.length === 0) {
    return {
      text: `"${keyword ?? '해당'}" 관련 오늘특가 상품이 없어요.\n다른 카테고리를 찾아볼까요?`,
      cards: null,
      quickReplies: ['전체 오늘특가 보기', '공동구매 찾기', 'e쿠폰 추천'],
      type: 'no_result',
    };
  }
  const label = keyword ? `"${keyword}" 오늘특가` : '오늘특가 전체';
  return {
    text: `${label} ${results.length}개 찾았어요! ⚡ 오늘 자정까지예요.`,
    cards: { type: 'today_deals', items: results.slice(0, 5) },
    quickReplies: ['공동구매도 있어?', 'e쿠폰도 있어?', '더 싼 거 있어?'],
    type: 'today_deals_search',
  };
}

function buildGroupBuy(keyword) {
  const results = searchGroupBuys(keyword);
  if (results.length === 0) {
    return {
      text: `"${keyword ?? '해당'}" 관련 공동구매가 없어요.`,
      cards: null,
      quickReplies: ['전체 공동구매 보기', '오늘특가 보기'],
      type: 'no_result',
    };
  }
  const label = keyword ? `"${keyword}" 공동구매` : '진행 중인 공동구매';
  return {
    text: `${label} ${results.length}개예요! 많이 모일수록 할인이 커져요 🤝`,
    cards: { type: 'group_buy', items: results.slice(0, 4) },
    quickReplies: ['오늘특가도 있어?', 'e쿠폰도 있어?', '더 싼 거 있어?'],
    type: 'groupbuy_search',
  };
}

function buildECoupon(keyword) {
  const results = searchECoupons(keyword);
  if (results.length === 0) {
    return {
      text: `"${keyword ?? '해당'}" 관련 e쿠폰이 없어요.`,
      cards: null,
      quickReplies: ['전체 e쿠폰 보기', '오늘특가 보기'],
      type: 'no_result',
    };
  }
  const label = keyword ? `"${keyword}" e쿠폰` : 'e쿠폰';
  return {
    text: `${label} ${results.length}개 찾았어요! 🎟️ 포인트로도 구매 가능해요.`,
    cards: { type: 'ecoupon', items: results.slice(0, 5) },
    quickReplies: ['공동구매도 있어?', '더 싼 거 있어?', '내 포인트 확인'],
    type: 'ecoupon_search',
  };
}

function buildMovie(keyword) {
  const results = getMovies(keyword);
  const point = getUserPoint();
  const pointText = `현재 ${point.totalPoints.toLocaleString()}P로 최대 4,500원 할인 가능해요.`;
  if (results.length === 0) {
    return {
      text: `상영 중인 영화 정보가 없어요.\n\n${pointText}`,
      cards: null,
      quickReplies: ['전체 영화 보기', '내 포인트 확인'],
      type: 'no_result',
    };
  }
  return {
    text: `지금 상영 중인 영화예요! 🎬\n${pointText}`,
    cards: { type: 'movie', items: results.slice(0, 3) },
    quickReplies: ['CGV 예매', '메가박스 예매', '롯데시네마 예매'],
    type: 'movie_search',
  };
}

function buildPointInfo() {
  const point = getUserPoint();
  const expMsg = point.expiringPoints > 0
    ? `\n⚠️ ${point.expiringDate}까지 ${point.expiringPoints.toLocaleString()}P 소멸 예정!`
    : '';
  return {
    text: `💰 OK캐쉬백 포인트 현황이에요.${expMsg}`,
    cards: { type: 'point', data: point },
    quickReplies: ['포인트로 영화 예매', '포인트로 e쿠폰 구매', '오늘특가 보기'],
    type: 'point_inquiry',
  };
}

function buildMultiSearch(keyword) {
  const deals   = searchTodayDeals(keyword).slice(0, 3);
  const groups  = searchGroupBuys(keyword).slice(0, 3);
  const coupons = searchECoupons(keyword).slice(0, 3);
  const total   = deals.length + groups.length + coupons.length;

  if (total === 0) {
    return {
      text: `"${keyword}" 관련 오늘특가·공동구매·e쿠폰 모두 검색했지만 결과가 없어요.`,
      cards: null,
      quickReplies: ['오늘 특가 보여줘', '공동구매 목록', 'e쿠폰 추천'],
      type: 'no_result',
    };
  }

  const sections = [
    deals.length   > 0 && { label: '🏷️ 오늘특가',  type: 'today_deals', items: deals },
    groups.length  > 0 && { label: '🤝 공동구매',   type: 'group_buy',   items: groups },
    coupons.length > 0 && { label: '🎟️ e쿠폰',     type: 'ecoupon',     items: coupons },
  ].filter(Boolean);

  return {
    text: `"${keyword}" 검색 결과예요! 총 ${total}개`,
    cards: { type: 'multi_search', sections },
    quickReplies: ['더 싼 거 있어?', '내 포인트 확인'],
    type: 'multi_search',
  };
}

function buildUnknown() {
  return {
    text: `잘 이해하지 못했어요 😅\n\n오늘특가, 공동구매, e쿠폰, 영화예매, 포인트 중 어떤 게 필요하세요?`,
    cards: null,
    quickReplies: ['오늘 특가 보여줘', '공동구매 목록', 'e쿠폰 추천', '내 포인트 확인'],
    type: 'unknown',
  };
}

// ─── 8. 메인 에이전트 함수 ────────────────────────────────────────────────────

export async function processMessage(text, history = []) {
  await new Promise((r) => setTimeout(r, 500 + Math.random() * 400));

  const normalized = normalize(text);
  const ctx = extractContext(history);

  // 팔로우업 먼저 처리
  const followUp = detectFollowUp(text, normalized, ctx);
  if (followUp) {
    const result = handleFollowUp(followUp, ctx);
    if (result) return result;
  }

  // 빠른 답장: 정렬 버튼 ("X으로 보기")
  const sortBtnMatch = text.match(/^(.+)으로\s*보기$/);
  if (sortBtnMatch) {
    const labelTarget = sortBtnMatch[1];
    const sortType = Object.entries(SORT_LABELS).find(([, v]) => v === labelTarget)?.[0];
    if (sortType) {
      return buildSortedResults(sortType, ctx.lastKeyword, ctx.lastIntent, ctx.lastItems);
    }
  }

  // 빠른 답장 텍스트 처리 (통합검색 섹션 버튼)
  if (text.startsWith('오늘특가에서') || text.startsWith('공동구매에서') || text.startsWith('e쿠폰에서')) {
    const kw = text.split('에서 ')[1]?.replace(' 검색', '').trim();
    if (text.startsWith('오늘특가에서'))  return buildTodayDeals(kw);
    if (text.startsWith('공동구매에서'))  return buildGroupBuy(kw);
    if (text.startsWith('e쿠폰에서'))    return buildECoupon(kw);
  }

  // 정렬 의도 감지 (일반 NLU 앞에서)
  const sortType = detectSort(normalized);

  // 일반 NLU
  const intent  = detectIntent(normalized, history);
  // 키워드 없으면 이전 대화 키워드 상속 (인사·도움말은 제외)
  const freshKeyword = extractKeyword(normalized, text);
  const keyword = freshKeyword ?? (
    !['greeting', 'help', 'point_inquiry', 'movie_search'].includes(intent)
      ? ctx.lastKeyword
      : null
  );

  // 정렬이 감지됐으면 해당 카테고리+키워드로 정렬된 결과 반환
  if (sortType) {
    return buildSortedResults(sortType, keyword, intent !== 'unknown' ? intent : ctx.lastIntent, ctx.lastItems);
  }

  switch (intent) {
    case 'greeting':           return buildGreeting();
    case 'help':               return buildHelp();
    case 'today_deals_search': return buildTodayDeals(keyword);
    case 'groupbuy_search':    return buildGroupBuy(keyword);
    case 'ecoupon_search':     return buildECoupon(keyword);
    case 'movie_search':       return buildMovie(keyword);
    case 'point_inquiry':      return buildPointInfo();
    default:
      if (keyword) return buildMultiSearch(keyword);
      return buildUnknown();
  }
}

export const QUICK_REPLY_INTENT_MAP = {
  '오늘 특가 보여줘':    '오늘특가 전체 보여줘',
  '공동구매 목록':       '공동구매 전체 목록 보여줘',
  '전체 오늘특가 보기':  '오늘특가 전체 보여줘',
  '전체 공동구매 보기':  '공동구매 전체 목록 보여줘',
  '전체 e쿠폰 보기':     'e쿠폰 전체 목록 보여줘',
  '전체 영화 보기':      '영화 상영 목록 보여줘',
  '내 포인트 확인':      '내 포인트 확인해줘',
  '내 포인트로 구매하기': '내 포인트 확인해줘',
  '포인트로 영화 예매':  '포인트로 영화 예매할 수 있어?',
  '포인트로 e쿠폰 구매': '포인트로 e쿠폰 살 수 있어?',
  'e쿠폰 추천':          'e쿠폰 추천해줘',
  '영화 예매하기':       '영화 보고 싶어',
  '공동구매도 보기':     '공동구매 목록 보여줘',
  '공동구매도 있어?':    '공동구매도 있어?',
  '오늘특가도 있어?':    '오늘특가도 있어?',
  'e쿠폰도 있어?':       'e쿠폰도 있어?',
  '더 싼 거 있어?':      '더 싼 거 있어?',
  'e쿠폰 찾기':          'e쿠폰 추천해줘',
  '공동구매 보기':       '공동구매 보여줘',
  'CGV 예매':            'CGV 영화 예매하고 싶어',
  '메가박스 예매':       '메가박스 영화 예매하고 싶어',
  '롯데시네마 예매':     '롯데시네마 영화 예매하고 싶어',
  '구매하기':            '응',
  '다른 상품 보기':      '다른 거 보여줘',
};
