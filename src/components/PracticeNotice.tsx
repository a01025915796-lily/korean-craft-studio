const NOTICE_TEXT =
  "이 사이트는 실습용 프로토타입입니다. 입력한 정보는 저장되거나 전송되지 않으므로 실제 개인정보를 입력하지 마세요.";

export function PracticeNotice({
  variant = "banner",
}: {
  variant?: "banner" | "inline";
}) {
  if (variant === "inline") {
    return (
      <p
        role="note"
        className="flex items-start gap-2 rounded-lg border border-beige-deep bg-notice-bg px-3 py-2.5 text-sm leading-relaxed text-ink"
      >
        <span
          aria-hidden="true"
          className="mt-0.5 shrink-0 rounded bg-accent px-1.5 py-0.5 text-xs font-semibold text-surface"
        >
          실습 안내
        </span>
        <span>{NOTICE_TEXT}</span>
      </p>
    );
  }

  return (
    <div role="note" className="w-full bg-notice-bg text-ink">
      <p className="mx-auto flex max-w-6xl items-start justify-center gap-2 px-4 py-2 text-center text-xs leading-relaxed sm:items-center sm:text-sm">
        <span
          aria-hidden="true"
          className="shrink-0 rounded bg-accent px-1.5 py-0.5 text-xs font-semibold text-surface"
        >
          실습 안내
        </span>
        <span>{NOTICE_TEXT}</span>
      </p>
    </div>
  );
}
