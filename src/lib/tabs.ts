import type { TabId } from "@/types";

/** ?tab= 값을 탭 id로 변환한다. 허용값 외(없음 포함)는 "crafts". */
export function parseTab(value: string | string[] | undefined): TabId {
  return value === "classes" ? "classes" : "crafts";
}
