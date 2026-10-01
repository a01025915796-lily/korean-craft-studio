"use client";

import { useState, type FormEvent } from "react";
import type { ClassApplication, CraftClass, FieldErrors } from "@/types";
import { PracticeNotice } from "@/components/PracticeNotice";
import { FormField, describedBy, inputClassName } from "@/components/ui/FormField";
import { SubmitButton, SubmitErrorBanner, SubmitSuccess } from "@/components/ui/SubmitResult";
import { submitClassApplication } from "@/lib/mock-api";
import { useMockSubmit } from "@/lib/use-mock-submit";
import { REQUEST_MAX_LENGTH, getLocalDateString, hasErrors, validateClassApplication } from "@/lib/validation";

interface ClassApplicationFormProps {
  classes: readonly CraftClass[];
  initialClassId: string;
  onClose: () => void;
}

const FIELD_ORDER: readonly (keyof ClassApplication)[] = [
  "name",
  "phone",
  "classId",
  "preferredDate",
  "headcount",
  "request",
];

export function ClassApplicationForm({ classes, initialClassId, onClose }: ClassApplicationFormProps) {
  const [today] = useState(() => getLocalDateString());
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [classId, setClassId] = useState(initialClassId);
  const [preferredDate, setPreferredDate] = useState("");
  const [headcount, setHeadcount] = useState("1");
  const [request, setRequest] = useState("");
  const [errors, setErrors] = useState<FieldErrors<ClassApplication>>({});
  const { status, result, submit } = useMockSubmit();

  const selectedClass = classes.find((c) => c.id === classId);
  const loading = status === "loading";

  const clearError = (field: keyof ClassApplication) =>
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const application: ClassApplication = {
      classId,
      name,
      phone,
      preferredDate,
      headcount: headcount.trim() === "" ? Number.NaN : Number(headcount),
      request,
    };
    const found = validateClassApplication(application, selectedClass?.capacity, today);
    setErrors(found);
    if (hasErrors(found)) {
      const first = FIELD_ORDER.find((f) => found[f]);
      if (first) event.currentTarget.querySelector<HTMLElement>(`#class-${first}`)?.focus();
      return;
    }
    void submit(() => submitClassApplication(application));
  };

  if (status === "success" && result?.success) {
    return (
      <SubmitSuccess
        title="클래스 신청 접수 완료"
        receiptNumber={result.receiptNumber}
        message={result.message}
        onConfirm={onClose}
      />
    );
  }

  const errorList = FIELD_ORDER.map((f) => errors[f]).filter(Boolean);
  const maxHint = selectedClass ? `최대 ${selectedClass.capacity}명` : undefined;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <PracticeNotice variant="inline" />
      {status === "error" && result && !result.success && <SubmitErrorBanner message={result.message} />}
      <div aria-live="polite" className={errorList.length ? "text-sm text-danger" : "sr-only"}>
        {errorList.length ? `입력 내용을 확인해 주세요. (${errorList.length}개 항목)` : ""}
      </div>
      <fieldset disabled={loading} className="flex flex-col gap-4">
        <legend className="sr-only">클래스 신청 정보</legend>
        <FormField id="class-name" label="이름" required error={errors.name}>
          <input
            id="class-name"
            type="text"
            autoComplete="off"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearError("name");
            }}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("class-name", errors.name)}
            className={inputClassName}
          />
        </FormField>
        <FormField
          id="class-phone"
          label="연락처"
          required
          error={errors.phone}
          hint="실습용입니다. 010-0000-0000을 입력하면 접수 실패 예시가 표시됩니다."
        >
          <input
            id="class-phone"
            type="tel"
            inputMode="numeric"
            autoComplete="off"
            placeholder="010-1234-5678"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              clearError("phone");
            }}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy(
              "class-phone",
              errors.phone,
              "실습용입니다. 010-0000-0000을 입력하면 접수 실패 예시가 표시됩니다.",
            )}
            className={inputClassName}
          />
        </FormField>
        <FormField id="class-classId" label="클래스" required error={errors.classId}>
          <select
            id="class-classId"
            value={classId}
            onChange={(e) => {
              setClassId(e.target.value);
              clearError("classId");
              clearError("headcount");
            }}
            aria-invalid={!!errors.classId}
            aria-describedby={describedBy("class-classId", errors.classId)}
            className={inputClassName}
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </FormField>
        <FormField id="class-preferredDate" label="희망 날짜" required error={errors.preferredDate}>
          <input
            id="class-preferredDate"
            type="date"
            min={today}
            value={preferredDate}
            onChange={(e) => {
              setPreferredDate(e.target.value);
              clearError("preferredDate");
            }}
            aria-invalid={!!errors.preferredDate}
            aria-describedby={describedBy("class-preferredDate", errors.preferredDate)}
            className={inputClassName}
          />
        </FormField>
        <FormField id="class-headcount" label="인원" required error={errors.headcount} hint={maxHint}>
          <input
            id="class-headcount"
            type="number"
            inputMode="numeric"
            min={1}
            max={selectedClass?.capacity}
            value={headcount}
            onChange={(e) => {
              setHeadcount(e.target.value);
              clearError("headcount");
            }}
            aria-invalid={!!errors.headcount}
            aria-describedby={describedBy("class-headcount", errors.headcount, maxHint)}
            className={inputClassName}
          />
        </FormField>
        <FormField
          id="class-request"
          label="요청사항"
          error={errors.request}
          hint={`${request.length}/${REQUEST_MAX_LENGTH}자`}
        >
          <textarea
            id="class-request"
            rows={3}
            maxLength={REQUEST_MAX_LENGTH}
            value={request}
            onChange={(e) => {
              setRequest(e.target.value);
              clearError("request");
            }}
            aria-invalid={!!errors.request}
            aria-describedby={describedBy("class-request", errors.request, "count")}
            className={inputClassName}
          />
        </FormField>
      </fieldset>
      <SubmitButton loading={loading} label="신청하기" />
    </form>
  );
}
