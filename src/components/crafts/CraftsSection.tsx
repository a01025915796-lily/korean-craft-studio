"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import type { Craft } from "@/types";
import { CraftCard } from "./CraftCard";
import { CraftGuide } from "./CraftGuide";
import { OrderInquiryForm } from "./OrderInquiryForm";

export function CraftsSection({ crafts }: { crafts: readonly Craft[] }) {
  const [selectedCraftId, setSelectedCraftId] = useState<string | null>(null);
  const selectedCraft = crafts.find((craft) => craft.id === selectedCraftId);
  const close = () => setSelectedCraftId(null);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-serif text-2xl font-semibold text-ink">공예품 전시·주문</h2>
        <p className="mt-2 text-ink-muted">
          공방에서 정성껏 만든 공예품을 둘러보고, 마음에 드는 작품은 주문 문의를 남겨 보세요.
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {crafts.map((craft) => (
          <li key={craft.id} className="flex">
            <div className="flex w-full">
              <CraftCard craft={craft} onOrder={setSelectedCraftId} />
            </div>
          </li>
        ))}
      </ul>
      <CraftGuide />
      <Modal
        open={selectedCraft !== undefined}
        onClose={close}
        title="주문 문의"
        description={selectedCraft?.name}
      >
        {selectedCraft && (
          <OrderInquiryForm crafts={crafts} initialCraftId={selectedCraft.id} onClose={close} />
        )}
      </Modal>
    </div>
  );
}
