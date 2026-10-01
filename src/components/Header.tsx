export function Header() {
  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 sm:px-6">
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          className="h-9 w-9 shrink-0 text-accent"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <circle cx="16" cy="16" r="13" />
          <path d="M8 20c3-4 5 4 8 0s5 4 8 0" />
          <path d="M8 14c3-4 5 4 8 0s5 4 8 0" />
        </svg>
        <div className="flex min-w-0 flex-col sm:flex-row sm:items-baseline sm:gap-4">
          <p className="font-serif text-xl font-bold tracking-tight text-ink">
            온결 공방
          </p>
          <p className="text-xs text-ink-muted sm:text-sm">
            손끝의 결을 잇는 한국 공예
          </p>
        </div>
      </div>
    </header>
  );
}
