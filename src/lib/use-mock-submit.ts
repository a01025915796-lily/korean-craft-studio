"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MockApiResult, SubmitStatus } from "@/types";

/**
 * Mock API 제출 상태(idle → loading → success | error)를 관리한다.
 * - loading 중 재호출은 무시한다 (중복 제출 방지).
 * - 언마운트(모달 닫힘) 후에는 상태를 갱신하지 않는다.
 */
export function useMockSubmit() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [result, setResult] = useState<MockApiResult | null>(null);
  const inFlight = useRef(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const submit = useCallback(async (request: () => Promise<MockApiResult>) => {
    if (inFlight.current) return;
    inFlight.current = true;
    setStatus("loading");
    setResult(null);
    const response = await request();
    inFlight.current = false;
    if (!mounted.current) return;
    setResult(response);
    setStatus(response.success ? "success" : "error");
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setResult(null);
  }, []);

  return { status, result, submit, reset };
}
