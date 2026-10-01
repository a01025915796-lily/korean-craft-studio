"use client";

import { useEffect, useRef } from "react";

interface SubmitSuccessProps {
  title: string;
  receiptNumber: string;
  message: string;
  onConfirm: () => void;
}

/** 접수 완료 화면. 표시될 때 제목으로 포커스를 옮겨 스크린리더가 결과를 읽게 한다. */
export function SubmitSuccess({ title, receiptNumber, message, onConfirm }: SubmitSuccessProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 py-4 text-center" role="status">
      <h3 ref={headingRef} tabIndex={-1} className="font-serif text-2xl font-semibold text-success">
        {title}
      </h3>
      <div className="w-full rounded-md border border-line bg-paper px-4 py-4">
        <p className="text-sm text-ink-muted">가짜 접수번호</p>
        <p className="mt-1 font-mono text-lg font-semibold tracking-wide text-ink">{receiptNumber}</p>
      </div>
      <p className="text-sm leading-relaxed text-ink-muted">{message}</p>
      <button
        type="button"
        onClick={onConfirm}
        className="min-h-11 w-full rounded-md bg-accent px-6 font-medium text-surface hover:bg-accent-hover sm:w-auto"
      >
        확인
      </button>
    </div>
  );
}

/** 제출 실패 배너. role="alert"로 즉시 낭독된다. */
export function SubmitErrorBanner({ message }: { message: string }) {
  return (
    <div role="alert" className="rounded-md border border-danger/40 bg-danger-bg px-4 py-3 text-sm text-danger">
      <p className="font-semibold">접수하지 못했습니다.</p>
      <p className="mt-1">{message}</p>
    </div>
  );
}

interface SubmitButtonProps {
  loading: boolean;
  label: string;
  loadingLabel?: string;
}

/** 로딩 중 비활성화되는 제출 버튼 (중복 제출 방지). */
export function SubmitButton({ loading, label, loadingLabel = "접수 중…" }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      aria-busy={loading}
      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-accent px-6 font-medium text-surface hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70"
    >
      {loading && (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-surface/40 border-t-surface motion-reduce:animate-none"
        />
      )}
      {loading ? loadingLabel : label}
    </button>
  );
}
