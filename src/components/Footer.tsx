const INFO: ReadonlyArray<{ term: string; detail: string }> = [
  { term: "주소", detail: "서울특별시 가상구 결길 00 (가상 주소)" },
  { term: "운영시간", detail: "화–일 10:00–18:00, 월요일 휴무 (가상)" },
  { term: "전화", detail: "02-000-0000" },
  { term: "이메일", detail: "hello@example.com" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-beige">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="font-serif text-lg font-bold text-ink">온결 공방</p>
            <p className="mt-1 text-sm text-ink-muted">
              손끝의 결을 잇는 한국 공예
            </p>
          </div>
          <address className="not-italic">
            <p className="mb-3 text-sm font-semibold text-ink">
              아래 정보는 모두 실습용 가상 정보입니다.
            </p>
            <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[auto_1fr]">
              {INFO.map(({ term, detail }) => (
                <div key={term} className="contents">
                  <dt className="text-ink-muted">{term}</dt>
                  <dd className="text-ink">{detail}</dd>
                </div>
              ))}
            </dl>
          </address>
        </div>
        <p className="mt-8 border-t border-beige-deep pt-4 text-xs text-ink-muted">
          &copy; 2026 온결 공방 (가상 브랜드). 실습용 프로토타입입니다.
        </p>
      </div>
    </footer>
  );
}
