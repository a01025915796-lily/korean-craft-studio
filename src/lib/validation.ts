// 폼 검증 순수 함수. UI와 분리되어 있어 scripts/check-mock-api.mjs에서도 실행한다.
import type { ClassApplication, FieldErrors, OrderInquiry } from "../types/index.ts";

export const ORDER_QUANTITY_MIN = 1;
export const ORDER_QUANTITY_MAX = 10;
export const REQUEST_MAX_LENGTH = 500;

/** 010-1234-5678 또는 01012345678 */
const PHONE_PATTERN = /^010-?\d{4}-?\d{4}$/;

export function isValidPhone(phone: string): boolean {
  return PHONE_PATTERN.test(phone.trim());
}

/** 사용자의 로컬 날짜 기준 "YYYY-MM-DD" */
export function getLocalDateString(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function validateCommon(
  name: string,
  phone: string,
  request: string,
): { name?: string; phone?: string; request?: string } {
  const errors: { name?: string; phone?: string; request?: string } = {};
  if (!name.trim()) errors.name = "이름을 입력해 주세요.";
  if (!phone.trim()) errors.phone = "연락처를 입력해 주세요.";
  else if (!isValidPhone(phone)) errors.phone = "연락처는 010-1234-5678 형식으로 입력해 주세요.";
  if (request.length > REQUEST_MAX_LENGTH)
    errors.request = `요청사항은 ${REQUEST_MAX_LENGTH}자 이내로 입력해 주세요.`;
  return errors;
}

export function validateOrderInquiry(
  input: OrderInquiry,
  validCraftIds: readonly string[],
): FieldErrors<OrderInquiry> {
  const errors: FieldErrors<OrderInquiry> = validateCommon(input.name, input.phone, input.request);
  if (!validCraftIds.includes(input.craftId)) errors.craftId = "상품을 선택해 주세요.";
  if (
    !Number.isInteger(input.quantity) ||
    input.quantity < ORDER_QUANTITY_MIN ||
    input.quantity > ORDER_QUANTITY_MAX
  ) {
    errors.quantity = `수량은 ${ORDER_QUANTITY_MIN}~${ORDER_QUANTITY_MAX}개 사이로 입력해 주세요.`;
  }
  return errors;
}

/**
 * @param capacity 선택한 클래스의 최대 인원. 클래스를 찾지 못하면 undefined.
 * @param today "YYYY-MM-DD" (getLocalDateString())
 */
export function validateClassApplication(
  input: ClassApplication,
  capacity: number | undefined,
  today: string,
): FieldErrors<ClassApplication> {
  const errors: FieldErrors<ClassApplication> = validateCommon(
    input.name,
    input.phone,
    input.request,
  );
  if (capacity === undefined) errors.classId = "클래스를 선택해 주세요.";

  if (!input.preferredDate) errors.preferredDate = "희망 날짜를 선택해 주세요.";
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(input.preferredDate))
    errors.preferredDate = "날짜 형식이 올바르지 않습니다.";
  else if (input.preferredDate < today)
    errors.preferredDate = "지난 날짜는 선택할 수 없습니다. 오늘 이후 날짜를 골라 주세요.";

  const max = capacity ?? 1;
  if (!Number.isInteger(input.headcount) || input.headcount < 1 || input.headcount > max) {
    errors.headcount = `인원은 1~${max}명 사이로 입력해 주세요.`;
  }
  return errors;
}

export function hasErrors<T>(errors: FieldErrors<T>): boolean {
  return Object.values(errors).some(Boolean);
}
