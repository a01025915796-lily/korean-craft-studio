import type { ReactNode } from "react";

interface FormFieldProps {
  /** 입력 요소의 id. label htmlFor와 오류 문구 id(`${id}-error`)에 사용 */
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  /**
   * 입력 요소. 다음 속성을 직접 지정해야 한다:
   * id, aria-invalid={!!error}, aria-describedby={describedBy(id, error, hint)}
   */
  children: ReactNode;
}

/** 입력 요소에 넘길 aria-describedby 값을 만든다. */
export function describedBy(id: string, error?: string, hint?: string): string | undefined {
  const ids = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

export const inputClassName =
  "w-full min-h-11 rounded-md border border-beige-deep bg-surface px-3 py-2 text-base text-ink placeholder:text-ink-muted/70 aria-[invalid=true]:border-danger aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-danger disabled:opacity-60";

export function FormField({ id, label, required, error, hint, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="ml-0.5 text-danger">
              *
            </span>
            <span className="sr-only"> (필수)</span>
          </>
        )}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
