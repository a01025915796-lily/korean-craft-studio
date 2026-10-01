"use client";

import { useRef, useState, type FormEvent } from "react";
import { PracticeNotice } from "@/components/PracticeNotice";
import { FormField, describedBy, inputClassName } from "@/components/ui/FormField";
import { SubmitButton, SubmitErrorBanner, SubmitSuccess } from "@/components/ui/SubmitResult";
import { submitOrderInquiry } from "@/lib/mock-api";
import { useMockSubmit } from "@/lib/use-mock-submit";
import {
  ORDER_QUANTITY_MAX,
  ORDER_QUANTITY_MIN,
  REQUEST_MAX_LENGTH,
  hasErrors,
  validateOrderInquiry,
} from "@/lib/validation";
import type { Craft, FieldErrors, OrderInquiry } from "@/types";

interface OrderInquiryFormProps {
  crafts: readonly Craft[];
  initialCraftId: string;
  onClose: () => void;
}

const FIELD_ORDER: readonly (keyof OrderInquiry)[] = [
  "name",
  "phone",
  "craftId",
  "quantity",
  "request",
];

const ID_PREFIX = "order";

export function OrderInquiryForm({ crafts, initialCraftId, onClose }: OrderInquiryFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [craftId, setCraftId] = useState(initialCraftId);
  const [quantity, setQuantity] = useState("1");
  const [request, setRequest] = useState("");
  const [errors, setErrors] = useState<FieldErrors<OrderInquiry>>({});
  const { status, result, submit } = useMockSubmit();

  const loading = status === "loading";
  const errorCount = Object.values(errors).filter(Boolean).length;

  const clearError = (field: keyof OrderInquiry) =>
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input: OrderInquiry = {
      craftId,
      name,
      phone,
      quantity: quantity.trim() === "" ? Number.NaN : Number(quantity),
      request,
    };
    const found = validateOrderInquiry(
      input,
      crafts.map((craft) => craft.id),
    );
    setErrors(found);
    if (hasErrors(found)) {
      const first = FIELD_ORDER.find((field) => found[field]);
      if (first) formRef.current?.querySelector<HTMLElement>(`#${ID_PREFIX}-${first}`)?.focus();
      return;
    }
    void submit(() => submitOrderInquiry(input));
  };

  if (status === "success" && result?.success) {
    return (
      <SubmitSuccess
        title="주문 문의 접수 완료"
        receiptNumber={result.receiptNumber}
        message={result.message}
        onConfirm={onClose}
      />
    );
  }

  const field = (key: keyof OrderInquiry) => ({
    id: `${ID_PREFIX}-${key}`,
    "aria-invalid": !!errors[key],
  });

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
      <PracticeNotice variant="inline" />
      {status === "error" && result && !result.success && (
        <SubmitErrorBanner message={result.message} />
      )}
      <div aria-live="polite" className="text-sm text-danger empty:hidden">
        {errorCount > 0 ? `입력값을 확인해 주세요 (${errorCount}개 항목)` : null}
      </div>
      <fieldset disabled={loading} className="flex min-w-0 flex-col gap-5">
        <legend className="sr-only">주문 문의 정보</legend>
        <FormField id={`${ID_PREFIX}-name`} label="이름" required error={errors.name}>
          <input
            {...field("name")}
            type="text"
            autoComplete="off"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearError("name");
            }}
            aria-describedby={describedBy(`${ID_PREFIX}-name`, errors.name)}
            className={inputClassName}
          />
        </FormField>
        <FormField
          id={`${ID_PREFIX}-phone`}
          label="연락처"
          required
          error={errors.phone}
          hint="실습용이므로 가짜 번호를 입력하세요. 010-0000-0000은 오류 응답 테스트용 번호입니다."
        >
          <input
            {...field("phone")}
            type="tel"
            inputMode="numeric"
            autoComplete="off"
            placeholder="010-1234-5678"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              clearError("phone");
            }}
            aria-describedby={describedBy(
              `${ID_PREFIX}-phone`,
              errors.phone,
              "hint",
            )}
            className={inputClassName}
          />
        </FormField>
        <FormField id={`${ID_PREFIX}-craftId`} label="상품" required error={errors.craftId}>
          <select
            {...field("craftId")}
            value={craftId}
            onChange={(e) => {
              setCraftId(e.target.value);
              clearError("craftId");
            }}
            aria-describedby={describedBy(`${ID_PREFIX}-craftId`, errors.craftId)}
            className={inputClassName}
          >
            {crafts.map((craft) => (
              <option key={craft.id} value={craft.id}>
                {craft.name}
              </option>
            ))}
          </select>
        </FormField>
        <FormField
          id={`${ID_PREFIX}-quantity`}
          label="수량"
          required
          error={errors.quantity}
        >
          <input
            {...field("quantity")}
            type="number"
            inputMode="numeric"
            min={ORDER_QUANTITY_MIN}
            max={ORDER_QUANTITY_MAX}
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
              clearError("quantity");
            }}
            aria-describedby={describedBy(`${ID_PREFIX}-quantity`, errors.quantity)}
            className={inputClassName}
          />
        </FormField>
        <FormField
          id={`${ID_PREFIX}-request`}
          label="요청사항 (선택)"
          error={errors.request}
          hint={`${request.length} / ${REQUEST_MAX_LENGTH}자`}
        >
          <textarea
            {...field("request")}
            rows={4}
            maxLength={REQUEST_MAX_LENGTH}
            value={request}
            onChange={(e) => {
              setRequest(e.target.value);
              clearError("request");
            }}
            aria-describedby={describedBy(
              `${ID_PREFIX}-request`,
              errors.request,
              "hint",
            )}
            className={inputClassName}
          />
        </FormField>
      </fieldset>
      <SubmitButton loading={loading} label="주문 문의 접수" />
    </form>
  );
}
