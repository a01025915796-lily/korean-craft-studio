const priceFormatter = new Intl.NumberFormat("ko-KR");

/** 120000 → "120,000원" */
export function formatPrice(price: number): string {
  return `${priceFormatter.format(price)}원`;
}

/** 150 → "2시간 30분", 120 → "2시간", 45 → "45분" */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}분`;
  return m === 0 ? `${h}시간` : `${h}시간 ${m}분`;
}
