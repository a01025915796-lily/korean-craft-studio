export function ClassGuide() {
  return (
    <section aria-labelledby="class-guide-title" className="rounded-lg border border-line bg-beige px-5 py-5 sm:px-7">
      <h3 id="class-guide-title" className="font-serif text-lg font-semibold text-ink">
        준비물·취소 안내
        <span className="ml-2 text-xs font-normal text-ink-muted">(실습용 가상 안내)</span>
      </h3>
      <div className="mt-3 grid gap-5 text-sm leading-relaxed text-ink-muted sm:grid-cols-2">
        <div>
          <h4 className="font-medium text-ink">준비물</h4>
          <ul className="mt-1 list-disc pl-5">
            <li>앞치마 (공방에서도 빌려 드립니다)</li>
            <li>흙이나 물이 묻어도 괜찮은 편한 복장</li>
            <li>손톱은 짧게, 반지·팔찌는 빼고 오세요</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-ink">취소·환불</h4>
          <ul className="mt-1 list-disc pl-5">
            <li>3일 전까지 취소: 전액 환불</li>
            <li>1~2일 전 취소: 50% 환불</li>
            <li>당일 취소·불참: 환불 불가</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
