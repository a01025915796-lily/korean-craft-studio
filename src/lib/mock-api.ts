// 실습용 가짜 API. 네트워크 요청이나 저장을 하지 않고 메모리에서만 응답을 만든다.
// 런타임 import 없이 유지해야 scripts/check-mock-api.mjs에서 Node로 바로 실행할 수 있다.
import type { ClassApplication, MockApiResult, OrderInquiry } from "../types/index.ts";

export const MOCK_DELAY_MS = 700;

/** 이 번호로 제출하면 항상 실패 응답을 받는다 (실패 상태 테스트용). */
export const MOCK_ERROR_PHONE = "010-0000-0000";

interface MockOptions {
  delayMs?: number;
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isMockErrorPhone(phone: string): boolean {
  return phone.replace(/\D/g, "") === MOCK_ERROR_PHONE.replace(/\D/g, "");
}

function createReceiptNumber(prefix: "ONG" | "CLS"): string {
  const now = new Date();
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");
  const serial = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  return `${prefix}-${date}-${serial}`;
}

async function respond(
  phone: string,
  prefix: "ONG" | "CLS",
  successMessage: string,
  { delayMs = MOCK_DELAY_MS }: MockOptions,
): Promise<MockApiResult> {
  await wait(delayMs);

  if (isMockErrorPhone(phone)) {
    return {
      success: false,
      message:
        "실습용 오류 응답입니다. 연락처 010-0000-0000은 실패 테스트용 번호예요. 다른 예시 번호로 다시 제출해 보세요.",
    };
  }

  return { success: true, receiptNumber: createReceiptNumber(prefix), message: successMessage };
}

export function submitOrderInquiry(
  inquiry: OrderInquiry,
  options: MockOptions = {},
): Promise<MockApiResult> {
  return respond(
    inquiry.phone,
    "ONG",
    "주문 문의가 접수되었습니다. (실습용 가상 접수로, 실제로 전송되거나 저장되지 않습니다.)",
    options,
  );
}

export function submitClassApplication(
  application: ClassApplication,
  options: MockOptions = {},
): Promise<MockApiResult> {
  return respond(
    application.phone,
    "CLS",
    "클래스 신청이 접수되었습니다. (실습용 가상 접수로, 실제로 전송되거나 저장되지 않습니다.)",
    options,
  );
}
