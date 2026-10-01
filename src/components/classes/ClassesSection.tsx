"use client";

import { useState } from "react";
import type { CraftClass } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { ClassCard } from "./ClassCard";
import { ClassGuide } from "./ClassGuide";
import { ClassApplicationForm } from "./ClassApplicationForm";

export function ClassesSection({ classes }: { classes: readonly CraftClass[] }) {
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const selected = classes.find((c) => c.id === selectedClassId);

  return (
    <section aria-labelledby="classes-title" className="flex flex-col gap-8">
      <div>
        <h2 id="classes-title" className="font-serif text-2xl font-semibold text-ink">
          공방 클래스
        </h2>
        <p className="mt-2 text-ink-muted">
          흙, 천, 자개를 직접 만지며 하루 동안 나만의 작품을 만들어 보세요. 처음이어도 괜찮습니다.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((c) => (
          <ClassCard key={c.id} craftClass={c} onApply={setSelectedClassId} />
        ))}
      </div>
      <ClassGuide />
      <Modal
        open={selected !== undefined}
        onClose={() => setSelectedClassId(null)}
        title="클래스 신청"
        description={selected?.name}
      >
        {selected && (
          <ClassApplicationForm
            classes={classes}
            initialClassId={selected.id}
            onClose={() => setSelectedClassId(null)}
          />
        )}
      </Modal>
    </section>
  );
}
