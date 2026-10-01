"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

/**
 * 네이티브 <dialog>.showModal() 기반 모달.
 * - 배경 inert·포커스 가둠·Esc 닫기는 브라우저 기본 동작을 사용한다.
 * - 열릴 때 첫 입력칸으로 포커스, 닫힌 뒤 열기 직전 포커스(트리거 버튼)로 복귀.
 * - 배경(backdrop) 클릭으로 닫힌다.
 */
export function Modal({ open, onClose, title, description, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      returnFocusRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
      const firstField = dialog.querySelector<HTMLElement>(
        "input:not([type=hidden]):not([disabled]), select:not([disabled]), textarea:not([disabled])",
      );
      firstField?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => {
      returnFocusRef.current?.focus();
      returnFocusRef.current = null;
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        // Esc: 브라우저가 직접 닫지 않도록 막고 상위 상태로 닫는다.
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="m-0 h-dvh max-h-none w-full max-w-none bg-surface p-0 text-ink sm:m-auto sm:h-auto sm:max-h-[90dvh] sm:w-[min(36rem,calc(100%-2rem))] sm:rounded-lg sm:border sm:border-line sm:shadow-xl"
    >
      {open && (
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-7">
            <div>
              <h2 id={titleId} className="font-serif text-xl font-semibold">
                {title}
              </h2>
              {description && (
                <p id={descriptionId} className="mt-1 text-sm text-ink-muted">
                  {description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="닫기"
              className="-mr-2 inline-flex size-11 shrink-0 items-center justify-center rounded-full text-2xl leading-none text-ink-muted hover:bg-beige hover:text-ink"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">{children}</div>
        </div>
      )}
    </dialog>
  );
}
