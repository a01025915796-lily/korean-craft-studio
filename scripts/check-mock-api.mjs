// Mock API·검증 함수 점검 스크립트. Node 22.18+ 의 TypeScript type stripping으로 .ts를 직접 import 한다.
// 실행: npm run check:mock
import assert from "node:assert/strict";
import {
  MOCK_DELAY_MS,
  submitClassApplication,
  submitOrderInquiry,
} from "../src/lib/mock-api.ts";
import {
  getLocalDateString,
  hasErrors,
  validateClassApplication,
  validateOrderInquiry,
} from "../src/lib/validation.ts";

const today = getLocalDateString();
const ymd = today.replaceAll("-", "");
const shift = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return getLocalDateString(d);
};

const order = { craftId: "c1", name: "홍길동", phone: "010-1234-5678", quantity: 1, request: "" };
const application = {
  classId: "k1",
  name: "홍길동",
  phone: "010-1234-5678",
  preferredDate: shift(1),
  headcount: 1,
  request: "",
};
const fast = { delayMs: 0 };

let passed = 0;
async function test(name, fn) {
  await fn();
  passed += 1;
  console.log(`  PASS  ${name}`);
}

console.log("Mock API");
await test("주문 문의 성공 → ONG-YYYYMMDD-XXXX", async () => {
  const r = await submitOrderInquiry(order, fast);
  assert.equal(r.success, true);
  assert.match(r.receiptNumber, new RegExp(`^ONG-${ymd}-\\d{4}$`));
  assert.ok(r.message.length > 0);
});
await test("클래스 신청 성공 → CLS-YYYYMMDD-XXXX", async () => {
  const r = await submitClassApplication(application, fast);
  assert.equal(r.success, true);
  assert.match(r.receiptNumber, new RegExp(`^CLS-${ymd}-\\d{4}$`));
});
for (const phone of ["010-0000-0000", "01000000000"]) {
  await test(`연락처 ${phone} → 주문·클래스 모두 success:false (reject 아님)`, async () => {
    const a = await submitOrderInquiry({ ...order, phone }, fast);
    const b = await submitClassApplication({ ...application, phone }, fast);
    for (const r of [a, b]) {
      assert.equal(r.success, false);
      assert.ok(!("receiptNumber" in r));
      assert.match(r.message, /실습용/);
    }
  });
}
await test(`기본 지연 ≈ ${MOCK_DELAY_MS}ms`, async () => {
  const start = performance.now();
  await submitOrderInquiry(order);
  const elapsed = performance.now() - start;
  assert.ok(elapsed >= 650 && elapsed <= 1000, `elapsed ${elapsed.toFixed(0)}ms`);
});
await test("정상 입력 20회 연속 성공 (랜덤 실패 없음)", async () => {
  const results = await Promise.all(
    Array.from({ length: 20 }, () => submitOrderInquiry({ ...order, phone: "010-9876-5432" }, fast)),
  );
  assert.ok(results.every((r) => r.success));
});

console.log("Validation");
const ids = ["c1", "c2"];
await test("주문: 정상 입력은 오류 없음", () => {
  assert.equal(hasErrors(validateOrderInquiry(order, ids)), false);
});
await test("주문: 필수값 누락", () => {
  const e = validateOrderInquiry({ ...order, name: " ", phone: "", craftId: "" }, ids);
  assert.ok(e.name && e.phone && e.craftId);
});
await test("주문: 수량 경계 0/1/10/11/1.5", () => {
  const q = (quantity) => validateOrderInquiry({ ...order, quantity }, ids).quantity;
  assert.ok(q(0));
  assert.equal(q(1), undefined);
  assert.equal(q(10), undefined);
  assert.ok(q(11));
  assert.ok(q(1.5));
});
await test("연락처 형식", () => {
  const p = (phone) => validateOrderInquiry({ ...order, phone }, ids).phone;
  assert.equal(p("010-1234-5678"), undefined);
  assert.equal(p("01012345678"), undefined);
  assert.ok(p("010-123-4567"));
  assert.ok(p("011-1234-5678"));
  assert.ok(p("abc"));
});
await test("요청사항 500자 초과", () => {
  assert.ok(validateOrderInquiry({ ...order, request: "가".repeat(501) }, ids).request);
  assert.equal(validateOrderInquiry({ ...order, request: "가".repeat(500) }, ids).request, undefined);
});
await test("클래스: 날짜 어제 ✗ / 오늘 ✓ / 내일 ✓", () => {
  const d = (preferredDate) => validateClassApplication({ ...application, preferredDate }, 6, today).preferredDate;
  assert.ok(d(shift(-1)));
  assert.equal(d(today), undefined);
  assert.equal(d(shift(1)), undefined);
  assert.ok(d(""));
});
await test("클래스: 인원 0 ✗ / 1 ✓ / 정원 ✓ / 정원+1 ✗", () => {
  const h = (headcount) => validateClassApplication({ ...application, headcount }, 6, today).headcount;
  assert.ok(h(0));
  assert.equal(h(1), undefined);
  assert.equal(h(6), undefined);
  assert.ok(h(7));
});
await test("클래스: 클래스 미선택", () => {
  assert.ok(validateClassApplication(application, undefined, today).classId);
});

console.log(`\n${passed} checks passed`);
