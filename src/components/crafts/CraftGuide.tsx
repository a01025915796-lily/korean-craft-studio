const guides = [
  {
    title: "주문 제작 기간",
    body: "수작업으로 만들어 주문 후 약 2~4주가 걸립니다. 상품마다 조금씩 달라질 수 있어요.",
  },
  {
    title: "배송 방법",
    body: "깨지기 쉬운 공예품은 완충 포장 후 택배로 보냅니다. 배송비는 일률 3,000원입니다.",
  },
  {
    title: "교환·반품",
    body: "수령 후 7일 이내 미사용 상태라면 교환·반품이 가능합니다. 주문 제작 상품은 제작 시작 후 변경이 어렵습니다.",
  },
];

export function CraftGuide() {
  return (
    <section aria-labelledby="craft-guide-title" className="rounded-lg border border-line bg-paper p-5 sm:p-7">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h3 id="craft-guide-title" className="font-serif text-xl font-semibold text-ink">
          제작·배송 안내
        </h3>
        <span className="rounded-full bg-notice-bg px-3 py-1 text-xs font-medium text-ink">
          실습용 가상 안내
        </span>
      </div>
      <dl className="mt-4 grid gap-4 sm:grid-cols-3">
        {guides.map((guide) => (
          <div key={guide.title}>
            <dt className="text-sm font-semibold text-ink">{guide.title}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-ink-muted">{guide.body}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
