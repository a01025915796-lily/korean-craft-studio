"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import type { TabId } from "@/types";

const TABS: readonly { id: TabId; label: string }[] = [
  { id: "crafts", label: "공예품 전시·주문" },
  { id: "classes", label: "공방 클래스" },
];

interface CraftTabsProps {
  initialTab: TabId;
  /** 탭 목록과 패널 사이에 표시할 공통 소개 영역 (Hero) */
  intro?: ReactNode;
  crafts: ReactNode;
  classes: ReactNode;
}

/**
 * 한 페이지 안의 두 탭 (WAI-ARIA Tabs, 자동 활성화).
 * - ←/→ 순환, Home/End 이동. 활성 탭만 Tab 키 순서에 포함된다.
 * - 두 패널은 항상 마운트되고 비활성 패널은 hidden → 탭을 오가도 상태가 유지된다.
 * - URL ?tab= 은 history.replaceState로만 동기화한다 (서버 요청·히스토리 적재 없음).
 */
export function CraftTabs({ initialTab, intro, crafts, classes }: CraftTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>(initialTab);
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({ crafts: null, classes: null });

  const selectTab = (id: TabId, moveFocus = false) => {
    setActiveTab(id);
    window.history.replaceState(null, "", `?tab=${id}`);
    if (moveFocus) tabRefs.current[id]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = TABS.findIndex((tab) => tab.id === activeTab);
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (index + 1) % TABS.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + TABS.length) % TABS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = TABS.length - 1;
    if (next === null) return;
    event.preventDefault();
    selectTab(TABS[next].id, true);
  };

  const panels: Record<TabId, ReactNode> = { crafts, classes };

  return (
    <>
      <div className="sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
        <div
          role="tablist"
          aria-label="온결 공방 메뉴"
          className="mx-auto grid max-w-6xl grid-cols-2 px-4 sm:flex sm:gap-10 sm:px-8"
        >
          {TABS.map((tab) => {
            const selected = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectTab(tab.id)}
                onKeyDown={handleKeyDown}
                className={`relative min-h-14 px-2 text-center text-[0.95rem] font-medium transition-colors sm:px-1 sm:text-base ${
                  selected ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {tab.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-0.5 ${selected ? "bg-accent" : "bg-transparent"}`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {intro}

      {TABS.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          tabIndex={0}
          hidden={tab.id !== activeTab}
          className="focus-visible:outline-offset-[-2px]"
        >
          {panels[tab.id]}
        </div>
      ))}
    </>
  );
}
