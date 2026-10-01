const HIGHLIGHTS: ReadonlyArray<{ title: string; body: string }> = [
  { title: "장인 직접 제작", body: "하나하나 손으로 빚고 다듬습니다." },
  { title: "소량 주문 제작", body: "필요한 만큼, 취향에 맞춰 만듭니다." },
  { title: "소규모 클래스", body: "여유로운 인원으로 천천히 배웁니다." },
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-20"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-sm font-medium tracking-wide text-accent">
            한국 전통 공예 스튜디오
          </p>
          <h1
            id="hero-title"
            className="mt-3 font-serif text-4xl font-bold leading-tight text-ink sm:text-5xl"
          >
            온결 공방
          </h1>
          <p className="mt-2 font-serif text-xl text-ink-muted">
            손끝의 결을 잇는 한국 공예
          </p>
          <div className="mt-6 space-y-4 leading-relaxed text-ink">
            <p>
              온결은 나무의 결, 흙의 결, 종이의 결처럼 재료가 지닌 고유한 결을
              존중하는 가상의 공방입니다.
            </p>
            <p>
              전통 기법의 단정함을 오늘의 생활에 맞게 다시 풀어, 오래 곁에 두고
              쓰고 싶은 물건을 만듭니다.
            </p>
            <p className="text-sm text-ink-muted">
              * 브랜드 소개와 이야기는 모두 실습을 위한 가상의 설정입니다.
            </p>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {HIGHLIGHTS.map(({ title, body }) => (
              <li
                key={title}
                className="rounded-lg border border-line bg-surface p-4"
              >
                <p className="font-semibold text-ink">{title}</p>
                <p className="mt-1 text-sm text-ink-muted">{body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div
          aria-hidden="true"
          className="flex aspect-square w-full items-center justify-center rounded-2xl bg-beige"
        >
          <svg viewBox="0 0 400 400" className="h-full w-full">
            <rect x="40" y="60" width="220" height="280" rx="6" className="fill-beige-deep" />
            <rect x="140" y="40" width="220" height="280" rx="6" className="fill-paper" />
            <path
              d="M200 110c-10 0-18 6-18 14 0 6 4 10 4 16-34 18-54 52-54 86 0 46 38 74 68 74s68-28 68-74c0-34-20-68-54-86 0-6 4-10 4-16 0-8-8-14-18-14z"
              className="fill-ink"
            />
            <ellipse cx="200" cy="124" rx="18" ry="5" className="fill-ink-muted" />
            <path d="M120 350h160" className="stroke-accent" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
